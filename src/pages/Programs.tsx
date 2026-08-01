import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FiSearch,
  FiClock,
  FiAward,
  FiUsers,
  FiArrowRight,
  FiBookOpen,
  FiBriefcase,
  FiCpu,
  FiTrendingUp,
} from "react-icons/fi";

type Category = "All" | "Students" | "Colleges" | "Organizations";

interface Program {
  id: number;
  title: string;
  category: Category;
  duration: string;
  mode: string;
  level: string;
  price: string;
  icon: React.ReactNode;
  description: string;
  skills: string[];

  certificate: string;
}

const Programs = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("All");
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

const [successMessage, setSuccessMessage] = useState("");
const [showSuccessModal, setShowSuccessModal] = useState(false);

const [enrollForm, setEnrollForm] = useState({
  name: localStorage.getItem("nsfi_user_name") || "",
  email: localStorage.getItem("nsfi_user_email") || "",
  phone: "",
  organization: "",
  message: "",
});

  const [searchTerm, setSearchTerm] = useState(
    () => searchParams.get("program") ?? ""
  );

  const [selectedProgram, setSelectedProgram] =
    useState<Program | null>(null);

  const programs: Program[] = [
    // ================= STUDENTS =================

    {
      id: 1,
      title: "Spoken English",
      category: "Students",
      duration: "6 Weeks",
      mode: "Offline",
      level: "Beginner",
      price: "₹4,999",
      icon: <FiBookOpen size={34} />,
      description:
        "Improve spoken English, vocabulary, grammar and public speaking confidence.",
      skills: [
        "Grammar",
        "Vocabulary",
        "Public Speaking",
        "Communication",
      ],
      certificate: "NSFI Faculty Development Program Certificate",


    },

    {
      id: 2,
      title: "AI Fundamentals",
      category: "Students",
      duration: "8 Weeks",
      mode: "Hybrid",
      level: "Beginner",
      price: "₹8,999",
      icon: <FiCpu size={34} />,
      description:
        "Learn ChatGPT, Generative AI, Prompt Engineering and AI productivity tools.",
      skills: [
        "ChatGPT",
        "Prompt Engineering",
        "AI Tools",
        "Productivity",
      ],
        certificate: "NSFI AI Fundamentals Completion Certificate",

    },

    {
      id: 3,
      title: "Career Readiness",
      category: "Students",
      duration: "4 Weeks",
      mode: "Offline",
      level: "Beginner",
      price: "₹3,999",
      icon: <FiUsers size={34} />,
      description:
        "Resume writing, interview preparation and personality development.",
      skills: [
        "Resume",
        "Interview",
        "Confidence",
        "Soft Skills",
      ],
      certificate: "NSFI Faculty Development Program Certificate",


    },

    {
      id: 10,
      title: "Business Analytics",
      category: "Students",
      duration: "8 Weeks",
      mode: "Hybrid",
      level: "Beginner",
      price: "Contact Us",
      icon: <FiBriefcase size={34} />,
      description: "Build business insight with dashboards, Excel, SQL, and reporting tools.",
      skills: ["Excel", "SQL", "Dashboards", "Business Intelligence"],
      certificate: "NSFI Business Analytics Completion Certificate",
    },
    {
      id: 11,
      title: "Human Resources",
      category: "Students",
      duration: "8 Weeks",
      mode: "Hybrid",
      level: "Beginner",
      price: "Contact Us",
      icon: <FiUsers size={34} />,
      description: "Develop recruitment, employee engagement, payroll, compliance, and HR management skills.",
      skills: ["Recruitment", "Employee Engagement", "Payroll", "HR Compliance"],
      certificate: "NSFI Human Resources Completion Certificate",
    },
    {
      id: 12,
      title: "Project Management",
      category: "Students",
      duration: "8 Weeks",
      mode: "Hybrid",
      level: "Beginner",
      price: "Contact Us",
      icon: <FiBriefcase size={34} />,
      description: "Learn planning, Agile methods, Scrum, execution, and team leadership.",
      skills: ["Project Planning", "Agile", "Scrum", "Leadership"],
      certificate: "NSFI Project Management Completion Certificate",
    },
    {
      id: 13,
      title: "Digital Marketing",
      category: "Students",
      duration: "8 Weeks",
      mode: "Hybrid",
      level: "Beginner",
      price: "Contact Us",
      icon: <FiTrendingUp size={34} />,
      description: "Create effective campaigns across search, social media, content, and analytics.",
      skills: ["SEO", "Social Media", "Google Ads", "Analytics"],
      certificate: "NSFI Digital Marketing Completion Certificate",
    },
    {
      id: 14,
      title: "Data Analytics",
      category: "Students",
      duration: "8 Weeks",
      mode: "Hybrid",
      level: "Beginner",
      price: "Contact Us",
      icon: <FiBookOpen size={34} />,
      description: "Analyze and visualize data with Excel, Power BI, SQL, and Python.",
      skills: ["Excel", "Power BI", "SQL", "Python"],
      certificate: "NSFI Data Analytics Completion Certificate",
    },
    {
      id: 15,
      title: "Professional Skills",
      category: "Students",
      duration: "6 Weeks",
      mode: "Offline",
      level: "Beginner",
      price: "Contact Us",
      icon: <FiUsers size={34} />,
      description: "Build communication, teamwork, leadership, and workplace readiness.",
      skills: ["Communication", "Teamwork", "Leadership", "Workplace Readiness"],
      certificate: "NSFI Professional Skills Completion Certificate",
    },
    {
      id: 16,
      title: "AI & Productivity Tools",
      category: "Students",
      duration: "6 Weeks",
      mode: "Hybrid",
      level: "Beginner",
      price: "Contact Us",
      icon: <FiCpu size={34} />,
      description: "Use modern AI and productivity tools to research, create, organize, and deliver better work.",
      skills: ["AI Tools", "Prompting", "Research", "Productivity"],
      certificate: "NSFI AI & Productivity Tools Completion Certificate",
    },
    {
      id: 17,
      title: "Career Launchpad",
      category: "Students",
      duration: "4 Weeks",
      mode: "Offline",
      level: "Beginner",
      price: "Contact Us",
      icon: <FiAward size={34} />,
      description: "Build your portfolio, prepare for interviews, and take confident steps toward your first opportunity.",
      skills: ["Portfolio", "Resume", "Interviews", "Career Planning"],
      certificate: "NSFI Career Launchpad Completion Certificate",
    },

    // ================= COLLEGES =================

    {
      id: 4,
      title: "Campus Recruitment Training",
      category: "Colleges",
      duration: "10 Weeks",
      mode: "Offline",
      level: "Intermediate",
      price: "Contact Us",
      icon: <FiAward size={34} />,
      description:
        "Comprehensive placement preparation for final year students.",
      skills: [
        "Aptitude",
        "Reasoning",
        "Coding",
        "Interviews",
      ],
      certificate: "NSFI Faculty Development Program Certificate",

 },

    {
      id: 5,
      title: "Faculty Development Program",
      category: "Colleges",
      duration: "5 Days",
      mode: "Offline",
      level: "Professional",
      price: "Contact Us",
      icon: <FiBookOpen size={34} />,
      description:
        "Upskill faculty members with emerging technologies and modern teaching methods.",
      skills: [
        "AI",
        "Teaching",
        "Technology",
        "Innovation",
      ],
      certificate: "NSFI Faculty Development Program Certificate",


    },

    {
      id: 6,
      title: "Coding Bootcamp",
      category: "Colleges",
      duration: "12 Weeks",
      mode: "Hybrid",
      level: "Intermediate",
      price: "Contact Us",
      icon: <FiCpu size={34} />,
      description:
        "Practical programming and project-based software development training.",
      skills: [
        "React",
        "Java",
        "Python",
        "Projects",
      ],
      certificate: "NSFI Faculty Development Program Certificate",


    },

    // ================= ORGANIZATIONS =================

    {
      id: 7,
      title: "Corporate Communication",
      category: "Organizations",
      duration: "3 Days",
      mode: "On-site",
      level: "Professional",
      price: "Custom Quote",
      icon: <FiUsers size={34} />,
      description:
        "Build professional communication and workplace collaboration.",
      skills: [
        "Communication",
        "Presentation",
        "Leadership",
        "Teamwork",
      ],
      certificate: "NSFI Faculty Development Program Certificate",


    },

    {
      id: 8,
      title: "AI for Business",
      category: "Organizations",
      duration: "2 Days",
      mode: "On-site",
      level: "Professional",
      price: "Custom Quote",
      icon: <FiCpu size={34} />,
      description:
        "Empower teams with AI tools to improve productivity and decision making.",
      skills: [
        "Generative AI",
        "Automation",
        "Copilot",
        "ChatGPT",
      ],
      certificate: "NSFI Faculty Development Program Certificate",
    },

    {
      id: 9,
      title: "Leadership Excellence",
      category: "Organizations",
      duration: "5 Days",
      mode: "Hybrid",
      level: "Advanced",
      price: "Custom Quote",
      icon: <FiBriefcase size={34} />,
      description:
        "Develop high-performing leaders with modern management practices.",
      skills: [
        "Leadership",
        "Coaching",
        "Strategy",
        "Decision Making",
      ],
      certificate: "NSFI Faculty Development Program Certificate",

    },
    {
      id: 18,
      title: "Corporate Upskilling",
      category: "Organizations",
      duration: "Customizable",
      mode: "On-site",
      level: "Professional",
      price: "Custom Quote",
      icon: <FiBriefcase size={34} />,
      description: "Enhance employee capabilities with practical, industry-focused learning programs.",
      skills: ["Workplace Skills", "Productivity", "Collaboration", "Performance"],
      certificate: "NSFI Corporate Upskilling Certificate",
    },
    {
      id: 19,
      title: "Leadership Development",
      category: "Organizations",
      duration: "Customizable",
      mode: "Hybrid",
      level: "Professional",
      price: "Custom Quote",
      icon: <FiUsers size={34} />,
      description: "Develop confident leaders through structured management and leadership training.",
      skills: ["Leadership", "Coaching", "Decision Making", "Team Management"],
      certificate: "NSFI Leadership Development Certificate",
    },
    {
      id: 20,
      title: "Customized Learning",
      category: "Organizations",
      duration: "Customizable",
      mode: "Hybrid",
      level: "Professional",
      price: "Custom Quote",
      icon: <FiBriefcase size={34} />,
      description: "Training solutions tailored to your organization's goals, teams, and business challenges.",
      skills: ["Needs Analysis", "Learning Design", "Team Enablement", "Business Goals"],
      certificate: "NSFI Customized Learning Certificate",
    },
    {
      id: 21,
      title: "Digital Transformation",
      category: "Organizations",
      duration: "Customizable",
      mode: "Hybrid",
      level: "Professional",
      price: "Custom Quote",
      icon: <FiTrendingUp size={34} />,
      description: "Empower your workforce with AI, automation, analytics, and emerging technologies.",
      skills: ["AI", "Automation", "Analytics", "Digital Strategy"],
      certificate: "NSFI Digital Transformation Certificate",
    },
    {
      id: 22,
      title: "Professional Certifications",
      category: "Organizations",
      duration: "Customizable",
      mode: "Hybrid",
      level: "Professional",
      price: "Custom Quote",
      icon: <FiAward size={34} />,
      description: "Industry-recognized certifications that strengthen employee expertise and credibility.",
      skills: ["Validation", "Professional Growth", "Expertise", "Career Progression"],
      certificate: "NSFI Professional Certification",
    },
    {
      id: 23,
      title: "Corporate Workshops",
      category: "Organizations",
      duration: "Customizable",
      mode: "On-site",
      level: "Professional",
      price: "Custom Quote",
      icon: <FiBookOpen size={34} />,
      description: "Interactive workshops, bootcamps, and expert-led learning experiences.",
      skills: ["Problem Solving", "Collaboration", "Innovation", "Applied Learning"],
      certificate: "NSFI Corporate Workshop Certificate",
    },
    {
      id: 24,
      title: "Future Skills",
      category: "Organizations",
      duration: "Customizable",
      mode: "Hybrid",
      level: "Professional",
      price: "Custom Quote",
      icon: <FiCpu size={34} />,
      description: "Prepare your workforce with AI, data analytics, cloud computing, and digital marketing.",
      skills: ["AI", "Data Analytics", "Cloud", "Digital Marketing"],
      certificate: "NSFI Future Skills Certificate",
    },
    {
      id: 25,
      title: "Strategic Partnerships",
      category: "Organizations",
      duration: "Customizable",
      mode: "Hybrid",
      level: "Professional",
      price: "Custom Quote",
      icon: <FiArrowRight size={34} />,
      description: "Partner with NSFI to build a future-ready, highly skilled workforce.",
      skills: ["Workforce Strategy", "Talent Development", "Partnership", "Growth Planning"],
      certificate: "NSFI Strategic Partnership Certificate",
    },
  ];

  useEffect(() => {
    if (searchParams.get("enroll") !== "1") return;

    const program = programs.find(
      (item) => item.title === searchParams.get("program")
    );

    if (program) {
      setSelectedProgram(program);
      setShowEnrollModal(true);
    }
  }, [searchParams]);

  const startEnrollment = (program: Program) => {
    const isAuthenticated = Boolean(
      localStorage.getItem("nsfi_user_email") ||
        sessionStorage.getItem("nsfi_user_email")
    );

    if (isAuthenticated) {
      setSelectedProgram(program);
      setShowEnrollModal(true);
      return;
    }

    navigate(
      `/signup?program=${encodeURIComponent(program.title)}&enroll=1`
    );
  };

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      const categoryMatch =
        selectedCategory === "All" ||
        program.category === selectedCategory;

      const searchMatch =
        program.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        program.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [programs, selectedCategory, searchTerm]);

  const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;

  setEnrollForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const submitEnrollment = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!enrollForm.name || !enrollForm.email) {
    alert("Please enter your Name and Email.");
    return;
  }

  try {
    const response = await fetch("http://localhost:4000/api/enroll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: enrollForm.name,
        email: enrollForm.email,
        phone: enrollForm.phone,
        message: enrollForm.message,
        program: selectedProgram?.title,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Enrollment failed.");
      return;
    }

    setSuccessMessage(
      `Thank you ${enrollForm.name}! Your enrollment request for "${selectedProgram?.title}" has been received.`
    );

    setShowSuccessModal(true);
    setShowEnrollModal(false);
    setSelectedProgram(null);

    setEnrollForm({
      name: "",
      email: "",
      phone: "",
      organization: "",
      message: "",
    });

  } catch (err) {
    console.error(err);
    alert("Unable to connect to server.");
  }
};
    return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
