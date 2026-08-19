import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/nsfi-logo.png";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin";

  const [isAdminAuthorized, setIsAdminAuthorized] = useState(() => {
    if (typeof window === "undefined") return false;
    return Boolean(window.sessionStorage.getItem("nsfi_admin_token"));
  });

  const [userEmail, setUserEmail] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return (
      window.localStorage.getItem("nsfi_user_email") ||
      window.sessionStorage.getItem("nsfi_user_email")
    );
  });

  const [userName, setUserName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("nsfi_user_name");
  });

  const [notifications, setNotifications] = useState<
    { id: number; title: string; message: string }[]
  >([]);

  const [showToast, setShowToast] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavigate = (path: string) => {
    closeMenu();
    navigate(path);
  };

  useEffect(() => {
    const syncAuthStatus = () => {
      setIsAdminAuthorized(
        Boolean(window.sessionStorage.getItem("nsfi_admin_token"))
      );

      setUserEmail(
        window.localStorage.getItem("nsfi_user_email") ||
          window.sessionStorage.getItem("nsfi_user_email")
      );

      setUserName(window.localStorage.getItem("nsfi_user_name"));
    };

    syncAuthStatus();

    window.addEventListener("admin-auth-changed", syncAuthStatus);
    window.addEventListener("user-auth-changed", syncAuthStatus);
    window.addEventListener("storage", syncAuthStatus);

    const handleNotification = (
      event: Event
    ) => {
      const customEvent = event as CustomEvent<{
        title: string;
        message: string;
      }>;

      if (!customEvent.detail) return;

      const id = Date.now();

      setNotifications((prev) => [
        {
          id,
          title: customEvent.detail.title,
          message: customEvent.detail.message,
        },
        ...prev,
      ].slice(0, 5));

      setShowToast(true);
    };

    window.addEventListener(
      "admin-notification",
      handleNotification
    );

    return () => {
      window.removeEventListener(
        "admin-auth-changed",
        syncAuthStatus
      );

      window.removeEventListener(
        "user-auth-changed",
        syncAuthStatus
      );

      window.removeEventListener(
        "storage",
        syncAuthStatus
      );

      window.removeEventListener(
        "admin-notification",
        handleNotification
      );
    };
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("nsfi_user_email");
    window.localStorage.removeItem("nsfi_user_name");
    window.localStorage.removeItem("nsfi_user_dob");
    window.sessionStorage.removeItem("nsfi_user_email");

    window.dispatchEvent(
      new Event("user-auth-changed")
    );

    closeMenu();

    navigate("/");
  };

  const isUserLoggedIn = Boolean(userEmail);

return (
  <>
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-[100] w-full shrink-0 border-b border-slate-200 bg-white shadow-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => handleNavigate("/")}
          className="flex items-center gap-4"
        >
          <motion.img
            
            src={logo}
            alt="NSFI"
            className="h-20"
          />

          <div>
            <h2 className="text-2xl font-black text-[#241A8B]">
              NSFI
            </h2>

            <p className="text-sm text-gray-500">
              Forging Future-Ready Talent
            </p>
          </div>
        </motion.button>

        {/* Desktop Menu */}

        <div className="hidden items-center gap-8 md:flex">

          <button
            onClick={() => handleNavigate("/about")}
            className="font-semibold transition-colors duration-200 hover:text-orange-500"
          >
            About
          </button>

          <button
            onClick={() => handleNavigate("/programs")}
            className="font-semibold transition-colors duration-200 hover:text-orange-500"
          >
            Programs
          </button>

          <button
            onClick={() => handleNavigate("/faqs")}
            className="font-semibold transition-colors duration-200 hover:text-orange-500"
          >
            FAQs
          </button>

          <button
            onClick={() => handleNavigate("/learn")}
            className="font-semibold transition-colors duration-200 hover:text-orange-500"
          >
            Free Resources
          </button>

            {/* <button
            onClick={() => handleNavigate("/contact")}
            className="font-semibold transition-colors duration-200 hover:text-orange-500"
          >
            Contact
          </button> */}

          {/* <div className="group relative"> */}

            {/* <button className="font-semibold transition-colors duration-200 hover:text-orange-500">
              Menu ▼
            </button> */}

            {/* <div className="invisible absolute left-0 mt-4 w-64 rounded-3xl border border-white/30 bg-white/90 p-3 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:visible group-hover:opacity-100"> */}

              {/* <button
                onClick={() => handleNavigate("/track")}
                className="block w-full rounded-xl px-4 py-3 text-left transition hover:bg-indigo-50 hover:pl-6"
              >
                Track
              </button> */}

              {/* <button
                onClick={() => handleNavigate("/contact")}
                className="block w-full rounded-xl px-4 py-3 text-left transition hover:bg-indigo-50 hover:pl-6"
              >
                Contact Us
              </button> */}

              {/* <button
                onClick={() => handleNavigate("/partner/companies")}
                className="block w-full rounded-xl px-4 py-3 text-left transition hover:bg-indigo-50 hover:pl-6"
              >
                Companies
              </button> */}

              {/* <button
                onClick={() => handleNavigate("/partner/colleges")}
                className="block w-full rounded-xl px-4 py-3 text-left transition hover:bg-indigo-50 hover:pl-6"
              >
                Colleges
              </button> */}

              {/* <button
                onClick={() => handleNavigate("/partner/schools")}
                className="block w-full rounded-xl px-4 py-3 text-left transition hover:bg-indigo-50 hover:pl-6"
              >
                Schools
              </button>

              <button
                onClick={() => handleNavigate("/partner/institutes")}
                className="block w-full rounded-xl px-4 py-3 text-left transition hover:bg-indigo-50 hover:pl-6"
              >
                Institutes
              </button> */}

              {/* <button
                onClick={() => handleNavigate("/#contact")}
                className="block w-full rounded-xl px-4 py-3 text-left transition hover:bg-indigo-50 hover:pl-6"
              >
                Contact
              </button> */}

              {isAdminRoute && isAdminAuthorized && (
                <button
                  onClick={() => handleNavigate("/admin")}
                  className="mt-2 block w-full rounded-xl bg-indigo-100 px-4 py-3 text-left font-bold text-[#241A8B]"
                >
                  Admin Dashboard
                </button>
              )}

            {/* </div> */}

          {/* </div> */}

        </div>

        {/* Right Side */}

        <div className="hidden items-center gap-3 md:flex">

          {isUserLoggedIn ? (
            <>
              <button
                onClick={() => handleNavigate("/profile")}
                className="rounded-full border border-[#241A8B] px-5 py-2 font-semibold text-[#241A8B] transition-all hover:-translate-y-1 hover:bg-[#241A8B] hover:text-white"
              >
                {userName ? `Hi, ${userName}` : "Profile"}
              </button>

              <button
                onClick={handleLogout}
                className="rounded-full border px-5 py-2 font-semibold transition-all hover:-translate-y-1 hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavigate("/login")}
                className="rounded-full border border-[#241A8B] px-5 py-2 font-semibold text-[#241A8B] transition-all hover:-translate-y-1 hover:bg-[#241A8B] hover:text-white"
              >
                Login
              </button>

              <button
                onClick={() => handleNavigate("/signup")}
                className="rounded-full border px-5 py-2 font-semibold transition-all hover:-translate-y-1"
              >
                Sign Up
              </button>
            </>
          )}

          <motion.button
            whileHover={{
              scale: 1.05,
              y: -3,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigate("/contact")}
            className="rounded-full bg-gradient-to-r from-[#241A8B] to-indigo-700 px-6 py-3 font-semibold text-white shadow-xl"
          >
            Contact Us
          </motion.button>

        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-xl border px-4 py-2 md:hidden"
        >
          ☰
        </button>

      </div>
          </motion.nav>
<AnimatePresence>
  {isMenuOpen && (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -25 }}
      transition={{ duration: 0.3 }}
      className="md:hidden border-t bg-white/95 backdrop-blur-xl shadow-xl"
    >
      <div className="space-y-2 p-5">

        <button
          onClick={() => handleNavigate("/")}
          className="block w-full rounded-xl px-5 py-4 text-left font-medium transition hover:bg-indigo-50"
        >
          🏠 Home
        </button>

        <button
          onClick={() => handleNavigate("/#about")}
          className="block w-full rounded-xl px-5 py-4 text-left font-medium transition hover:bg-indigo-50"
        >
          📖 About
        </button>

        <button
          onClick={() => handleNavigate("/programs")}
          className="block w-full rounded-xl px-5 py-4 text-left font-medium transition hover:bg-indigo-50"
        >
          🎓 Programs
        </button>

        <button
          onClick={() => handleNavigate("/faqs")}
          className="block w-full rounded-xl px-5 py-4 text-left font-medium transition hover:bg-indigo-50"
        >
          ❓ FAQs
        </button>

        <button
          onClick={() => handleNavigate("/learn")}
          className="block w-full rounded-xl px-5 py-4 text-left font-medium transition hover:bg-indigo-50"
        >
          📚 Free Resources
        </button>

        <button
          onClick={() => handleNavigate("/#contact")}
          className="block w-full rounded-xl px-5 py-4 text-left font-medium transition hover:bg-indigo-50"
        >
          📞 Contact
        </button>

        {isAdminRoute && isAdminAuthorized && (
          <button
            onClick={() => handleNavigate("/admin")}
            className="block w-full rounded-xl bg-indigo-100 px-5 py-4 text-left font-bold text-[#241A8B]"
          >
            👨‍💼 Admin Dashboard
          </button>
        )}

        <hr className="my-3" />

        {isUserLoggedIn ? (
          <>
            <button
              onClick={() => handleNavigate("/profile")}
              className="block w-full rounded-xl border border-[#241A8B] px-5 py-4 text-left font-semibold text-[#241A8B]"
            >
              👤 {userName ? `Hi, ${userName}` : "Profile"}
            </button>

            <button
              onClick={handleLogout}
              className="block w-full rounded-xl border px-5 py-4 text-left font-semibold hover:bg-red-500 hover:text-white"
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleNavigate("/login")}
              className="block w-full rounded-xl border border-[#241A8B] px-5 py-4 text-left font-semibold text-[#241A8B]"
            >
              🔐 Login
            </button>

            <button
              onClick={() => handleNavigate("/signup")}
              className="block w-full rounded-xl border px-5 py-4 text-left font-semibold"
            >
              ✨ Sign Up
            </button>
          </>
        )}

      </div>
    </motion.div>
  )}
</AnimatePresence>

<AnimatePresence>
  {showToast && notifications[0] && (
    <motion.div
      initial={{ opacity: 0, x: 120, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 120 }}
      transition={{ duration: 0.35 }}
      className="fixed right-6 top-24 z-[100] w-96 rounded-3xl border border-green-200 bg-white/90 p-5 shadow-2xl backdrop-blur-xl"
    >
      <div className="flex items-start gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
          ✅
        </div>

        <div className="flex-1">

          <h3 className="font-bold text-[#241A8B]">
            {notifications[0].title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            {notifications[0].message}
          </p>

        </div>

        <button
          onClick={() => setShowToast(false)}
          className="text-xl text-gray-400 transition hover:text-red-500"
        >
          ×
        </button>

      </div>
    </motion.div>
  )}
</AnimatePresence>

  </>
);

};

export default Navbar;
