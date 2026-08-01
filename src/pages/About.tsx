import { motion } from "framer-motion";
import { useState } from "react";
import { FiUsers, FiAward, FiTrendingUp, FiTarget } from "react-icons/fi";
import aboutImg from "../assets/about.jpeg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const features = [
  {
    icon: <FiUsers size={30} />,
    title: "Industry Experts",
    text: "Practical insight from people who know the work.",
  },
  {
    icon: <FiAward size={30} />,
    title: "Recognized Certifications",
    text: "Credentials that make your progress visible.",
  },
  {
    icon: <FiTrendingUp size={30} />,
    title: "Career Growth",
    text: "Learning that helps you take the next step.",
  },
  {
    icon: <FiTarget size={30} />,
    title: "Outcome Focused",
    text: "Clear outcomes, built around real opportunity.",
  },
];

const heroValues = [
  { icon: <FiTarget size={30} />, title: "Empowering Individuals", text: "Building skills for a better future.", tone: "bg-orange-500" },
  { icon: <FiAward size={30} />, title: "Industry-Relevant Training", text: "Learn today, lead tomorrow.", tone: "bg-[#08255e]" },
  { icon: <FiUsers size={30} />, title: "Stronger Together", text: "Partnering for meaningful impact.", tone: "bg-emerald-600" },
];

