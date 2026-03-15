import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitBooking } from "../services/apiService";

// ── DestinationCard ───────────────────────────────────────────────────────────
export const DestinationCard = ({ destination }) => {
  const navigate = useNavigate();
  return (
    <div className="destination-card" onClick={() => navigate("/packages")} title={`Browse ${destination.name} packages`}>
      <img
        src={destination.image}
        alt={destination.name}
        loading="lazy"
        onError={(e) => { e.target.src = `https://picsum.photos/seed/${destination.id}-dest/600/800`; }}
      />
      <div className="destination-card-overlay">
        <h5 style={{ color: "white", fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: 0, fontSize: "1.3rem" }}>{destination.name}</h5>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.82rem", margin: "4px 0 8px" }}>{destination.country}</p>
        <span style={{ background: "rgba(201,150,63,0.9)", color: "white", fontSize: "0.78rem", padding: "3px 12px", borderRadius: "20px", fontWeight: 600 }}>
          {destination.packages} packages
        </span>
      </div>
    </div>
  );
};

// ── TestimonialCard ───────────────────────────────────────────────────────────
export const TestimonialCard = ({ testimonial }) => {
  const { name, location, avatar, rating, text, tour } = testimonial;
  return (
    <div className="testimonial-card">
      <div className="testimonial-quote">"</div>
      <p style={{ color: "var(--text)", fontSize: "0.97rem", lineHeight: "1.75", marginBottom: "1.5rem", fontStyle: "italic" }}>{text}</p>
      <div className="d-flex align-items-center gap-3">
        <img src={avatar} alt={name}
          style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--gold)" }}
          onError={(e) => { e.target.src = `https://picsum.photos/seed/${name}/100/100`; }}
        />
        <div>
          <div style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.95rem" }}>{name}</div>
          <div style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{location}</div>
        </div>
        <div className="ms-auto text-end">
          <div className="star-rating" style={{ fontSize: "0.85rem" }}>{"★".repeat(rating)}</div>
          <div style={{ fontSize: "0.75rem", color: "var(--gold)", fontWeight: 500 }}>{tour}</div>
        </div>
      </div>
    </div>
  );
};

// ── BookingForm ───────────────────────────────────────────────────────────────
export const BookingForm = ({ selectedPackage }) => {
  const initialState = {
    name: "", email: "", phone: "", travelDate: "", persons: 1, message: "",
    packageId: selectedPackage?.id || "", packageTitle: selectedPackage?.title || "",
  };
  const [form, setForm]       = useState(initialState);
  const [status, setStatus]   = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setStatus(null);
    try {
      const result = await submitBooking(form);
      if (result?.success) { setStatus({ type: "success", id: result.bookingId }); setForm(initialState); }
      else setStatus({ type: "error" });
    } catch { setStatus({ type: "error" }); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "2rem", boxShadow: "var(--shadow-md)" }}>
      <h4 style={{ fontFamily: "'Playfair Display', serif", color: "var(--navy)", marginBottom: "1.5rem" }}>
        {selectedPackage ? `Book: ${selectedPackage.title}` : "Book Your Trip"}
      </h4>
      {status?.type === "success" && (
        <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid #10b981", borderRadius: "var(--radius-sm)", color: "#065f46", padding: "1rem", marginBottom: "1.5rem" }}>
          🎉 <strong>Booking confirmed!</strong> Booking ID: <code>{status.id}</code>. Our team will contact you within 24 hours.
        </div>
      )}
      {status?.type === "error" && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid #ef4444", borderRadius: "var(--radius-sm)", color: "#991b1b", padding: "1rem", marginBottom: "1.5rem" }}>
          ⚠️ Something went wrong. Please email us at hello@wanderlux.com
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-12">
            <label className="form-label-custom">Full Name *</label>
            <input type="text" name="name" className="form-control form-control-custom" placeholder="Your full name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label-custom">Email Address *</label>
            <input type="email" name="email" className="form-control form-control-custom" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label-custom">Phone Number *</label>
            <input type="tel" name="phone" className="form-control form-control-custom" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label-custom">Travel Date *</label>
            <input type="date" name="travelDate" className="form-control form-control-custom" min={new Date().toISOString().split("T")[0]} value={form.travelDate} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label-custom">Number of Persons *</label>
            <select name="persons" className="form-control form-control-custom" value={form.persons} onChange={handleChange} required>
              {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n} {n === 1 ? "Person" : "People"}</option>)}
            </select>
          </div>
          {!selectedPackage && (
            <div className="col-12">
              <label className="form-label-custom">Package (optional)</label>
              <input type="text" name="packageTitle" className="form-control form-control-custom" placeholder="Which package are you interested in?" value={form.packageTitle} onChange={handleChange} />
            </div>
          )}
          <div className="col-12">
            <label className="form-label-custom">Message / Special Requests</label>
            <textarea name="message" className="form-control form-control-custom" rows={4} placeholder="Special requirements, dietary needs..." value={form.message} onChange={handleChange} />
          </div>
          {selectedPackage && form.persons > 0 && (
            <div className="col-12">
              <div style={{ background: "rgba(201,150,63,0.08)", border: "1px solid rgba(201,150,63,0.3)", borderRadius: "var(--radius-sm)", padding: "1rem" }}>
                <div className="d-flex justify-content-between">
                  <span style={{ color: "var(--text-muted)" }}>Estimated total ({form.persons} {form.persons > 1 ? "persons" : "person"})</span>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--gold)", fontSize: "1.2rem" }}>
                    ₹{(selectedPackage.price * form.persons).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>
          )}
          <div className="col-12 mt-2">
            <button type="submit" className="btn-gold w-100" disabled={loading} style={{ padding: "0.85rem", fontSize: "1rem" }}>
              {loading ? "⏳ Processing..." : "🌍 Confirm Booking"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
