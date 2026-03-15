import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="footer-main">
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="footer-brand d-flex align-items-center gap-2 mb-3">
            <span style={{ color: "var(--gold)" }}>✦</span> WanderLux
          </div>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: "1.8", maxWidth: "280px" }}>
            Crafting extraordinary South India journeys since 2021. Tamil Nadu & Kerala specialists.
          </p>
          <div className="mt-4">
            {["f", "𝕏", "in", "📷"].map((icon, i) => (
              <a key={i} href="#!" className="social-icon">{icon}</a>
            ))}
          </div>
        </div>
        <div className="col-6 col-lg-2">
          <h6 style={{ color: "var(--white)", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem", letterSpacing: "1px", textTransform: "uppercase" }}>Explore</h6>
          {[{ to: "/", label: "Home" }, { to: "/packages", label: "Packages" }, { to: "/about", label: "About Us" }, { to: "/contact", label: "Contact" }].map(({ to, label }) => (
            <Link key={to} to={to} className="footer-link">{label}</Link>
          ))}
        </div>
        <div className="col-6 col-lg-3">
          <h6 style={{ color: "var(--white)", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem", letterSpacing: "1px", textTransform: "uppercase" }}>Destinations</h6>
          {["Munnar, Kerala", "Ooty, Tamil Nadu", "Alleppey, Kerala", "Madurai, Tamil Nadu", "Thekkady, Kerala", "Kanyakumari, TN"].map((dest) => (
            <a key={dest} href="#!" className="footer-link">{dest}</a>
          ))}
        </div>
        <div className="col-lg-3">
          <h6 style={{ color: "var(--white)", fontWeight: 700, marginBottom: "1rem", fontSize: "0.95rem", letterSpacing: "1px", textTransform: "uppercase" }}>Contact</h6>
          <div className="footer-link mb-2">📍 42 Anna Salai, Trichy 600102</div>
          <a href="tel:+914412345678" className="footer-link">📞 +91 44 1234 5678</a>
          <a href="mailto:hello@wanderlux.com" className="footer-link">✉️ hello@wanderlux.com</a>
          <div className="mt-3 p-3 rounded-3" style={{ background: "rgba(201,150,63,0.15)", border: "1px solid rgba(201,150,63,0.3)" }}>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem", margin: 0 }}>
              🏆 Best South India Tour Operator — <span style={{ color: "var(--gold-light)" }}>Travel+Leisure India</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <div className="container d-flex flex-wrap justify-content-between align-items-center gap-2">
        <span>© {new Date().getFullYear()} WanderLux Travel Co. All rights reserved.</span>
        <div className="d-flex gap-3">
          <a href="#!" className="footer-link" style={{ marginBottom: 0, display: "inline" }}>Privacy Policy</a>
          <a href="#!" className="footer-link" style={{ marginBottom: 0, display: "inline" }}>Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
