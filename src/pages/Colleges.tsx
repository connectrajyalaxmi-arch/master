import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import collegeImg from "../assets/college.jpeg";

import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCheckCircle,
  FiChevronDown,
  FiHome,
  FiLayers,
  FiMapPin,
  FiSearch,
  FiTarget,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";

const Colleges = () => {
const navigate = useNavigate();
const [collegeSearch, setCollegeSearch] = useState("");
const [location, setLocation] = useState("");
const [collegeType, setCollegeType] = useState("");
const locations = [
  "All Locations",
  "Hyderabad",
  "Bengaluru",
  "Chennai",
  "Mumbai",
  "Delhi",
  "Pune",
  "Visakhapatnam",
];

const collegeTypes = [
  "All Types",
  "Engineering",
  "Degree",
  "MBA",
  "Pharmacy",
  "Polytechnic",
  "University",
];

const partnershipPrograms = [
  { title: "Industry-Integrated Training", programTitle: "Campus Recruitment Training", icon: <FiBriefcase size={30} />, tone: "from-indigo-600 to-violet-500", description: "Bridge academics and industry through practical, skill-based learning." },
  { title: "Faculty Development", programTitle: "Faculty Development Program", icon: <FiUsers size={30} />, tone: "from-orange-500 to-amber-400", description: "Empower faculty through workshops, certifications, and modern teaching methods." },
  { title: "Campus Skill Initiatives", programTitle: "Campus Recruitment Training", icon: <FiTarget size={30} />, tone: "from-cyan-600 to-sky-400", description: "Build structured initiatives that prepare students for industry expectations." },
  { title: "Placement Readiness", programTitle: "Campus Recruitment Training", icon: <FiTrendingUp size={30} />, tone: "from-pink-600 to-rose-400", description: "Strengthen employability with aptitude, resumes, and interview practice." },
  { title: "Industry Certifications", programTitle: "Campus Recruitment Training", icon: <FiAward size={30} />, tone: "from-emerald-600 to-teal-400", description: "Give students credentials that strengthen their profiles and opportunities." },
  { title: "Campus Workshops", programTitle: "Coding Bootcamp", icon: <FiLayers size={30} />, tone: "from-violet-600 to-fuchsia-500", description: "Run expert-led workshops, bootcamps, hackathons, and hands-on sessions." },
  { title: "Emerging Technologies", programTitle: "Coding Bootcamp", icon: <FiBookOpen size={30} />, tone: "from-blue-600 to-cyan-400", description: "Introduce AI, data analytics, cloud, and other future-ready technologies." },
  { title: "Institutional Partnerships", programTitle: "Campus Recruitment Training", icon: <FiArrowRight size={30} />, tone: "from-orange-600 to-red-400", description: "Build a campus ecosystem that benefits both students and faculty." },
  { title: "Internship Pathways", programTitle: "Campus Recruitment Training", icon: <FiCheckCircle size={30} />, tone: "from-teal-600 to-emerald-400", description: "Connect students with real-world exposure through guided internship opportunities." },
];

return (
<>
<Navbar />

{/* ===========================================================
                        PREMIUM HERO
=========================================================== */}

<section className="relative overflow-hidden bg-[#0B0D5C]">

  {/* Background */}

  <div className="absolute inset-0">

    <img
      src={collegeImg}
      alt="College"
      className="h-full w-full object-cover object-center"
    />

    {/* Overlay */}

    <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D5C]/95 via-[#241A8B]/80 to-[#241A8B]/30" />

    {/* Grid */}

    <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(to_right,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />

  </div>

  <div className="relative mx-auto max-w-7xl px-6">

    <div className="grid items-center gap-10 lg:grid-cols-2">

      {/* LEFT */}

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: .7 }}
        viewport={{ once: true }}
        className="py-14 lg:py-16"
      >

        {/* Badge */}

        <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-[#0B0D5C]/70 px-5 py-2 text-white shadow-lg backdrop-blur-xl">

          <FiHome className="text-orange-400" />

          <span className="text-sm font-bold tracking-widest text-white">

            FOR COLLEGES

          </span>

        </div>

        {/* Heading */}

        <h1 className="mt-6 text-5xl font-black leading-tight text-white md:text-6xl">

          Empower Your College

          <br />

          with

          <span className="text-orange-400">

            {" "}Future-Ready Skills

          </span>

        </h1>

        {/* Description */}

        <p className="mt-6 max-w-2xl text-lg leading-8 text-indigo-100 md:text-xl">

          Partner with NSFI to provide your students with
          industry-aligned training, AI-powered learning,
          internships, certifications and placement support.

        </p>

        {/* Features */}

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">

          <div className="flex items-center gap-2">

            <FiCheckCircle className="text-orange-400" />

            <span className="text-white">

              Industry Aligned Programs

            </span>

          </div>

          <div className="flex items-center gap-2">

            <FiCheckCircle className="text-orange-400" />

            <span className="text-white">

              AI-Powered Learning

            </span>

          </div>

          <div className="flex items-center gap-2">

            <FiCheckCircle className="text-orange-400" />

            <span className="text-white">

              Career & Placement Support

            </span>

          </div>

        </div>

      </motion.div>

      {/* Right side intentionally empty because image is background */}

      <div />

    </div>

  </div>
</section>
{false && <>
{/* ===========================================================
                    SEARCH SECTION
=========================================================== */}

<section className="relative bg-gradient-to-b from-[#241A8B] to-white pb-24">

  <div className="mx-auto -mt-14 max-w-7xl px-6 relative z-20">

    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: .6 }}
      viewport={{ once: true }}
      className="rounded-[28px] bg-white p-5 shadow-[0_25px_80px_rgba(0,0,0,.18)]"
    >

      <div className="grid gap-4 lg:grid-cols-4">

        {/* Search */}

        <div className="relative">

          <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

          <input
            type="text"
            placeholder="Search colleges by name..."
            value={collegeSearch}
            onChange={(e) => setCollegeSearch(e.target.value)}
            className="h-16 w-full rounded-2xl border border-gray-200 pl-14 pr-4 outline-none transition-all focus:border-[#241A8B] focus:ring-4 focus:ring-indigo-100"
          />

        </div>

        {/* Location */}

        <div className="relative">

          <FiMapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-16 w-full appearance-none rounded-2xl border border-gray-200 bg-white pl-14 pr-12 outline-none focus:border-[#241A8B] focus:ring-4 focus:ring-indigo-100"
          >

            {locations.map((item) => (

              <option key={item}>
                {item}
              </option>

            ))}

          </select>

          <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />

        </div>

        {/* College Type */}

        <div className="relative">

          <FiHome className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

          <select
            value={collegeType}
            onChange={(e) => setCollegeType(e.target.value)}
            className="h-16 w-full appearance-none rounded-2xl border border-gray-200 bg-white pl-14 pr-12 outline-none focus:border-[#241A8B] focus:ring-4 focus:ring-indigo-100"
          >

            {collegeTypes.map((item) => (

              <option key={item}>
                {item}
              </option>

            ))}

          </select>

          <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />

        </div>

        {/* Button */}

        <button
          className="flex h-16 items-center justify-center rounded-2xl bg-[#241A8B] font-bold text-white transition-all duration-300 hover:bg-orange-500"
        >

          Search Colleges

        </button>

      </div>

    </motion.div>

    {/* ======================================================
                        STATS
    ======================================================= */}

    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {[
        {
          icon: <FiHome size={30} />,
          value: "500+",
          label: "Partner Colleges",
          color: "bg-indigo-100 text-[#241A8B]",
        },
        {
          icon: <FiUsers size={30} />,
          value: "200K+",
          label: "Students Empowered",
          color: "bg-orange-100 text-orange-500",
        },
        {
          icon: <FiMapPin size={30} />,
          value: "50+",
          label: "Cities Covered",
          color: "bg-green-100 text-green-600",
        },
        {
          icon: <FiBookOpen size={30} />,
          value: "100+",
          label: "Programs Offered",
          color: "bg-blue-100 text-blue-600",
        },
      ].map((item, index) => (

        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * .12,
            duration: .6,
          }}
          viewport={{ once: true }}
        >

          <div className="flex items-center gap-5 rounded-[24px] bg-white p-7 shadow-xl">

            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}>

              {item.icon}

            </div>

            <div>

              <h3 className="text-4xl font-black text-[#241A8B]">

                {item.value}

              </h3>

              <p className="mt-1 text-gray-500">

                {item.label}

              </p>

            </div>

          </div>

        </motion.div>

      ))}

    </div>

  </div>

