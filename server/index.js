import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = process.env.PORT ?? 4000;
const dataPath = new URL("./enrollments.json", import.meta.url);
const inquiriesPath = new URL("./inquiries.json", import.meta.url);

app.use(cors());
app.use(express.json());

const readEnrollments = () => {
  try {
    const raw = fs.readFileSync(dataPath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const saveEnrollments = (entries) => {
  fs.writeFileSync(dataPath, JSON.stringify(entries, null, 2), "utf-8");
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
  fs.writeFileSync(inquiriesPath, JSON.stringify(entries, null, 2), "utf-8");
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

  return res.status(201).json({ success: true, inquiry });
});

app.get("/api/enrollments", (req, res) => {
  return res.json(readEnrollments());
});

app.put("/api/enrollment/:id/status", (req, res) => {
  const adminKey = req.body.adminKey;
  const { status } = req.body;
  const id = parseInt(req.params.id);

  if (adminKey !== "admin123") {
    return res.status(403).json({ error: "Invalid admin key." });
  }

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
  const adminKey = req.body.adminKey;
  const { status } = req.body;
  const id = parseInt(req.params.id);

  if (adminKey !== "admin123") {
    return res.status(403).json({ error: "Invalid admin key." });
  }

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

app.get("/api/track", (req, res) => {
  const isAdmin = req.query.admin === "true";
  const adminKey = String(req.query.adminKey || "").trim();
  const email = String(req.query.email || "").trim().toLowerCase();

  // Admin access
  if (isAdmin) {
    if (adminKey !== "admin123") {
      return res.status(403).json({ error: "Invalid admin key." });
    }
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


app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
