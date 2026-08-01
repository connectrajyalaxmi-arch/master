const ProgramHero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#241A8B] via-[#3327B5] to-[#241A8B] text-white">

      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-orange-400 blur-3xl"></div>

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-300 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-28">

        <span className="inline-block bg-orange-500 px-5 py-2 rounded-full text-sm font-semibold mb-6">
          🚀 Industry Ready Programs
        </span>

        <h1 className="text-5xl md:text-7xl font-black leading-tight">

          Learn Skills.

          <br />

          Build Careers.

        </h1>

        <p className="mt-8 max-w-2xl text-xl text-indigo-100 leading-8">

          Transform your future with industry-aligned training programs,
          expert mentors, live projects, certifications and placement support.

        </p>

        <div className="flex flex-wrap gap-5 mt-10">

          <button className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-semibold transition">

            Explore Programs

          </button>

          <button className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-[#241A8B] transition">

            Talk to Advisor

          </button>

        </div>

      </div>

    </section>
  );
};

export default ProgramHero;