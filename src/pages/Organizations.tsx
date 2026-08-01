import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

import companyImg from "../assets/company.jpeg";
import student1Img from "../assets/students1.jpeg";
import careerImg from "../assets/hero.jpg.jpeg";

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

const Organizations = () => {
  const navigate = useNavigate();

  const programs = [
    {
      icon: <FiBriefcase size={32} />,
      title: "Corporate Upskilling",
      tone: "from-indigo-600 to-violet-500",
      description:
        "Enhance employee capabilities with practical, industry-focused learning programs.",
    },
    {
      icon: <FiUsers size={32} />,
      title: "Leadership Development",
      tone: "from-orange-500 to-amber-400",
      description:
        "Develop confident leaders through structured management and leadership training.",
    },
    {
      icon: <FiTarget size={32} />,
      title: "Customized Learning",
      tone: "from-cyan-600 to-sky-400",
      description:
        "Training solutions tailored to your organization's goals, teams, and business challenges.",
    },
    {
      icon: <FiTrendingUp size={32} />,
      title: "Digital Transformation",
      tone: "from-pink-600 to-rose-400",
      description:
        "Empower your workforce with AI, automation, analytics, and emerging technologies.",
    },
    {
      icon: <FiBookOpen size={32} />,
      title: "Professional Certifications",
      tone: "from-emerald-600 to-teal-400",
      description:
        "Industry-recognized certifications that strengthen employee expertise and credibility.",
    },
    {
      icon: <FiLayers size={32} />,
      title: "Corporate Workshops",
      tone: "from-violet-600 to-fuchsia-500",
      description:
        "Interactive workshops, bootcamps, and expert-led learning experiences.",
    },
    {
      icon: <FiAward size={32} />,
      title: "Future Skills",
      tone: "from-blue-600 to-cyan-400",
      description:
        "Prepare your workforce with AI, Data Analytics, Cloud Computing, and Digital Marketing.",
    },
    {
      icon: <FiArrowRight size={32} />,
      title: "Strategic Partnerships",
      tone: "from-orange-600 to-red-400",
      description:
        "Partner with NSFI to build a future-ready, highly skilled workforce.",
    },
    {
      icon: <FiCheckCircle size={32} />,
      title: "Corporate Communication",
      tone: "from-teal-600 to-emerald-400",
      description:
        "Build clearer communication, stronger collaboration, and confident client-facing teams.",
    },
  ];

  return (
    <>
      <Navbar />

      <div className="relative isolate overflow-hidden bg-[#f7f8ff]">

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

          {/* Background */}

          <div className="absolute inset-0">
            <img
              src={companyImg}
              alt="Professionals collaborating in a workplace"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D5C]/95 via-[#241A8B]/80 to-[#241A8B]/30" />
          </div>

          <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(to_right,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 lg:grid-cols-2 lg:py-16">

            {/* LEFT */}

            <div>

              <span className="inline-flex items-center rounded-full border border-orange-300/30 bg-orange-500/20 px-5 py-2 text-sm font-bold uppercase tracking-[0.25em] backdrop-blur">

                FOR ORGANIZATIONS

              </span>

              <h1 className="mt-6 text-5xl font-black leading-tight md:text-6xl">

                Build
                <br />

                <span className="text-orange-400">

                  Future-Ready Teams

                </span>

              </h1>

              <h2 className="mt-6 text-2xl font-semibold leading-relaxed text-indigo-100 md:text-3xl">

                Empower Your Workforce
                <br />

                Through Continuous Learning

              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-indigo-100">

                The strongest organizations invest in their people.
                By developing future-ready skills, businesses can improve
                productivity, innovation, leadership, and long-term growth.

              </p>

              <p className="mt-6 text-xl font-bold text-orange-300">

                Skilled Employees.
                <br />

                Stronger Organizations.

              </p>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-indigo-100">

                At <strong>National Skill Forge Institute (NSFI)</strong>,
                we partner with organizations to deliver customized
                corporate training, leadership development, AI and
                digital transformation programs, professional
                certifications, and workforce upskilling solutions.

              </p>

              <div className="mt-8 flex flex-wrap gap-5">

                <button
                  onClick={() => navigate("/programs")}
                  className="rounded-2xl bg-orange-500 px-8 py-4 font-semibold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-orange-500/40"
                >
                  Explore Solutions
                </button>

                <button
                  onClick={() => navigate("/contact")}
                  className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/10 px-8 py-4 font-semibold backdrop-blur transition-all duration-300 hover:bg-white hover:text-[#241A8B]"
                >
                  Partner With NSFI

                  <FiArrowRight />

                </button>

              </div>

            </div>

            <div aria-hidden="true" />

          </div>

        </section>

        <div
          aria-hidden="true"
          className="relative z-10 mx-auto h-px w-[calc(100%-3rem)] max-w-6xl bg-gradient-to-r from-transparent via-orange-400/70 to-transparent"
        />
        {false && <>
        {/* =========================================================
      WHY ORGANIZATIONS CHOOSE NSFI
========================================================= */}

<section className="relative overflow-hidden border-y border-indigo-100/80 bg-white/80 py-24 backdrop-blur-sm">

  {/* Background */}

  <div className="absolute -right-24 top-20 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

  <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-6">

    <div className="grid items-center gap-16 lg:grid-cols-2">

      {/* IMAGE */}

      <div className="relative order-2 lg:order-1">

        <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-r from-[#241A8B]/20 to-orange-400/20 blur-3xl"></div>

        <div className="relative overflow-hidden rounded-[36px] border border-white/40 bg-white/60 p-4 shadow-[0_25px_80px_rgba(36,26,139,.18)] backdrop-blur-xl">

          <img
            src={student1Img}
            alt="Corporate Training"
            className="h-[620px] w-full rounded-[28px] object-cover transition-all duration-700 hover:scale-[1.03] shadow-2xl animate-floating"
          />

          {/* Floating Card */}

          <div className="absolute left-8 top-8 rounded-2xl border border-white/30 bg-white/70 px-5 py-4 backdrop-blur-xl shadow-xl">

            <h3 className="text-3xl font-black text-[#241A8B]">

              100%

            </h3>

            <p className="mt-1 text-sm text-gray-600">

              Business Focused

            </p>

          </div>

          <div className="absolute bottom-8 right-8 rounded-2xl border border-white/30 bg-white/70 px-5 py-4 backdrop-blur-xl shadow-xl">

            <h3 className="text-3xl font-black text-orange-500">

              Future

            </h3>

            <p className="mt-1 text-sm text-gray-600">

              Ready Workforce

            </p>

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="order-1 lg:order-2">

        <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-6 py-2 text-sm font-bold uppercase tracking-widest text-[#241A8B] shadow-sm">

          WHY NSFI

        </span>

        <h1 className="mt-6 text-4xl font-black leading-tight text-[#241A8B] md:text-5xl">

          Why Organizations Partner With NSFI

        </h1>

        <br />

        <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-orange-400 to-indigo-600" />

        <p className="mt-8 text-lg leading-9 text-gray-600">

          We help organizations build a highly skilled workforce through
          customized corporate learning, leadership development,
          technology training, and future-focused professional
          development programs that deliver measurable business impact.

        </p>

        <br />
        <br />

        <div className="mt-12 space-y-6">

          {/* Card 1 */}

          <div className="group rounded-3xl border border-indigo-100 bg-white p-7 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#241A8B] hover:shadow-2xl">

            <div className="flex items-start gap-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#241A8B] text-white transition duration-500 group-hover:rotate-6 group-hover:bg-orange-500">

                <FiBookOpen size={30} />

              </div>

              <div>

                <h3 className="text-2xl font-bold text-[#241A8B]">

                  Customized Learning Solutions

                </h3>

                <p className="mt-3 leading-8 text-gray-600">

                  Every organization is different. We design training
                  programs aligned with your business goals, workforce
                  requirements, and industry demands.

                </p>

              </div>

            </div>

          </div>

          <br />

          {/* Card 2 */}

          <div className="group rounded-3xl border border-orange-100 bg-white p-7 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-orange-400 hover:shadow-2xl">

            <div className="flex items-start gap-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-white transition duration-500 group-hover:rotate-6">

                <FiAward size={30} />

              </div>

              <div>

                <h3 className="text-2xl font-bold text-[#241A8B]">

                  Industry Certifications

                </h3>

                <p className="mt-3 leading-8 text-gray-600">

                  Equip employees with globally recognized certifications
                  that enhance professional credibility and organizational
                  excellence.

                </p>

              </div>

            </div>

          </div>

          <br />

          {/* Card 3 */}

          <div className="group rounded-3xl border border-green-100 bg-white p-7 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-green-400 hover:shadow-2xl">

            <div className="flex items-start gap-5">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-white transition duration-500 group-hover:rotate-6">

                <FiTrendingUp size={30} />

              </div>

              <div>

                <h3 className="text-2xl font-bold text-[#241A8B]">

                  Business Growth & Innovation

                </h3>

                <p className="mt-3 leading-8 text-gray-600">

                  Develop high-performing teams that improve productivity,
                  accelerate innovation, strengthen leadership, and drive
                  sustainable business success.

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
      CORPORATE LEARNING SOLUTIONS
========================================================= */}

<section className="relative overflow-hidden border-y border-indigo-100/80 bg-indigo-50/55 py-24 backdrop-blur-sm">

  <div className="mx-auto max-w-7xl px-6">
    <div className="rounded-[42px] border border-white/80 bg-white/75 p-6 shadow-[0_25px_80px_rgba(36,26,139,.12)] backdrop-blur-sm md:p-10 lg:p-12">

    <div className="text-center">

      <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-sm font-bold tracking-widest text-orange-600 shadow-sm">

        CHOOSE YOUR SOLUTION

      </span>

      <h2 className="mt-6 text-4xl font-black text-[#241A8B] md:text-5xl">

        Learning Solutions For Every Organization

      </h2>

      <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-indigo-600" />

      <p className="mx-auto mt-6 max-w-5xl text-center text-lg font-medium leading-8 text-slate-700 md:text-xl">
        From leadership to digital transformation, find a practical solution for a stronger workforce.

      </p>

    </div>

    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      {programs.map((program) => (

        <div
          key={program.title}
          className="group relative overflow-hidden rounded-[30px] border border-indigo-100 bg-white p-7 shadow-[0_12px_35px_rgba(36,26,139,.09)] transition-all duration-500 hover:-translate-y-3 hover:border-indigo-200 hover:shadow-[0_25px_60px_rgba(36,26,139,.2)]"
        >

          <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-indigo-100/70 blur-2xl transition duration-500 group-hover:scale-150" />

          <div
            className={`relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${program.tone} text-white shadow-lg transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}
          >

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

            View Relevant Program

            <FiArrowRight />

          </button>

        </div>

      ))}

    </div>

    </div>
  </div>

</section>
{false && <>
<section className="relative overflow-hidden border-y border-indigo-100/80 bg-white/80 py-24 backdrop-blur-sm">

  <div className="mx-auto max-w-7xl px-6">

    <div className="grid items-center gap-16 lg:grid-cols-2">

      {/* LEFT */}

      <div>

        <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-5 py-2 text-sm font-bold uppercase tracking-widest text-orange-500 shadow-sm">

          BUSINESS IMPACT

        </span>

        <h2 className="mt-6 text-5xl font-black text-[#241A8B]">

          Build Better
          <br />
          Teams.
          <br />
          Drive Greater
          <br />
          Business Success.

        </h2>

        <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-orange-400 to-indigo-600" />

        <p className="mt-8 text-lg leading-9 text-gray-600">

          Organizations that continuously invest in learning stay ahead
          of change. NSFI helps businesses develop skilled professionals,
          strengthen leadership, improve productivity, and create a
          culture of innovation that delivers measurable business results.

        </p>

        <div className="mt-10 grid gap-4">

          {[
            "Customized corporate training aligned with business goals",
            "Leadership development for high-performing teams",
            "Digital transformation and future skills programs",
            "Professional certifications that enhance workforce capability",
            "Long-term learning partnerships for sustainable growth",
          ].map((item) => (

            <div
              key={item}
              className="flex items-center gap-4 rounded-2xl border bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
            >

              <FiCheckCircle className="text-green-600 text-xl" />

              <span className="font-semibold">

                {item}

              </span>

            </div>

          ))}

        </div>

      </div>

      {/* RIGHT */}

      <div className="relative">

        <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-orange-400/20 to-indigo-500/20 blur-3xl"></div>

        <div className="relative overflow-hidden rounded-[40px] border border-white bg-white p-4 shadow-[0_30px_80px_rgba(36,26,139,.2)]">

          <img
            src={careerImg}
            alt="Corporate Training"
            className="h-[600px] w-full rounded-[28px] object-cover transition duration-700 hover:scale-105"
          />

          <div className="absolute bottom-10 left-10 rounded-3xl bg-white/90 p-5 shadow-xl backdrop-blur">

            <div className="text-4xl font-black text-[#241A8B]">

              Future
              <br />
              Ready

            </div>

            <div className="text-gray-600">

              Building high-performing teams for lasting success

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>
</>}
{/* =========================================================
      PARTNER WITH NSFI
========================================================= */}

{false && <>
<section className="relative overflow-hidden bg-gradient-to-br from-[#120f4d] via-[#241A8B] to-[#4431d8] py-24 text-white">

  {/* Background Effects */}

  <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-orange-500/20 blur-[120px]" />

  <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-[120px]" />

  <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(to_right,#fff_1px,transparent_1px)] bg-[size:60px_60px]" />

  <div className="relative mx-auto max-w-6xl px-6 text-center">

    <span className="inline-flex rounded-full border border-orange-300/30 bg-orange-500/20 px-6 py-2 text-sm font-bold uppercase tracking-[0.25em] backdrop-blur">

      PARTNER WITH NSFI

    </span>

    <h2 className="mt-8 text-5xl font-black leading-tight md:text-6xl">

      Build A Future-Ready
      <br />

      <span className="text-orange-400">

        Workforce With NSFI

      </span>

    </h2>

    <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-indigo-100">

      Whether you're looking to upskill your workforce,
      develop future leaders, embrace digital transformation,
      or strengthen organizational capabilities, NSFI delivers
      customized learning solutions that create measurable
      business impact.

    </p>

    <div className="mt-14 flex flex-wrap justify-center gap-6">

      <button
        onClick={() => navigate("/contact")}
        className="rounded-2xl bg-orange-500 px-10 py-5 text-lg font-bold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-orange-500/40"
      >
        Partner With NSFI
      </button>

      <button
        onClick={() => navigate("/programs")}
        className="flex items-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-10 py-5 text-lg font-bold backdrop-blur transition-all duration-300 hover:bg-white hover:text-[#241A8B]"
      >
        Explore Solutions

        <FiArrowRight />

      </button>

    </div>

    <div className="mt-16 grid gap-8 md:grid-cols-3">

      <div className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-lg">

        <h3 className="text-4xl font-black text-orange-300">

          300+

        </h3>

        <p className="mt-2 text-indigo-100">

          Corporate Learning Programs

        </p>

      </div>

      <div className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-lg">

        <h3 className="text-4xl font-black text-orange-300">

          10000+

        </h3>

        <p className="mt-2 text-indigo-100">

          Professionals Trained

        </p>

      </div>

      <div className="rounded-3xl border border-white/15 bg-white/10 p-8 backdrop-blur-lg">

        <h3 className="text-4xl font-black text-orange-300">

          50+

        </h3>

        <p className="mt-2 text-indigo-100">

          Industry Domains Served

        </p>

      </div>

    </div>

  </div>

</section>
</>}
      </div>

      <Footer />

    </>

  );
};

export default Organizations;
