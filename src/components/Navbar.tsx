import { useEffect, useState } from "react";
import logo from "../assets/nsfi-logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isAdminAuthorized, setIsAdminAuthorized] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("nsfi_admin_authorized") === "true";
  });
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("nsfi_user_email");
  });
  const [userName, setUserName] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem("nsfi_user_name");
  });

  const [notifications, setNotifications] = useState<{ id: number; title: string; message: string }[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const handleNavigate = (path: string) => {
    closeMenu();
    navigate(path);
  };

  useEffect(() => {
    const syncAuthStatus = () => {
      setIsAdminAuthorized(window.localStorage.getItem("nsfi_admin_authorized") === "true");
      setUserEmail(window.localStorage.getItem("nsfi_user_email"));
      setUserName(window.localStorage.getItem("nsfi_user_name"));
    };

    syncAuthStatus();
    window.addEventListener("admin-auth-changed", syncAuthStatus);
    window.addEventListener("user-auth-changed", syncAuthStatus);
    window.addEventListener("storage", syncAuthStatus);

    const handleNotification = (event: Event) => {
      const customEvent = event as CustomEvent<{ title: string; message: string }>;
      const payload = customEvent.detail;
      if (!payload) return;

      const id = Date.now();
      setNotifications((prev) => [
        { id, title: payload.title, message: payload.message },
        ...prev,
      ].slice(0, 5));
      setShowToast(true);
    };

    window.addEventListener("admin-notification", handleNotification);

    return () => {
      window.removeEventListener("admin-auth-changed", syncAuthStatus);
      window.removeEventListener("user-auth-changed", syncAuthStatus);
      window.removeEventListener("storage", syncAuthStatus);
      window.removeEventListener("admin-notification", handleNotification);
    };
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("nsfi_user_email");
      window.localStorage.removeItem("nsfi_user_name");
      window.localStorage.removeItem("nsfi_user_dob");
      window.dispatchEvent(new Event("user-auth-changed"));
    }
    closeMenu();
    navigate("/");
  };

  const isUserLoggedIn = Boolean(userEmail);

  return (
    <>
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">

        <button
          type="button"
          onClick={() => handleNavigate("/")}
          className="flex items-center gap-3 cursor-pointer text-left"
          aria-label="Go to home page"
        >
          <img
            src={logo}
            alt="NSFI Logo"
            className="h-20"
          />

          <div>
            <h2 className="font-bold text-[#241A8B] text-xl tracking-tight">
              NSFI
            </h2>

            <p className="text-xs text-gray-500 font-light">
              Forging Future-Ready Talent
            </p>
          </div>
        </button>

        <div className="hidden md:flex flex-wrap items-center gap-4 font-medium text-sm tracking-wide">
          <button onClick={() => handleNavigate("/")} className="hover:text-[#241A8B] transition cursor-pointer list-none py-1">Home</button>
          <button onClick={() => handleNavigate("/#about")} className="hover:text-[#241A8B] transition cursor-pointer list-none py-1">About</button>
          <button onClick={() => handleNavigate("/programs")} className="hover:text-[#241A8B] transition cursor-pointer list-none py-1">Programs</button>

          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#241A8B] transition cursor-pointer py-1">
              Menu
              <span className="text-xs">▾</span>
            </button>
            <div className="hidden invisible opacity-0 group-hover:block group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 absolute left-0 mt-3 w-56 rounded-none bg-white text-sm shadow-2xl ring-1 ring-black/10 pointer-events-none z-50">
              <button onClick={() => handleNavigate("/track")} className="w-full text-left px-5 py-3 hover:bg-[#f5f5ff]">Track</button>
              <button onClick={() => handleNavigate("/learn")} className="w-full text-left px-5 py-3 hover:bg-[#f5f5ff]">Learn</button>
              <div className="border-t border-slate-100" />
              <button onClick={() => handleNavigate("/partner/companies")} className="w-full text-left px-5 py-3 hover:bg-[#f5f5ff]">Companies</button>
              <button onClick={() => handleNavigate("/partner/colleges")} className="w-full text-left px-5 py-3 hover:bg-[#f5f5ff]">Colleges</button>
              <button onClick={() => handleNavigate("/partner/schools")} className="w-full text-left px-5 py-3 hover:bg-[#f5f5ff]">Schools</button>
              <button onClick={() => handleNavigate("/partner/institutes")} className="w-full text-left px-5 py-3 hover:bg-[#f5f5ff]">Institutes</button>
              <div className="border-t border-slate-100" />
              <button onClick={() => handleNavigate("/partner")} className="w-full text-left px-5 py-3 hover:bg-[#f5f5ff]">Partner With Us</button>
              <button onClick={() => handleNavigate("/#contact")} className="w-full text-left px-5 py-3 hover:bg-[#f5f5ff]">Contact</button>
              {isAdminAuthorized && (
                <>
                  <div className="border-t border-slate-100" />
                  <button onClick={() => handleNavigate("/admin")} className="w-full text-left px-5 py-3 text-[#241A8B] font-semibold hover:bg-[#f5f5ff]">Admin</button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="inline-flex items-center rounded-none border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition md:hidden"
          >
            Menu
          </button>

          <div className="hidden md:flex items-center gap-2">
            {isUserLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={() => handleNavigate("/profile")}
                  className="rounded-none border border-[#241A8B] px-4 py-2 text-sm font-semibold text-[#241A8B] hover:bg-[#241A8B] hover:text-white transition"
                >
                  {userName ? `Hi, ${userName}` : "Profile"}
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-none border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleNavigate("/login")}
                  className="rounded-none border border-[#241A8B] px-4 py-2 text-sm font-semibold text-[#241A8B] hover:bg-[#241A8B] hover:text-white transition"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate("/signup")}
                  className="rounded-none border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  Sign up
                </button>
              </>
            )}

            <button onClick={() => handleNavigate("/partner")} className="bg-[#241A8B] text-white px-5 py-2 rounded-none font-semibold text-sm tracking-wide hover:bg-[#1a1466] transition">
              Partner With Us
            </button>
          </div>
        </div>

        <div className={`md:hidden w-full ${isMenuOpen ? "block" : "hidden"} mt-4 rounded-none border-t border-gray-200 bg-white p-4`}> 
          <div className="grid gap-3 text-sm font-medium">
            <button onClick={() => handleNavigate("/")} className="w-full text-left rounded-none px-4 py-3 text-gray-700 hover:bg-gray-100">Home</button>
            <button onClick={() => handleNavigate("/#about")} className="w-full text-left rounded-none px-4 py-3 text-gray-700 hover:bg-gray-100">About</button>
            <button onClick={() => handleNavigate("/programs")} className="w-full text-left rounded-none px-4 py-3 text-gray-700 hover:bg-gray-100">Programs</button>
            <button onClick={() => handleNavigate("/track")} className="w-full text-left rounded-none px-4 py-3 text-gray-700 hover:bg-gray-100">Track</button>
            <button onClick={() => handleNavigate("/learn")} className="w-full text-left rounded-none px-4 py-3 text-gray-700 hover:bg-gray-100">Learn</button>
            <button onClick={() => handleNavigate("/partner")} className="w-full text-left rounded-none px-4 py-3 text-gray-700 hover:bg-gray-100">Partner With Us</button>
            <button onClick={() => handleNavigate("/partner/companies")} className="w-full text-left rounded-none px-4 py-3 text-gray-700 hover:bg-gray-100">Companies</button>
            <button onClick={() => handleNavigate("/partner/colleges")} className="w-full text-left rounded-none px-4 py-3 text-gray-700 hover:bg-gray-100">Colleges</button>
            <button onClick={() => handleNavigate("/partner/schools")} className="w-full text-left rounded-none px-4 py-3 text-gray-700 hover:bg-gray-100">Schools</button>
            <button onClick={() => handleNavigate("/partner/institutes")} className="w-full text-left rounded-none px-4 py-3 text-gray-700 hover:bg-gray-100">Institutes</button>
            <button onClick={() => handleNavigate("/#contact")} className="w-full text-left rounded-none px-4 py-3 text-gray-700 hover:bg-gray-100">Contact</button>
            {isAdminAuthorized ? (
              <>
                <button onClick={() => handleNavigate("/admin")} className="w-full text-left rounded-none px-4 py-3 text-[#241A8B] font-semibold hover:bg-gray-100">Admin</button>
              </>
            ) : null}
            {isUserLoggedIn ? (
              <>
                <button onClick={() => handleNavigate("/profile")} className="w-full text-left rounded-none px-4 py-3 text-[#241A8B] font-semibold hover:bg-gray-100">Profile</button>
                <button onClick={handleLogout} className="w-full text-left rounded-none px-4 py-3 text-gray-700 hover:bg-gray-100">Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => handleNavigate("/login")} className="w-full text-left rounded-none px-4 py-3 text-[#241A8B] font-semibold hover:bg-gray-100">Login</button>
                <button onClick={() => handleNavigate("/signup")} className="w-full text-left rounded-none px-4 py-3 text-gray-700 hover:bg-gray-100">Sign up</button>
              </>
            )}
          </div>
        </div>

      </div>
    </nav>

    {showToast && notifications[0] && (
      <div className="fixed top-5 right-5 z-50 max-w-sm rounded-xl border border-orange-200 bg-white p-4 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[#241A8B]">{notifications[0].title}</p>
            <p className="mt-1 text-sm text-gray-600">{notifications[0].message}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowToast(false);
            }}
            className="text-xs font-semibold text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    )}
    </>
  );
};

export default Navbar;