// pages/Home.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PackageCard from "../components/PackageCard";
import { DestinationCard, TestimonialCard } from "../components/index.jsx";
import { fetchPackages, fetchDestinations } from "../services/apiService";
import { testimonials } from "../data/packages";
import useScrollReveal from "../hooks/useScrollReveal";

const Home = () => {
  const [search, setSearch]             = useState("");
  const [packages, setPackages]         = useState([]);
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  // Activate scroll reveal on every render
  useScrollReveal();

  useEffect(() => {
    fetchPackages().then(setPackages);
    fetchDestinations().then(setDestinations);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/packages?q=${encodeURIComponent(search)}`);
  };

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="hero-section">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <div className="row">
            <div className="col-lg-7">
              <span className="hero-tagline fade-in-up fade-in-up-1">
                Tamil Nadu & Kerala — Incredible India
              </span>
              <h1 className="hero-title fade-in-up fade-in-up-2">
                Discover India's<br />
                <em>Most Beautiful Places</em>
              </h1>
              <p className="hero-subtitle fade-in-up fade-in-up-3">
                From Munnar's misty tea gardens to Alleppey's golden backwaters,
                from ancient Chola temples to wild elephant forests — your South India journey starts here.
              </p>

              {/* Search bar */}
              <form onSubmit={handleSearch} className="fade-in-up fade-in-up-3">
                <div className="hero-search-box">
                  <span style={{ fontSize: "1.2rem" }}>🔍</span>
                  <input
                    type="text"
                    placeholder="Search Munnar, Ooty, Alleppey, Madurai..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button type="submit" className="btn-gold" style={{ whiteSpace: "nowrap" }}>
                    Explore Now
                  </button>
                </div>
              </form>

              {/* Stats with floating animation */}
              <div className="hero-stats fade-in-up fade-in-up-4">
                {[
                  { number: "12+",   label: "Destinations" },
                  { number: "5000+", label: "Happy Travellers" },
                  { number: "2 States", label: "TN & Kerala" },
                ].map(({ number, label }) => (
                  <div key={label}>
                    <span className="hero-stat-number">{number}</span>
                    <span className="hero-stat-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <div style={{ width: "26px", height: "42px", border: "2px solid rgba(255,255,255,0.5)", borderRadius: "13px", margin: "0 auto", position: "relative" }}>
            <div style={{ width: "4px", height: "8px", background: "rgba(255,255,255,0.8)", borderRadius: "2px", position: "absolute", top: "6px", left: "50%", transform: "translateX(-50%)", animation: "scrollDown 1.5s infinite" }} />
          </div>
          <style>{`@keyframes scrollDown{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(10px)}}`}</style>
        </div>
      </section>

      {/* ── POPULAR DESTINATIONS ──────────────────────────── */}
      <section className="section-pad bg-ivory">
        <div className="container">
          <div className="text-center mb-5">
            <div className="gold-bar" />
            <h2 className="section-title mt-2">Popular Destinations</h2>
            <p className="section-subtitle mt-3">
              Handpicked locations across Tamil Nadu and Kerala.
            </p>
          </div>
          <div className="row g-4">
            {destinations.slice(0, 6).map((dest, i) => (
              <div
                key={dest.id}
                className="col-6 col-md-4"
              >
                <DestinationCard destination={dest} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PACKAGES ─────────────────────────────── */}
      <section className="section-pad" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="gold-bar" />
            <h2 className="section-title mt-2">Featured Tour Packages</h2>
            <p className="section-subtitle mt-3">
              Thoughtfully designed itineraries to South India's most breathtaking places.
            </p>
          </div>
          <div className="row g-4">
            {packages.slice(0, 3).map((pkg, i) => (
              <div key={pkg.id} className="col-md-6 col-lg-4">
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <button
              className="btn-navy"
              onClick={() => navigate("/packages")}
              style={{ padding: "0.85rem 2.5rem", fontSize: "1rem" }}
            >
              View All Packages →
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ─────────────────────────────────── */}
      <section className="section-pad bg-ivory">
        <div className="container">
          <div className="text-center mb-5">
            <div className="gold-bar" />
            <h2 className="section-title mt-2">Why Travel With WanderLux</h2>
          </div>
          <div className="row g-4">
            {[
              { icon: "🌿", title: "Local Experts", desc: "Our guides are native to Tamil Nadu and Kerala — they know every hidden waterfall, every local eatery." },
              { icon: "🏆", title: "Award-Winning", desc: "Best South India Tour Operator — Travel + Leisure India, 5 years running." },
              { icon: "💎", title: "All Budgets", desc: "Budget homestays to luxury resorts — we build trips around your wallet, not ours." },
              { icon: "🛡️", title: "Fully Protected", desc: "100% secure booking with full refund for cancellations 15+ days in advance." },
            ].map(({ icon, title, desc }, i) => (
              <div key={title} className="col-sm-6 col-lg-3">
                <div
                  className="card-lift"
                  style={{
                    background: "var(--white)",
                    borderRadius: "var(--radius)",
                    padding: "2rem 1.5rem",
                    textAlign: "center",
                    boxShadow: "var(--shadow-sm)",
                    height: "100%",
                    border: "1px solid rgba(10,22,40,0.06)",
                  }}
                >
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{icon}</div>
                  <h5 style={{ fontFamily: "'Playfair Display', serif", color: "var(--navy)", marginBottom: "0.75rem" }}>{title}</h5>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.93rem", margin: 0, lineHeight: "1.7" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="section-pad" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="gold-bar" />
            <h2 className="section-title mt-2">What Our Travellers Say</h2>
            <p className="section-subtitle mt-3">5,000+ happy South India explorers.</p>
          </div>
          <div className="row g-4">
            {testimonials.map((t, i) => (
              <div key={t.id} className="col-md-6 col-lg-3">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="cta-section section-pad">
        <div className="container text-center" style={{ position: "relative", zIndex: 1 }}>
          <div className="gold-bar" />
          <h2 className="section-title mt-2" style={{ color: "white" }}>
            Ready for Your South India Adventure?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", maxWidth: "500px", margin: "1rem auto 2.5rem" }}>
            Let our local experts plan the perfect Kerala or Tamil Nadu journey — completely customised for you.
          </p>
          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <button className="btn-gold" onClick={() => navigate("/packages")} style={{ padding: "0.9rem 2.5rem", fontSize: "1rem" }}>
              Browse Packages
            </button>
            <button className="btn-outline-gold" onClick={() => navigate("/contact")} style={{ padding: "0.9rem 2.5rem", fontSize: "1rem" }}>
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