</section>
</>}
{false && <>
{/* ===========================================================
                    WHY COLLEGES CHOOSE NSFI
=========================================================== */}

<section className="py-24 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center">

      <span className="inline-flex items-center rbg-indigo-100 px-5 py-2 text-8xl font-bold uppercase tracking-widest text-[#241A8B] md:text-lg">

        Why NSFI

      </span>

      <h2 className="mt-6 text-5xl font-black text-[#241A8B]">

        Transform Your Campus

      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">

        We help colleges bridge the gap between academics and industry
        through practical learning, certifications, internships,
        placement preparation and AI-powered skill development.

      </p>

    </div>

    <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

      {[
        {
          title: "Industry Experts",
          icon: <FiUsers size={32} />,
          color: "bg-indigo-100 text-[#241A8B]",
          text: "Sessions conducted by experienced professionals from leading companies.",
        },
        {
          title: "Internships",
          icon: <FiBriefcase size={32} />,
          color: "bg-orange-100 text-orange-500",
          text: "Students gain practical experience through real-world internships.",
        },
        {
          title: "Placement Support",
          icon: <FiTrendingUp size={32} />,
          color: "bg-green-100 text-green-600",
          text: "Resume building, aptitude training, mock interviews and hiring support.",
        },
        {
          title: "Certifications",
          icon: <FiAward size={32} />,
          color: "bg-blue-100 text-blue-600",
          text: "Industry-recognized certificates that improve employability.",
        },

      ].map((item, index) => (

        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * .12,
            duration: .6,
          }}
          viewport={{ once: true }}
        >

          <Tilt
            glareEnable
            glareMaxOpacity={0.25}
            scale={1.04}
          >

            <div className="group rounded-[30px] border border-white bg-white p-8 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_70px_rgba(36,26,139,.18)]">

              <motion.div
                whileHover={{
                  rotate: 8,
                  scale: 1.1,
                }}
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
              >

                {item.icon}

              </motion.div>

              <h3 className="mt-7 text-2xl font-black text-[#241A8B]">

                {item.title}

              </h3>

              <p className="mt-5 leading-8 text-gray-600">

                {item.text}

              </p>

            </div>

          </Tilt>

        </motion.div>

      ))}

    </div>

  </div>

