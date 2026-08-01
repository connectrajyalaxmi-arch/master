import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
// import About from "../components/About";
import Footer from "../components/Footer";
import Journey from "../components/Journey";
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Hero />
      {/* <About /> */}
      <Journey/>

      <section className="relative overflow-hidden bg-[#0B0D5C] px-6 py-14 text-white md:py-16">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(251,146,60,.35),transparent_25%),radial-gradient(circle_at_85%_80%,rgba(99,102,241,.45),transparent_30%)]" />
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(to_right,#fff_1px,transparent_1px)] bg-[size:52px_52px]" />
        <div className="relative mx-auto max-w-5xl text-center">
          <span className="block text-6xl font-black leading-none text-orange-300 md:text-7xl">“</span>
          <blockquote className="mt-4 text-2xl font-black leading-tight md:text-4xl">
            “The future belongs to people who keep learning, building, and showing up.”
          </blockquote>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-indigo-100 md:text-lg">
            At NSFI, every learning experience is designed to move you one confident step closer to your next opportunity.
          </p>
          <button
            onClick={() => navigate("/programs")}
            className="mx-auto mt-6 inline-flex items-center gap-3 rounded-2xl bg-orange-500 px-6 py-3 font-bold text-white shadow-lg shadow-orange-950/30 transition hover:-translate-y-1 hover:bg-orange-400"
          >
            Explore Programs <FiArrowRight />
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
