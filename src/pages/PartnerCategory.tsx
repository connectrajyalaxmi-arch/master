import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

const partnerContent: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  cta: string;
  banner: string;
}> = {
  companies: {
    title: "Corporate Partnership",
    subtitle: "Scale your workforce with custom, industry-ready talent",
    description: "Work with NSFI to build tailored learning journeys for your employees, bridge skill gaps, and accelerate digital transformation in your company.",
    highlights: [
      "Role-based training for product, engineering, sales, and leadership teams",
      "Flexible cohort schedules: on-site, hybrid, or remote delivery",
      "Business-aligned projects and certification-ready outcomes",
      "Continuous analytics and ROI tracking for every program"
    ],
    cta: "Explore corporate solutions",
    banner: "Partner with NSFI to create future-ready teams through practical upskilling and strong employer branding."
  },
  colleges: {
    title: "College Collaboration",
    subtitle: "Enhance academic programs with real-world industry exposure",
    description: "Partner with NSFI to enrich your college curriculum with practical labs, faculty mentorship, internship pipelines, and live industry projects.",
    highlights: [
      "Curriculum integration with workshops and hands-on bootcamps",
      "Faculty development and guest lectures by industry experts",
      "Student internship and placement support",
      "Co-branded events, hackathons, and career readiness clinics"
    ],
    cta: "Build academic partnerships",
    banner: "Create stronger student outcomes with collaborative programs that connect classroom learning to industry needs."
  },
  schools: {
    title: "School Empowerment",
    subtitle: "Launch future-ready learning for today’s young learners",
    description: "We help schools design age-appropriate technology, career awareness, and critical-thinking pathways that inspire students and support teachers.",
    highlights: [
      "STEAM-focused workshops and skill-building modules",
      "Teacher training for modern classroom delivery",
      "Student innovation clubs, competitions, and portfolio development",
      "Parent engagement programs that highlight student progress"
    ],
    cta: "Discover school programs",
    banner: "Bring innovation to your school with flexible programs that motivate learners and prepare them for tomorrow."
  },
  institutes: {
    title: "Institute Alliances",
    subtitle: "Collaborate with advanced training and research institutions",
    description: "Build long-term institute partnerships that combine specialized training, lab-ready talent, and collaborative research for deep technical learning.",
    highlights: [
      "Custom certification pathways and advanced skill tracks",
      "Joint research, incubation, and industry lab programs",
      "Executive education and leadership upskilling",
      "Market-aligned specializations for emerging technology domains"
    ],
    cta: "Partner with institutes",
    banner: "Create strategic opportunities for institutional growth through innovation, talent development, and knowledge exchange."
  }
};

const PartnerCategory = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const details = category ? partnerContent[category.toLowerCase()] : undefined;

  if (!category || !details) {
    return (
      <>
        <Navbar />
        <section className="bg-[#241A8B] text-white py-24">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-4">Choose a partnership path</h1>
            <p className="text-lg text-gray-200 mb-8">
              Explore our dedicated partnership pages for companies, colleges, schools, and institutes.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(partnerContent).map(([key, item]) => (
                <button
                  key={key}
                  onClick={() => navigate(`/partner/${key}`)}
                  className="rounded-none bg-white text-[#241A8B] px-6 py-5 font-semibold shadow-lg hover:bg-gray-100 transition"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-br from-[#241A8B] to-[#1a1466] text-white py-24">
        <div className="max-w-6xl mx-auto px-6 grid gap-10 lg:grid-cols-2 items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300 mb-4">{details.title}</p>
            <h1 className="text-5xl font-bold mb-6">{details.subtitle}</h1>
            <p className="text-lg text-gray-100 leading-relaxed mb-8">{details.description}</p>
            <button
              onClick={() => navigate("/partner")}
              style={{ borderRadius: 0 }}
              className="inline-flex items-center gap-2 rounded-none bg-orange-500 text-white px-7 py-3 font-semibold shadow-[0_20px_50px_-20px_rgba(249,115,22,0.8)] hover:bg-orange-400 hover:shadow-[0_25px_60px_-30px_rgba(249,115,22,0.9)] hover:-translate-y-0.5 transition-transform duration-200"
            >
              Request a custom plan
            </button>
          </div>
          <div className="rounded-none bg-white/10 border border-white/20 p-10 shadow-2xl backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300 mb-4">Why this matters</p>
            <h2 className="text-3xl font-semibold text-white mb-4">{details.banner}</h2>
            <ul className="space-y-4 text-gray-200 mt-6">
              {details.highlights.map((item) => (
                <li key={item} className="flex gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-none bg-orange-500 text-white font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {Object.entries(partnerContent).map(([key, item]) => (
              <button
                key={key}
                onClick={() => navigate(`/partner/${key}`)}
                className="rounded-none bg-white border border-gray-200 p-8 text-left shadow-sm hover:shadow-lg transition"
              >
                <p className="text-sm uppercase tracking-[0.3em] text-[#241A8B] mb-2">{item.title}</p>
                <h3 className="text-2xl font-semibold mb-3">{item.subtitle}</h3>
                <p className="text-gray-600">{item.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PartnerCategory;