</section>
</>}
{/* ===========================================================
                    FEATURED PARTNER COLLEGES
=========================================================== */}

<section className="relative overflow-hidden border-y border-indigo-100 bg-indigo-50/70 py-24">

  <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
  <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-6">
    <div className="rounded-[42px] border border-indigo-100 bg-gradient-to-br from-indigo-100/80 via-white to-orange-50 p-6 shadow-[0_25px_80px_rgba(36,26,139,.14)] backdrop-blur-sm md:p-10 lg:p-12">
      <div className="text-center">
        <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-sm font-bold uppercase tracking-widest text-orange-600 shadow-sm">
          PARTNERSHIP MODEL
        </span>
        <h2 className="mt-6 text-4xl font-black text-[#241A8B] md:text-5xl">
          Build a Future-Ready Campus
        </h2>
        <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-indigo-600" />
        <p className="mx-auto mt-6 max-w-5xl text-center text-lg font-medium leading-8 text-slate-700 md:text-xl">
          Create meaningful learning experiences that equip students, empower faculty, and strengthen placement outcomes.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {partnershipPrograms.map((program) => (
        <article
          key={program.title}
          className="group relative overflow-hidden rounded-[30px] border border-indigo-100 bg-white p-7 shadow-[0_12px_35px_rgba(36,26,139,.09)] transition-all duration-500 hover:-translate-y-3 hover:border-indigo-200 hover:shadow-[0_25px_60px_rgba(36,26,139,.2)]"
        >
          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-100/70 blur-2xl transition duration-500 group-hover:scale-150" />
          <div className={`relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${program.tone} text-white shadow-lg transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
            {program.icon}
          </div>
          <h3 className="relative mt-7 text-2xl font-bold text-[#241A8B]">{program.title}</h3>
          <p className="relative mt-4 leading-7 text-gray-600">{program.description}</p>
          <button
            type="button"
            onClick={() => navigate(`/programs?program=${encodeURIComponent(program.programTitle)}`)}
            className="relative mt-7 flex items-center gap-2 text-sm font-bold text-orange-500 transition hover:translate-x-1 hover:text-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4"
          >
            View Relevant Program <FiArrowRight />
          </button>
        </article>
      ))}
      </div>
    </div>

  </div>

</section>

<section className="relative overflow-hidden border-t border-indigo-100 bg-white py-24">
  <div className="absolute -right-24 top-12 h-72 w-72 rounded-full bg-orange-100/70 blur-3xl" />
  <div className="relative mx-auto max-w-7xl px-6">
    <div className="text-center">
      <span className="inline-flex text-xl font-black uppercase tracking-[0.24em] text-[#241A8B] md:text-2xl">Why NSFI</span>
      <h2 className="mt-6 text-4xl font-black text-[#241A8B] md:text-5xl">Transform Your Campus</h2>
      <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-orange-400 to-indigo-600" />
      <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-gray-600">We help colleges bridge the gap between academics and industry through practical learning, certifications, internships, placement preparation and AI-powered skill development.</p>
    </div>
    <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {[
        { title: "Industry Experts", text: "Sessions conducted by experienced professionals from leading companies.", icon: <FiUsers size={30} />, tone: "bg-indigo-100 text-[#241A8B]" },
        { title: "Internships", text: "Students gain practical experience through real-world internships.", icon: <FiBriefcase size={30} />, tone: "bg-orange-100 text-orange-500" },
        { title: "Placement Support", text: "Resume building, aptitude training, mock interviews and hiring support.", icon: <FiTrendingUp size={30} />, tone: "bg-green-100 text-green-600" },
        { title: "Certifications", text: "Industry-recognized certificates that improve employability.", icon: <FiAward size={30} />, tone: "bg-blue-100 text-blue-600" },
      ].map((item) => (
        <article key={item.title} className="group rounded-[30px] border border-white bg-white/90 p-8 shadow-[0_12px_35px_rgba(36,26,139,.09)] transition duration-500 hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(36,26,139,.18)]">
          <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.tone} transition duration-500 group-hover:rotate-6 group-hover:scale-110`}>{item.icon}</div>
          <h3 className="mt-7 text-2xl font-black text-[#241A8B]">{item.title}</h3>
          <p className="mt-4 leading-7 text-gray-600">{item.text}</p>
        </article>
      ))}
    </div>
  </div>
