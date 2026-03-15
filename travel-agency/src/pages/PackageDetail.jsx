// pages/PackageDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchPackageById } from "../services/apiService";
import { BookingForm } from "../components/index.jsx";

const PackageDetail = () => {
  const { id }         = useParams();
  const navigate       = useNavigate();
  const [pkg, setPkg]  = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackageById(id).then((data) => {
      if (!data) navigate("/packages");
      setPkg(data);
      setLoading(false);
    });
  }, [id, navigate]);

  if (loading) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: "48px", height: "48px", border: "4px solid rgba(201,150,63,0.3)", borderTopColor: "var(--gold)", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 1rem" }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <p style={{ color: "var(--text-muted)" }}>Loading package details...</p>
        </div>
      </div>
    );
  }

  if (!pkg) return null;

  return (
    <>
      {/* Hero image */}
      <div className="detail-hero">
        <img
          src={pkg.image}
          alt={pkg.title}
          onError={(e) => {
            e.target.src = `https://picsum.photos/seed/${pkg.id}/1200/600`;
          }}
        />
        <div className="detail-hero-overlay">
          <div className="container pb-4" style={{ position: "relative", zIndex: 1 }}>
            {/* Breadcrumb */}
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
              <Link to="/" style={{ color: "rgba(255,255,255,0.6)" }}>Home</Link>
              {" / "}
              <Link to="/packages" style={{ color: "rgba(255,255,255,0.6)" }}>Packages</Link>
              {" / "}
              <span style={{ color: "var(--gold-light)" }}>{pkg.title}</span>
            </div>
            <h1 style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", marginBottom: "0.5rem" }}>
              {pkg.title}
            </h1>
            <div style={{ color: "rgba(255,255,255,0.8)", display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
              <span>📍 {pkg.destination}</span>
              <span>🕐 {pkg.duration}</span>
              <span style={{ color: "var(--gold-light)" }}>★ {pkg.rating} ({pkg.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="section-pad bg-ivory">
        <div className="container">
          <div className="row g-5">
            {/* Left: details */}
            <div className="col-lg-8">
              {/* Description */}
              <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "2rem", marginBottom: "1.5rem", boxShadow: "var(--shadow-sm)" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "var(--navy)", marginBottom: "1rem" }}>
                  About This Tour
                </h3>
                <p style={{ color: "var(--text)", lineHeight: "1.8", fontSize: "1rem" }}>{pkg.description}</p>

                {/* Highlights */}
                <h5 style={{ fontFamily: "'Playfair Display', serif", color: "var(--navy)", marginTop: "1.5rem", marginBottom: "0.75rem" }}>
                  Tour Highlights
                </h5>
                <div className="d-flex flex-wrap gap-2">
                  {pkg.highlights.map((h) => (
                    <span key={h} style={{ background: "rgba(201,150,63,0.12)", color: "var(--gold)", border: "1px solid rgba(201,150,63,0.3)", padding: "6px 14px", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 500 }}>
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "2rem", marginBottom: "1.5rem", boxShadow: "var(--shadow-sm)" }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "var(--navy)", marginBottom: "1.5rem" }}>
                  Day-by-Day Itinerary
                </h3>
                {pkg.itinerary.map((item, idx) => (
                  <div key={idx} className="itinerary-item">
                    <div className="itinerary-day-badge">
                      <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Day</span>
                      <span style={{ fontSize: "1.1rem" }}>{item.day}</span>
                    </div>
                    <div>
                      <h6 style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.3rem" }}>{item.title}</h6>
                      <p style={{ color: "var(--text-muted)", margin: 0, fontSize: "0.93rem", lineHeight: "1.65" }}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inclusions */}
              <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "2rem", boxShadow: "var(--shadow-sm)" }}>
                <div className="row g-4">
                  <div className="col-sm-6">
                    <h5 style={{ fontFamily: "'Playfair Display', serif", color: "var(--navy)", marginBottom: "1rem" }}>✅ Included</h5>
                    {pkg.included.map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "0.93rem", color: "var(--text)" }}>
                        <span style={{ color: "var(--success)", fontWeight: 700 }}>✓</span> {item}
                      </div>
                    ))}
                  </div>
                  <div className="col-sm-6">
                    <h5 style={{ fontFamily: "'Playfair Display', serif", color: "var(--navy)", marginBottom: "1rem" }}>❌ Not Included</h5>
                    {pkg.excluded.map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "0.93rem", color: "var(--text)" }}>
                        <span style={{ color: "#ef4444" }}>✗</span> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: price card + booking */}
            <div className="col-lg-4">
              <div style={{ position: "sticky", top: "100px" }}>
                {/* Price card */}
                <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "2rem", boxShadow: "var(--shadow-md)", marginBottom: "1.5rem", border: "1px solid rgba(201,150,63,0.2)" }}>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", marginBottom: "0.25rem" }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "var(--gold)" }}>
                      ₹{pkg.price.toLocaleString("en-IN")}
                    </span>
                    <span style={{ color: "var(--text-muted)", fontSize: "0.9rem", paddingBottom: "6px" }}>per person</span>
                  </div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.88rem", marginBottom: "1.5rem" }}>
                    🕐 {pkg.duration}
                  </div>

                  <div style={{ display: "flex", gap: "4px", marginBottom: "1rem" }}>
                    {"★".repeat(Math.floor(pkg.rating)).split("").map((s, i) => (
                      <span key={i} style={{ color: "var(--gold)", fontSize: "1.1rem" }}>{s}</span>
                    ))}
                    <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginLeft: "6px" }}>
                      {pkg.rating} ({pkg.reviews} reviews)
                    </span>
                  </div>

                  <button
                    className="btn-gold w-100"
                    style={{ padding: "0.9rem", fontSize: "1rem" }}
                    onClick={() => setShowBooking(true)}
                  >
                    Book Now
                  </button>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", textAlign: "center", marginTop: "0.75rem" }}>
                    Free cancellation up to 30 days before departure
                  </p>
                </div>

                {/* Booking form toggle */}
                {showBooking && <BookingForm selectedPackage={pkg} />}

                {/* Quick info */}
                <div style={{ background: "rgba(10,22,40,0.04)", borderRadius: "var(--radius-sm)", padding: "1.2rem", border: "1px solid rgba(10,22,40,0.08)" }}>
                  <p style={{ fontWeight: 600, color: "var(--navy)", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
                    📞 Need Help Deciding?
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
                    Call our travel experts: <strong>+91 22 1234 5678</strong><br />
                    Mon–Sat, 9am – 7pm IST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PackageDetail;
