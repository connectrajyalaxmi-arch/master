const Footer = () => {
  return (
    <footer
      style={{
        background: "#0f172a",
        color: "#fff",
        padding: "50px 20px 20px",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
        }}
      >
        {/* About */}
        <div>
          <h3>NSFI</h3>
          <p>
            National Skill Forge Institute is committed to empowering
            students, institutions, and organizations with future-ready
            skills and industry-aligned programs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3>Quick Links</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>Home</li>
            <li>Programs</li>
            <li>Partnerships</li>
            <li>Track Status</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3>Contact Us</h3>

          <p>
            📧 partnerships@nsfi.org.in
          </p>

          <p>
            📞 +91 98765 43210
          </p>

          <p>
            📍 Hyderabad, Telangana, India
          </p>

          <div style={{ marginTop: "15px" }}>
            <a
              href="https://www.linkedin.com/company/national-skillforge-institute/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#fff", marginRight: "15px" }}
            >
              LinkedIn
            </a>

            <a
              href="https://instagram.com/nsfi2025"
              target="_blank"
              rel="noreferrer"
              style={{ color: "#fff" }}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <hr
        style={{
          margin: "30px 0 20px",
          borderColor: "#334155",
        }}
      />

      <div
        style={{
          textAlign: "center",
          fontSize: "14px",
          color: "#cbd5e1",
        }}
      >
        © {new Date().getFullYear()} National Skill Forge Institute (NSFI).
        All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;