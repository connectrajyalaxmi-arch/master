import express from "express";
import cors from "cors";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";
import database, {
  appEnvironment,
  verifyDatabaseConnection,
} from "./database.js";

const app = express();
const PORT = process.env.PORT ?? 4000;
const distPath = fileURLToPath(new URL("../dist", import.meta.url));
const ADMIN_EMAIL = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
const ADMIN_PASSWORD = String(process.env.ADMIN_PASSWORD || "");
const adminSessions = new Set();
const validStatuses = ["received", "under-review", "processing", "completed"];

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const asyncRoute = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const credentialsMatch = (email, password) => {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) return false;

  const suppliedEmail = Buffer.from(String(email || "").trim().toLowerCase());
  const configuredEmail = Buffer.from(ADMIN_EMAIL);
  const suppliedPassword = Buffer.from(String(password || ""));
  const configuredPassword = Buffer.from(ADMIN_PASSWORD);

  const emailMatches =
    suppliedEmail.length === configuredEmail.length &&
    crypto.timingSafeEqual(suppliedEmail, configuredEmail);
  const passwordMatches =
    suppliedPassword.length === configuredPassword.length &&
    crypto.timingSafeEqual(suppliedPassword, configuredPassword);

  return emailMatches && passwordMatches;
};

const requireAdmin = (req, res) => {
  const token = String(req.headers.authorization || "")
    .replace(/^Bearer\s+/i, "")
    .trim();

  if (!token || !adminSessions.has(token)) {
    res.status(403).json({ error: "Administrator access is required." });
    return false;
  }

  return true;
};

const normalizeDate = (value) => {
  if (value instanceof Date) return value.toISOString();
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? String(value) : parsed.toISOString();
};

const mapEnrollment = (row) => ({
  id: Number(row.id),
  name: row.name,
  email: row.email,
  phone: row.phone || "",
  message: row.message || "",
  program: row.program,
  status: row.status || "received",
  createdAt: normalizeDate(row.createdAt),
});

const mapInquiry = (row) => ({
  id: Number(row.id),
  companyName: row.companyName || "",
  contactName: row.contactName,
  email: row.email,
  phone: row.phone || "",
  industry: row.industry || "",
  message: row.message || "",
  category: row.category || "Partnership",
  status: row.status || "received",
  createdAt: normalizeDate(row.createdAt),
});

const mapNotification = (row) => ({
  id: Number(row.id),
  type: row.type,
  title: row.title,
  message: row.message,
  createdAt: normalizeDate(row.createdAt),
  read: Boolean(row.read),
});

const enrollmentSelect = `
  SELECT id, name, email, phone, message, program, status,
         created_at AS createdAt
  FROM enrollments
`;

const inquirySelect = `
  SELECT id, company_name AS companyName, contact_name AS contactName,
         email, phone, industry, message, category, status,
         created_at AS createdAt
  FROM inquiries
`;

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return res.status(503).json({
      error:
        "Admin login is not configured. Add ADMIN_EMAIL and ADMIN_PASSWORD to the server environment.",
    });
  }

  if (!credentialsMatch(email, password)) {
    return res.status(401).json({ error: "Invalid admin email or password." });
  }

  const token = crypto.randomBytes(32).toString("hex");
  adminSessions.add(token);
  return res.json({ success: true, token });
});

