import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import {
  FiArrowRight,
  FiUsers,
  FiBookOpen,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";

import heroImage from "../assets/hero.jpg.jpeg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080b1a]">

      {/* Animated Background */}

      <motion.div
        animate={{
          x: [0, 100, -80, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.3, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
        }}
        className="absolute -left-20 top-20 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 100, -50, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
        }}
        className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-orange-500/20 blur-3xl"
      />

      {/* Background Image */}

      <motion.img
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8 }}
        src={heroImage}
        alt="Students"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#241A8B]/90 via-[#241A8B]/70 to-black/60" />

      {/* Announcement */}

      <motion.div
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-20 bg-orange-500 px-4 py-2 text-center text-xs font-semibold leading-5 text-white sm:py-3 sm:text-sm sm:leading-6 md:text-base"
      >
        National Skill Forge Institute — Empowering Students with Industry-Ready Skills
      </motion.div>

      <div className="relative z-20 mx-auto flex max-w-7xl items-center px-6 py-10 sm:min-h-[calc(100vh-48px)] sm:py-12 lg:py-16">

        <div className="grid w-full items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <motion.span
              whileHover={{ scale: 1.08 }}
              className="inline-flex max-w-full rounded-full bg-orange-500 px-4 py-2 text-center text-xs font-semibold leading-5 text-white shadow-lg sm:px-5 sm:text-sm"
            >
              🚀 India's Future Begins Here
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-4xl font-black leading-tight text-white sm:mt-8 sm:text-5xl md:text-7xl"
            >
              Build Skills.
              <br />
              Create Careers.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 max-w-xl text-lg leading-8 text-gray-200"
            >
              Unlock your potential with industry-focused programs,
              expert mentors, live projects, certifications and
              placement assistance designed for tomorrow's workforce.
            </motion.p>

            <div className="mt-10 flex flex-wrap gap-5">

              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/programs")}
                className="flex items-center gap-3 rounded-2xl bg-orange-500 px-8 py-4 font-bold text-white shadow-xl"
              >
                Explore Programs
                <FiArrowRight />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/contact")}
                className="rounded-2xl border-2 border-white px-8 py-4 font-bold text-white hover:bg-white hover:text-[#241A8B]"
              >
                Contact Us
              </motion.button>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="grid gap-6 sm:grid-cols-2"
          >

            {[
              {
                icon: <FiUsers className="text-5xl text-orange-400" />,
                number: "50K+",
                text: "Students Trained",
              },
              {
                icon: <FiBookOpen className="text-5xl text-orange-400" />,
                number: "200+",
                text: "Skill Programs",
              },
              {
                icon: <FiAward className="text-5xl text-orange-400" />,
                number: "96%",
                text: "Placement Support",
              },
              {
                icon: <FiTrendingUp className="text-5xl text-orange-400" />,
                number: "25+",
                text: "Industry Partners",
              },
            ].map((card, index) => (

              <Tilt
                key={index}
                glareEnable={true}
                glareMaxOpacity={0.3}
                scale={1.05}
                tiltMaxAngleX={12}
                tiltMaxAngleY={12}
              >

                <motion.div
                  whileHover={{
                    y: -10,
                  }}
                  className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-2xl"
                >

                  {card.icon}

                  <h2 className="mt-5 text-4xl font-black text-white">
                    {card.number}
                  </h2>

                  <p className="mt-2 text-gray-200">
                    {card.text}
                  </p>

                </motion.div>

              </Tilt>

            ))}

          </motion.div>

        </div>

      </div>

      {/* Scroll */}

      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >

        <div className="flex h-12 w-7 justify-center rounded-full border-2 border-white">

          <div className="mt-2 h-3 w-1 rounded-full bg-white"></div>

        </div>

      </motion.div>

    </section>
  );
};

export default Hero;
