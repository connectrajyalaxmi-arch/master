import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Navbar from "../components/Navbar";
import { FiArrowRight } from "react-icons/fi";

interface Program {
  id: number;
  title: string;
  duration: string;
  level: string;
  description: string;
  skills: string[];
  price: string;
}

const Programs = () => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [enrollForm, setEnrollForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const programs: Program[] = [
    {
      id: 1,
      title: "Software Development Bootcamp",
      duration: "12 weeks",
      level: "Intermediate to Advanced",
      description: "Master full-stack development with modern technologies including React, Node.js, and cloud platforms.",
      skills: ["React", "Node.js", "AWS", "Docker", "PostgreSQL"],
      price: "₹49,999"
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      duration: "10 weeks",
      level: "Beginner to Intermediate",
      description: "Learn data analysis, machine learning, and visualization with Python and industry tools.",
      skills: ["Python", "ML", "Data Visualization", "SQL", "Tableau"],
      price: "₹39,999"
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      duration: "8 weeks",
      level: "Beginner to Advanced",
      description: "Design modern, user-centric interfaces with Figma, prototyping, and design thinking principles.",
      skills: ["Figma", "Prototyping", "User Research", "Design Systems"],
      price: "₹29,999"
    },
    {
      id: 4,
      title: "Cloud & DevOps Engineering",
      duration: "10 weeks",
      level: "Intermediate to Advanced",
      description: "Master cloud infrastructure, CI/CD pipelines, and DevOps best practices with AWS and Kubernetes.",
      skills: ["AWS", "Kubernetes", "Jenkins", "Terraform", "Docker"],
      price: "₹44,999"
    },
    {
      id: 5,
      title: "Cybersecurity Fundamentals",
      duration: "9 weeks",
      level: "Intermediate",
      description: "Learn security protocols, ethical hacking, and protection strategies for modern systems.",
      skills: ["Network Security", "Ethical Hacking", "Cryptography", "Penetration Testing"],
      price: "₹39,999"
    },
    {
      id: 6,
      title: "AI & Machine Learning",
      duration: "12 weeks",
      level: "Advanced",
      description: "Deep dive into neural networks, NLP, and cutting-edge AI technologies.",
      skills: ["TensorFlow", "PyTorch", "NLP", "Deep Learning", "Computer Vision"],
      price: "₹59,999"
    }
  ];

  const openEnrollModal = (program: Program) => {
    setSelectedProgram(program);
    setConfirmationMessage("");
    setEnrollForm({ name: "", email: "", phone: "", message: "" });
  };

  const closeEnrollModal = () => {
    setSelectedProgram(null);
  };

  const handleEnrollChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEnrollForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnrollSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Enroll submit handler fired", { enrollForm, selectedProgram });

    if (!enrollForm.name.trim() || !enrollForm.email.trim()) {
      alert("Please enter your name and email to enroll.");
      return;
    }

    if (!selectedProgram) {
      alert("Please select a program before submitting.");
      return;
    }

    try {
      console.log("Sending enrollment request to /api/enroll");
      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: enrollForm.name.trim(),
          email: enrollForm.email.trim(),
          phone: enrollForm.phone.trim(),
          message: enrollForm.message.trim(),
          program: selectedProgram.title,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit enrollment.");
      }

      setConfirmationMessage(
        `Thank you, ${enrollForm.name}! Your enrollment request for ${selectedProgram.title} has been received. You can track the status at /track using your email.`
      );
      setEnrollForm({ name: "", email: "", phone: "", message: "" });
      closeEnrollModal();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Enrollment failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-br from-[#241A8B] to-[#1a1466] text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">
            Our Programs
          </h1>
          <p className="text-xl text-gray-200">
            Industry-aligned skill development programs designed for success
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div key={program.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-32 flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">
                    {program.title}
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-orange-500">{program.duration}</span>
                    <span className="text-sm text-gray-600">{program.level}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 line-clamp-2">{program.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-600 mb-2">KEY SKILLS:</p>
                    <div className="flex flex-wrap gap-2">
                      {program.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t gap-4">
                    <span className="text-2xl font-bold text-[#241A8B]">{program.price}</span>
                    <button
                      onClick={() => openEnrollModal(program)}
                      className="btn btn-primary w-full sm:w-auto justify-center px-4 py-2 text-sm flex items-center gap-2"
                    >
                      Enroll <FiArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {confirmationMessage && (
            <div className="mt-10 rounded-xl bg-green-50 border border-green-200 p-6 text-green-800">
              {confirmationMessage}
            </div>
          )}
        </div>
      </section>

      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-10">
          <div className="w-full max-w-2xl rounded-none bg-white p-8 shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-[#241A8B]">Enroll in {selectedProgram.title}</h2>
                <p className="text-sm text-gray-500 mt-2">Complete the form and our admissions team will follow up shortly.</p>
              </div>
              <button onClick={closeEnrollModal} className="text-gray-500 hover:text-gray-900 text-xl font-bold">×</button>
            </div>

            <form onSubmit={handleEnrollSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700">Full Name *</span>
                  <input
                    type="text"
                    name="name"
                    value={enrollForm.name}
                    onChange={handleEnrollChange}
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#241A8B] focus:ring-2 focus:ring-[#241A8B]/20"
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700">Email *</span>
                  <input
                    type="email"
                    name="email"
                    value={enrollForm.email}
                    onChange={handleEnrollChange}
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#241A8B] focus:ring-2 focus:ring-[#241A8B]/20"
                    placeholder="you@example.com"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700">Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    value={enrollForm.phone}
                    onChange={handleEnrollChange}
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#241A8B] focus:ring-2 focus:ring-[#241A8B]/20"
                    placeholder="Mobile number"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-semibold text-gray-700">Program</span>
                  <input
                    type="text"
                    value={selectedProgram.title}
                    disabled
                    className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-600"
                  />
                </label>
              </div>

              <label className="block">
                <span className="text-sm font-semibold text-gray-700">Message</span>
                <textarea
                  name="message"
                  value={enrollForm.message}
                  onChange={handleEnrollChange}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#241A8B] focus:ring-2 focus:ring-[#241A8B]/20"
                  placeholder="Any questions or preferences"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button type="button" onClick={closeEnrollModal} className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="rounded-xl bg-[#241A8B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1a1466]">
                  Submit Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Why Choose NSFI Programs?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-3">📚</div>
              <h3 className="font-bold text-lg mb-2">Industry Expert Mentors</h3>
              <p className="text-gray-600">Learn from professionals working at top companies</p>
            </div>
            <div>
              <div className="text-4xl mb-3">💼</div>
              <h3 className="font-bold text-lg mb-2">Job Placement Support</h3>
              <p className="text-gray-600">Career guidance and placement assistance included</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-bold text-lg mb-2">Verified Certification</h3>
              <p className="text-gray-600">Industry-recognized certificates upon completion</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Programs;
