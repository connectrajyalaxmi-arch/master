import { useState } from "react";
import Navbar from "../components/Navbar";

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

const statusMessages: Record<string, { label: string; message: string; color: string }> = {
  "received": {
    label: "Received",
    message: "Thank you! We've received your registration. Our team will review it shortly.",
    color: "bg-blue-100 border-blue-300 text-blue-800"
  },
  "under-review": {
    label: "Under Review",
    message: "Our partnership team is reviewing your request. We'll get back to you soon.",
    color: "bg-yellow-100 border-yellow-300 text-yellow-800"
  },
  "processing": {
    label: "Processing",
    message: "We're processing your application. Thank you for your patience!",
    color: "bg-orange-100 border-orange-300 text-orange-800"
  },
  "completed": {
    label: "Completed",
    message: "Your registration is complete! Welcome to NSFI. Check your email for next steps.",
    color: "bg-green-100 border-green-300 text-green-800"
  }
};

const TrackStatus = () => {
  const [email, setEmail] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleTrack = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("");
    setEnrollments([]);
    setInquiries([]);

    try {
      if (!email.trim()) {
        setStatusMessage("Please enter your email to track your details.");
        return;
      }

      const response = await fetch(`/api/track?email=${encodeURIComponent(email.trim())}`);
      const payload = await response.text();

      if (!response.ok) {
        let message = "Unable to retrieve tracking details.";
        try {
          const parsed = JSON.parse(payload);
          message = parsed.error || message;
        } catch {
          if (payload.trim().startsWith("<")) {
            message = "API route not available. Make sure the backend is running and /api/track is accessible.";
          }
        }
        throw new Error(message);
      }

      const result = JSON.parse(payload);
      // Add default status if not present
      const enrollmentsWithStatus = (result.enrollments || []).map((e: any) => ({
        ...e,
        status: e.status || "received"
      }));
      const inquiriesWithStatus = (result.inquiries || []).map((i: any) => ({
        ...i,
        status: i.status || "received"
      }));

      setEnrollments(enrollmentsWithStatus);
      setInquiries(inquiriesWithStatus);

      if (enrollmentsWithStatus.length + inquiriesWithStatus.length === 0) {
        setStatusMessage("No registrations or inquiries found for this email.");
      }

      setIsAdmin(false);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Tracking failed.");
      setIsAdmin(false);
    }
  };

  const handleAdminAccess = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage("");
    setEnrollments([]);
    setInquiries([]);

    try {
      if (!adminKey.trim()) {
        setStatusMessage("Please enter admin key.");
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
            message = "API route not available. Make sure the backend is running and /api/track is accessible.";
          }
        }
        throw new Error(message);
      }

      const result = JSON.parse(payload);
      const enrollmentsWithStatus = (result.enrollments || []).map((e: any) => ({
        ...e,
        status: e.status || "received"
      }));
      const inquiriesWithStatus = (result.inquiries || []).map((i: any) => ({
        ...i,
        status: i.status || "received"
      }));

      setEnrollments(enrollmentsWithStatus);
      setInquiries(inquiriesWithStatus);
      setIsAdmin(true);
      setStatusMessage("");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Admin access failed.");
      setIsAdmin(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-[#241A8B] text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Track Your Registration or Inquiry</h1>
          <p className="text-lg text-gray-200">
            Enter your email to view enrollment and inquiry details, or access the admin panel.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {/* User Tracking */}
            <div>
              <h2 className="text-2xl font-bold text-[#241A8B] mb-4">User Tracking</h2>
              <form onSubmit={handleTrack} className="space-y-6 rounded-none bg-white border border-gray-200 p-8 shadow-lg">
                <div>
                  <label className="block">
                    <span className="text-sm font-semibold text-gray-700">Email</span>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-none border border-gray-300 px-4 py-3 outline-none focus:border-[#241A8B] focus:ring-2 focus:ring-[#241A8B]/20"
                      type="email"
                    />
                  </label>
                </div>

                <p className="text-sm text-gray-500">Enter your email to track your details.</p>

                <button className="w-full rounded-none bg-[#241A8B] px-6 py-3 text-white font-semibold hover:bg-[#1a1466] transition">
                  Track My Details
                </button>
              </form>
            </div>

            {/* Admin Access */}
            <div>
              <h2 className="text-2xl font-bold text-[#241A8B] mb-4">Admin Panel</h2>
              <form onSubmit={handleAdminAccess} className="space-y-6 rounded-none bg-white border border-gray-200 p-8 shadow-lg">
                <div>
                  <label className="block">
                    <span className="text-sm font-semibold text-gray-700">Admin Key</span>
                    <input
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      placeholder="Enter admin key"
                      className="mt-2 w-full rounded-none border border-gray-300 px-4 py-3 outline-none focus:border-[#241A8B] focus:ring-2 focus:ring-[#241A8B]/20"
                      type="password"
                    />
                  </label>
                </div>

                <p className="text-sm text-gray-500">Access all registrations and inquiries.</p>

                <button className="w-full rounded-none bg-[#241A8B] px-6 py-3 text-white font-semibold hover:bg-[#1a1466] transition">
                  Admin Login
                </button>
              </form>
            </div>
          </div>

          {statusMessage && (
            <div className={`rounded-none border bg-red-50 p-4 text-red-700 border-red-200 mb-6`}>
              {statusMessage}
            </div>
          )}

          {(enrollments.length > 0 || inquiries.length > 0) && (
            <div className="mt-10 space-y-6">
              {enrollments.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#241A8B] mb-4">
                    {isAdmin ? "All Enrollments" : "Your Enrollment"}
                  </h2>
                  <div className="space-y-4">
                    {enrollments.map((item) => {
                      const statusInfo = statusMessages[item.status] || statusMessages["received"];
                      return (
                        <div key={item.id} className="rounded-none border border-gray-200 bg-white p-6 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <p className="text-lg font-semibold">{item.program}</p>
                            <span className={`px-4 py-2 font-semibold text-sm border rounded-none ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          </div>

                          <div className={`border-l-4 p-4 mb-4 ${statusInfo.color}`}>
                            <p className="font-semibold">{statusInfo.message}</p>
                          </div>

                          <div className="space-y-2 text-gray-700">
                            <p><strong>Name:</strong> {item.name}</p>
                            <p><strong>Email:</strong> {item.email}</p>
                            <p><strong>Phone:</strong> {item.phone || "Not provided"}</p>
                            <p><strong>Submitted:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                            {item.message && <p><strong>Message:</strong> {item.message}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {inquiries.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-[#241A8B] mb-4">
                    {isAdmin ? "All Inquiries" : "Your Inquiry"}
                  </h2>
                  <div className="space-y-4">
                    {inquiries.map((item) => {
                      const statusInfo = statusMessages[item.status] || statusMessages["received"];
                      return (
                        <div key={item.id} className="rounded-none border border-gray-200 bg-white p-6 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <p className="text-lg font-semibold">{item.companyName || item.category}</p>
                            <span className={`px-4 py-2 font-semibold text-sm border rounded-none ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          </div>

                          <div className={`border-l-4 p-4 mb-4 ${statusInfo.color}`}>
                            <p className="font-semibold">{statusInfo.message}</p>
                          </div>

                          <div className="space-y-2 text-gray-700">
                            <p><strong>Contact:</strong> {item.contactName}</p>
                            <p><strong>Email:</strong> {item.email}</p>
                            <p><strong>Phone:</strong> {item.phone || "Not provided"}</p>
                            <p><strong>Industry:</strong> {item.industry || "Not provided"}</p>
                            <p><strong>Submitted:</strong> {new Date(item.createdAt).toLocaleString()}</p>
                            {item.message && <p><strong>Message:</strong> {item.message}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TrackStatus;