</section>

{false && <>
<section className="bg-gradient-to-b from-gray-50 to-white py-24">

  <div className="mx-auto max-w-7xl px-6">

    {/* Heading */}

    <div className="text-center">

      <span className="inline-flex rounded-full bg-orange-100 px-5 py-2 text-sm font-bold uppercase tracking-widest text-orange-500">

        Featured Partners

      </span>

      <h2 className="mt-6 text-5xl font-black text-[#241A8B]">

        Trusted by Leading Colleges

      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">

        NSFI collaborates with institutions across India to deliver
        industry-focused training, certifications, internships,
        placement preparation, and emerging technology programs.

      </p>

    </div>

    {/* Cards */}

    <div className="mt-20 grid gap-8 lg:grid-cols-3">

      {[
        {
          name: "Engineering College",
          city: "Hyderabad",
          students: "5,000+",
          placement: "96%",
          image: collegeImg,
        },
        {
          name: "Institute of Technology",
          city: "Bengaluru",
          students: "3,800+",
          placement: "94%",
          image: collegeImg,
        },
        {
          name: "School of Engineering",
          city: "Chennai",
          students: "4,200+",
          placement: "97%",
          image: collegeImg,
        },

      ].map((college, index) => (

        <motion.div
          key={college.name}
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
            glareMaxOpacity={0.2}
            scale={1.03}
          >

            <div className="overflow-hidden rounded-[30px] bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

              {/* Image */}

              <div className="relative h-64 overflow-hidden">

                <img
                  src={college.image}
                  alt={college.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5">

                  <span className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white">

                    Partner College

                  </span>

                </div>

              </div>

              {/* Content */}

              <div className="p-8">

                <h3 className="text-2xl font-black text-[#241A8B]">

                  {college.name}

                </h3>

                <div className="mt-3 flex items-center gap-2 text-gray-500">

                  <FiMapPin />

                  {college.city}

                </div>

                {/* Stats */}

                <div className="mt-8 grid grid-cols-2 gap-5">

                  <div className="rounded-2xl bg-indigo-50 p-5 text-center">

                    <h4 className="text-3xl font-black text-[#241A8B]">

                      {college.students}

                    </h4>

                    <p className="mt-1 text-sm text-gray-500">

                      Students

                    </p>

                  </div>

                  <div className="rounded-2xl bg-orange-50 p-5 text-center">

                    <h4 className="text-3xl font-black text-orange-500">

                      {college.placement}

                    </h4>

                    <p className="mt-1 text-sm text-gray-500">

                      Placement

                    </p>

                  </div>

                </div>

                <button
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#241A8B] py-4 font-bold text-white transition duration-300 hover:bg-orange-500"
                >

                  View Partnership

                  <FiArrowRight />

                </button>

              </div>

            </div>

          </Tilt>

        </motion.div>

      ))}

    </div>

  </div>

</section>
{/* ===========================================================
                    FEATURED PARTNER COLLEGES
=========================================================== */}

<section className="bg-gradient-to-b from-gray-50 to-white py-24">

  <div className="mx-auto max-w-7xl px-6">

    {/* Heading */}

    <div className="text-center">

      <span className="inline-flex rounded-full bg-orange-100 px-5 py-2 text-sm font-bold uppercase tracking-widest text-orange-500">

        Featured Partners

      </span>

      <h2 className="mt-6 text-5xl font-black text-[#241A8B]">

        Trusted by Leading Colleges

      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">

        NSFI collaborates with institutions across India to deliver
        industry-focused training, certifications, internships,
        placement preparation, and emerging technology programs.

      </p>

    </div>

    {/* Cards */}

    <div className="mt-20 grid gap-8 lg:grid-cols-3">

      {[
        {
          name: "Engineering College",
          city: "Hyderabad",
          students: "5,000+",
          placement: "96%",
          image: collegeImg,
        },
        {
          name: "Institute of Technology",
          city: "Bengaluru",
          students: "3,800+",
          placement: "94%",
          image: collegeImg,
        },
        {
          name: "School of Engineering",
          city: "Chennai",
          students: "4,200+",
          placement: "97%",
          image: collegeImg,
        },

      ].map((college, index) => (

        <motion.div
          key={college.name}
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
            glareMaxOpacity={0.2}
            scale={1.03}
          >

            <div className="overflow-hidden rounded-[30px] bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

              {/* Image */}

              <div className="relative h-64 overflow-hidden">

                <img
                  src={college.image}
                  alt={college.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5">

                  <span className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white">

                    Partner College

                  </span>

                </div>

              </div>

              {/* Content */}

              <div className="p-8">

                <h3 className="text-2xl font-black text-[#241A8B]">

                  {college.name}

                </h3>

                <div className="mt-3 flex items-center gap-2 text-gray-500">

                  <FiMapPin />

                  {college.city}

                </div>

                {/* Stats */}

                <div className="mt-8 grid grid-cols-2 gap-5">

                  <div className="rounded-2xl bg-indigo-50 p-5 text-center">

                    <h4 className="text-3xl font-black text-[#241A8B]">

                      {college.students}

                    </h4>

                    <p className="mt-1 text-sm text-gray-500">

                      Students

                    </p>

                  </div>

                  <div className="rounded-2xl bg-orange-50 p-5 text-center">

                    <h4 className="text-3xl font-black text-orange-500">

                      {college.placement}

                    </h4>

                    <p className="mt-1 text-sm text-gray-500">

                      Placement

                    </p>

                  </div>

                </div>

                <button
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#241A8B] py-4 font-bold text-white transition duration-300 hover:bg-orange-500"
                >

                  View Partnership

                  <FiArrowRight />

                </button>

              </div>

            </div>

          </Tilt>

        </motion.div>

      ))}

    </div>

  </div>

</section>
{/* ===========================================================
                        CTA
=========================================================== */}

<section className="bg-gradient-to-r from-[#241A8B] via-[#3225a5] to-[#4838d7] py-24 text-white">

  <div className="mx-auto max-w-6xl px-6 text-center">

    <h2 className="text-5xl font-black">

      Ready to Transform Your Campus?

    </h2>

    <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-indigo-100">

      Partner with NSFI to equip your students with industry-relevant
      skills, practical experience, certifications, and career
      opportunities.

    </p>

    <div className="mt-12 flex flex-wrap justify-center gap-6">

      <button
        onClick={() => navigate("/contact")}
        className="rounded-2xl bg-orange-500 px-10 py-5 text-lg font-bold transition hover:bg-orange-600"
      >
        Partner With NSFI
      </button>

      <button
        onClick={() => navigate("/programs")}
        className="rounded-2xl border border-white/30 bg-white/10 px-10 py-5 text-lg font-bold backdrop-blur transition hover:bg-white hover:text-[#241A8B]"
      >
        View Programs
      </button>

    </div>

  </div>

</section>

</>}
<Footer />

</>

);

};

export default Colleges;
