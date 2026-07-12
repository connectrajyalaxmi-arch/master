import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import * as XLSX from "xlsx";
import { FiDownload, FiRefreshCw } from "react-icons/fi";

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
  message: string;
  category: string;
  createdAt: string;
  status: "received" | "under-review" | "processing" | "completed";
}

interface NotificationItem {
  id: number;
  type: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const statusMessages: Record<string, { label: string; color: string }> = {
  "received": { label: "Received", color: "bg-blue-100 border-blue-300 text-blue-800" },
  "under-review": { label: "Under Review", color: "bg-yellow-100 border-yellow-300 text-yellow-800" },
  "processing": { label: "Processing", color: "bg-orange-100 border-orange-300 text-orange-800" },
  "completed": { label: "Completed", color: "bg-green-100 border-green-300 text-green-800" }
};

const AdminTracking = () => {
  const [adminKey, setAdminKey] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const fetchNotifications = async () => {
    if (!adminKey.trim() || !isAuthenticated) return;

    try {
      const response = await fetch(`/api/notifications?adminKey=${encodeURIComponent(adminKey.trim())}`);
      const payload = await response.json().catch(() => ({ notifications: [] }));

      if (response.ok) {
        setNotifications(payload.notifications || []);
      }
    } catch (error) {
      console.error("Notification fetch failed:", error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    fetchNotifications();
    const interval = window.setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => window.clearInterval(interval);
  }, [isAuthenticated, adminKey]);

  const handleAdminLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("");
    setLoading(true);

    try {
      if (!adminKey.trim()) {
        setStatusMessage("Please enter admin key.");
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/track?admin=true&adminKey=${encodeURIComponent(adminKey.trim())}`);
      const payload = await response.text();

      if (!response.ok) {
        let message = "Unable to retrieve admin data.";
        try {
          const parsed = JSON.parse(payload);
          message = parsed.error || message;
        } catch {
          if (payload.trim().startsWith("<")) {
            message = "API route not available. Make sure the backend is running.";
          }
        }
        throw new Error(message);
      }

      const result = JSON.parse(payload);
      const enrollmentsWithStatus = (result.enrollments || []).map((e: Enrollment) => ({
        ...e,
        status: e.status || "received"
      }));
      const inquiriesWithStatus = (result.inquiries || []).map((i: Inquiry) => ({
        ...i,
        status: i.status || "received"
      }));

      setEnrollments(enrollmentsWithStatus);
      setInquiries(inquiriesWithStatus);
      setIsAuthenticated(true);
      setStatusMessage("");
      setTimeout(() => fetchNotifications(), 300);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Admin login failed.");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = (enrollmentsList: Enrollment[], inquiriesList: Inquiry[]) => {
    try {
      const workbook = XLSX.utils.book_new();

      // Prepare enrollments sheet
      if (enrollmentsList.length > 0) {
        const enrollmentData = enrollmentsList.map(e => ({
          "ID": e.id,
          "Name": e.name,
          "Email": e.email,
          "Phone": e.phone,
          "Program": e.program,
          "Message": e.message,
          "Status": statusMessages[e.status]?.label || e.status,
          "Created Date": new Date(e.createdAt).toLocaleString()
        }));
        const enrollmentSheet = XLSX.utils.json_to_sheet(enrollmentData);
        XLSX.utils.book_append_sheet(workbook, enrollmentSheet, "Enrollments");
      }

      // Prepare inquiries sheet
      if (inquiriesList.length > 0) {
        const inquiryData = inquiriesList.map(i => ({
          "ID": i.id,
          "Company Name": i.companyName,
          "Contact Name": i.contactName,
          "Email": i.email,
          "Phone": i.phone,
          "Industry": i.industry,
          "Category": i.category,
          "Message": i.message,
          "Status": statusMessages[i.status]?.label || i.status,
          "Created Date": new Date(i.createdAt).toLocaleString()
        }));
        const inquirySheet = XLSX.utils.json_to_sheet(inquiryData);
        XLSX.utils.book_append_sheet(workbook, inquirySheet, "Inquiries");
      }

      // Generate download
      const fileName = `admin_tracking_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminKey("");
    setEnrollments([]);
    setInquiries([]);
    setStatusMessage("");
  };

  const handleRefresh = async () => {
    if (!isAuthenticated || !adminKey) return;
    
    setLoading(true);
    try {
      const response = await fetch(`/api/track?admin=true&adminKey=${encodeURIComponent(adminKey.trim())}`);
      const payload = await response.text();

      if (!response.ok) {
        throw new Error("Failed to refresh data.");
      }

      const result = JSON.parse(payload);
      const enrollmentsWithStatus = (result.enrollments || []).map((e: Enrollment) => ({
        ...e,
        status: e.status || "received"
      }));
      const inquiriesWithStatus = (result.inquiries || []).map((i: Inquiry) => ({
        ...i,
        status: i.status || "received"
      }));

      setEnrollments(enrollmentsWithStatus);
      setInquiries(inquiriesWithStatus);
      
      // Auto-export to Excel
      setTimeout(() => {
        downloadExcel(enrollmentsWithStatus, inquiriesWithStatus);
      }, 500);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Refresh failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-[#241A8B] text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Admin Tracking Dashboard</h1>
          <p className="text-lg text-gray-200">
            Manage all enrollments and inquiries with real-time status updates and Excel export.
          </p>
        </div>
      </section>

      {!isAuthenticated ? (
        <section className="py-16 bg-gray-50 min-h-screen">
          <div className="max-w-2xl mx-auto px-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-[#241A8B] mb-6">Admin Login</h2>
              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div>
                  <label className="block">
                    <span className="text-sm font-semibold text-gray-700">Admin Key</span>
                    <input
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      placeholder="Enter admin key"
                      className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#241A8B] focus:ring-2 focus:ring-[#241A8B]/20"
                      type="password"
                    />
                  </label>
                </div>

                {statusMessage && (
                  <div className={`rounded-lg border p-4 ${statusMessage.includes("failed") || statusMessage.includes("Invalid") ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"}`}>
                    {statusMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-[#241A8B] px-6 py-3 text-white font-semibold hover:bg-[#1a1466] transition disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login to Admin Dashboard"}
                </button>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header Controls */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold text-[#241A8B] mb-2">Dashboard</h2>
                <p className="text-gray-600">Total: {enrollments.length} Enrollments | {inquiries.length} Inquiries</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  <FiRefreshCw size={20} /> Refresh
                </button>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-600 px-5 py-3 text-white font-semibold hover:bg-red-700 transition"
                >
                  Logout
                </button>
              </div>
            </div>

            {statusMessage && (
              <div className={`rounded-lg border p-4 mb-6 ${statusMessage.includes("failed") ? "bg-red-50 text-red-700 border-red-200" : "bg-green-50 text-green-700 border-green-200"}`}>
                {statusMessage}
              </div>
            )}

            <div className="mb-8 rounded-lg border border-orange-200 bg-orange-50 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-[#241A8B]">Recent Notifications</h3>
                  <p className="text-sm text-gray-600">New enrollments and inquiries appear here automatically.</p>
                </div>
              </div>

              {notifications.length === 0 ? (
                <p className="mt-4 text-sm text-gray-500">No new notifications yet.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {notifications.map((item) => (
                    <div key={item.id} className="rounded-lg border border-orange-200 bg-white p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-[#241A8B]">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.message}</p>
                        </div>
                        <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Success Message - Data downloaded to Excel */}
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <div className="mb-6">
                <FiDownload size={64} className="mx-auto text-green-600 mb-4" />
              </div>
              <h3 className="text-2xl font-bold text-[#241A8B] mb-3">Data Ready</h3>
              <p className="text-gray-600 text-lg mb-2">Your admin tracking data has been downloaded as an Excel file.</p>
              <p className="text-gray-500 text-sm">The file includes:</p>
              <ul className="text-gray-600 mt-4 space-y-2">
                <li>✓ {enrollments.length} Enrollments</li>
                <li>✓ {inquiries.length} Inquiries</li>
                <li>✓ All details and statuses</li>
              </ul>
              <button
                onClick={handleRefresh}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
              >
                <FiRefreshCw size={18} /> Refresh & Download Again
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AdminTracking;