<div className="mb-8 text-center">
  <h1 className="text-4xl font-black text-[#241A8B]">
    Explore Our Programs
  </h1>

  <p className="mt-3 text-lg text-gray-600">
    Find the right learning program for your goals.
  </p>
</div>
      

      {/* ================= SEARCH & FILTER ================= */}

<section className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur">

  <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">

    {/* Search */}

    <div className="flex h-14 w-full items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 shadow-sm transition-all focus-within:border-[#241A8B] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#241A8B]/20 lg:w-[420px]">

      <FiSearch size={22} className="pointer-events-none shrink-0 text-slate-400" />

      <input
        type="text"
        placeholder="Search programs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="h-full min-w-0 flex-1 bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400"
      />

    </div>

    {/* Category Buttons */}

    <div className="flex flex-wrap items-center gap-3">

      {(
        ["All", "Students", "Colleges", "Organizations"] as Category[]
      ).map((category) => (

        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`min-w-[108px] rounded-full border px-6 py-3 text-base font-bold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#241A8B] focus-visible:ring-offset-2
            ${
              selectedCategory === category
                ? "border-[#241A8B] bg-[#241A8B] text-white shadow-lg shadow-[#241A8B]/20"
                : "border-slate-200 bg-white text-slate-700 shadow-sm hover:-translate-y-0.5 hover:border-[#241A8B]/30 hover:bg-[#241A8B] hover:text-white hover:shadow-md"
            }
          `}
        >
          {category}
        </button>

      ))}

    </div>

  </div>

