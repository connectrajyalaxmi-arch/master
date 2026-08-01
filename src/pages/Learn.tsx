import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import learnImg from "../assets/Learn.jpeg";

import {
  FiArrowRight,
  FiBook,
  FiSearch,
  FiClock,
  FiExternalLink,
  FiCode,
  FiDatabase,
  FiTool,
  FiMonitor,
  FiCheckCircle,
} from "react-icons/fi";

const resources = [
  {
    title: "HTML",
    icon: "🌐",
    description:
      "Learn the structure and semantic foundation of modern web pages.",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    category: "Frontend",
    difficulty: "Beginner",
    duration: "2 Hours",
    color: "from-orange-500 to-red-400",
  },
  {
    title: "CSS",
    icon: "🎨",
    description:
      "Master responsive layouts, animations, flexbox, grid and modern UI.",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    category: "Frontend",
    difficulty: "Beginner",
    duration: "4 Hours",
    color: "from-sky-500 to-cyan-400",
  },
  {
    title: "JavaScript",
    icon: "⚡",
    description:
      "Understand modern JavaScript from fundamentals to ESNext features.",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    category: "Frontend",
    difficulty: "Intermediate",
    duration: "8 Hours",
    color: "from-yellow-400 to-orange-400",
  },
  {
    title: "React",
    icon: "⚛️",
    description:
      "Build fast and interactive user interfaces using React.",
    url: "https://react.dev/",
    category: "Frontend",
    difficulty: "Intermediate",
    duration: "10 Hours",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "TypeScript",
    icon: "🔷",
    description:
      "Write scalable and maintainable applications with TypeScript.",
    url: "https://www.typescriptlang.org/docs/",
    category: "Frontend",
    difficulty: "Intermediate",
    duration: "8 Hours",
    color: "from-blue-600 to-indigo-600",
  },
  {
    title: "Node.js",
    icon: "🟢",
    description:
      "Develop high-performance backend applications with Node.js.",
    url: "https://nodejs.org/en/docs",
    category: "Backend",
    difficulty: "Intermediate",
    duration: "8 Hours",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Express.js",
    icon: "🚀",
    description:
      "Build REST APIs and scalable backend services using Express.",
    url: "https://expressjs.com/",
    category: "Backend",
    difficulty: "Intermediate",
    duration: "5 Hours",
    color: "from-slate-500 to-gray-700",
  },
  {
    title: "MongoDB",
    icon: "🍃",
    description:
      "Learn NoSQL database design and development with MongoDB.",
    url: "https://www.mongodb.com/docs/",
    category: "Database",
    difficulty: "Intermediate",
    duration: "6 Hours",
    color: "from-green-600 to-lime-500",
  },
  {
    title: "Git",
    icon: "🐙",
    description:
      "Track changes and collaborate efficiently using Git.",
    url: "https://git-scm.com/doc",
    category: "Tools",
    difficulty: "Beginner",
    duration: "2 Hours",
    color: "from-red-500 to-orange-500",
  },
  {
    title: "GitHub",
    icon: "💻",
    description:
      "Host projects, collaborate with teams and contribute to open source.",
    url: "https://docs.github.com/",
    category: "Tools",
    difficulty: "Beginner",
    duration: "2 Hours",
    color: "from-gray-700 to-black",
  },
];

const categories = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Tools",
];

