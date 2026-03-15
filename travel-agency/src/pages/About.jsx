// pages/About.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { teamMembers } from "../data/packages";
import useScrollReveal from "../hooks/useScrollReveal";

const About = () => {
  const navigate = useNavigate();
  useScrollReveal();

  return (
    <>
      {/* Page header */}
      <div className="page-header">
        <div className="container text-center" style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            About WanderLux
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", marginTop: "0.75rem" }}>
            Six years of crafting extraordinary journeys
          </p>
        </div>
      </div>

      {/* Intro */}
      <section className="section-pad" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 reveal-left">
              <div className="gold-bar" style={{ margin: "0 0 1rem" }} />
              <h2 className="section-title mb-4" style={{ textAlign: "left" }}>
                We Don't Just Book Trips.<br />
                <em style={{ fontStyle: "italic", color: "var(--gold)" }}>We Create Memories.</em>
              </h2>
              <p style={{ color: "var(--text-muted)", lineHeight: "1.85", marginBottom: "1.2rem" }}>
                Founded in 2021 by seasoned traveller Alexandra Chen, WanderLux began as a
                boutique agency with a simple belief: that travel should transform you. From our
                first five clients to 12,000+ delighted travellers, that belief has never wavered.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: "1.85", marginBottom: "2rem" }}>
                We work with a hand-selected network of local guides, luxury properties, and
                specialist operators in every destination. Every itinerary is built from scratch
                — we don't do cookie-cutter packages.
              </p>
              <button className="btn-gold" onClick={() => navigate("/packages")}>
                Explore Our Packages
              </button>
            </div>
            <div className="col-lg-6 reveal-right">
              <div style={{ position: "relative" }}>
                <img
                  src="https://picsum.photos/seed/about-travel/800/600"
                  alt="Travel planning"
                  style={{ borderRadius: "var(--radius)", boxShadow: "var(--shadow-lg)", width: "100%" }}
                />
                {/* Floating stats card */}
                <div style={{ position: "absolute", bottom: "-20px", left: "-20px", background: "var(--navy)", color: "white", borderRadius: "var(--radius)", padding: "1.5rem 2rem", boxShadow: "var(--shadow-lg)" }}>
                  <div style={{ fontSize: "2rem", fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--gold)" }}>6+</div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-pad bg-ivory">
        <div className="container">
          <div className="text-center mb-5">
            <div className="gold-bar" />
            <h2 className="section-title">Our Purpose</h2>
          </div>
          <div className="row g-4">
            {[
              {
                icon: "🎯",
                title: "Our Mission",
                content: "To connect curious minds with extraordinary places through thoughtful, responsible, and deeply personal travel experiences. We measure success not in bookings, but in the stories our travellers bring home.",
              },
              {
                icon: "🌟",
                title: "Our Vision",
                content: "A world where travel deepens understanding between cultures, supports local communities, and leaves every destination better than we found it. We are building the most trusted luxury travel brand in Asia.",
              },
              {
                icon: "💚",
                title: "Our Values",
                content: "Authenticity over kitsch. Sustainability over convenience. Human connection over mass tourism. We hold ourselves to a higher standard because our travellers deserve nothing less.",
              },
            ].map(({ icon, title, content }) => (
              <div key={title} className="col-md-4">
                <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "2.5rem 2rem", textAlign: "center", boxShadow: "var(--shadow-sm)", height: "100%", border: "1px solid rgba(10,22,40,0.06)" }}>
                  <div style={{ fontSize: "2.8rem", marginBottom: "1rem" }}>{icon}</div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", color: "var(--navy)", marginBottom: "1rem" }}>{title}</h4>
                  <p style={{ color: "var(--text-muted)", lineHeight: "1.8", margin: 0 }}>{content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="cta-section" style={{ padding: "60px 0" }}>
        <div className="container">
          <div className="row g-4 text-center" style={{ position: "relative", zIndex: 1 }}>
            {[
              { number: "12,000+", label: "Happy Travellers" },
              { number: "50+",     label: "Destinations" },
              { number: "6 yrs",  label: "of Experience" },
              { number: "98%",     label: "Satisfaction Rate" },
            ].map(({ number, label }) => (
              <div key={label} className="col-6 col-md-3">
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700, color: "var(--gold)" }}>
                  {number}
                </div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="gold-bar" />
            <h2 className="section-title">Meet the Team</h2>
            <p className="section-subtitle mt-3">Passionate travellers turned travel architects.</p>
          </div>
          <div className="row g-4">
            {teamMembers.map((member, i) => (
              <div key={member.id} className={`col-sm-6 col-lg-3 reveal reveal-delay-${i + 1}`}>
                <div className="team-card">
                  <img src={member.image} alt={member.name} />
                  <h5 style={{ fontFamily: "'Playfair Display', serif", color: "var(--navy)", marginBottom: "0.25rem" }}>{member.name}</h5>
                  <p style={{ color: "var(--gold)", fontWeight: 600, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "0.75rem" }}>{member.role}</p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: "1.65", margin: 0 }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
