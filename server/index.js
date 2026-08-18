import express from "express";
import cors from "cors";
import fs from "fs";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

try {
  process.loadEnvFile(".env");
} catch {
  // The project can still run without a local .env file; admin access stays disabled.
}

const app = express();
const PORT = process.env.PORT ?? 4000;
const dataPath = new URL("./enrollments.json", import.meta.url);
const inquiriesPath = new URL("./inquiries.json", import.meta.url);
const notificationsPath = new URL("./notifications.json", import.meta.url);
const distPath = fileURLToPath(new URL("../dist", import.meta.url));
const ADMIN_EMAIL = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const ADMIN_PASSWORD = String(process.env.ADMIN_PASSWORD || "");
const adminSessions = new Set();

app.use(cors());
app.use(express.json());

const credentialsMatch = (email, password) => {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return false;

  const suppliedEmail = Buffer.from(String(email || "").trim().toLowerCase());
  const configuredEmail = Buffer.from(ADMIN_EMAIL);
  const suppliedPassword = Buffer.from(String(password || ""));
  const configuredPassword = Buffer.from(ADMIN_PASSWORD);

  const emailMatches = suppliedEmail.length === configuredEmail.length && crypto.timingSafeEqual(suppliedEmail, configuredEmail);
  const passwordMatches = suppliedPassword.length === configuredPassword.length && crypto.timingSafeEqual(suppliedPassword, configuredPassword);

  return emailMatches && passwordMatches;
};

const requireAdmin = (req, res) => {
  const token = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "").trim();

  if (!token || !adminSessions.has(token)) {
    res.status(403).json({ error: "Administrator access is required." });
    return false;
  }

  return true;
};

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return res.status(503).json({ error: "Admin login is not configured. Add ADMIN_EMAIL and ADMIN_PASSWORD to .env." });
  }

  if (!credentialsMatch(email, password)) {
    return res.status(401).json({ error: "Invalid admin email or password." });
  }

  const token = crypto.randomBytes(32).toString("hex");
  adminSessions.add(token);
  return res.json({ success: true, token });
});