const Learn = () => {

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const filteredResources = useMemo(() => {

    return resources.filter((item) => {

      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;

    });

  }, [search, category]);

  return (

    <>

      <Navbar />

      <div className="relative isolate overflow-hidden bg-[#f7f8ff]">

        {/* Background */}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[radial-gradient(circle_at_top_left,_#e0e7ff_0,_transparent_30%),radial-gradient(circle_at_85%_35%,_#ffedd5_0,_transparent_25%),linear-gradient(135deg,_#f8faff_0%,_#ffffff_45%,_#f5f3ff_100%)]"
        >

          <div className="absolute -left-40 top-[28%] h-[34rem] w-[34rem] rounded-full bg-indigo-300/35 blur-3xl" />

          <div className="absolute -right-36 top-[47%] h-[30rem] w-[30rem] rounded-full bg-orange-300/30 blur-3xl" />

          <div className="absolute bottom-[8%] left-[38%] h-80 w-80 rotate-45 rounded-[5rem] border border-indigo-200/60 bg-white/30 shadow-[0_35px_90px_rgba(79,70,229,.12)] backdrop-blur-sm" />

          <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(#241A8B_1px,transparent_1px),linear-gradient(to_right,#241A8B_1px,transparent_1px)] bg-[size:64px_64px]" />

        </div>
                {/* =========================================================
              HERO SECTION
        ========================================================= */}

        <section className="relative overflow-hidden bg-[#0B0D5C] text-white">
          <div className="absolute inset-0">
            <img src={learnImg} alt="Learning resources and study materials" className="h-full w-full object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D5C]/95 via-[#241A8B]/80 to-[#241A8B]/30" />
            <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(to_right,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6 py-14 lg:py-16">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <span className="inline-flex rounded-full border border-orange-300/40 bg-[#0B0D5C]/60 px-5 py-2 text-sm font-black tracking-[0.18em] text-orange-200 backdrop-blur">LEARN WITH NSFI</span>
              <h1 className="mt-6 text-5xl font-black leading-tight md:text-6xl">Explore. <span className="text-orange-400">Learn.</span><br />Grow Your Skills.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-indigo-100 md:text-xl">Discover practical, trusted learning resources to build your confidence in technology, tools, and career-ready skills.</p>
              <button
                type="button"
                onClick={() => document.getElementById("resources")?.scrollIntoView({ behavior: "smooth" })}
                className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-orange-500 px-7 py-4 font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-orange-400"
              >
                Explore Resources <FiArrowRight />
              </button>
            </motion.div>
          </div>

        </section>

        <div
          aria-hidden="true"
          className="relative z-10 mx-auto h-px w-[calc(100%-3rem)] max-w-6xl bg-gradient-to-r from-transparent via-orange-400/70 to-transparent"
        />
                {/* =========================================================
              LEARNING RESOURCES
        ========================================================= */}

        <section
          id="resources"
          className="relative overflow-hidden border-y border-indigo-100/80 bg-white/80 py-24 backdrop-blur-sm"
        >
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-[48px] border border-white/80 bg-white/70 p-5 shadow-[0_30px_90px_rgba(36,26,139,.12)] backdrop-blur-sm md:p-8 lg:p-10">
            <div className="mx-auto max-w-5xl rounded-[36px] border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-orange-50 p-6 shadow-[0_20px_60px_rgba(36,26,139,.12)] md:p-10">
              <div className="text-center">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-orange-500">Resource Finder</span>
                <h2 className="mt-3 text-3xl font-black text-[#241A8B] md:text-4xl">Search Technologies</h2>
                <p className="mt-3 text-slate-600">Find a resource that matches the skill you want to build next.</p>
              </div>

            <div className="mx-auto mt-8 max-w-4xl">

              <div className="relative">

                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl text-gray-400" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search technologies..."
                  className="w-full rounded-3xl border border-gray-200 bg-white py-5 pl-16 pr-6 text-lg shadow-xl outline-none transition-all duration-300 focus:border-[#241A8B] focus:ring-4 focus:ring-indigo-100"
                />

              </div>

            </div>

            {/* Filters */}

            <div className="mt-10 flex flex-wrap justify-center gap-4">

              {categories.map((item) => (

                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 ${
                    category === item
                      ? "bg-[#241A8B] text-white shadow-xl"
                      : "border bg-white hover:bg-indigo-50"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

            {/* Counter */}

            <div className="mt-10 text-center">

              <p className="font-semibold text-gray-500">

                Showing

                <span className="mx-2 font-bold text-[#241A8B]">

                  {filteredResources.length}

                </span>

                technologies

              </p>

            </div>

            </div>

            {/* Cards */}

            <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

              {filteredResources.map((item, index) => (

                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 70 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: .6,
                    delay: index * .08,
                  }}
                >

                  <Tilt
                    glareEnable
                    glareMaxOpacity={0.25}
                    scale={1.03}
                  >

                    <div className="group relative overflow-hidden rounded-[32px] border border-white bg-white/90 p-8 shadow-xl backdrop-blur transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_70px_rgba(36,26,139,.18)]">

                      {/* Gradient */}

                      <div className={`absolute right-0 top-0 h-36 w-36 rounded-full bg-gradient-to-br ${item.color} opacity-10 blur-3xl transition duration-500 group-hover:scale-150`} />

                      {/* Icon */}

                      <div className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${item.color} text-4xl shadow-xl`}>

                        {item.icon}

                      </div>

                      {/* Title */}

                      <h3 className="mt-7 text-3xl font-black text-[#241A8B]">

                        {item.title}

                      </h3>

                      {/* Category */}

                      <span className="mt-3 inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-[#241A8B]">

                        {item.category}

                      </span>

                      {/* Description */}

                      <p className="mt-6 leading-8 text-gray-600">

                        {item.description}

                      </p>

                      {/* Info */}

                      <div className="mt-8 flex items-center justify-between">

                        <div className="flex items-center gap-2 text-sm font-semibold text-orange-500">

                          <FiBook />

                          {item.difficulty}

                        </div>

                        <div className="flex items-center gap-2 text-sm font-semibold text-green-600">

                          <FiClock />

                          {item.duration}

                        </div>

                      </div>

                      {/* Badge */}

                      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-600">

                        <FiCheckCircle />

                        Official Documentation

                      </div>

                      {/* Button */}

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-[#241A8B] px-6 py-4 font-bold text-white transition-all duration-300 hover:bg-orange-500"
                      >

                        Visit Documentation

                        <FiExternalLink />

                      </a>

                    </div>

                  </Tilt>

                </motion.div>

              ))}

            </div>

            {/* Empty State */}

            {filteredResources.length === 0 && (

              <div className="py-24 text-center">

                <FiSearch className="mx-auto text-6xl text-gray-300" />

                <h3 className="mt-6 text-3xl font-bold text-[#241A8B]">

                  No technologies found

                </h3>

                <p className="mt-4 text-gray-500">

                  Try searching with another keyword or choose a different category.

                </p>

              </div>

            )}

          </div>

          </div>

        </section>
                {/* =========================================================
              LEARNING ROADMAP
        ========================================================= */}

      
                {/* =========================================================
              WHY LEARN FROM OFFICIAL DOCUMENTATION
        ========================================================= */}

        <section className="relative overflow-hidden border-y border-indigo-100/80 bg-white py-24">

          <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />

          <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-6">

            {/* Heading */}

            <div className="text-center">

              <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-5 py-2 text-sm font-bold uppercase tracking-widest text-[#241A8B]">

                WHY OFFICIAL DOCS

              </span>

              <h2 className="mt-6 text-4xl font-black text-[#241A8B] md:text-5xl">

                Learn From The Source

              </h2>

              <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-orange-400 to-indigo-600" />

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-gray-600">

                Official documentation is written and maintained by the teams
                who build these technologies. It provides the latest features,
                best practices, and accurate implementation guidance.

              </p>

            </div>

            {/* Feature Cards */}

            <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

              {[
                {
                  icon: "🚀",
                  title: "Always Updated",
                  description:
                    "Access the newest features, improvements, and documentation directly from the technology creators.",
                  color: "from-orange-500 to-red-500",
                },
                {
                  icon: "✔️",
                  title: "Trusted Source",
                  description:
                    "Learn using official guides instead of outdated tutorials or unofficial references.",
                  color: "from-indigo-600 to-blue-500",
                },
                {
                  icon: "💼",
                  title: "Industry Standard",
                  description:
                    "Professional developers rely on official documentation every day while building software.",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: "📚",
                  title: "Real Examples",
                  description:
                    "Discover practical examples, sample code, and implementation patterns used in real projects.",
                  color: "from-cyan-500 to-sky-500",
                },
                {
                  icon: "⚡",
                  title: "Better Learning",
                  description:
                    "Develop deeper understanding by learning concepts directly from their original documentation.",
                  color: "from-yellow-400 to-orange-400",
                },
                {
                  icon: "🎯",
                  title: "Career Ready",
                  description:
                    "Build knowledge that aligns with modern development practices used across the industry.",
                  color: "from-violet-600 to-fuchsia-500",
                },
              ].map((feature, index) => (

                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: .6,
                    delay: index * .08,
                  }}
                >

                  <Tilt
                    glareEnable
                    glareMaxOpacity={0.25}
                    scale={1.03}
                  >

                    <div className="group relative overflow-hidden rounded-[32px] border border-white bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(36,26,139,.18)]">

                      <div className={`absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-br ${feature.color} opacity-10 blur-3xl transition duration-500 group-hover:scale-150`} />

                      <div className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${feature.color} text-4xl shadow-lg`}>

                        {feature.icon}

                      </div>

                      <h3 className="mt-8 text-2xl font-black text-[#241A8B]">

                        {feature.title}

                      </h3>

                      <p className="mt-5 leading-8 text-gray-600">

                        {feature.description}

                      </p>

                    </div>

                  </Tilt>

                </motion.div>

              ))}

            </div>

            {/* Bottom Banner */}

            {/* <div className="mt-24 rounded-[36px] bg-gradient-to-r from-[#241A8B] via-[#3225a5] to-[#4b3ad7] p-10 text-white shadow-2xl">

              <div className="grid items-center gap-10 lg:grid-cols-3">

                <div>

                  <h3 className="text-3xl font-black">

                    Learn Smarter

                  </h3>

                  <p className="mt-4 leading-8 text-indigo-100">

                    Build strong fundamentals using trusted resources before
                    moving to advanced projects and frameworks.

                  </p>

                </div>

                <div className="text-center">

                  <h2 className="text-5xl font-black text-orange-300">

                    100%

                  </h2>

                  <p className="mt-2 text-indigo-100">

                    Official Resources

                  </p>

                </div>

                <div className="text-center">

                  <h2 className="text-5xl font-black text-orange-300">

                    Free

                  </h2>

                  <p className="mt-2 text-indigo-100">

                    Forever Accessible

                  </p>

                </div>

              </div>

            </div> */}

          </div>

        </section>
      </div>

      <Footer />

    </>

  );

};

export default Learn;
