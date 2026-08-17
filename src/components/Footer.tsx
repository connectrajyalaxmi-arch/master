import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from "../assets/nsfi-logo.png";

const exploreLinks = [
  { label: "About NSFI", to: "/about" },
  { label: "Programs", to: "/programs" },
  { label: "Free Resources", to: "/learn" },
  { label: "FAQs", to: "/faqs" },
];

const pathwayLinks = [
  { label: "For Students", to: "/students" },
  { label: "For Colleges", to: "/colleges" },
  { label: "For Organizations", to: "/organizations" },
  { label: "Contact Us", to: "/contact" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden bg-[#080b2d] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-indigo-600/20 blur-[110px]" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-orange-500/15 blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(to_right,#fff_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-10 lg:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden rounded-[32px] border border-white/15 bg-gradient-to-r from-[#241A8B] to-indigo-700 px-7 py-9 shadow-2xl md:px-10 lg:flex lg:items-center lg:justify-between lg:px-12"
        >
          <div className="absolute -right-10 -top-24 h-64 w-64 rounded-full bg-orange-400/25 blur-3xl" />
          <div className="relative max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-300">
              Start your journey
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              Build the skills that shape your future.
            </h2>
            <p className="mt-3 leading-7 text-indigo-100">
              Learn through industry-focused programs, practical projects, and expert guidance.
            </p>
          </div>

          <div className="relative mt-7 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:pl-8">
            <Link
              to="/programs"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-6 py-4 font-bold shadow-lg transition hover:-translate-y-0.5 hover:bg-orange-400"
            >
              Explore Programs <FiArrowUpRight />
            </Link>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-6 py-4 font-bold backdrop-blur transition hover:bg-white hover:text-[#241A8B]"
            >
              Create Account
            </Link>
          </div>
        </motion.div>

        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_0.9fr_1.2fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-4">
              <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-2 shadow-lg">
                <img src={logo} alt="NSFI logo" className="h-full w-full object-contain" />
              </span>
              <span>
                <span className="block text-3xl font-black">NSFI</span>
                <span className="mt-1 block text-sm font-semibold text-orange-300">
                  Forging Future-Ready Talent
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm leading-7 text-slate-300">
              National Skill Forge Institute connects education with industry through practical learning, recognized certifications, and career-focused opportunities.
            </p>

            <div className="mt-7 flex gap-3">
              <a
                href="https://www.linkedin.com/company/national-skillforge-institute/"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow NSFI on LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-lg transition hover:-translate-y-1 hover:border-[#0A66C2] hover:bg-[#0A66C2]"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://instagram.com/nsfi2025"
                target="_blank"
                rel="noreferrer"
                aria-label="Follow NSFI on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-lg transition hover:-translate-y-1 hover:border-pink-500 hover:bg-pink-500"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white">Explore</h3>
            <div className="mt-3 h-0.5 w-10 bg-orange-500" />
            <nav aria-label="Footer explore links" className="mt-6 space-y-4">
              {exploreLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-slate-300 transition hover:translate-x-1 hover:text-orange-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white">Pathways</h3>
            <div className="mt-3 h-0.5 w-10 bg-orange-500" />
            <nav aria-label="Footer pathway links" className="mt-6 space-y-4">
              {pathwayLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-slate-300 transition hover:translate-x-1 hover:text-orange-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white">Get in touch</h3>
            <div className="mt-3 h-0.5 w-10 bg-orange-500" />
            <div className="mt-6 space-y-5 text-slate-300">
              <a
                href="mailto:partnerships@nsfi.org.in"
                className="group flex items-start gap-3 transition hover:text-orange-300"
              >
                <FiMail className="mt-1 shrink-0 text-orange-400" />
                <span className="break-all">partnerships@nsfi.org.in</span>
              </a>
              <a
                href="tel:+919876543210"
                className="group flex items-start gap-3 transition hover:text-orange-300"
              >
                <FiPhone className="mt-1 shrink-0 text-orange-400" />
                <span>+91 98765 43210</span>
              </a>
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 shrink-0 text-orange-400" />
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="flex flex-col items-center justify-between gap-3 py-7 text-center text-sm text-slate-400 md:flex-row md:text-left">
          <p>© {year} National Skill Forge Institute. All rights reserved.</p>
          <p>
            Achieving excellence <span className="text-orange-400">together.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
