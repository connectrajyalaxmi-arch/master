const About = () => {
  const stories = [
    {
      title: "For School Students",
      highlight: "Build confidence early",
      description:
        "We help young learners discover their strengths, sharpen communication skills, and prepare for future academic and career opportunities with confidence.",
      icon: "✨",
      accent: "from-orange-50 to-amber-50",
    },
    {
      title: "For College Students",
      highlight: "Shape your career path",
      description:
        "Our programs guide college students through practical skills, industry readiness, and real-world exposure so they can stand out in a crowded job market.",
      icon: "🎓",
      accent: "from-blue-50 to-indigo-50",
    },
    {
      title: "For Companies & Organizations",
      highlight: "Grow capable talent",
      description:
        "We partner with organizations to build future-ready teams through tailored learning experiences, workforce alignment, and long-term growth support.",
      icon: "🏢",
      accent: "from-emerald-50 to-lime-50",
    },
  ];

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 w-full">
        <div className="w-full px-6">
          <br/>
          <br/>
          {/* <div className="mb-12 max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold text-[#241A8B] mb-4 leading-tight">
              Why Choose NSFI?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We're not just another training institute. We believe the right learning path should fit the learner, the stage of growth, and the future they want to build.
              That's why our programs are designed to support school students, college students, and organizations in meaningful ways.
            </p>
          </div> */}

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div
                key={index}
                className={`rounded-[1.5rem] border border-slate-200 bg-gradient-to-br ${story.accent} p-8 shadow-[0_20px_45px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(15,23,42,0.12)]`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-2xl mb-5 shadow-sm">
                  {story.icon}
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#241A8B]/70 mb-3">
                  {story.highlight}
                </p>
                <h3 className="text-xl font-bold text-[#241A8B] mb-3">{story.title}</h3>
                <p className="text-gray-600 leading-relaxed">{story.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="py-20 bg-white w-full">
        <div className="w-full px-6">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[#241A8B] leading-tight">
              The Path Forward
            </h2>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Every student has a different story. Some are looking to pivot careers. Others want to deepen expertise in their field.
                And some are searching for their path entirely.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Whatever your story is, we have a program designed to help you grow authentically and compete confidently.
              </p>
              <p className="text-gray-600 italic">
                "The most successful people aren't the ones who fit the mold—they're the ones who understood themselves first."
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
              <h3 className="text-2xl font-bold text-[#241A8B] mb-6">Ready to Start?</h3>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Browse our programs and find the one that resonates with your aspirations. Or tell us about yourself and let us suggest the perfect fit.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigate("/programs")}
                  className="btn btn-primary w-full py-3"
                >
                  View All Programs
                </button>
                <button
                  onClick={() => navigate("/inquiry")}
                  className="w-full py-3 px-4 text-base font-semibold rounded-none bg-orange-500 text-white hover:bg-orange-600 transition"
                >
                  Get Personalized Guidance
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      
    </>
  );
};

export default About;
