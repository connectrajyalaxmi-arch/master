import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";
import { useState, type FormEvent } from "react";
import Navbar from "../components/Navbar";
import ContactImg from "../assets/contact.jpeg"; 
import Footer from "../components/Footer";

const Contact = () => {

    const [formData, setFormData] = useState({
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  industry: "",
  message: "",
});
const handleSubmit = async (
  e: FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  if (
    !formData.contactName.trim() ||
    !formData.email.trim()
  ) {
    alert("Please enter your name and email.");
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
        category: "Contact Us",
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error || "Failed to submit inquiry."
      );
    }

    window.dispatchEvent(
      new CustomEvent("admin-notification", {
        detail: {
          title: "New Contact Inquiry",
          message: `${formData.contactName} submitted a contact request.`,
        },
      })
    );

    alert(
      "Thank you! Your inquiry has been submitted successfully."
    );

    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      industry: "",
      message: "",
    });
  } catch (error) {
    alert(
      error instanceof Error
        ? error.message
        : "Submission failed."
    );
  }
};
  return (
    <>
     <Navbar />
    <div className="bg-gradient-to-b from-white via-slate-50 to-white">

      {/* Hero Section */}

<section
  className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-36 text-white"
  style={{
    backgroundImage: `url(${ContactImg})`,
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#241A8B]/90 via-[#241A8B]/70 to-[#241A8B]/55" />

  {/* Decorative Blur */}
  <div className="absolute -left-20 top-0 h-80 w-80 rounded-full bg-orange-500/20 blur-[140px]" />
  <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-cyan-400/20 blur-[140px]" />

  {/* Grid Pattern */}
  <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(to_right,#ffffff_1px,transparent_1px)] bg-[size:60px_60px]" />

  <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-300"
          >
            CONTACT NSFI
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 text-5xl font-black md:text-6xl"
          >
            Let's Build the Future Together
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-indigo-100"
          >
            Have questions about our programs, partnerships,
            certifications, internships or placements?
            Our team is always ready to help you.
          </motion.p>

        </div>
      </section>
      <br/>
      <br/>
      <br/>

      {/* Contact Cards */}

      <section className="-mt-16 relative z-10 pb-24">

        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-3">

          {/* Phone */}

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl bg-white p-8 shadow-xl"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <FiPhone size={30} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#241A8B]">
              Call Us
            </h3>

            <p className="mt-4 text-gray-600">
              +91 98765 43210
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Monday - Saturday
              <br />
              9:00 AM - 6:00 PM
            </p>
          </motion.div>

          {/* Email */}

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl bg-white p-8 shadow-xl"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-[#241A8B]">
              <FiMail size={30} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#241A8B]">
              Email Us
            </h3>

            <p className="mt-4 break-all text-gray-600">
              partnerships@nsfi.org.in
            </p>

            <p className="mt-2 text-sm text-gray-500">
              We'll usually reply
              <br />
              within 24 hours.
            </p>
          </motion.div>

          {/* Address */}

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-3xl bg-white p-8 shadow-xl"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">
              <FiMapPin size={30} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-[#241A8B]">
              Visit Us
            </h3>

            <p className="mt-4 text-gray-600">
              Hyderabad,
              <br />
              Telangana,
              <br />
              India
            </p>
          </motion.div>

        </div>

      </section>
      <br/>
      <br/>
      <br/>

      {/* Contact Form */}

<section className="pb-28">

  <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">

    {/* Left - Form */}

    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: .6 }}
      viewport={{ once: true }}
      className="rounded-[32px] bg-white p-10 shadow-2xl"
    >

      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
        SEND AN INQUIRY
      </p>

      <h2 className="mt-3 text-4xl font-black text-[#241A8B]">
        We'd Love to Hear From You
      </h2>

      <p className="mt-4 text-gray-600">
        Fill in the details below and our team will get
        back to you within 24 hours.
      </p>

<form
  onSubmit={handleSubmit}
  className="mt-10 space-y-6"
>
        {/* Name */}

        <input
          type="text"
          placeholder="Full Name"
          className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition focus:border-[#241A8B]"
        />

        {/* Email */}

        <input
          type="email"
          placeholder="Email Address"
          className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition focus:border-[#241A8B]"
        />

        {/* Phone */}

        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition focus:border-[#241A8B]"
        />

        {/* Category */}

        <select
          className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition focus:border-[#241A8B]"
        >
          <option>Select Category</option>
          <option>Student</option>
          <option>Professional</option>
          <option>College</option>
          <option>School</option>
          <option>Institute</option>
          <option>Organization</option>
          <option>Partnership</option>
          <option>Other</option>
        </select>

        {/* Subject */}

        <input
          type="text"
          placeholder="Subject"
          className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition focus:border-[#241A8B]"
        />

        {/* Message */}

        <textarea
          rows={6}
          placeholder="Tell us how we can help..."
          className="w-full rounded-2xl border border-gray-200 px-5 py-4 outline-none transition focus:border-[#241A8B]"
        />

        {/* Button */}

        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-[#241A8B] to-indigo-700 py-4 text-lg font-bold text-white shadow-xl transition hover:scale-[1.02]"
        >
          Send Inquiry
        </button>

      </form>

    </motion.div>

    {/* Right - Map */}

<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
>
  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
    WHAT HAPPENS NEXT?
  </p>

  <h3 className="mt-3 text-3xl font-black text-black">
    Your Journey Starts Here
  </h3>

  <p className="mt-4 leading-7 text-black-300">
    Once you submit your inquiry, our team carefully reviews your
    requirements and connects you with the right expert to guide you
    through the next steps.
  </p>

  <div className="mt-10 space-y-6">

    <div className="flex items-center gap-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
        1
      </div>

      <div>
        <h4 className="font-semibold text-white">
          Submit Your Inquiry
        </h4>

        <p className="text-sm text-gray-400">
          Fill in your details and requirements.
        </p>
      </div>
    </div>

    <div className="ml-6 h-8 w-px bg-white/20" />

    <div className="flex items-center gap-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
        2
      </div>

      <div>
        <h4 className="font-semibold text-white">
          Expert Review
        </h4>

        <p className="text-sm text-gray-400">
          Our team evaluates your inquiry and assigns the right specialist.
        </p>
      </div>
    </div>

    <div className="ml-6 h-8 w-px bg-white/20" />

    <div className="flex items-center gap-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
        3
      </div>

      <div>
        <h4 className="font-semibold text-white">
          We Get in Touch
        </h4>

        <p className="text-sm text-gray-400">
          Expect an email or phone call within 24 business hours.
        </p>
      </div>
    </div>

    <div className="ml-6 h-8 w-px bg-white/20" />

    <div className="flex items-center gap-5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 font-bold text-white">
        ✓
      </div>

      <div>
        <h4 className="font-semibold text-white">
          Personalized Solution
        </h4>

        <p className="text-sm text-gray-400">
          Receive guidance, partnership details, or a customized learning plan.
        </p>
      </div>
    </div>

  </div>
</motion.div>

  </div>

</section>

    </div>
    <Footer/>
    </>

  );
};

export default Contact;