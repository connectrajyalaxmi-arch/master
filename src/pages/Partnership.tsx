import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Partnership = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    industry: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.contactName.trim() || !formData.email.trim()) {
      alert("Please enter your contact name and email.");
      return;
    }

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: formData.companyName.trim(),
          contactName: formData.contactName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          industry: formData.industry,
          message: formData.message.trim(),
          category: "Partnership"
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to submit inquiry.");
      }

      alert("Thank you for your interest! Your inquiry has been received. Use /track with your email to check status.");
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        industry: "",
        message: ""
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Inquiry submission failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-gradient-to-br from-[#241A8B] to-[#1a1466] text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">
            Partner With NSFI
          </h1>
          <p className="text-xl text-gray-200">
            Build future-ready talent within your organization
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Choose a partnership path</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore dedicated partnership experiences for companies, colleges, schools, and institutes.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            <button onClick={() => navigate("/partner/companies")} className="rounded-none bg-[#241A8B] text-white px-6 py-8 shadow-lg hover:bg-[#1a1466] transition">
              <p className="text-sm uppercase tracking-[0.25em] text-orange-300 mb-3">Companies</p>
              <h3 className="text-lg font-semibold">Corporate Training</h3>
            </button>
            <button onClick={() => navigate("/partner/colleges")} className="rounded-none bg-white border border-gray-200 px-6 py-8 shadow-lg hover:shadow-xl transition text-left">
              <p className="text-sm uppercase tracking-[0.25em] text-[#241A8B] mb-3">Colleges</p>
              <h3 className="text-lg font-semibold">Academic Collaboration</h3>
            </button>
            <button onClick={() => navigate("/partner/schools")} className="rounded-none bg-white border border-gray-200 px-6 py-8 shadow-lg hover:shadow-xl transition text-left">
              <p className="text-sm uppercase tracking-[0.25em] text-[#241A8B] mb-3">Schools</p>
              <h3 className="text-lg font-semibold">Student Readiness</h3>
            </button>
            <button onClick={() => navigate("/partner/institutes")} className="rounded-none bg-white border border-gray-200 px-6 py-8 shadow-lg hover:shadow-xl transition text-left">
              <p className="text-sm uppercase tracking-[0.25em] text-[#241A8B] mb-3">Institutes</p>
              <h3 className="text-lg font-semibold">Research & Certification</h3>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Benefits */}
            <div>
              <h2 className="text-3xl font-bold mb-8">
                Why Partner With Us?
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-none bg-orange-500 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#241A8B] mb-1">Customized Training Programs</h3>
                    <p className="text-gray-600">Tailor-made programs aligned with your organizational needs and goals</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-none bg-orange-500 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#241A8B] mb-1">Expert-Led Training</h3>
                    <p className="text-gray-600">Industry professionals delivering hands-on, practical training</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-none bg-orange-500 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#241A8B] mb-1">Flexible Delivery Models</h3>
                    <p className="text-gray-600">Online, hybrid, or on-site training at your convenience</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-none bg-orange-500 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#241A8B] mb-1">Performance Analytics</h3>
                    <p className="text-gray-600">Comprehensive reports and insights on participant progress</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-none bg-orange-500 text-white">
                      ✓
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#241A8B] mb-1">Post-Training Support</h3>
                    <p className="text-gray-600">Ongoing mentorship and support for implementation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 p-8">
              <h2 className="text-3xl font-bold mb-6">
                Get In Touch
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Name *</label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Industry *</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select an industry</option>
                    <option value="IT">Information Technology</option>
                    <option value="Finance">Finance & Banking</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Retail">Retail & E-commerce</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Tell us about your training needs..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full px-4 py-3 text-base"
                >
                  Send Partnership Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Our Partnership Models
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#241A8B] mb-4">
                Corporate Training
              </h3>
              <p className="text-gray-600 mb-4">
                Upskill your workforce with customized programs tailored to your business requirements
              </p>
              <ul className="text-left space-y-2 text-gray-600">
                <li>✓ On-site training</li>
                <li>✓ Custom curriculum</li>
                <li>✓ Batch scheduling</li>
              </ul>
            </div>

            <div className="bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#241A8B] mb-4">
                Institution Partnership
              </h3>
              <p className="text-gray-600 mb-4">
                Collaborate with educational institutions to enhance curriculum and student outcomes
              </p>
              <ul className="text-left space-y-2 text-gray-600">
                <li>✓ Faculty training</li>
                <li>✓ Student programs</li>
                <li>✓ Industry internships</li>
              </ul>
            </div>

            <div className="bg-white p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-[#241A8B] mb-4">
                Workforce Development
              </h3>
              <p className="text-gray-600 mb-4">
                Partner in building skilled workforce solutions for communities and organizations
              </p>
              <ul className="text-left space-y-2 text-gray-600">
                <li>✓ Job placement</li>
                <li>✓ Skill certification</li>
                <li>✓ Ongoing support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Partnership;
