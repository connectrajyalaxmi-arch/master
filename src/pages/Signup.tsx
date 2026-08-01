import { useState, type FormEvent } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  FiUser,
  FiMail,
  FiLock,
  FiCalendar,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
  FiAward,
  FiBookOpen,
  FiBriefcase,
} from "react-icons/fi";

const Signup = () => {
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postSignupPath = searchParams.get("program")
    ? `/programs?program=${encodeURIComponent(searchParams.get("program")!)}&enroll=1`
    : "/profile";
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name.trim() || !dob.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("All fields are required for signup.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (typeof window !== "undefined") {
      const accountsJson = window.localStorage.getItem("nsfi_user_accounts") || "{}";
      const accounts = JSON.parse(accountsJson) as Record<string, { name: string; dob: string; email: string; password: string }>;
      const normalizedEmail = email.trim().toLowerCase();

      if (accounts[normalizedEmail]) {
        setError("An account with this email already exists. Please login.");
        return;
      }

      const accountData = {
        name: name.trim(),
        dob: dob.trim(),
        email: normalizedEmail,
        password: password,
      };

      accounts[normalizedEmail] = accountData;
      window.localStorage.setItem("nsfi_user_accounts", JSON.stringify(accounts));
      window.localStorage.setItem("nsfi_user_email", accountData.email);
      window.localStorage.setItem("nsfi_user_name", accountData.name);
      window.localStorage.setItem("nsfi_user_dob", accountData.dob);
      window.dispatchEvent(new Event("user-auth-changed"));
    }

    navigate(postSignupPath);
  };

