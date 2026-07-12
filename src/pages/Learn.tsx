import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const resources = [
  {
    title: "HTML",
    icon: "🌐",
    description: "Learn the structure and fundamentals of web pages.",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    color: "bg-orange-100",
  },
  {
    title: "CSS",
    icon: "🎨",
    description: "Create beautiful and responsive websites using CSS.",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    color: "bg-blue-100",
  },
  {
    title: "JavaScript",
    icon: "⚡",
    description: "Master JavaScript from beginner to advanced concepts.",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    color: "bg-yellow-100",
  },
  {
    title: "React",
    icon: "⚛️",
    description: "Build modern user interfaces using React.",
    url: "https://react.dev/",
    color: "bg-cyan-100",
  },
  {
    title: "TypeScript",
    icon: "🔷",
    description: "Write scalable JavaScript applications with TypeScript.",
    url: "https://www.typescriptlang.org/docs/",
    color: "bg-indigo-100",
  },
  {
    title: "Node.js",
    icon: "🟢",
    description: "Develop powerful backend applications using Node.js.",
    url: "https://nodejs.org/en/docs",
    color: "bg-green-100",
  },
  {
    title: "Express.js",
    icon: "🚀",
    description: "Create REST APIs and backend services with Express.",
    url: "https://expressjs.com/",
    color: "bg-gray-100",
  },
  {
    title: "MongoDB",
    icon: "🍃",
    description: "Learn NoSQL database development with MongoDB.",
    url: "https://www.mongodb.com/docs/",
    color: "bg-green-50",
  },
  {
    title: "Git",
    icon: "🐙",
    description: "Version control and collaboration using Git.",
    url: "https://git-scm.com/doc",
    color: "bg-red-100",
  },
  {
    title: "GitHub",
    icon: "💻",
    description: "Host and collaborate on software projects.",
    url: "https://docs.github.com/",
    color: "bg-slate-100",
  },
];

const Learn = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#241A8B] text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Free Learning Resources
          </h1>

          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Explore official documentation and learning materials for the
            latest web development technologies. These resources are trusted by
            developers worldwide.
          </p>
        </div>
      </section>

      {/* Resources */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {resources.map((item) => (

              <div
                key={item.title}
                className="bg-white rounded-none shadow-lg hover:shadow-2xl transition duration-300 border"
              >

                <div className={`${item.color} p-8 text-center`}>

                  <div className="text-6xl">
                    {item.icon}
                  </div>

                </div>

                <div className="p-8">

                  <h2 className="text-2xl font-bold text-[#241A8B] mb-4">
                    {item.title}
                  </h2>

                  <p className="text-gray-600 mb-6">
                    {item.description}
                  </p>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-[#241A8B] text-white py-3 font-semibold hover:bg-[#1b1464] transition"
                  >
                    Visit Official Website
                  </a>

                </div>

              </div>

            ))}

          </div>
        </div>
      </section>

      {/* Why Learn */}
      <section className="py-20 bg-white">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-[#241A8B] mb-12">
            Why Learn From Official Documentation?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="border p-8 shadow">
              <h3 className="text-xl font-bold mb-3">
                ✅ Latest Content
              </h3>

              <p className="text-gray-600">
                Official documentation is always updated with the newest
                features and best practices.
              </p>
            </div>

            <div className="border p-8 shadow">
              <h3 className="text-xl font-bold mb-3">
                📚 Trusted Source
              </h3>

              <p className="text-gray-600">
                Learn directly from the creators and maintainers of the
                technology.
              </p>
            </div>

            <div className="border p-8 shadow">
              <h3 className="text-xl font-bold mb-3">
                🚀 Career Ready
              </h3>

              <p className="text-gray-600">
                Build real-world skills that companies expect from developers.
              </p>
            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default Learn;