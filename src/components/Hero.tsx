import heroImage from "../assets/hero.jpg.jpeg";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">

      <img
        src={heroImage}
        alt="Students"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-20 w-full bg-orange-500/95 text-white py-3 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-sm md:text-base font-semibold">
            National Skill Forge Institute — empowering students with industry-aligned skills
          </div>
        </div>
      </div>

      <div className="relative w-full mx-auto px-6 py-16 lg:py-20 flex flex-col items-center justify-center z-20">

        <div className="text-white w-full">

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-center" style={{letterSpacing: '-1px'}}>
            You're More Than a Resume
          </h1>

          <p className="text-lg md:text-xl text-gray-100 font-light leading-relaxed mb-8 w-full text-center">
            In a competitive world, what sets you apart isn't just what you know—it's who you become.
            We believe in uncovering your unique potential and building skills that reflect your individuality.
          </p>

          <p className="text-base md:text-lg text-gray-200 font-light leading-relaxed mb-20 w-full text-center">
            Discover a program that aligns with your aspirations and transforms how you see yourself.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
            <button
              onClick={() => navigate("/programs")}
              className="w-full sm:w-auto px-14 py-6 text-lg font-semibold rounded-none bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-0.5 transition"
            >
              Explore Your Path
            </button>

            <button
              onClick={() => navigate("/inquiry")}
              className="w-full sm:w-auto px-14 py-6 text-lg font-semibold rounded-none bg-transparent text-white border-2 border-white hover:bg-white/10 hover:shadow transform hover:-translate-y-0.5 transition"
            >
              Tell Us About You
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;