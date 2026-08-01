import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import {
  FiArrowRight,
  FiBookOpen,
  FiHome,
  FiBriefcase,
  FiTrendingUp,
} from "react-icons/fi";

const Journey = () => {
  const navigate = useNavigate();

 return (
<section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pt-24 pb-40">    {/* Animated Background */}

    <motion.div
      animate={{
        x: [0, 80, -60, 0],
        y: [0, -60, 60, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 20,
      }}
      className="absolute left-0 top-20 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl"
    />

    <motion.div
      animate={{
        x: [0, -80, 100, 0],
        y: [0, 60, -60, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: 24,
      }}
      className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl"
    />

    <div className="relative mx-auto max-w-7xl px-6">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .7 }}
        viewport={{ once: true }}
        className="text-center"
      >

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
          CHOOSE YOUR JOURNEY
        </p>

        <h2 className="mt-4 text-5xl font-black text-[#241A8B]">
          We Have a Path for Everyone
        </h2>
      </motion.div>

<br/>
<br/>
<div className="mt-20 mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: "Students",
            icon: <FiBookOpen size={32} />,
            color: "bg-indigo-100 text-[#241A8B]",
            text: "Build practical skills through industry-focused courses, certifications, live projects and placement support.",
            button: "Explore Student Programs",
            path: "/students",
          },
          {
            title: "Colleges",
            icon: <FiHome size={32} />,
            color: "bg-orange-100 text-orange-500",
            text: "Partner with NSFI to deliver workshops, internships, placement training and industry-ready education.",
            button: "Explore College Solutions",
            path: "/colleges",
          },
          {
            title: "Organizations",
            icon: <FiBriefcase size={32} />,
            color: "bg-green-100 text-green-600",
            text: "Empower your workforce through customized corporate training and technical upskilling.",
            button: "Corporate Solutions",
            path: "/organizations",
          },
        ].map((item, index) => (

          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * .15,
              duration: .6,
            }}
            viewport={{ once: true }}
          >

            <Tilt
              glareEnable
              glareMaxOpacity={0.25}
              scale={1.04}
              tiltMaxAngleX={12}
              tiltMaxAngleY={12}
            >

              <div className="group rounded-[30px] border border-white bg-white/80 p-8 shadow-xl backdrop-blur transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.15,
                  }}
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
                >
                  {item.icon}
                </motion.div>

                <h3 className="mt-7 text-2xl font-black text-[#241A8B]">
                  {item.title}
                </h3>

                <p className="mt-5 leading-7 text-gray-600">
                  {item.text}
                </p>

                <button
                  onClick={() => navigate(item.path)}
                  className="mt-8 flex items-center gap-2 font-bold text-orange-500 transition-all duration-300 group-hover:gap-4"
                >
                  {item.button}
                  <FiArrowRight />
                </button>

              </div>

            </Tilt>

          </motion.div>

        ))}

      </div>

    </div>

  </section>

  
);
};

export default Journey;