import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowRight,
} from "react-icons/fi";
import {
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
<footer className="relative mt-32 overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#241A8B] text-white">
      {/* Background Glow */}

      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-orange-500/20 blur-[120px]" />

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-indigo-400/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 lg:grid-cols-4">

          {/* About */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-black">
              NSFI
            </h2>

            <div className="mt-2 h-1 w-16 rounded-full bg-orange-500" />

            <p className="mt-6 leading-8 text-gray-300">
              National Skill Forge Institute empowers students,
              professionals, colleges and organizations with
              industry-ready skills, certifications and career
              opportunities.
            </p>
          </motion.div>

          {/* Quick Links */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: .1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold">
              Quick Links
            </h3>

            <div className="mt-2 h-1 w-12 rounded-full bg-orange-500" />

            <div className="mt-6 space-y-4">

              {[
                ["Home", "/"],
                ["Programs", "/programs"],
                ["Partner With Us", "/partner"],
                ["Track", "/track"],
                ["Contact", "/contact"],
              ].map(([name, path]) => (

                <button
                  key={name}
                  onClick={() => navigate(path)}
                  className="group flex items-center gap-2 text-gray-300 transition hover:text-orange-400"
                >
                  <FiArrowRight className="transition group-hover:translate-x-1" />
                  {name}
                </button>

              ))}

            </div>
          </motion.div>

          {/* Contact */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: .2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold">
              Contact
            </h3>

            <div className="mt-2 h-1 w-12 rounded-full bg-orange-500" />

            <div className="mt-6 space-y-5">

              <div className="flex gap-3">
                <FiMail className="mt-1 text-orange-400" />
                <span className="text-gray-300">
                  partnerships@nsfi.org.in
                </span>
              </div>

              <div className="flex gap-3">
                <FiPhone className="mt-1 text-orange-400" />
                <span className="text-gray-300">
                  +91 98765 43210
                </span>
              </div>

              <div className="flex gap-3">
                <FiMapPin className="mt-1 text-orange-400" />
                <span className="text-gray-300">
                  Hyderabad, Telangana, India
                </span>
              </div>

            </div>
          </motion.div>

          {/* Social */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: .3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold">
              Follow Us
            </h3>

            <div className="mt-2 h-1 w-12 rounded-full bg-orange-500" />

            <p className="mt-6 text-gray-300 leading-7">
              Stay connected for updates,
              workshops, internships,
              certifications and placements.
            </p>

            <div className="mt-8 flex gap-5">

              <motion.a
                whileHover={{
                  y: -5,
                  scale: 1.15,
                }}
                href="https://www.linkedin.com/company/national-skillforge-institute/"
                target="_blank"
                rel="noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl transition hover:bg-[#0A66C2]"
              >
                <FaLinkedin size={26} />
              </motion.a>

              <motion.a
                whileHover={{
                  y: -5,
                  scale: 1.15,
                }}
                href="https://instagram.com/nsfi2025"
                target="_blank"
                rel="noreferrer"
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl transition hover:bg-pink-500"
              >
                <FaInstagram size={26} />
              </motion.a>

            </div>
          </motion.div>

        </div>

        <div className="my-14 h-px bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">

          <p>
            © {new Date().getFullYear()} National Skill Forge Institute (NSFI). All Rights Reserved.
          </p>

          <p>
            Built with ❤️ for India's Future Workforce
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;