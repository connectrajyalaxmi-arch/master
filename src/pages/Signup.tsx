import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (event: React.FormEvent<HTMLFormElement>) => {
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

    navigate("/profile");
  };

  return (
    <>
      <Navbar />
      <section className="bg-[#241A8B] text-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Create your account</h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Sign up with your name, date of birth, email, and password to access your NSFI profile.
          </p>
        </div>
      </section>

      <main className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="rounded-none bg-white border border-gray-200 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#241A8B] mb-6">Sign up</h2>
            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700">Name</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="mt-2 w-full rounded-none border border-gray-300 px-4 py-3 outline-none focus:border-[#241A8B] focus:ring-2 focus:ring-[#241A8B]/20"
                  />
                </label>
              </div>

              <div>
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700">Date of birth</span>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="mt-2 w-full rounded-none border border-gray-300 px-4 py-3 outline-none focus:border-[#241A8B] focus:ring-2 focus:ring-[#241A8B]/20"
                  />
                </label>
              </div>

              <div>
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700">Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-none border border-gray-300 px-4 py-3 outline-none focus:border-[#241A8B] focus:ring-2 focus:ring-[#241A8B]/20"
                  />
                </label>
              </div>

              <div>
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="mt-2 w-full rounded-none border border-gray-300 px-4 py-3 outline-none focus:border-[#241A8B] focus:ring-2 focus:ring-[#241A8B]/20"
                  />
                </label>
              </div>

              <div>
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700">Confirm password</span>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="mt-2 w-full rounded-none border border-gray-300 px-4 py-3 outline-none focus:border-[#241A8B] focus:ring-2 focus:ring-[#241A8B]/20"
                  />
                </label>
              </div>

              {error && (
                <div className="rounded-none border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-none bg-[#241A8B] px-6 py-3 text-white font-semibold hover:bg-[#1a1466] transition"
              >
                Create account
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full rounded-none border border-[#241A8B] px-6 py-3 text-[#241A8B] font-semibold hover:bg-[#f5f5ff] transition"
              >
                Already have an account? Login
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
