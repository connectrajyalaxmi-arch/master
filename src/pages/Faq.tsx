import { useState } from "react";
import { FiChevronDown, FiHelpCircle } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqs = [
  ["What is NSFI?", "National Skill Forge Institute (NSFI) helps students, colleges, and organizations build practical, industry-relevant skills through learning programs, workshops, certifications, and career support."],
  ["Who can join NSFI programs?", "Students, fresh graduates, working professionals, colleges, and organizations can explore the learning pathways designed for their goals."],
  ["What kinds of programs does NSFI offer?", "NSFI offers programs in business, technology, communication, leadership, data, digital marketing, career readiness, and other emerging skills."],
  ["Are the programs practical or only theoretical?", "Programs focus on practical learning through projects, case studies, expert sessions, assignments, workshops, and real-world application."],
  ["Will I receive a certificate?", "Eligible NSFI programs include a completion certificate that you can add to your resume, LinkedIn profile, or professional portfolio."],
  ["Does NSFI provide placement or internship support?", "Selected student programs include career guidance, resume support, interview practice, internship opportunities, and placement-readiness assistance."],
  ["How do I enroll in a program?", "Choose a program on the Programs page, select Enroll Now, create or sign in to your account, and submit your enrollment details."],
  ["Can colleges partner with NSFI?", "Yes. NSFI works with colleges on industry-integrated training, faculty development, workshops, certifications, placement preparation, and internship pathways."],
  ["Can organizations request customized training?", "Yes. Organizations can work with NSFI to design tailored corporate learning solutions aligned with their teams, roles, and business goals."],
  ["Are online and offline learning options available?", "Availability depends on the program. NSFI offers online, offline, hybrid, on-campus, and on-site learning formats where applicable."],
  ["How can I track an enrollment or inquiry?", "After submitting your details, you can sign in to your profile to monitor your submitted enrollments and inquiries."],
  ["How can I contact NSFI?", "Visit the Contact page to share your question or requirement. The NSFI team will review it and get back to you."],
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-gradient-to-br from-[#f8faff] via-white to-orange-50">
        <section className="relative overflow-hidden bg-[#0B0D5C] px-6 py-20 text-white md:py-24">
          <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(251,146,60,.3),transparent_25%),radial-gradient(circle_at_85%_70%,rgba(99,102,241,.5),transparent_30%)]" />
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(to_right,#fff_1px,transparent_1px)] bg-[size:52px_52px]" />
          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/30 bg-white/10 px-5 py-2 text-sm font-black tracking-[0.18em] text-orange-200">HELP CENTRE</span>
            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">Frequently Asked Questions</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-indigo-100">Everything you need to know about learning, partnering, and growing with NSFI.</p>
          </div>
        </section>

        <section className="relative px-6 py-16 md:py-24">
          <div aria-hidden="true" className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-200/35 blur-3xl" />
          <div aria-hidden="true" className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
          <div className="relative mx-auto max-w-5xl rounded-[40px] border border-white/80 bg-white/80 p-5 shadow-[0_25px_80px_rgba(36,26,139,.12)] backdrop-blur-sm md:p-10">
            <div className="mb-8 text-center">
              <FiHelpCircle className="mx-auto h-11 w-11 text-orange-500" />
              <h2 className="mt-4 text-3xl font-black text-[#241A8B] md:text-4xl">How can we help?</h2>
            </div>
            <div className="space-y-4">
              {faqs.map(([question, answer], index) => {
                const isOpen = openIndex === index;
                return (
                  <article key={question} className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm transition hover:border-indigo-200 hover:shadow-md">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left text-lg font-bold text-[#241A8B] md:px-7"
                    >
                      <span>{question}</span>
                      <FiChevronDown className={`shrink-0 text-orange-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && <p className="border-t border-indigo-50 px-6 py-5 leading-7 text-slate-600 md:px-7">{answer}</p>}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Faq;
