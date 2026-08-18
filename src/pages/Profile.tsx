import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  FiUser,
  FiMail,
  FiCalendar,
  FiBookOpen,
  FiBriefcase,
  FiClock,
  FiLogOut,
  FiCheckCircle,
  FiActivity,
  FiDownload,
} from "react-icons/fi";
import {
  downloadCertificate,
  getCertificateReference,
} from "../utils/certificate";

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
  const [downloadingCertificateId, setDownloadingCertificateId] = useState<number | null>(null);
  const [certificateMessage, setCertificateMessage] = useState("");

  const loadDashboard = async (email: string) => {
  try {
    setLoading(true);

    const response = await fetch(
      `/api/track?email=${encodeURIComponent(email)}`
    );

    const data = await response.json();

    if (!response.ok) {
      setStatusMessage(data.error || "Unable to load dashboard.");
      return;
    }

    setEnrollments(data.enrollments || []);
    setInquiries(data.inquiries || []);

    if (
      (data.enrollments?.length || 0) === 0 &&
      (data.inquiries?.length || 0) === 0
    ) {
      setStatusMessage("You haven't enrolled in any programs yet.");
    } else {
      setStatusMessage("");
    }
  } catch (error) {
    console.error(error);
    setStatusMessage("Unable to connect to the server.");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (typeof window === "undefined") return;

  const email =
    localStorage.getItem("nsfi_user_email") ||
    sessionStorage.getItem("nsfi_user_email") ||
    "";
  const name = localStorage.getItem("nsfi_user_name") || "";
  const dob = localStorage.getItem("nsfi_user_dob") || "";

  setUserEmail(email);
  setUserName(name);
  setUserDob(dob);

  if (email) {
    loadDashboard(email);
  }
}, []);

  const handleLogout = () => {
    localStorage.removeItem("nsfi_user_email");
    localStorage.removeItem("nsfi_user_name");
    localStorage.removeItem("nsfi_user_dob");
    sessionStorage.removeItem("nsfi_user_email");

    window.dispatchEvent(new Event("user-auth-changed"));

    navigate("/");
  };

  const handleCertificateDownload = async (enrollment: Enrollment) => {
    setCertificateMessage("");
    setDownloadingCertificateId(enrollment.id);

    try {
      await downloadCertificate(
        enrollment.name || userName,
        enrollment.program,
        enrollment.id,
        enrollment.createdAt,
      );
    } catch (error) {
      console.error("Certificate generation failed:", error);
      setCertificateMessage("Unable to download the certificate. Please try again.");
    } finally {
      setDownloadingCertificateId(null);
    }
  };
    return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">

        {/* Dashboard will come here */}
        <div className="mx-auto max-w-7xl px-6 py-12">

  {/* Dashboard Header */}

  <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    <div>

      <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
        Student Dashboard
      </p>

      <h1 className="mt-2 text-4xl font-black text-[#241A8B]">
        Welcome back, {userName || "Student"} 👋
      </h1>

      <p className="mt-3 max-w-2xl text-lg text-gray-600">
        Manage your profile, track your enrollments, view inquiries and monitor your learning journey.
      </p>

    </div>

    <button
      onClick={handleLogout}
      className="flex items-center gap-3 rounded-2xl bg-red-500 px-6 py-4 font-semibold text-white shadow-lg transition hover:bg-red-600"
    >
      <FiLogOut />
      Logout
    </button>

  </div>

  {/* Profile Card */}

  <div className="rounded-[32px] bg-white p-8 shadow-xl">

    <div className="flex flex-col gap-8 lg:flex-row lg:items-center">

      {/* Avatar */}

      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-[#241A8B] to-indigo-600 text-5xl font-bold text-white shadow-lg">

        {userName ? userName.charAt(0).toUpperCase() : "U"}

      </div>

      {/* Details */}

      <div className="flex-1">

        <h2 className="text-3xl font-black text-[#241A8B]">
          {userName || "Guest User"}
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">

          <div className="flex items-center gap-3">

            <FiMail className="text-xl text-orange-500" />

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold">{userEmail}</p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <FiCalendar className="text-xl text-green-600" />

            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-semibold">
                {userDob || "Not Provided"}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <FiUser className="text-xl text-[#241A8B]" />

            <div>
              <p className="text-sm text-gray-500">Account</p>
              <p className="font-semibold text-green-600">
                Active
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

  {/* Quick Stats */}

{/* <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

  <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Enrollments
        </p>

        <h3 className="mt-3 text-4xl font-black text-[#241A8B]">
          {enrollments.length}
        </h3>

      </div>

      <div className="rounded-2xl bg-indigo-100 p-4 text-[#241A8B]">
        <FiBookOpen size={28} />
      </div>

    </div>

  </div>

  <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Inquiries
        </p>

        <h3 className="mt-3 text-4xl font-black text-orange-500">
          {inquiries.length}
        </h3>

      </div>

      <div className="rounded-2xl bg-orange-100 p-4 text-orange-500">
        <FiBriefcase size={28} />
      </div>

    </div>

  </div>

  <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Completed
        </p>

        <h3 className="mt-3 text-4xl font-black text-green-600">
          {
            enrollments.filter(
              (item) => item.status === "completed"
            ).length
          }
        </h3>

      </div>

      <div className="rounded-2xl bg-green-100 p-4 text-green-600">
        <FiCheckCircle size={28} />
      </div>

    </div>

  </div>

  <div className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">

    <div className="flex items-center justify-between">

      <div>

        <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
          Activity
        </p>

        <h3 className="mt-3 text-4xl font-black text-purple-600">
          {enrollments.length + inquiries.length}
        </h3>

      </div>

      <div className="rounded-2xl bg-purple-100 p-4 text-purple-600">
        <FiActivity size={28} />
      </div>

    </div>

  </div>

</div> */}

{/* ================= ENROLLMENTS ================= */}

<section className="mt-14">

  <div className="mb-8 flex items-center justify-between">

    <div>

      <h2 className="text-3xl font-black text-[#241A8B]">
        My Enrollments
      </h2>

      <p className="mt-2 text-gray-500">
        Track the progress of your enrolled programs.
      </p>

    </div>

    {loading && (
      <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">
        Loading...
      </span>
    )}

  </div>

  {statusMessage && !loading && (
    <div className="mb-6 rounded-3xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500">
      {statusMessage}
    </div>
  )}

  {certificateMessage && (
    <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
      {certificateMessage}
    </div>
  )}

  <div className="space-y-6">

    {enrollments.map((item) => (

      <div
        key={item.id}
        className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >

        {/* Header */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h3 className="text-2xl font-black text-[#241A8B]">
              {item.program}
            </h3>

            <p className="mt-2 flex items-center gap-2 text-gray-500">
              <FiClock />
              Submitted on{" "}
              {new Date(item.createdAt).toLocaleDateString()}
            </p>

          </div>

          <span
            className={`rounded-full px-5 py-2 text-sm font-bold capitalize
            ${
              item.status === "received"
                ? "bg-blue-100 text-blue-700"
                : item.status === "under-review"
                ? "bg-yellow-100 text-yellow-700"
                : item.status === "processing"
                ? "bg-orange-100 text-orange-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {item.status.replace("-", " ")}
          </span>

        </div>

        {/* Details */}

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div className="rounded-2xl bg-gray-50 p-5">

            <p className="text-sm font-semibold uppercase text-gray-400">
              Candidate
            </p>

            <h4 className="mt-3 text-lg font-bold">
              {item.name}
            </h4>

            <p className="mt-2 text-gray-600">
              {item.email}
            </p>

            <p className="mt-2 text-gray-600">
              {item.phone || "Phone not provided"}
            </p>

          </div>

          <div className="rounded-2xl bg-indigo-50 p-5">

            <p className="text-sm font-semibold uppercase text-gray-500">
              Additional Message
            </p>

            <p className="mt-3 leading-7 text-gray-700">
              {item.message || "No additional message provided."}
            </p>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-8">

          <div className="mb-3 flex items-center justify-between">

            <span className="text-sm font-semibold text-gray-500">
              Enrollment Progress
            </span>

            <span className="font-bold text-[#241A8B]">

              {item.status === "received"
                ? "25%"
                : item.status === "under-review"
                ? "50%"
                : item.status === "processing"
                ? "75%"
                : "100%"}

            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-gray-200">

            <div
              className={`h-full rounded-full
              ${
                item.status === "received"
                  ? "w-1/4 bg-blue-500"
                  : item.status === "under-review"
                  ? "w-2/4 bg-yellow-500"
                  : item.status === "processing"
                  ? "w-3/4 bg-orange-500"
                  : "w-full bg-green-500"
              }`}
            />

          </div>

        </div>

        {item.status === "completed" && (
          <div className="mt-8 flex flex-col gap-3 border-t border-green-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-green-700">Certificate ready</p>
              <p className="mt-1 text-sm text-gray-500">
                Your personalized NSFI completion certificate is available.
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-[#241A8B]">
                Reference: {getCertificateReference(item.id, item.createdAt)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleCertificateDownload(item)}
              disabled={downloadingCertificateId === item.id}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-700 disabled:cursor-wait disabled:opacity-70"
            >
              <FiDownload />
              {downloadingCertificateId === item.id
                ? "Preparing..."
                : "Download Certificate"}
            </button>
          </div>
        )}

      </div>

    ))}

  </div>

</section>



{/* ================= MY INQUIRIES ================= */}

<section className="mt-16 mb-20">

  <div className="mb-8 flex items-center justify-between">

    <div>

      <h2 className="text-3xl font-black text-[#241A8B]">
        My Inquiries
      </h2>

      <p className="mt-2 text-gray-500">
        Monitor your submitted business inquiries and requests.
      </p>

    </div>

  </div>

  {inquiries.length === 0 ? (

    <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center">

      <FiBriefcase
        size={50}
        className="mx-auto text-gray-300"
      />

      <h3 className="mt-5 text-2xl font-bold text-[#241A8B]">
        No inquiries yet
      </h3>

      <p className="mt-3 text-gray-500">
        Once you submit an organization inquiry, it will appear here.
      </p>

    </div>

  ) : (

    <div className="space-y-6">

      {inquiries.map((item) => (

        <div
          key={item.id}
          className="rounded-3xl bg-white p-8 shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >

          {/* Header */}

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h3 className="text-2xl font-black text-[#241A8B]">
                {item.category}
              </h3>

              <p className="mt-2 flex items-center gap-2 text-gray-500">

                <FiClock />

                Submitted on{" "}
                {new Date(item.createdAt).toLocaleDateString()}

              </p>

            </div>

            <span
              className={`rounded-full px-5 py-2 text-sm font-bold capitalize
              ${
                item.status === "received"
                  ? "bg-blue-100 text-blue-700"
                  : item.status === "under-review"
                  ? "bg-yellow-100 text-yellow-700"
                  : item.status === "processing"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {item.status.replace("-", " ")}
            </span>

          </div>

          {/* Details */}

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl bg-gray-50 p-5">

              <p className="text-sm font-semibold uppercase text-gray-400">
                Contact Information
              </p>

              <h4 className="mt-3 text-lg font-bold">
                {item.contactName}
              </h4>

              <p className="mt-2 text-gray-600">
                {item.email}
              </p>

              <p className="mt-2 text-gray-600">
                {item.phone || "Phone not provided"}
              </p>

            </div>

            <div className="rounded-2xl bg-orange-50 p-5">

              <p className="text-sm font-semibold uppercase text-gray-500">
                Organization
              </p>

              <h4 className="mt-3 text-lg font-bold">
                {item.companyName}
              </h4>

              <p className="mt-2 text-gray-600">
                Industry: {item.industry || "Not specified"}
              </p>

            </div>

          </div>

          {/* Message */}

          <div className="mt-6 rounded-2xl bg-indigo-50 p-5">

            <p className="text-sm font-semibold uppercase text-gray-500">
              Inquiry Message
            </p>

            <p className="mt-3 leading-7 text-gray-700">
              {item.message || "No message provided."}
            </p>

          </div>

          {/* Progress */}

          <div className="mt-8">

            <div className="mb-3 flex items-center justify-between">

              <span className="text-sm font-semibold text-gray-500">
                Inquiry Progress
              </span>

              <span className="font-bold text-[#241A8B]">

                {item.status === "received"
                  ? "25%"
                  : item.status === "under-review"
                  ? "50%"
                  : item.status === "processing"
                  ? "75%"
                  : "100%"}

              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-gray-200">

              <div
                className={`h-full rounded-full
                ${
                  item.status === "received"
                    ? "w-1/4 bg-blue-500"
                    : item.status === "under-review"
                    ? "w-2/4 bg-yellow-500"
                    : item.status === "processing"
                    ? "w-3/4 bg-orange-500"
                    : "w-full bg-green-500"
                }`}
              />

            </div>

          </div>

        </div>

      ))}

    </div>

  )}

</section>

{/* ================= DASHBOARD STATS ================= */}

<section className="mt-14">

  <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

    {/* Enrollments */}

    <div className="rounded-3xl bg-white p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold uppercase text-gray-400">
            Programs
          </p>

          <h2 className="mt-3 text-5xl font-black text-[#241A8B]">
            {enrollments.length}
          </h2>

        </div>

        <div className="rounded-2xl bg-indigo-100 p-4">

          <FiBookOpen
            size={30}
            className="text-[#241A8B]"
          />

        </div>

      </div>

      <p className="mt-5 text-gray-500">
        Total enrolled programs
      </p>

    </div>

    {/* Inquiries */}

    <div className="rounded-3xl bg-white p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold uppercase text-gray-400">
            Inquiries
          </p>

          <h2 className="mt-3 text-5xl font-black text-orange-500">
            {inquiries.length}
          </h2>

        </div>

        <div className="rounded-2xl bg-orange-100 p-4">

          <FiBriefcase
            size={30}
            className="text-orange-500"
          />

        </div>

      </div>

      <p className="mt-5 text-gray-500">
        Organization requests
      </p>

    </div>

    {/* Completed */}

    <div className="rounded-3xl bg-white p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold uppercase text-gray-400">
            Completed
          </p>

          <h2 className="mt-3 text-5xl font-black text-green-600">
            {
              enrollments.filter(
                (item) => item.status === "completed"
              ).length
            }
          </h2>

        </div>

        <div className="rounded-2xl bg-green-100 p-4">

          <FiCheckCircle
            size={30}
            className="text-green-600"
          />

        </div>

      </div>

      <p className="mt-5 text-gray-500">
        Successfully completed
      </p>

    </div>

    {/* Account */}

    <div className="rounded-3xl bg-white p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold uppercase text-gray-400">
            Account
          </p>

          <h2 className="mt-3 text-3xl font-black text-green-600">
            Active
          </h2>

        </div>

        <div className="rounded-2xl bg-emerald-100 p-4">

          <FiActivity
            size={30}
            className="text-green-600"
          />

        </div>

      </div>

      <p className="mt-5 text-gray-500">
        Account status
      </p>

    </div>

  </div>

</section>





</div>



      </main>
    </>
  );
};

export default Profile;
