import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import * as XLSX from "xlsx";

import {
  FiDownload,
  FiRefreshCw,
  FiSearch,
  FiLogOut,
  FiUsers,
  FiMail,
  FiBell,
  FiTrendingUp,
  FiEye,
  FiTrash2,
} from "react-icons/fi";

interface Enrollment {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  program: string;
  createdAt: string;
  status: "received" | "under-review" | "processing" | "completed";
}

interface Inquiry {
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  category: string;
  message: string;
  createdAt: string;
  status: "received" | "under-review" | "processing" | "completed";
}

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: string;
  createdAt: string;
  read: boolean;
}
const statusMessages = {
  received: {
    label: "Received",
    color: "bg-blue-100 text-blue-700",
  },

  "under-review": {
    label: "Under Review",
    color: "bg-yellow-100 text-yellow-700",
  },

  processing: {
    label: "Processing",
    color: "bg-orange-100 text-orange-700",
  },

  completed: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
  },
};
const AdminTracking = () => {

  const [adminEmail, setAdminEmail] = useState(
    () => window.sessionStorage.getItem("nsfi_admin_email") ?? "partnerships@nsfi.org.in"
  );
  const [adminPassword, setAdminPassword] = useState("");
  const [adminToken, setAdminToken] = useState(
    () => window.sessionStorage.getItem("nsfi_admin_token") ?? ""
  );

const [authenticated, setAuthenticated] = useState(
  () => Boolean(window.sessionStorage.getItem("nsfi_admin_token"))
);

const [loading, setLoading] = useState(false);

const [statusMessage, setStatusMessage] = useState("");

const [enrollments, setEnrollments] =
  useState<Enrollment[]>([]);

const [inquiries, setInquiries] =
  useState<Inquiry[]>([]);

const [notifications, setNotifications] =
  useState<NotificationItem[]>([]);

  const [search, setSearch] = useState("");

const [statusFilter, setStatusFilter] =
  useState("all");
  const [selectedRecord, setSelectedRecord] =
  useState<Enrollment | Inquiry | null>(null);

const [showModal, setShowModal] =
  useState(false);

  const filteredEnrollments = useMemo(() => {
  return enrollments.filter((item) => {

    const searchMatch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search);

    const statusMatch =
      statusFilter === "all" ||
      item.status === statusFilter;

    return searchMatch && statusMatch;
  });
}, [enrollments, search, statusFilter]);
const filteredInquiries = useMemo(() => {
  return inquiries.filter((item) => {

    const searchMatch =
      item.contactName
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      item.companyName
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      item.email
        .toLowerCase()
        .includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "all" ||
      item.status === statusFilter;

    return searchMatch && statusMatch;
  });
}, [inquiries, search, statusFilter]);

const dashboardStats = {
  totalEnrollments: enrollments.length,

  totalInquiries: inquiries.length,

  pending: [...enrollments, ...inquiries].filter(
    (x) => x.status !== "completed"
  ).length,

  completed: [...enrollments, ...inquiries].filter(
    (x) => x.status === "completed"
  ).length,

  notifications: notifications.length,
};

// ================= FETCH NOTIFICATIONS =================

