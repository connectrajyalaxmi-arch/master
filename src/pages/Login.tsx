import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem("nsfi_user_email")) {
      navigate("/profile", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    if (typeof window !== "undefined") {
      const accountsJson = window.localStorage.getItem("nsfi_user_accounts") || "{}";
      const accounts = JSON.parse(accountsJson) as Record<string, { name: string; dob: string; email: string; password: string }>;
      const normalizedEmail = email.trim().toLowerCase();
      const account = accounts[normalizedEmail];

      if (!account) {
        setError("No account found for this email. Please sign up first.");
        return;
      }

      if (account.password !== password) {
        setError("Invalid email or password.");
        return;
      }

      window.localStorage.setItem("nsfi_user_email", account.email);
      window.localStorage.setItem("nsfi_user_name", account.name);
      window.localStorage.setItem("nsfi_user_dob", account.dob);
      window.dispatchEvent(new Event("user-auth-changed"));
      navigate("/profile");
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-[#241A8B] text-white py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">User Login</h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Log in with your email to view your profile, track registrations, and access personalized actions.
          </p>
        </div>
      </section>

      <main className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="rounded-none bg-white border border-gray-200 p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#241A8B] mb-6">Sign in</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Your password"
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
                Login
              </button>

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="w-full rounded-none border border-[#241A8B] px-6 py-3 text-[#241A8B] font-semibold hover:bg-[#f5f5ff] transition"
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