const About = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <>
      <Navbar />
      {/* ================= HERO ================= */}

      <section className="relative isolate min-h-[780px] overflow-hidden bg-gradient-to-br from-[#fffdfa] via-white to-[#edf2ff] py-16 text-[#08255e] lg:min-h-[900px] lg:py-24">
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_15%_18%,rgba(255,255,255,.95),transparent_35%),radial-gradient(circle_at_35%_80%,rgba(218,225,255,.55),transparent_28%)]" />
        <div className="absolute right-0 top-24 hidden h-[68%] w-[48%] overflow-hidden rounded-bl-[45%] border-l-[14px] border-b-[14px] border-white lg:block">
          <img src={aboutImg} alt="Students learning together" className="h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08255e]/25 via-transparent to-transparent" />
          <div className="absolute left-[26%] top-16 border-l-4 border-orange-400 pl-5 text-3xl font-black leading-tight tracking-wide text-white drop-shadow-lg">LEARN<br />GROW<br />SUCCEED</div>
        </div>

        <div className="relative mx-auto max-w-[1800px] px-6 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl pt-5 lg:pt-10">
            <div className="flex items-center gap-4 text-orange-500">
              <span className="h-1 w-24 rounded-full bg-orange-500" />
              <span className="rounded-2xl bg-orange-500 px-7 py-3 text-xl font-black tracking-[0.12em] text-white shadow-lg">ABOUT US</span>
              <span className="h-1 w-24 rounded-full bg-orange-500" />
            </div>
            <h1 className="mt-10 text-6xl font-black leading-none tracking-tight text-[#08255e] sm:text-7xl lg:text-8xl">About NSFI</h1>
            <div className="mt-8 h-2 w-36 rounded-full bg-orange-500" />
            <p className="mt-8 max-w-xl text-xl font-medium leading-9 text-slate-700 lg:text-2xl lg:leading-10">At National Skill Forge Institute, we empower people and organizations with industry-relevant skills, knowledge, and real-world confidence.</p>
            <div className="mt-7 grid max-w-2xl gap-x-8 gap-y-3 text-sm font-bold text-[#08255e] sm:grid-cols-2 lg:grid-cols-3 lg:text-base">
              {[
                "Practical, applied learning",
                "Industry-aligned programs",
                "Career-focused guidance",
                "Recognized certifications",
                "Expert-led learning experiences",
                "Partnerships that create impact",
                "Internships and project exposure",
                "Leadership and communication skills",
                "Future-ready technology learning",
                "Inclusive learning for all",
                "Institutional capacity building",
                "Workforce transformation support",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">✓</span>{point}</div>
              ))}
            </div>
          </motion.div>

          <div className="relative z-10 mt-10 min-h-[240px] max-w-3xl overflow-hidden rounded-[28px] border border-white/90 bg-white/90 p-5 shadow-[0_22px_60px_rgba(8,37,94,.15)] backdrop-blur-xl lg:mt-12 lg:min-h-[285px] lg:p-7">
            <div className="grid h-full gap-5 sm:grid-cols-3 sm:divide-x sm:divide-slate-200">
              {heroValues.map((item) => (
                <div key={item.title} className="flex flex-col items-center justify-center px-3 text-center sm:px-5">
                  <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${item.tone} text-white shadow-lg`}>{item.icon}</div>
                  <h2 className="mt-4 text-lg font-black leading-6 text-[#08255e]">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-6 right-6 z-10 rounded-[28px] bg-gradient-to-r from-[#08255e] via-[#123b82] to-[#08255e] px-6 py-5 text-white shadow-2xl lg:left-16 lg:right-16 lg:px-10">
          <div className="flex flex-wrap items-center gap-4 text-lg lg:text-2xl"><span className="flex h-12 w-12 items-center justify-center rounded-full border border-orange-300 text-2xl text-orange-300">◎</span><strong className="text-orange-400">Our Vision:</strong><span>A skilled and empowered tomorrow for all.</span></div>
        </div>
      </section>

      {false && <>
      {/* ================= WHO WE ARE ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/70 to-orange-50/70 py-24">

        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-indigo-200/35 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-orange-200/35 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">

          <div className="grid items-center gap-16 lg:grid-cols-2">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: .6 }}
              viewport={{ once: true }}
            >

              <p className="font-semibold uppercase tracking-[0.3em] text-orange-500">
                WHO WE ARE
              </p>

              <h2 className="mt-4 text-5xl font-black text-[#241A8B]">
                Built for what comes next.
              </h2>

              <p className="mt-8 text-lg leading-8 text-gray-600">
                NSFI connects learning to real opportunity—helping students,
                institutions, and organizations build the skills that matter.
              </p>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: .6 }}
              viewport={{ once: true }}
              className="grid gap-6 sm:grid-cols-2"
            >

              {[
                {
                  emoji: "🚀",
                  title: "Industry Driven",
                  text: "Skills shaped by the real world.",
                },
                {
                  emoji: "🎯",
                  title: "Career Focused",
                  text: "Progress you can apply right away.",
                },
                {
                  emoji: "🤝",
                  title: "Collaborative",
                  text: "Learning made stronger together.",
                },
                {
                  emoji: "🌍",
                  title: "Future Ready",
                  text: "Ready for change, not just today.",
                },
              ].map((item) => (

                <div
                  key={item.title}
                  className="rounded-3xl border border-white/80 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-3xl">
                    {item.emoji}
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-[#241A8B]">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-600">
                    {item.text}
                  </p>

                </div>

              ))}

            </motion.div>

          </div>

        </div>

      </section>

      

      {/* ================= WHY CHOOSE NSFI ================= */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#eef2ff] via-white to-[#fff7ed] py-24">

        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">

          <div className="text-center">

            <p className="font-semibold uppercase tracking-[0.3em] text-orange-500">
              WHY CHOOSE NSFI
            </p>

            <h2 className="mt-4 text-5xl font-black text-[#241A8B]">
              Why learning with NSFI feels different
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Less theory. More momentum.
            </p>

          </div>

          <div className="mx-auto mt-16 max-w-4xl">
            <motion.div
              key={features[activeFeature].title}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-[36px] border border-white/80 bg-white/85 p-8 shadow-[0_25px_70px_rgba(36,26,139,.14)] backdrop-blur-sm md:p-12"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-orange-200/50 blur-3xl" />
              <div className="relative flex flex-col items-start gap-7 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-[#241A8B] to-indigo-500 text-white shadow-lg">
                  {features[activeFeature].icon}
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">0{activeFeature + 1} / 0{features.length}</p>
                  <h3 className="mt-3 text-3xl font-black text-[#241A8B] md:text-4xl">{features[activeFeature].title}</h3>
                  <p className="mt-4 max-w-xl text-lg leading-8 text-gray-600">{features[activeFeature].text}</p>
                </div>
              </div>
            </motion.div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button type="button" aria-label="Previous feature" onClick={() => setActiveFeature((current) => (current - 1 + features.length) % features.length)} className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-200 bg-white font-black text-[#241A8B] transition hover:bg-[#241A8B] hover:text-white">←</button>
              <div className="flex gap-2">
                {features.map((feature, index) => <button key={feature.title} type="button" aria-label={`Show ${feature.title}`} onClick={() => setActiveFeature(index)} className={`h-2.5 rounded-full transition-all ${activeFeature === index ? "w-8 bg-orange-500" : "w-2.5 bg-indigo-200 hover:bg-indigo-400"}`} />)}
              </div>
              <button type="button" aria-label="Next feature" onClick={() => setActiveFeature((current) => (current + 1) % features.length)} className="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-200 bg-white font-black text-[#241A8B] transition hover:bg-[#241A8B] hover:text-white">→</button>
            </div>
          </div>

        </div>

      </section>
      </>}
      <Footer />
    </>
  );
};

export default About;