const readEnrollments = () => {
  try {
    const raw = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveJsonFile = (fileUrl, entries) => {
  const filePath = fileURLToPath(fileUrl);
  const temporaryPath = `${filePath}.tmp`;
  fs.writeFileSync(temporaryPath, JSON.stringify(entries, null, 2), "utf-8");
  fs.renameSync(temporaryPath, filePath);
};

const saveEnrollments = (entries) => {
  saveJsonFile(dataPath, entries);
};

const readInquiries = () => {
  try {
    const raw = fs.readFileSync(inquiriesPath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveInquiries = (entries) => {
  saveJsonFile(inquiriesPath, entries);
};

const readNotifications = () => {
  try {
    const raw = fs.readFileSync(notificationsPath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveNotifications = (entries) => {
  saveJsonFile(notificationsPath, entries);
};

const addNotification = (type, title, message) => {
  const notifications = readNotifications();
  notifications.unshift({
    id: Date.now(),
    type,
    title,
    message,
    createdAt: new Date().toISOString(),
    read: false,
  });
  saveNotifications(notifications.slice(0, 50));
  return notifications[0];
};

app.post("/api/enroll", (req, res) => {
  const { name, email, phone, message, program } = req.body;

  if (!name || !email || !program) {
    return res.status(400).json({ error: "Name, email, and program are required." });
  }

  const enrollments = readEnrollments();
  const id = Date.now();
  const enrollment = {
    id,
    name,
    email,
    phone: phone || "",
    message: message || "",
    program,
    status: "received",
    createdAt: new Date().toISOString(),
  };

  enrollments.push(enrollment);
  saveEnrollments(enrollments);
  addNotification("enrollment", "New enrollment received", `${name} requested enrollment for ${program}.`);

  return res.status(201).json({ success: true, enrollment });
});

app.post("/api/inquiry", (req, res) => {
  const { companyName, contactName, email, phone, industry, message, category } = req.body;

  if (!contactName || !email) {
    return res.status(400).json({ error: "Contact name and email are required." });
  }

  const inquiries = readInquiries();
  const id = Date.now();
  const inquiry = {
    id,
    companyName: companyName || "",
    contactName,
    email,
    phone: phone || "",
    industry: industry || "",
    message: message || "",
    category: category || "Partnership",
    status: "received",
    createdAt: new Date().toISOString(),
  };

  inquiries.push(inquiry);
  saveInquiries(inquiries);
  addNotification("inquiry", "New inquiry received", `${contactName} submitted a new inquiry for ${category || "partnership"}.`);

  return res.status(201).json({ success: true, inquiry });
});

app.get("/api/enrollments", (req, res) => {
  return res.json(readEnrollments());
});

app.put("/api/enrollment/:id/status", (req, res) => {
  const { status } = req.body;
  const id = parseInt(req.params.id);

  if (!requireAdmin(req, res)) return;

  if (!["received", "under-review", "processing", "completed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status." });
  }

  const enrollments = readEnrollments();
  const enrollment = enrollments.find((e) => e.id === id);

  if (!enrollment) {
    return res.status(404).json({ error: "Enrollment not found." });
  }

  enrollment.status = status;
  saveEnrollments(enrollments);

  return res.json({ success: true, enrollment });
});

app.put("/api/inquiry/:id/status", (req, res) => {
  const { status } = req.body;
  const id = parseInt(req.params.id);

  if (!requireAdmin(req, res)) return;

  if (!["received", "under-review", "processing", "completed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status." });
  }

  const inquiries = readInquiries();
  const inquiry = inquiries.find((i) => i.id === id);

  if (!inquiry) {
    return res.status(404).json({ error: "Inquiry not found." });
  }

  inquiry.status = status;
  saveInquiries(inquiries);

  return res.json({ success: true, inquiry });
});

app.delete("/api/admin/delete", (req, res) => {
  if (!requireAdmin(req, res)) return;

  const { type, id } = req.body;
  const recordId = Number(id);

  if (!Number.isInteger(recordId) || !["enrollment", "inquiry"].includes(type)) {
    return res.status(400).json({ error: "Invalid record." });
  }

  const entries = type === "enrollment" ? readEnrollments() : readInquiries();
  const nextEntries = entries.filter((entry) => entry.id !== recordId);

  if (nextEntries.length === entries.length) {
    return res.status(404).json({ error: "Record not found." });
  }

  if (type === "enrollment") saveEnrollments(nextEntries);
  else saveInquiries(nextEntries);

  return res.json({ success: true });
});

app.get("/api/notifications", (req, res) => {
  if (!requireAdmin(req, res)) return;

  return res.json({ notifications: readNotifications().slice(0, 10) });
});

app.get("/api/track", (req, res) => {
  const isAdmin = req.query.admin === "true";
  const email = String(req.query.email || "").trim().toLowerCase();

  // Admin access
  if (isAdmin) {
    if (!requireAdmin(req, res)) return;
    const enrollments = readEnrollments().map((e) => ({
      ...e,
      status: e.status || "received"
    }));
    const inquiries = readInquiries().map((i) => ({
      ...i,
      status: i.status || "received"
    }));
    return res.json({ enrollments, inquiries, isAdmin: true });
  }

  // User email lookup
  if (!email) {
    return res.status(400).json({ error: "Email is required to track." });
  }

  const enrollments = readEnrollments()
    .filter((entry) => entry.email.toLowerCase() === email)
    .map((e) => ({
      ...e,
      status: e.status || "received"
    }));
  
  const inquiries = readInquiries()
    .filter((entry) => entry.email.toLowerCase() === email)
    .map((i) => ({
      ...i,
      status: i.status || "received"
    }));

  return res.json({ enrollments, inquiries, isAdmin: false });
});


app.use(express.static(distPath));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  return res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