</section>
      {/* ================= PROGRAMS ================= */}

      <section className="bg-gray-50 py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12">

            <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">

              EXPLORE PROGRAMS

            </span>

            <h2 className="mt-6 text-5xl font-black text-[#241A8B]">

              Find The Right Learning Journey

            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">

              Browse our carefully designed learning experiences and choose
              the program that matches your goals.

            </p>

          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                        {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="group overflow-hidden rounded-[32px] bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                {/* Top Header */}

                <div className="relative overflow-hidden bg-gradient-to-br from-[#241A8B] to-indigo-700 p-8 text-white">

                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 transition duration-500 group-hover:scale-150"></div>

                  <div className="relative">

                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">

                      {program.icon}

                    </div>

                    <h3 className="mt-8 text-3xl font-black leading-tight">

                      {program.title}

                    </h3>

                    <p className="mt-3 text-indigo-100">

                      {program.description}

                    </p>

                  </div>

                </div>

                {/* Card Body */}

                <div className="p-8">

                  {/* Badges */}

                  <div className="mb-8 flex flex-wrap gap-3">

                    <span className="flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">

                      <FiClock />

                      {program.duration}

                    </span>

                    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                      {program.level}

                    </span>

                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

                      {program.mode}

                    </span>

                  </div>

                  {/* Skills */}

                  <div>

                    <p className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-500">

                      Skills You'll Learn

                    </p>

                    <div className="flex flex-wrap gap-3">

                      {program.skills.map((skill) => (

                        <span
                          key={skill}
                          className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:border-[#241A8B] hover:bg-[#241A8B] hover:text-white"
                        >
                          {skill}
                        </span>

                      ))}

                    </div>

                  </div>

                  {/* Price */}

                  <div className="mt-10 flex items-center justify-between border-t pt-8">

                    <div>

                      <p className="text-sm text-gray-500">

                        Program Fee

                      </p>

                      <h3 className="mt-2 text-3xl font-black text-[#241A8B]">

                        {program.price}

                      </h3>

                    </div>

                  </div>

                  {/* Buttons */}

                  <div className="mt-10 flex flex-col gap-4">
<button
  onClick={() => {
    setSelectedProgram(program);
    setShowDetailsModal(true);
  }}
  className="flex items-center justify-center gap-3 rounded-2xl border-2 border-[#241A8B] py-4 font-semibold text-[#241A8B] transition hover:bg-[#241A8B] hover:text-white"
>
  Learn More
  <FiArrowRight />
</button>

  <button
  onClick={() => startEnrollment(program)}
  className="mt-10 w-full rounded-2xl bg-orange-500 py-4 text-lg font-bold text-white transition hover:bg-orange-600"
>
  Enroll Now
</button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

            {/* ================= PROGRAM DETAILS MODAL ================= */}

            {/* ================= LEARN MORE MODAL ================= */}

{showDetailsModal && selectedProgram && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">

    <div className="w-full max-w-4xl rounded-[32px] bg-white p-10 shadow-2xl">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-black text-[#241A8B]">
            {selectedProgram.title}
          </h2>

          <p className="mt-2 text-gray-600">
            {selectedProgram.description}
          </p>

        </div>

        <button
          onClick={() => {
            setShowDetailsModal(false);
            setSelectedProgram(null);
          }}
          className="text-4xl"
        >
          ×
        </button>

      </div>

      {/* Information */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-gray-100 p-6">

          <h3 className="mb-4 text-xl font-bold">
            Program Information
          </h3>

          <p><strong>Category:</strong> {selectedProgram.category}</p>

          <p className="mt-3">
            <strong>Duration:</strong> {selectedProgram.duration}
          </p>

          <p className="mt-3">
            <strong>Mode:</strong> {selectedProgram.mode}
          </p>

          <p className="mt-3">
            <strong>Level:</strong> {selectedProgram.level}
          </p>

          <p className="mt-3">
            <strong>Fee:</strong> {selectedProgram.price}
          </p>

        </div>

<div className="rounded-2xl bg-orange-50 p-6">

  <h3 className="mb-4 text-xl font-bold">
    Skills Covered
  </h3>

  <div className="flex flex-wrap gap-3">
    {selectedProgram.skills.map((skill) => (
      <span
        key={skill}
        className="rounded-full bg-orange-500 px-4 py-2 text-white"
      >
        {skill}
      </span>
    ))}
  </div>

  <div className="mt-8 rounded-2xl bg-green-50 p-6">
    <h3 className="mb-4 text-xl font-bold text-[#241A8B]">
      📜 Certificate Information
    </h3>

    <p className="text-gray-700">
      {selectedProgram.certificate}
    </p>
  </div>

</div>

      </div>

      {/* Bottom Buttons */}

      <div className="mt-10 flex justify-end gap-4">

        <button
          onClick={() => {
            setShowDetailsModal(false);
            setSelectedProgram(null);
          }}
          className="rounded-xl border px-8 py-3"
        >
          Close
        </button>

        <button
          onClick={() => {
            setShowDetailsModal(false);
            startEnrollment(selectedProgram);
          }}
          className="rounded-xl bg-orange-500 px-8 py-3 font-bold text-white hover:bg-orange-600"
        >
          Enroll Now
        </button>

      </div>

    </div>

  </div>
)}

      {showEnrollModal && selectedProgram && (
<div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-6">

<div className="w-full max-w-3xl rounded-[32px] bg-white p-10 shadow-2xl">

<div className="mb-8 flex items-center justify-between">

<h2 className="text-3xl font-black text-[#241A8B]">

Program Enrollment

</h2>

<button
onClick={() => {
  setShowEnrollModal(false);
  setSelectedProgram(null);
}}className="text-3xl"
>

×

</button>

</div>

<form onSubmit={submitEnrollment} className="space-y-6">

<div className="grid gap-6 md:grid-cols-2">

<div>

<label className="font-semibold">

Full Name *

</label>

<input
type="text"
name="name"
value={enrollForm.name}
onChange={handleInputChange}
className="mt-2 w-full rounded-xl border p-4"
/>

</div>

<div>

<label className="font-semibold">

Email *

</label>

<input
type="email"
name="email"
value={enrollForm.email}
onChange={handleInputChange}
className="mt-2 w-full rounded-xl border p-4"
/>

</div>

<div>

<label className="font-semibold">

Phone

</label>

<input
type="tel"
name="phone"
value={enrollForm.phone}
onChange={handleInputChange}
className="mt-2 w-full rounded-xl border p-4"
/>

</div>

<div>

<label className="font-semibold">

College / Company

</label>

<input
type="text"
name="organization"
value={enrollForm.organization}
onChange={handleInputChange}
className="mt-2 w-full rounded-xl border p-4"
/>

</div>

</div>

<div>

<label className="font-semibold">

Selected Program

</label>

<input
disabled
value={selectedProgram.title}
className="mt-2 w-full rounded-xl bg-gray-100 p-4"
/>

</div>

<div>

<label className="font-semibold">

Message

</label>

<textarea
rows={5}
name="message"
value={enrollForm.message}
onChange={handleInputChange}
className="mt-2 w-full rounded-xl border p-4"
/>

</div>

<div className="flex justify-end gap-4">

<button
  type="button"
  onClick={() => {
    setShowEnrollModal(false);
    setSelectedProgram(null);
  }}
  className="rounded-xl border px-8 py-3"
>
  Cancel
</button>

<button
type="submit"
className="rounded-xl bg-[#241A8B] px-8 py-3 font-semibold text-white hover:bg-[#1b1469]"
>

Submit Enrollment

</button>

</div>

</form>

</div>

</div>
)}

{showSuccessModal && (
  <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-6">
    <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-2xl">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <svg
          className="h-10 w-10 text-green-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="mt-6 text-3xl font-black text-[#241A8B]">
        Enrollment Successful!
      </h2>

      <p className="mt-4 leading-7 text-gray-600">
        {successMessage}
      </p>

      <button
        onClick={() => {
          setShowSuccessModal(false);
          setSuccessMessage("");
        }}
        className="mt-8 w-full rounded-2xl bg-[#241A8B] py-4 text-lg font-semibold text-white transition hover:bg-[#1b1469]"
      >
        Continue Browsing
      </button>

    </div>
  </div>
)}

      <Footer />
    </>
  );
};

export default Programs;
