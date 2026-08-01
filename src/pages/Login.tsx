import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

interface Account {
  name: string;
  dob: string;
  email: string;
  phone?: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const postAuthPath = searchParams.get("program")
    ? `/programs?program=${encodeURIComponent(searchParams.get("program")!)}&enroll=1`
    : "/profile";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved =
      localStorage.getItem("nsfi_user_email") ||
      sessionStorage.getItem("nsfi_user_email");

    if (saved) {
      navigate(postAuthPath, { replace: true });
    }
  }, [navigate, postAuthPath]);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    if (!email.trim() || !password.trim()) {
      setLoading(false);
      setError("Please enter your email and password.");
      return;
    }

    let accounts: Record<string, Account> = {};

    try {
      const data =
        localStorage.getItem("nsfi_user_accounts") || "{}";

      accounts = JSON.parse(data);
    } catch {
      accounts = {};
    }

    const account =
      accounts[email.trim().toLowerCase()];

    if (!account) {
      setLoading(false);
      setError(
        "No account found. Please create an account first."
      );
      return;
    }

    if (account.password !== password) {
      setLoading(false);
      setError("Incorrect password.");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("nsfi_user_email", account.email);
      sessionStorage.removeItem("nsfi_user_email");
    } else {
      sessionStorage.setItem("nsfi_user_email", account.email);
      localStorage.setItem("nsfi_user_email", account.email);
    }

    localStorage.setItem("nsfi_user_name", account.name);
    localStorage.setItem("nsfi_user_dob", account.dob);
    localStorage.setItem("nsfi_user_phone", account.phone || "");

    window.dispatchEvent(
      new Event("user-auth-changed")
    );

    setTimeout(() => {
      navigate(postAuthPath);
    }, 600);
  };

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen overflow-hidden bg-slate-50">

        {/* Mesh Background */}

        <div className="absolute inset-0">

          <div className="absolute -left-44 top-0 h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-[120px] animate-pulse" />

          <div className="absolute right-0 top-24 h-[500px] w-[500px] rounded-full bg-orange-400/20 blur-[120px] animate-pulse" />

          <div className="absolute left-1/2 bottom-0 h-[450px] w-[450px] rounded-full bg-sky-400/20 blur-[120px]" />

        </div>

        {/* Grid */}

        <div
          className="
          absolute
          inset-0
          opacity-[0.05]
          bg-[linear-gradient(#241A8B_1px,transparent_1px),linear-gradient(to_right,#241A8B_1px,transparent_1px)]
          bg-[size:60px_60px]
          "
        />

        {/* Floating Dots */}

        <div className="absolute left-16 top-32 h-6 w-6 rounded-full bg-orange-400 animate-bounce" />

        <div className="absolute right-24 top-52 h-5 w-5 rounded-full bg-indigo-600 animate-ping" />

        <div className="absolute bottom-32 left-1/3 h-4 w-4 rounded-full bg-pink-400 animate-pulse" />

        {/* Content Starts Here */}
        <div className="relative z-10">

  {/* Hero Section */}

  <section className="px-6 pt-14 pb-8">

    <div className="mx-auto max-w-7xl">

      <div className="text-center">

        {/* Badge */}

        <div className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/70 px-6 py-3 backdrop-blur-xl shadow-xl">

          <span className="flex h-3 w-3 rounded-full bg-green-500 animate-pulse"></span>

          <span className="font-semibold text-[#241A8B]">
            Welcome Back to NSFI
          </span>

        </div>

        {/* Heading */}

        <h1 className="mt-10 text-5xl font-black leading-tight text-[#241A8B] md:text-7xl">

          Unlock Your

          <br />

          <span className="bg-gradient-to-r from-[#241A8B] via-indigo-500 to-orange-500 bg-clip-text text-transparent">

            Future

          </span>

          <br />

          One Skill at a Time

        </h1>

        {/* Description */}

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-600 md:text-xl">

          Continue your learning journey with
          <span className="font-semibold text-[#241A8B]">
            {" "}National Skill Forge Institute.
          </span>

          Access your enrolled programs, certificates,
          placement updates, and personalized dashboard
          from one secure place.

        </p>

        {/* Stats */}

        <div className="mt-12 flex flex-wrap justify-center gap-6">

          <div className="rounded-3xl border border-white/50 bg-white/60 px-8 py-5 shadow-xl backdrop-blur-xl">

            <h3 className="text-3xl font-black text-[#241A8B]">
              100+
            </h3>

            <p className="mt-2 text-gray-600">
              Industry Courses
            </p>

          </div>

          <div className="rounded-3xl border border-white/50 bg-white/60 px-8 py-5 shadow-xl backdrop-blur-xl">

            <h3 className="text-3xl font-black text-orange-500">
              5K+
            </h3>

            <p className="mt-2 text-gray-600">
              Students Trained
            </p>

          </div>

          <div className="rounded-3xl border border-white/50 bg-white/60 px-8 py-5 shadow-xl backdrop-blur-xl">

            <h3 className="text-3xl font-black text-green-600">
              98%
            </h3>

            <p className="mt-2 text-gray-600">
              Student Satisfaction
            </p>

          </div>

        </div>

      </div>

    </div>

  </section>

  {/* Login Section Container */}

  <section className="px-6 pb-20">

    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-xl">

  <div className="relative overflow-hidden rounded-[36px] border border-white/40 bg-white/65 p-10 shadow-[0_30px_80px_rgba(36,26,139,0.18)] backdrop-blur-3xl">

    {/* Decorative Glow */}

    <div className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-indigo-400/25 blur-3xl" />

    <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-orange-400/25 blur-3xl" />

    {/* Shine */}

    <div className="absolute inset-0 overflow-hidden rounded-[36px] pointer-events-none">

      <div className="absolute -left-40 top-0 h-full w-24 rotate-12 bg-white/40 blur-xl animate-shine" />

    </div>

    {/* Content */}

    <div className="relative">

      {/* Logo */}

      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#241A8B] via-indigo-600 to-indigo-500 text-white shadow-2xl">

        <FiShield size={42} />

      </div>

      <h2 className="mt-8 text-center text-4xl font-black text-[#241A8B]">
        Welcome Back
      </h2>

      <p className="mt-3 text-center text-gray-600">
        Sign in to continue your learning journey.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-6"
      >

        {/* Email */}

        <div>

          <label
            htmlFor="email"
            className="mb-2 block font-semibold text-gray-700"
          >
            Email Address
          </label>

          <div className="group flex items-center rounded-2xl border border-gray-200 bg-white/70 px-5 shadow-sm transition-all duration-300 hover:shadow-lg focus-within:border-[#241A8B] focus-within:ring-4 focus-within:ring-indigo-100">

            <FiMail className="text-xl text-gray-400 group-focus-within:text-[#241A8B]" />

            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent px-4 py-4 outline-none"
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label
            htmlFor="password"
            className="mb-2 block font-semibold text-gray-700"
          >
            Password
          </label>

          <div className="group flex items-center rounded-2xl border border-gray-200 bg-white/70 px-5 shadow-sm transition-all duration-300 hover:shadow-lg focus-within:border-[#241A8B] focus-within:ring-4 focus-within:ring-indigo-100">

            <FiLock className="text-xl text-gray-400 group-focus-within:text-[#241A8B]" />

            <input
              id="password"
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent px-4 py-4 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 transition hover:text-[#241A8B]"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>

          </div>

        </div>

        {/* Remember */}

        <div className="flex items-center justify-between">

          <label className="flex items-center gap-3 text-sm text-gray-600">

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-[#241A8B] focus:ring-[#241A8B]"
            />

            Remember Me

          </label>

          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="font-semibold text-[#241A8B] transition hover:text-orange-500"
          >
            Forgot Password?
          </button>

        </div>

        {/* Error */}

        {error && (

          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700">

            {error}

          </div>

        )}

        {/* Login */}

        <button
          disabled={loading}
          type="submit"
          className={`group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#241A8B] via-indigo-600 to-purple-600 py-4 text-lg font-bold text-white shadow-xl transition-all duration-300 ${
            loading
              ? "cursor-not-allowed opacity-70"
              : "hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_25px_45px_rgba(36,26,139,0.35)]"
          }`}
        >

          {loading ? "Signing In..." : "Login"}

          {!loading && (
            <FiArrowRight className="transition group-hover:translate-x-1" />
          )}

        </button>

        {/* Divider */}

        <div className="relative">

          <div className="absolute inset-0 flex items-center">

            <div className="w-full border-t border-gray-200" />

          </div>

          <div className="relative flex justify-center">

            <span className="bg-white px-4 text-sm text-gray-500">

              OR

            </span>

          </div>

        </div>

        {/* Signup */}

        <button
          type="button"
          onClick={() => navigate(`/signup${window.location.search}`)}
          className="w-full rounded-2xl border-2 border-[#241A8B] py-4 font-bold text-[#241A8B] transition-all duration-300 hover:bg-[#241A8B] hover:text-white hover:shadow-xl"
        >

          Create New Account

        </button>

        {/* Security Card */}

        <div className="rounded-3xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">

              <FiCheckCircle className="text-2xl text-green-600" />

            </div>

            <div>

              <h3 className="font-bold text-[#241A8B]">

                Secure Login

              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">

                Your account is protected with secure authentication. We never
                share your personal information and always keep your learning
                data safe.

              </p>

            </div>

          </div>

        </div>

      </form>

    </div>

  </div>

</div>
      </div>
    </section>

    {/* Premium Footer */}

    <footer className="relative border-t border-white/30 bg-white/40 backdrop-blur-2xl">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-10 md:flex-row">

        {/* Left */}

        <div>

          <h2 className="text-2xl font-black text-[#241A8B]">

            National Skill Forge Institute

          </h2>

          <p className="mt-3 max-w-md leading-7 text-gray-600">

            Empowering students with industry-ready skills,
            certifications, and career opportunities through
            practical learning.

          </p>

        </div>

        {/* Right */}

        <div className="flex flex-col items-center gap-2 text-sm text-gray-500 md:items-end">

          <span>

            © {new Date().getFullYear()} NSFI.

            All Rights Reserved.

          </span>

          <span>

            Designed with ❤️ for Future Professionals

          </span>

        </div>

      </div>

    </footer>

      </div>

    </div>

    </>

  );

};

export default Login;
