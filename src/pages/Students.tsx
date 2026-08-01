import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";


import {
  FiArrowRight,
  FiCheckCircle,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiUsers,
  FiTarget,
  FiTrendingUp,
  FiLayers,
} from "react-icons/fi";

const Students = () => {
  const navigate = useNavigate();

  const programs = [
    {
      icon: <FiBriefcase size={32} />,
      title: "Business Analytics",
      tone: "from-indigo-600 to-violet-500",
      description:
        "Master analytical thinking, business intelligence, dashboards, Excel, SQL, and reporting tools.",
    },
    {
      icon: <FiUsers size={32} />,
      title: "Human Resources",
      tone: "from-orange-500 to-amber-400",
      description:
        "Develop recruitment, employee engagement, payroll, compliance, and HR management skills.",
    },
    {
      icon: <FiTarget size={32} />,
      title: "Project Management",
      tone: "from-cyan-600 to-sky-400",
      description:
        "Learn project planning, Agile methodologies, Scrum, execution, and leadership.",
    },
    {
      icon: <FiTrendingUp size={32} />,
      title: "Digital Marketing",
      tone: "from-pink-600 to-rose-400",
      description:
        "SEO, SEM, Social Media Marketing, Google Ads, Analytics, and Content Marketing.",
    },
    {
      icon: <FiBookOpen size={32} />,
      title: "Data Analytics",
      tone: "from-emerald-600 to-teal-400",
      description:
        "Excel, Power BI, SQL, Python, visualization, and business reporting.",
    },
    {
      icon: <FiLayers size={32} />,
      title: "Professional Skills",
      tone: "from-violet-600 to-fuchsia-500",
      description:
        "Communication, personality development, leadership, teamwork, and workplace readiness.",
    },
    {
      icon: <FiAward size={32} />,
      title: "AI & Productivity Tools",
      tone: "from-blue-600 to-cyan-400",
      description:
        "Use modern AI and productivity tools to research, create, organize, and deliver better work.",
    },
    {
      icon: <FiArrowRight size={32} />,
      title: "Career Launchpad",
      tone: "from-orange-600 to-red-400",
      description:
        "Build your portfolio, prepare for interviews, and take confident steps toward your first opportunity.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="relative isolate overflow-hidden bg-[#f7f8ff]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[radial-gradient(circle_at_top_left,_#e0e7ff_0,_transparent_30%),radial-gradient(circle_at_85%_35%,_#ffedd5_0,_transparent_25%),linear-gradient(135deg,_#f8faff_0%,_#ffffff_45%,_#f5f3ff_100%)]">
          <div className="absolute -left-40 top-[28%] h-[34rem] w-[34rem] rounded-full bg-indigo-300/35 blur-3xl" />
          <div className="absolute -right-36 top-[47%] h-[30rem] w-[30rem] rounded-full bg-orange-300/30 blur-3xl" />
          <div className="absolute bottom-[8%] left-[38%] h-80 w-80 rotate-45 rounded-[5rem] border border-indigo-200/60 bg-white/30 shadow-[0_35px_90px_rgba(79,70,229,.12)] backdrop-blur-sm" />
          <div className="absolute inset-0 opacity-[0.045] bg-[linear-gradient(#241A8B_1px,transparent_1px),linear-gradient(to_right,#241A8B_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#120f4d] via-[#241A8B] to-[#4431d8] text-white">

        {/* Background */}

        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute -left-40 top-0 h-[550px] w-[550px] rounded-full bg-orange-500/20 blur-[120px] animate-pulse" />

          <div className="absolute right-0 bottom-0 h-[520px] w-[520px] rounded-full bg-cyan-400/15 blur-[120px] animate-pulse" />

          <div className="absolute left-1/2 top-10 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-white/10 blur-[100px]" />

        </div>

        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(to_right,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <span className="inline-flex items-center rounded-full border border-orange-300/30 bg-orange-500/20 px-5 py-2 text-sm font-bold uppercase tracking-[0.25em] backdrop-blur">

              FOR STUDENTS

            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight md:text-7xl">

              From Dreams

              <br />

              <span className="text-orange-400">

                To Careers

              </span>

            </h1>

            <h2 className="mt-8 text-2xl font-semibold leading-relaxed text-indigo-100 md:text-3xl">

              Your Future Should Never Be Limited

              <br />

              By Your Background

            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-indigo-100">

              Most students don't struggle because they lack talent.
              They struggle because nobody taught them the skills
              employers actually seek.

            </p>

            <p className="mt-6 text-xl font-bold text-orange-300">

              Degrees open doors.

              <br />

              Skills help you walk through them.

            </p>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-indigo-100">

              At <strong>National Skill Forge Institute (NSFI)</strong>,
              we transform classroom learning into career readiness through
              industry-focused training, certifications, mentorship,
              internships, and employability enhancement programs.

            </p>

            <div className="mt-12 flex flex-wrap gap-5">

              <button
                onClick={() => navigate("/programs")}
                className="rounded-2xl bg-orange-500 px-8 py-4 font-semibold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-orange-500/40"
              >
                Explore Programs
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/10 px-8 py-4 font-semibold backdrop-blur transition-all duration-300 hover:bg-white hover:text-[#241A8B]"
              >
                Enroll Now
                <FiArrowRight />
              </button>

            </div>

          </div>

          <div className="relative">

            <div className="absolute -inset-6 rounded-[50px] bg-gradient-to-r from-orange-500/20 via-indigo-500/20 to-cyan-400/20 blur-3xl"></div>

            <div className="relative rounded-[36px] border border-white/20 bg-white/10 p-8 backdrop-blur-xl shadow-[0_25px_80px_rgba(0,0,0,.35)]">
              <span className="inline-flex rounded-full border border-orange-300/40 bg-orange-400/15 px-4 py-2 text-xs font-black tracking-[0.18em] text-orange-200">YOUR FUTURE STARTS HERE</span>
              <h2 className="mt-8 text-4xl font-black leading-tight">Learn. Build. <span className="text-orange-300">Launch.</span></h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {[{ value: "5000+", label: "Students Empowered" }, { value: "100+", label: "Industry Programs" }, { value: "1 Goal", label: "Your Career Growth" }].map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-lg">
                    <p className="text-3xl font-black text-orange-300">{item.value}</p>
                    <p className="mt-2 text-sm leading-6 text-indigo-100">{item.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-lg leading-8 text-indigo-100">Practical learning, expert support, and meaningful opportunities—all designed around your next step.</p>
            </div>

          </div>

        </div>

      </section>

      <div aria-hidden="true" className="relative z-10 mx-auto h-px w-[calc(100%-3rem)] max-w-6xl bg-gradient-to-r from-transparent via-orange-400/70 to-transparent" />
      {false && <>
      {/* =========================================================
      WHY STUDENTS CHOOSE NSFI
========================================================= */}

<section className="relative overflow-hidden border-y border-indigo-100/80 bg-white/80 py-24 backdrop-blur-sm">

  {/* Background */}

  <div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

  <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-6">

    <div className="grid items-center gap-16 lg:grid-cols-2">

      <div className="relative order-2 lg:order-1">

        <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-r from-[#241A8B]/20 to-orange-400/20 blur-3xl"></div>

        <div className="relative rounded-[36px] border border-white/70 bg-white/80 p-8 shadow-[0_25px_80px_rgba(36,26,139,.18)] backdrop-blur-xl">
          <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-xs font-black tracking-[0.16em] text-[#241A8B]">THE NSFI DIFFERENCE</span>
          <h3 className="mt-7 text-4xl font-black leading-tight text-[#241A8B]">Everything you need to move forward.</h3>
          <div className="mt-8 space-y-4">
            {[
              { icon: <FiBookOpen size={24} />, title: "Learn by doing", text: "Projects, case studies, and hands-on practice." },
              { icon: <FiAward size={24} />, title: "Build proof of your skills", text: "Credentials that make your profile stronger." },
              { icon: <FiTrendingUp size={24} />, title: "Prepare for opportunity", text: "Guidance for interviews, internships, and careers." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-3xl border border-indigo-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#241A8B] text-white">{item.icon}</div>
                <div><h4 className="font-bold text-[#241A8B]">{item.title}</h4><p className="mt-1 text-sm leading-6 text-gray-600">{item.text}</p></div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CONTENT */}

      <div className="order-1 lg:order-2">

        <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-6 py-2 text-sm font-bold uppercase tracking-widest text-[#241A8B] shadow-sm">

          WHY NSFI

        </span>

        <h1 className="mt-6 text-4xl font-black leading-tight text-[#241A8B] md:text-5xl">

          We help students become Career ready

        </h1>
<br/>
        <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-orange-400 to-indigo-600" />

        <p className="mt-8 text-lg leading-9 text-gray-600">

          NSFI bridges the gap between academic education and
          industry expectations. Our practical learning ecosystem
          equips students with confidence, technical expertise,
          professional certifications, and career guidance.

        </p>
        <br/>
        <br/>

        <div className="mt-12 space-y-6">

          <div className="group rounded-3xl border border-indigo-100 bg-white p-7 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#241A8B] hover:shadow-2xl">

            <div className="flex items-start gap-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#241A8B] text-white transition duration-500 group-hover:rotate-6 group-hover:bg-orange-500">

                <FiBookOpen size={30} />

              </div>
              <div>

                <h3 className="text-2xl font-bold text-[#241A8B]">

                  Practical Learning

                </h3>

                <p className="mt-3 leading-8 text-gray-600">

                  Learn through real-world projects,
                  assignments, case studies, and
                  industry-oriented training.

                </p>

              </div>

            </div>

          </div>
          <br/>

          <div className="group rounded-3xl border border-orange-100 bg-white p-7 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-orange-400 hover:shadow-2xl">

            <div className="flex items-start gap-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-white transition duration-500 group-hover:rotate-6">

                <FiAward size={30} />

              </div>

              <div>

                <h3 className="text-2xl font-bold text-[#241A8B]">

                  Professional Certifications

                </h3>

                <p className="mt-3 leading-8 text-gray-600">

                  Earn industry-recognized certifications
                  that improve your resume and credibility.

                </p>

              </div>

            </div>

          </div>
          <br/>

          <div className="group rounded-3xl border border-green-100 bg-white p-7 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-green-400 hover:shadow-2xl">

            <div className="flex items-start gap-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-white transition duration-500 group-hover:rotate-6">

                <FiTrendingUp size={30} />

              </div>

              <div>

                <h3 className="text-2xl font-bold text-[#241A8B]">

                  Career Growth

                </h3>

                <p className="mt-3 leading-8 text-gray-600">

                  Build communication, leadership,
                  analytical thinking, and workplace
                  skills employers actively seek.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>
      </>}
{/* =========================================================
      OUR LEARNING APPROACH
========================================================= */}

<section className="relative overflow-hidden border-y border-indigo-100/80 bg-indigo-50/55 py-24 backdrop-blur-sm">

  <div className="mx-auto max-w-7xl px-6">

    <div className="text-center">

      <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-sm font-bold tracking-widest text-orange-600 shadow-sm">
        LEARNING MODEL
      </span>

      <h2 className="mt-6 text-4xl font-black text-[#241A8B] md:text-5xl">

        Our Learning Approach

      </h2>

      <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-indigo-600" />

      <p className="mx-auto mt-6 max-w-3xl text-center text-xl font-medium leading-8 text-slate-700 md:text-2xl">

        Learn with purpose through real-world projects, expert-led
        guidance, and the practical confidence to succeed beyond the classroom.

      </p>

    </div>
    <br/>

    <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {programs.map((program) => (

        <div
          key={program.title}
          className="group relative overflow-hidden rounded-[30px] border border-white/80 bg-white/85 p-8 shadow-[0_12px_35px_rgba(36,26,139,.09)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:border-indigo-200 hover:shadow-[0_25px_60px_rgba(36,26,139,.2)]"
        >

          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-100/70 blur-2xl transition duration-500 group-hover:scale-150" />

          <div className={`relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${program.tone} text-white shadow-lg transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>

            {program.icon}

          </div>

          <h3 className="relative mt-7 text-2xl font-bold text-[#241A8B]">

            {program.title}

          </h3>

          <p className="relative mt-4 leading-7 text-gray-600">

            {program.description}

          </p>

          <button
            type="button"
            onClick={() =>
              navigate(`/programs?program=${encodeURIComponent(program.title)}`)
            }
            className="relative mt-7 flex items-center gap-2 text-sm font-bold text-orange-500 transition-all duration-300 hover:translate-x-1 hover:text-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4"
          >

            Explore Programs

            <FiArrowRight />

          </button>

        </div>

      ))}

    </div>

  </div>

</section>
{false && <>
<section className="relative overflow-hidden border-y border-indigo-100/80 bg-white/80 py-24 backdrop-blur-sm">

<div className="mx-auto max-w-7xl px-6">

<div className="grid items-center gap-16 lg:grid-cols-2">

<div>

<span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-sm font-bold uppercase tracking-widest text-orange-500 shadow-sm">

CAREER READINESS

</span>

<h2 className="mt-6 text-5xl font-black text-[#241A8B]">

Build Skills That
<br />
Open Doors.
<br />
Build the Confidence
<br />
to Walk Through Them.

</h2>

<div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-orange-400 to-indigo-600" />

<p className="mt-8 text-lg leading-9 text-gray-600">

Your next opportunity starts with the skills you build today.
Learn by doing, earn credentials that matter, and walk into every
interview with the confidence to stand out.

</p>

<div className="mt-10 grid gap-4">

{[
"Hands-on skills employers value",
"Credentials that strengthen your profile",
"A resume and LinkedIn profile that get noticed",
"Interview confidence with expert career guidance",
"Internship and placement support for your next step",
].map((item)=>(

<div
key={item}
className="flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
>

<FiCheckCircle className="text-green-600 text-xl"/>

<span className="font-semibold">

{item}

</span>

</div>

))}

</div>

</div>

<div className="relative">

<div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-orange-400/20 to-indigo-500/20 blur-3xl"></div>

<div className="relative rounded-[40px] border border-white bg-gradient-to-br from-[#241A8B] via-indigo-700 to-[#4431d8] p-8 text-white shadow-[0_30px_80px_rgba(36,26,139,.2)]">

<span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black tracking-[0.18em] text-orange-200">CAREER TOOLKIT</span>

<h3 className="mt-8 text-4xl font-black leading-tight">Leave with more than a certificate.</h3>

<div className="mt-8 space-y-4">
{[
{ title: "A stronger profile", text: "Resume and LinkedIn guidance that helps you stand out." },
{ title: "Real interview confidence", text: "Practice, feedback, and a clearer way to tell your story." },
{ title: "A plan for what is next", text: "Mentorship and support for internships and career opportunities." },
].map((item, index) => (
<div key={item.title} className="flex gap-4 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-400 font-black text-[#241A8B]">0{index + 1}</span>
<div><h4 className="font-bold">{item.title}</h4><p className="mt-1 text-sm leading-6 text-indigo-100">{item.text}</p></div>
</div>
))}
</div>

<div className="mt-8 rounded-3xl bg-white p-5 text-[#241A8B] shadow-xl">
<p className="text-3xl font-black">Job-Ready</p>
<p className="mt-1 text-sm text-gray-600">Skills for your next opportunity.</p>
</div>

</div>

</div>

</div>

</div>

</section>
</>}
{/* <section className="relative overflow-hidden bg-gradient-to-r from-[#241A8B] via-indigo-700 to-[#241A8B] py-24 text-white"> */}

{/* <div className="mx-auto max-w-5xl px-6 text-center"> */}

{/* <h2 className="text-5xl font-black">

Ready To Start Your Journey?

</h2> */}

{/* <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-indigo-100">

Join thousands of students who are preparing for
successful careers with NSFI.

</p> */}

{/* <div className="mt-12 flex flex-wrap justify-center gap-6">

<button
onClick={()=>navigate("/programs")}
className="rounded-2xl bg-orange-500 px-8 py-4 font-bold transition hover:scale-105 hover:bg-orange-600"
>

Explore Programs

</button>

<button
onClick={()=>navigate("/signup")}
className="rounded-2xl border border-white px-8 py-4 font-bold transition hover:bg-white hover:text-[#241A8B]"
>

Enroll Now

</button>

</div> */}

{/* </div> */}

{/* </section> */}

      </div>
      <Footer />
    </>
  );
};

export default Students;