app.post(
  "/api/enroll",
  asyncRoute(async (req, res) => {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const phone = String(req.body.phone || "").trim();
    const message = String(req.body.message || "").trim();
    const program = String(req.body.program || "").trim();

    if (!name || !email || !program) {
      return res
        .status(400)
        .json({ error: "Name, email, and program are required." });
    }

    const id = Date.now();
    const notificationId = id + 1;
    const createdAt = new Date();
    const connection = await database.getConnection();

    try {
      await connection.beginTransaction();
      await connection.execute(
        `INSERT INTO enrollments
          (id, name, email, phone, message, program, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, 'received', ?)`,
        [id, name, email, phone, message, program, createdAt],
      );
      await connection.execute(
        `INSERT INTO notifications
          (id, type, title, message, created_at, is_read)
         VALUES (?, 'enrollment', 'New enrollment received', ?, ?, FALSE)`,
        [notificationId, `${name} requested enrollment for ${program}.`, createdAt],
      );
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

    const enrollment = {
      id,
      name,
      email,
      phone,
      message,
      program,
      status: "received",
      createdAt: createdAt.toISOString(),
    };

    return res.status(201).json({ success: true, enrollment });
  }),
);

app.post(
  "/api/inquiry",
  asyncRoute(async (req, res) => {
    const companyName = String(req.body.companyName || "").trim();
    const contactName = String(req.body.contactName || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const phone = String(req.body.phone || "").trim();
    const industry = String(req.body.industry || "").trim();
    const message = String(req.body.message || "").trim();
    const category = String(req.body.category || "Partnership").trim();

    if (!contactName || !email) {
      return res
        .status(400)
        .json({ error: "Contact name and email are required." });
    }

    const id = Date.now();
    const notificationId = id + 1;
    const createdAt = new Date();
    const connection = await database.getConnection();

    try {
      await connection.beginTransaction();
      await connection.execute(
        `INSERT INTO inquiries
          (id, company_name, contact_name, email, phone, industry, message,
           category, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'received', ?)`,
        [
          id,
          companyName,
          contactName,
          email,
          phone,
          industry,
          message,
          category,
          createdAt,
        ],
      );
      await connection.execute(
        `INSERT INTO notifications
          (id, type, title, message, created_at, is_read)
         VALUES (?, 'inquiry', 'New inquiry received', ?, ?, FALSE)`,
        [
          notificationId,
          `${contactName} submitted a new inquiry for ${category}.`,
          createdAt,
        ],
      );
      await connection.commit();
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

    const inquiry = {
      id,
      companyName,
      contactName,
      email,
      phone,
      industry,
      message,
      category,
      status: "received",
      createdAt: createdAt.toISOString(),
    };

    return res.status(201).json({ success: true, inquiry });
  }),
);

app.get(
  "/api/enrollments",
  asyncRoute(async (req, res) => {
    if (!requireAdmin(req, res)) return;
    const [rows] = await database.query(
      `${enrollmentSelect} ORDER BY created_at DESC`,
    );
    return res.json(rows.map(mapEnrollment));
  }),
);

app.put(
  "/api/enrollment/:id/status",
  asyncRoute(async (req, res) => {
    if (!requireAdmin(req, res)) return;
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!Number.isSafeInteger(id)) {
      return res.status(400).json({ error: "Invalid enrollment ID." });
    }
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }

    const [result] = await database.execute(
      "UPDATE enrollments SET status = ? WHERE id = ?",
      [status, id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Enrollment not found." });
    }

    const [rows] = await database.execute(`${enrollmentSelect} WHERE id = ?`, [id]);
    return res.json({ success: true, enrollment: mapEnrollment(rows[0]) });
  }),
);

app.put(
  "/api/inquiry/:id/status",
  asyncRoute(async (req, res) => {
    if (!requireAdmin(req, res)) return;
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!Number.isSafeInteger(id)) {
      return res.status(400).json({ error: "Invalid inquiry ID." });
    }
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }

    const [result] = await database.execute(
      "UPDATE inquiries SET status = ? WHERE id = ?",
      [status, id],
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Inquiry not found." });
    }

    const [rows] = await database.execute(`${inquirySelect} WHERE id = ?`, [id]);
    return res.json({ success: true, inquiry: mapInquiry(rows[0]) });
  }),
);

app.delete(
  "/api/admin/delete",
  asyncRoute(async (req, res) => {
    if (!requireAdmin(req, res)) return;
    const { type } = req.body;
    const id = Number(req.body.id);

    if (!Number.isSafeInteger(id) || !["enrollment", "inquiry"].includes(type)) {
      return res.status(400).json({ error: "Invalid record." });
    }

    const table = type === "enrollment" ? "enrollments" : "inquiries";
    const [result] = await database.execute(`DELETE FROM ${table} WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Record not found." });
    }
    return res.json({ success: true });
  }),
);

app.get(
  "/api/notifications",
  asyncRoute(async (req, res) => {
    if (!requireAdmin(req, res)) return;
    const [rows] = await database.query(
      `SELECT id, type, title, message, created_at AS createdAt,
              is_read AS \`read\`
       FROM notifications
       ORDER BY created_at DESC
       LIMIT 50`,
    );
    return res.json({ notifications: rows.map(mapNotification) });
  }),
);

app.get(
  "/api/track",
  asyncRoute(async (req, res) => {
    const isAdmin = req.query.admin === "true";
    const email = String(req.query.email || "").trim().toLowerCase();

    if (isAdmin) {
      if (!requireAdmin(req, res)) return;
      const [[enrollmentRows], [inquiryRows]] = await Promise.all([
        database.query(`${enrollmentSelect} ORDER BY created_at DESC`),
        database.query(`${inquirySelect} ORDER BY created_at DESC`),
      ]);
      return res.json({
        enrollments: enrollmentRows.map(mapEnrollment),
        inquiries: inquiryRows.map(mapInquiry),
        isAdmin: true,
      });
    }

    if (!email) {
      return res.status(400).json({ error: "Email is required to track." });
    }

    const [[enrollmentRows], [inquiryRows]] = await Promise.all([
      database.execute(
        `${enrollmentSelect} WHERE LOWER(email) = ? ORDER BY created_at DESC`,
        [email],
      ),
      database.execute(
        `${inquirySelect} WHERE LOWER(email) = ? ORDER BY created_at DESC`,
        [email],
      ),
    ]);
    return res.json({
      enrollments: enrollmentRows.map(mapEnrollment),
      inquiries: inquiryRows.map(mapInquiry),
      isAdmin: false,
    });
  }),
);

app.use("/api", (req, res) => {
  res.status(404).json({ error: "API route not found." });
});

app.use((error, req, res, next) => {
  console.error("Request failed:", error);
  if (res.headersSent) return next(error);
  return res.status(500).json({ error: "An unexpected server error occurred." });
});

app.use(express.static(distPath));

app.get("*", (req, res) => {
  return res.sendFile(path.join(distPath, "index.html"));
});

try {
  await verifyDatabaseConnection();
  app.listen(PORT, () => {
    console.log(
      `Application server running in ${appEnvironment} mode at http://localhost:${PORT}`,
    );
  });
} catch (error) {
  console.error("Unable to connect to MySQL:", error.message);
  process.exit(1);
}