const fetchNotifications = async () => {
  if (!authenticated || !adminToken) return;

  try {
    const response = await fetch("/api/notifications", {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const data = await response.json();

    if (response.ok) {
      setNotifications(data.notifications || []);
    }
  } catch (err) {
    console.error(err);
  }
};

// ================= LOAD DASHBOARD =================

const loadDashboard = async () => {
  try {
    const response = await fetch("/api/track?admin=true", {
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    const text = await response.text();

    if (!response.ok) {
      let message = "Unable to load dashboard";

      try {
        message = JSON.parse(text).error;
      } catch {}

      if (response.status === 401 || response.status === 403) {
        setAuthenticated(false);
        setAdminToken("");
        window.sessionStorage.removeItem("nsfi_admin_email");
        window.sessionStorage.removeItem("nsfi_admin_token");
        window.localStorage.removeItem("nsfi_admin_authorized");
        window.dispatchEvent(new Event("admin-auth-changed"));
      }

      throw new Error(message);
    }

    const data = JSON.parse(text);

    setEnrollments(
      (data.enrollments || []).map((item: Enrollment) => ({
        ...item,
        status: item.status || "received",
      }))
    );

    setInquiries(
      (data.inquiries || []).map((item: Inquiry) => ({
        ...item,
        status: item.status || "received",
      }))
    );
  } catch (err) {
    if (err instanceof Error) {
      setStatusMessage(err.message);
    }
  }
};

// ================= LOGIN =================

const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (!adminEmail.trim() || !adminPassword) {
    setStatusMessage("Please enter your admin email and password.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: adminEmail.trim(), password: adminPassword }),
    });

    const text = await response.text();

    if (!response.ok) {
      let message = "Invalid admin email or password";

      try {
        message = JSON.parse(text).error;
      } catch {}

      throw new Error(message);
    }

    const data = JSON.parse(text);

    if (!data.token) throw new Error("Unable to create an admin session.");

    setAuthenticated(true);
    setAdminToken(data.token);
    setAdminPassword("");
    window.sessionStorage.setItem("nsfi_admin_email", adminEmail.trim());
    window.sessionStorage.setItem("nsfi_admin_token", data.token);
    window.localStorage.removeItem("nsfi_admin_authorized");
    window.dispatchEvent(new Event("admin-auth-changed"));

    setStatusMessage("");

  } catch (err) {
    setAuthenticated(false);
    setAdminToken("");
    window.sessionStorage.removeItem("nsfi_admin_email");
    window.sessionStorage.removeItem("nsfi_admin_token");
    window.localStorage.removeItem("nsfi_admin_authorized");
    window.dispatchEvent(new Event("admin-auth-changed"));

    if (err instanceof Error) {
      setStatusMessage(err.message);
    }
  } finally {
    setLoading(false);
  }
};

// ================= REFRESH =================

const handleRefresh = async () => {
  setLoading(true);

  await loadDashboard();

  await fetchNotifications();

  setLoading(false);
};

// ================= LOGOUT =================

const handleLogout = () => {
  setAuthenticated(false);

  setAdminToken("");
  setAdminPassword("");
  window.sessionStorage.removeItem("nsfi_admin_email");
  window.sessionStorage.removeItem("nsfi_admin_token");
  window.localStorage.removeItem("nsfi_admin_authorized");
  window.dispatchEvent(new Event("admin-auth-changed"));

  setAdminEmail("partnerships@nsfi.org.in");

  setEnrollments([]);

  setInquiries([]);

  setNotifications([]);

  setSearch("");

  setStatusFilter("all");

  setStatusMessage("");
};

// ================= EXPORT TO EXCEL =================

const downloadExcel = () => {
  const workbook = XLSX.utils.book_new();

  if (enrollments.length) {
    const enrollmentSheet = XLSX.utils.json_to_sheet(
      enrollments.map((item) => ({
        Name: item.name,
        Email: item.email,
        Phone: item.phone,
        Program: item.program,
        Status: item.status,
        Message: item.message,
        Date: new Date(item.createdAt).toLocaleString(),
      }))
    );

    XLSX.utils.book_append_sheet(
      workbook,
      enrollmentSheet,
      "Enrollments"
    );
  }

  if (inquiries.length) {
    const inquirySheet = XLSX.utils.json_to_sheet(
      inquiries.map((item) => ({
        Company: item.companyName,
        Contact: item.contactName,
        Email: item.email,
        Phone: item.phone,
        Industry: item.industry,
        Category: item.category,
        Status: item.status,
        Message: item.message,
        Date: new Date(item.createdAt).toLocaleString(),
      }))
    );

    XLSX.utils.book_append_sheet(
      workbook,
      inquirySheet,
      "Inquiries"
    );
  }

  XLSX.writeFile(
    workbook,
    `NSFI_Admin_${new Date().toISOString().slice(0, 10)}.xlsx`
  );
};

// ================= VIEW DETAILS =================

const openDetails = (record: Enrollment | Inquiry) => {
  setSelectedRecord(record);
  setShowModal(true);
};

// ================= UPDATE STATUS =================

const updateStatus = async (
  type: "enrollment" | "inquiry",
  id: number,
  status: string
) => {
  try {
    const response = await fetch(`/api/${type}/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        status,
      }),
    });

    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || "Unable to update status.");
    }

    await handleRefresh();
  } catch (error) {
    alert(error instanceof Error ? error.message : "Status update failed.");
  }
};

// ================= DELETE RECORD =================

const deleteRecord = async (
  type: "enrollment" | "inquiry",
  id: number
) => {
  if (!window.confirm("Delete this record permanently?")) return;

  try {
    const response = await fetch("/api/admin/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        type,
        id,
      }),
    });

    if (!response.ok) {
      throw new Error("Delete failed.");
    }

    await handleRefresh();
  } catch {
    alert("Unable to delete record.");
  }
};

// ================= AUTO REFRESH =================

useEffect(() => {
  if (!authenticated) return;

  loadDashboard();
  fetchNotifications();

  const interval = window.setInterval(() => {
    loadDashboard();
    fetchNotifications();
  }, 10000);

  return () => window.clearInterval(interval);
}, [authenticated, adminToken]);

return (
  <>
    <Navbar />

    {!authenticated ? (
      <div className="min-h-screen bg-slate-100">
        {/* Hero */}

        <section className="bg-gradient-to-r from-[#241A8B] via-indigo-700 to-[#1b1464] py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h1 className="text-5xl font-black text-white">Admin Dashboard</h1>

            <p className="mt-4 max-w-2xl text-lg text-indigo-100">
              Secure administrator access for managing enrollments, inquiries,
              notifications and reports.
            </p>
          </div>
        </section>

        {/* Login Card */}

        <section className="-mt-12 pb-20">
          <div className="mx-auto max-w-md px-6">
            <div className="rounded-3xl bg-white p-10 shadow-2xl">
              <div className="text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#241A8B] text-4xl text-white">
                  🔐
                </div>

                <h2 className="mt-6 text-3xl font-black text-[#241A8B]">
                  Admin Login
                </h2>

                <p className="mt-2 text-gray-500">Authorized personnel only</p>
              </div>

              <form onSubmit={handleLogin} className="mt-10 space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Admin email</label>

                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="partnerships@nsfi.org.in"
                    className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-[#241A8B] focus:ring-2 focus:ring-[#241A8B]/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">Password</label>

                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none transition focus:border-[#241A8B] focus:ring-2 focus:ring-[#241A8B]/20"
                  />
                </div>

                {statusMessage && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                    {statusMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl bg-gradient-to-r from-[#241A8B] to-indigo-700 py-4 font-bold text-white transition hover:scale-[1.02] disabled:opacity-60"
                >
                  {loading ? "Authenticating..." : "Login to Dashboard"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    ) : (
      <div className="min-h-screen bg-slate-100">
        {/* Header */}

        <section className="border-b bg-white">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
            <div>
              <h2 className="text-4xl font-black text-[#241A8B]">
                Admin Dashboard
              </h2>

              <p className="mt-2 text-gray-500">
                Manage all enrollments and partnership inquiries.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={downloadExcel}
                className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
              >
                <FiDownload />
                Export
              </button>

              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                <FiRefreshCw />
                Refresh
              </button>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-10">
          {/* KPI Cards */}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl bg-white p-8 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Enrollments</p>

                  <h2 className="mt-3 text-5xl font-black text-[#241A8B]">
                    {dashboardStats.totalEnrollments}
                  </h2>
                </div>

                <FiUsers size={40} className="text-[#241A8B]" />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Inquiries</p>

                  <h2 className="mt-3 text-5xl font-black text-orange-500">
                    {dashboardStats.totalInquiries}
                  </h2>
                </div>

                <FiMail size={40} className="text-orange-500" />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Pending</p>

                  <h2 className="mt-3 text-5xl font-black text-yellow-500">
                    {dashboardStats.pending}
                  </h2>
                </div>

                <FiTrendingUp size={40} className="text-yellow-500" />
              </div>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Notifications</p>

                  <h2 className="mt-3 text-5xl font-black text-red-500">
                    {dashboardStats.notifications}
                  </h2>
                </div>

                <FiBell size={40} className="text-red-500" />
              </div>
            </div>
          </div>

          {/* ================= SEARCH & FILTER ================= */}

          <div className="mt-10 rounded-3xl bg-white p-6 shadow">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative">
                <FiSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, company..."
                  className="w-full rounded-xl border border-gray-300 py-4 pl-12 pr-4 outline-none transition focus:border-[#241A8B]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-gray-300 px-5 py-4 outline-none focus:border-[#241A8B]"
              >
                <option value="all">All Status</option>
                <option value="received">Received</option>
                <option value="under-review">Under Review</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* ================= NOTIFICATIONS ================= */}

          <div className="mt-10 rounded-3xl bg-white p-8 shadow">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#241A8B]">
                  Recent Notifications
                </h3>

                <p className="text-gray-500">
                  Latest activity from website forms
                </p>
              </div>

              <div className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                {notifications.length} New
              </div>
            </div>

            {notifications.length === 0 ? (
              <div className="rounded-2xl border border-dashed py-10 text-center">
                <FiBell size={42} className="mx-auto text-gray-300" />

                <p className="mt-4 text-gray-500">No recent notifications.</p>
              </div>
            ) : (
              <div
                aria-label="Recent notifications"
                className={`space-y-4 ${
                  notifications.length > 5
                    ? "max-h-[34rem] overflow-y-auto overscroll-contain pr-2"
                    : ""
                }`}
              >
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between rounded-2xl border border-orange-100 bg-orange-50 p-5"
                  >
                    <div>
                      <h4 className="font-bold text-[#241A8B]">{item.title}</h4>

                      <p className="mt-1 text-gray-600">{item.message}</p>

                      <span className="mt-3 inline-block text-xs text-gray-500">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>

                    {!item.read && (
                      <span className="h-3 w-3 rounded-full bg-red-500" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= ENROLLMENTS ================= */}

          <div className="mt-10 rounded-3xl bg-white shadow">
            <div className="flex items-center justify-between border-b px-8 py-6">
              <div>
                <h3 className="text-2xl font-bold text-[#241A8B]">
                  Program Enrollments
                </h3>

                <p className="text-gray-500">
                  {filteredEnrollments.length} records found
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Program</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEnrollments.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-gray-500">
                        No enrollments found.
                      </td>
                    </tr>
                  ) : (
                    filteredEnrollments.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-slate-50">
                        <td className="px-6 py-5">
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.phone}</div>
                        </td>

                        <td className="px-6 py-5">{item.program}</td>

                        <td className="px-6 py-5">{item.email}</td>

                        <td className="px-6 py-5">
                          <select
                            value={item.status}
                            onChange={(e) =>
                              updateStatus("enrollment", item.id, e.target.value)
                            }
                            className={`rounded-lg px-3 py-2 text-sm font-semibold ${statusMessages[item.status].color}`}
                          >
                            <option value="received">Received</option>
                            <option value="under-review">Under Review</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>

                        <td className="px-6 py-5 text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() => openDetails(item)}
                              className="rounded-lg bg-blue-100 p-2 text-blue-700 transition hover:bg-blue-200"
                            >
                              <FiEye />
                            </button>

                            <button
                              onClick={() => deleteRecord("enrollment", item.id)}
                              className="rounded-lg bg-red-100 p-2 text-red-700 transition hover:bg-red-200"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= INQUIRIES ================= */}

          <div className="mt-10 rounded-3xl bg-white shadow">
            <div className="flex items-center justify-between border-b px-8 py-6">
              <div>
                <h3 className="text-2xl font-bold text-[#241A8B]">
                  Partnership & Contact Inquiries
                </h3>

                <p className="text-gray-500">
                  {filteredInquiries.length} records found
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left">Contact</th>
                    <th className="px-6 py-4 text-left">Company</th>
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-10 text-center text-gray-500">
                        No inquiries found.
                      </td>
                    </tr>
                  ) : (
                    filteredInquiries.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-slate-50">
                        <td className="px-6 py-5">
                          <div className="font-semibold">{item.contactName}</div>
                          <div className="text-sm text-gray-500">{item.phone}</div>
                        </td>

                        <td className="px-6 py-5">{item.companyName || "-"}</td>

                        <td className="px-6 py-5">{item.category}</td>

                        <td className="px-6 py-5">{item.email}</td>

                        <td className="px-6 py-5">
                          <select
                            value={item.status}
                            onChange={(e) =>
                              updateStatus("inquiry", item.id, e.target.value)
                            }
                            className={`rounded-lg px-3 py-2 text-sm font-semibold ${statusMessages[item.status].color}`}
                          >
                            <option value="received">Received</option>
                            <option value="under-review">Under Review</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>

                        <td className="px-6 py-5 text-gray-500">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex justify-center gap-3">
                            <button
                              onClick={() => openDetails(item)}
                              className="rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200"
                            >
                              <FiEye />
                            </button>

                            <button
                              onClick={() => deleteRecord("inquiry", item.id)}
                              className="rounded-lg bg-red-100 p-2 text-red-700 hover:bg-red-200"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ================= DETAILS MODAL ================= */}

          {showModal && selectedRecord && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
              <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-3xl font-black text-[#241A8B]">
                    Record Details
                  </h2>

                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-full bg-gray-100 px-4 py-2 font-bold hover:bg-gray-200"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-5">
                  {"name" in selectedRecord ? (
                    <>
                      <div>
                        <p className="text-sm font-semibold text-gray-500">Name</p>
                        <p className="text-lg">{selectedRecord.name}</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-500">Program</p>
                        <p>{selectedRecord.program}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-sm font-semibold text-gray-500">
                          Contact Person
                        </p>
                        <p className="text-lg">{selectedRecord.contactName}</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-500">Company</p>
                        <p>{selectedRecord.companyName}</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-500">Industry</p>
                        <p>{selectedRecord.industry}</p>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-500">Category</p>
                        <p>{selectedRecord.category}</p>
                      </div>
                    </>
                  )}

                  <div>
                    <p className="text-sm font-semibold text-gray-500">Email</p>
                    <p>{selectedRecord.email}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">Phone</p>
                    <p>{selectedRecord.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">Status</p>

                    <span
                      className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${statusMessages[selectedRecord.status].color}`}
                    >
                      {statusMessages[selectedRecord.status].label}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">Submitted On</p>
                    <p>{new Date(selectedRecord.createdAt).toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500">Message</p>

                    <div className="mt-2 rounded-xl bg-slate-50 p-5 leading-7">
                      {selectedRecord.message}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setShowModal(false)}
                    className="rounded-xl bg-[#241A8B] px-6 py-3 font-semibold text-white hover:bg-[#1b1464]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </>
);

};

export default AdminTracking;
