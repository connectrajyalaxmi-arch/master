import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface InquiryFormData {
  name: string;
  email: string;
  interests: string;
  background: string;
  message: string;
}

const Inquiry = () => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    email: "",
    interests: "",
    background: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          interests: "",
          background: "",
          message: "",
        });

        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="inquiry-section" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#241A8B] mb-6 leading-tight">
            Tell Us About Yourself
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Help us understand your goals, background, and interests. 
            We'll recommend programs that align with your aspirations and guide you toward the right choice.
          </p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-green-700 mb-2">Thank you!</h3>
            <p className="text-green-600 text-lg">
              We've received your inquiry. Our team will reach out to you within 24 hours with personalized program recommendations.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Tell us your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Background */}
              <div>
                <label htmlFor="background" className="block text-sm font-semibold text-gray-900 mb-2">
                  Educational Background
                </label>
                <select
                  id="background"
                  name="background"
                  value={formData.background}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select your background</option>
                  <option value="high-school">High School</option>
                  <option value="undergrad">Undergraduate</option>
                  <option value="postgrad">Postgraduate</option>
                  <option value="working-professional">Working Professional</option>
                  <option value="career-changer">Career Changer</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Areas of Interest */}
              <div>
                <label htmlFor="interests" className="block text-sm font-semibold text-gray-900 mb-2">
                  Areas of Interest
                </label>
                <select
                  id="interests"
                  name="interests"
                  value={formData.interests}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">Select what interests you</option>
                  <option value="software-development">Software Development</option>
                  <option value="data-science">Data Science & Analytics</option>
                  <option value="design">UI/UX Design</option>
                  <option value="cloud-devops">Cloud & DevOps</option>
                  <option value="cybersecurity">Cybersecurity</option>
                  <option value="ai-ml">AI & Machine Learning</option>
                  <option value="undecided">Not Sure Yet</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  What's Your Story? (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  placeholder="Tell us about your goals, challenges, or what you hope to achieve..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn btn-primary py-3 text-base font-semibold disabled:opacity-50"
              >
                {isLoading ? "Submitting..." : "Get Personalized Recommendations"}
              </button>

              <p className="text-center text-sm text-gray-500 mt-4">
                We respect your privacy. Your information will only be used to provide personalized guidance.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Inquiry;
