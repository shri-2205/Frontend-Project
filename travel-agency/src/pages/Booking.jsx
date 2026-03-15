// pages/Booking.jsx
import React from "react";
import { BookingForm } from "../components/index.jsx";

const Booking = () => {
  return (
    <>
      <div className="page-header">
        <div className="container text-center" style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Book Your Trip
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", marginTop: "0.75rem" }}>
            Fill in the form below and our team will confirm your booking within 24 hours
          </p>
        </div>
      </div>

      <section className="section-pad bg-ivory">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <BookingForm />
            </div>
            <div className="col-lg-4 offset-lg-1 d-flex flex-column gap-4">
              {/* Info cards */}
              {[
                { icon: "📞", title: "Call Us", body: "+91 22 1234 5678\nMon–Sat, 9am–7pm IST" },
                { icon: "✉️", title: "Email Us", body: "hello@wanderlux.com\nWe reply within 2 hours" },
                { icon: "🔒", title: "Secure & Protected", body: "ATOL & ABTA protected bookings. Your money is 100% safe." },
              ].map(({ icon, title, body }) => (
                <div key={title} style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "1.5rem", boxShadow: "var(--shadow-sm)", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "2rem" }}>{icon}</span>
                  <div>
                    <h6 style={{ fontWeight: 700, color: "var(--navy)", marginBottom: "0.3rem" }}>{title}</h6>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0, whiteSpace: "pre-line" }}>{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Booking;