return (
<>
<Navbar />

<div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#eef2ff] via-white to-orange-50">

{/* HERO */}

<section className="relative overflow-hidden">

<div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-200 blur-3xl opacity-60" />

<div className="absolute top-20 right-0 h-[420px] w-[420px] rounded-full bg-orange-200 blur-3xl opacity-50" />

<div className="absolute bottom-0 left-1/2 h-80 w-80 rounded-full bg-purple-200 blur-3xl opacity-40" />

<div className="relative max-w-7xl mx-auto px-6 py-20">

<div className="text-center">

<span className="inline-flex items-center rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-lg">

🚀 Join India's Fastest Growing Learning Platform

</span>

<h1 className="mt-8 text-5xl md:text-7xl font-black leading-tight text-[#241A8B]">

Create Your

<br />

Future Today

</h1>

<p className="mt-8 max-w-3xl mx-auto text-lg leading-8 text-gray-600">

Start your learning journey with industry-certified programs,
live projects, expert mentors and career guidance.

</p>

<div className="mt-14 grid gap-6 md:grid-cols-4">

<div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-xl">

<h2 className="text-4xl font-black text-[#241A8B]">

50K+

</h2>

<p className="mt-2 text-gray-600">

Students

</p>

</div>

<div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-xl">

<h2 className="text-4xl font-black text-[#241A8B]">

200+

</h2>

<p className="mt-2 text-gray-600">

Programs

</p>

</div>

<div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-xl">

<h2 className="text-4xl font-black text-[#241A8B]">

96%

</h2>

<p className="mt-2 text-gray-600">

Placement Support

</p>

</div>

<div className="rounded-3xl bg-white/80 backdrop-blur-xl p-6 shadow-xl">

<h2 className="text-4xl font-black text-[#241A8B]">

25+

</h2>

<p className="mt-2 text-gray-600">

Industry Partners

</p>

</div>

</div>

</div>

</div>

</section>

{/* MAIN */}

<section className="pb-24 px-6">

<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

{/* LEFT */}

<div>

<h2 className="text-5xl font-black text-[#241A8B]">

Why Students Choose NSFI

</h2>

<p className="mt-6 text-lg leading-8 text-gray-600">

Become industry ready through immersive learning experiences,
real-world projects and expert mentorship.

</p>

<div className="mt-12 space-y-6">

<div className="flex gap-5 rounded-3xl bg-white p-6 shadow-lg">

<div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center">

<FiBookOpen className="text-2xl text-[#241A8B]" />

</div>

<div>

<h3 className="font-bold text-xl">

Industry Curriculum

</h3>

<p className="text-gray-600 mt-2">

Designed with leading companies.

</p>

</div>

</div>

<div className="flex gap-5 rounded-3xl bg-white p-6 shadow-lg">

<div className="h-14 w-14 rounded-2xl bg-orange-100 flex items-center justify-center">

<FiAward className="text-2xl text-orange-500" />

</div>

<div>

<h3 className="font-bold text-xl">

Verified Certificates

</h3>

<p className="text-gray-600 mt-2">

Earn certificates valued by recruiters.

</p>

</div>

</div>

<div className="flex gap-5 rounded-3xl bg-white p-6 shadow-lg">

<div className="h-14 w-14 rounded-2xl bg-green-100 flex items-center justify-center">

<FiBriefcase className="text-2xl text-green-600" />

</div>

<div>

<h3 className="font-bold text-xl">

Placement Assistance

</h3>

<p className="text-gray-600 mt-2">

Resume reviews, mock interviews and referrals.

</p>

</div>

</div>

</div>

</div>

{/* RIGHT */}

<div className="rounded-[40px] bg-white p-10 shadow-2xl">

<div className="text-center">

<div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-[#241A8B] to-indigo-500 text-white shadow-xl">

<FiUser size={40} />

</div>

<h2 className="mt-6 text-4xl font-black text-[#241A8B]">

Create Account

</h2>

<p className="mt-3 text-gray-500">

Join thousands of learners today.

</p>

</div>

<form onSubmit={handleSignup} className="mt-10 space-y-6">

<div>

<label className="text-sm font-semibold">

Full Name

</label>

<div className="mt-2 flex items-center rounded-2xl border bg-gray-50 px-4">

<FiUser className="text-gray-400" />

<input
type="text"
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="John Doe"
className="w-full bg-transparent px-4 py-4 outline-none"
/>

</div>

</div>
{/* Date of Birth */}

<div>

  <label className="text-sm font-semibold">
    Date of Birth
  </label>

  <div className="mt-2 flex items-center rounded-2xl border bg-gray-50 px-4">

    <FiCalendar className="text-gray-400" />

    <input
      type="date"
      value={dob}
      onChange={(e) => setDob(e.target.value)}
      className="w-full bg-transparent px-4 py-4 outline-none"
    />

  </div>

</div>

{/* Email */}

<div>

  <label className="text-sm font-semibold">
    Email Address
  </label>

  <div className="mt-2 flex items-center rounded-2xl border bg-gray-50 px-4">

    <FiMail className="text-gray-400" />

    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="john@example.com"
      className="w-full bg-transparent px-4 py-4 outline-none"
    />

  </div>

</div>

{/* Password */}

<div>

  <label className="text-sm font-semibold">
    Password
  </label>

  <div className="mt-2 flex items-center rounded-2xl border bg-gray-50 px-4">

    <FiLock className="text-gray-400" />

    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Create a secure password"
      className="w-full bg-transparent px-4 py-4 outline-none"
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="text-gray-500 hover:text-[#241A8B]"
    >
      {showPassword ? <FiEyeOff /> : <FiEye />}
    </button>

  </div>

</div>

{/* Confirm Password */}

<div>

  <label className="text-sm font-semibold">
    Confirm Password
  </label>

  <div className="mt-2 flex items-center rounded-2xl border bg-gray-50 px-4">

    <FiLock className="text-gray-400" />

    <input
      type={showConfirmPassword ? "text" : "password"}
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      placeholder="Confirm your password"
      className="w-full bg-transparent px-4 py-4 outline-none"
    />

    <button
      type="button"
      onClick={() =>
        setShowConfirmPassword(!showConfirmPassword)
      }
      className="text-gray-500 hover:text-[#241A8B]"
    >
      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
    </button>

  </div>

</div>

{/* Error */}

{error && (

<div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">

{error}

</div>

)}

<button

type="submit"

className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#241A8B] to-indigo-600 py-4 text-lg font-bold text-white shadow-xl transition duration-300 hover:scale-[1.02] hover:shadow-2xl"

>

Create Account

<FiArrowRight className="transition group-hover:translate-x-1" />

</button>

<button

type="button"

onClick={() => navigate(`/login${window.location.search}`)}

className="w-full rounded-2xl border-2 border-[#241A8B] py-4 font-semibold text-[#241A8B] transition hover:bg-[#241A8B] hover:text-white"

>

Already have an account? Login

</button>

<div className="rounded-2xl bg-indigo-50 p-5">

<div className="flex items-center gap-3">

<FiCheckCircle className="text-2xl text-green-500" />

<div>

<h4 className="font-bold text-[#241A8B]">

Trusted by 50,000+ learners

</h4>

<p className="text-sm text-gray-600 mt-1">

Your information is securely stored and never shared with third parties.

</p>

</div>

</div>

</div>

</form>

</div>

</div>

</section>

<footer className="border-t bg-white py-10">

<div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

<div>

<h3 className="text-2xl font-black text-[#241A8B]">

National Skill Forge Institute

</h3>

<p className="text-gray-500 mt-2">

Empowering careers through industry-ready education.

</p>

</div>

<div className="text-sm text-gray-500">

© {new Date().getFullYear()} NSFI. All Rights Reserved.

</div>

</div>

</footer>

</div>

</>

);

}

export default Signup;
