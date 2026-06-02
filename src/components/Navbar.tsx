import logo from "../assets/nsfi-logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
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
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium text-sm tracking-wide">
          <li onClick={() => navigate("/")} className="hover:text-[#241A8B] transition cursor-pointer list-none">Home</li>
          <li className="hover:text-[#241A8B] transition cursor-pointer list-none">About</li>
          <li onClick={() => navigate("/programs")} className="hover:text-[#241A8B] transition cursor-pointer list-none">Programs</li>
          <li onClick={() => navigate("/track")} className="hover:text-[#241A8B] transition cursor-pointer list-none">Track</li>

          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-[#241A8B] transition cursor-pointer">
              Partnership
              <span className="text-xs">▾</span>
            </button>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-0 mt-3 w-56 rounded-none bg-white text-sm shadow-2xl ring-1 ring-black/10">
              <button onClick={() => navigate("/partner/companies")} className="w-full text-left px-5 py-3 hover:bg-[#f5f5ff]">Companies</button>
              <button onClick={() => navigate("/partner/colleges")} className="w-full text-left px-5 py-3 hover:bg-[#f5f5ff]">Colleges</button>
              <button onClick={() => navigate("/partner/schools")} className="w-full text-left px-5 py-3 hover:bg-[#f5f5ff]">Schools</button>
              <button onClick={() => navigate("/partner/institutes")} className="w-full text-left px-5 py-3 hover:bg-[#f5f5ff]">Institutes</button>
            </div>
          </div>

          <li className="hover:text-[#241A8B] transition cursor-pointer list-none">Contact</li>
        </div>

        <button onClick={() => navigate("/partner")} className="bg-[#241A8B] text-white px-5 py-2 rounded-none font-semibold text-sm tracking-wide hover:bg-[#1a1466] transition">
          Partner With Us
        </button>

      </div>
    </nav>
  );
};

export default Navbar;