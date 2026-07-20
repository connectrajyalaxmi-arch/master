import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const Profile = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userDob, setUserDob] = useState("");
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setUserEmail(window.localStorage.getItem("nsfi_user_email") || "");
    setUserName(window.localStorage.getItem("nsfi_user_name") || "");
    setUserDob(window.localStorage.getItem("nsfi_user_dob") || "");
  }, []);

  useEffect(() => {
    if (!userEmail) return;

    const fetchUserActivity = async () => {
      setLoading(true);
      setStatusMessage("");

      try {
        const response = await fetch(`/api/track?email=${encodeURIComponent(userEmail)}`);
        const payload = await response.text();

        if (!response.ok) {
          let error = "Unable to load your activity.";
          try {
            const parsed = JSON.parse(payload);
            error = parsed.error || error;
          } catch {
            if (payload.trim().startsWith("<")) {
              error = "API route not available. Make sure the backend is running.";
            }
          }
          throw new Error(error);
        }

        const result = JSON.parse(payload);
        setEnrollments(result.enrollments || []);
        setInquiries(result.inquiries || []);
        if ((result.enrollments?.length || 0) + (result.inquiries?.length || 0) === 0) {
          setStatusMessage("No enrollments or inquiries found for your account.");
        }
      } catch (error) {
        setStatusMessage(error instanceof Error ? error.message : "Failed to load your activity.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserActivity();
  }, [userEmail]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("nsfi_user_email");
      window.localStorage.removeItem("nsfi_user_name");
      window.localStorage.removeItem("nsfi_user_dob");
      window.dispatchEvent(new Event("user-auth-changed"));
    }
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <section className="bg-[#241A8B] text-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Your Profile</h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Welcome back! This page shows your account details and gives you quick access to logout.
          </p>
        </div>
      </section>

      <main className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="rounded-none bg-white border border-gray-200 p-8 shadow-lg">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#241A8B] mb-3">Account details</h2>
              <p className="text-sm text-gray-600">Use these details to verify your account and manage your sessions.</p>
            </div>

            <div className="space-y-4 text-gray-700">
              <div>
                <p className="text-sm font-semibold text-gray-500">Name</p>
                <p className="mt-1 text-lg">{userName || "Guest User"}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">Email</p>
                <p className="mt-1 text-lg">{userEmail}</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-500">Date of birth</p>
                <p className="mt-1 text-lg">{userDob || "Not provided"}</p>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-none bg-[#241A8B] px-6 py-3 text-white font-semibold hover:bg-[#1a1466] transition"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mt-12 space-y-8">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#241A8B]">Your Enrollments</h3>
                  <p className="text-sm text-gray-500">Track your program registrations and current status.</p>
                </div>
                {loading && <span className="text-sm text-gray-500">Loading...</span>}
              </div>

              {statusMessage && !loading ? (
                <div className="rounded-none border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">{statusMessage}</div>
              ) : null}

              {enrollments.length > 0 ? (
                <div className="space-y-4">
                  {enrollments.map((item) => (
                    <div key={item.id} className="rounded-none border border-gray-200 bg-white p-6 shadow-sm">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-lg font-semibold text-[#241A8B]">{item.program}</p>
                          <p className="text-sm text-gray-500">Submitted: {new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${item.status === "received" ? "bg-blue-100 text-blue-700" : item.status === "under-review" ? "bg-yellow-100 text-yellow-700" : item.status === "processing" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                          {item.status.replace("-", " ")}
                        </span>
                      </div>
                      <div className="mt-4 text-gray-700">
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Email:</strong> {item.email}</p>
                        <p><strong>Phone:</strong> {item.phone || "Not provided"}</p>
                        {item.message && <p><strong>Message:</strong> {item.message}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-[#241A8B]">Your Inquiries</h3>
                  <p className="text-sm text-gray-500">View your enquiry submissions and current status.</p>
                </div>
              </div>

              {inquiries.length > 0 ? (
                <div className="space-y-4">
                  {inquiries.map((item) => (
                    <div key={item.id} className="rounded-none border border-gray-200 bg-white p-6 shadow-sm">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-lg font-semibold text-[#241A8B]">{item.category}</p>
                          <p className="text-sm text-gray-500">Submitted: {new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${item.status === "received" ? "bg-blue-100 text-blue-700" : item.status === "under-review" ? "bg-yellow-100 text-yellow-700" : item.status === "processing" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}>
                          {item.status.replace("-", " ")}
                        </span>
                      </div>
                      <div className="mt-4 text-gray-700">
                        <p><strong>Contact Name:</strong> {item.contactName}</p>
                        <p><strong>Email:</strong> {item.email}</p>
                        <p><strong>Phone:</strong> {item.phone || "Not provided"}</p>
                        <p><strong>Industry:</strong> {item.industry || "Not provided"}</p>
                        {item.message && <p><strong>Message:</strong> {item.message}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
