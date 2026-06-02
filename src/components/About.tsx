import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const stories = [
    {
      title: "Find Your Voice",
      description:
        "Your unique perspective is your strength. We help you develop skills that amplify who you already are, not who someone else wants you to be.",
      icon: "✨",
    },
    {
      title: "Navigate Wisely",
      description:
        "In a competitive landscape, choice matters. We guide you through programs aligned with your aspirations, not just market trends.",
      icon: "🧭",
    },
    {
      title: "Transform Meaningfully",
      description:
        "Real growth comes from understanding yourself. We build skills that create lasting impact and authentic confidence.",
      icon: "🚀",
    },
  ];

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 w-full">
        <div className="w-full px-6">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#241A8B] mb-4 leading-tight">
              Why Choose NSFI?
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-full">
              We're not just another training institute. We believe that the best career path is the one that honors your individuality.
              That's why our approach starts with understanding you—your dreams, your challenges, your unique perspective.
            </p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div
                key={index}
                className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{story.icon}</div>
                <h3 className="text-xl font-bold text-[#241A8B] mb-3">{story.title}</h3>
                <p className="text-gray-600 leading-relaxed">{story.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white w-full">
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
      </section>
    </>
  );
};

export default About;
