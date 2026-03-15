// pages/Contact.jsx
import React, { useState } from "react";
import { submitContact } from "../services/apiService";

const Contact = () => {
  const [form, setForm]     = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await submitContact(form);
    setStatus(result?.success ? "success" : "error");
    if (result?.success) setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setLoading(false);
  };

  return (
    <>
      {/* Page header */}
      <div className="page-header">
        <div className="container text-center" style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Get In Touch
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", marginTop: "0.75rem" }}>
            We're here to help plan your perfect journey
          </p>
        </div>
      </div>

      <section className="section-pad bg-ivory">
        <div className="container">
          <div className="row g-5">
            {/* Left: info */}
            <div className="col-lg-4">
              <div className="gold-bar" style={{ margin: "0 0 1rem" }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "var(--navy)", marginBottom: "1rem" }}>
                Let's Plan Your Adventure
              </h2>
              <p style={{ color: "var(--text-muted)", lineHeight: "1.8", marginBottom: "2rem" }}>
                Whether you have a destination in mind or just a dream of going somewhere extraordinary,
                our team is ready to help design the perfect journey.
              </p>

              {[
                { icon: "📍", title: "Visit Us",     lines: ["42 Wanderer's Lane,", "Fort, Trichy 620102"] },
                { icon: "📞", title: "Call Us",      lines: ["+91 22 1234 5678", "Mon–Sat, 9am–7pm IST"] },
                { icon: "✉️", title: "Email Us",     lines: ["hello@wanderlux.com", "Bookings: book@wanderlux.com"] },
                { icon: "🕐", title: "Office Hours", lines: ["Monday–Friday: 9am–7pm", "Saturday: 10am–5pm"] },
              ].map(({ icon, title, lines }) => (
                <div key={title} style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(201,150,63,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.95rem", marginBottom: "0.2rem" }}>{title}</div>
                    {lines.map((l) => (
                      <div key={l} style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{l}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: form */}
            <div className="col-lg-8">
              <div style={{ background: "var(--white)", borderRadius: "var(--radius)", padding: "2.5rem", boxShadow: "var(--shadow-md)" }}>
                {status === "success" && (
                  <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid #10b981", borderRadius: "var(--radius-sm)", padding: "1rem", marginBottom: "1.5rem", color: "#065f46" }}>
                    ✅ <strong>Message sent!</strong> Our team will reply within 2 business hours.
                  </div>
                )}
                {status === "error" && (
                  <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid #ef4444", borderRadius: "var(--radius-sm)", padding: "1rem", marginBottom: "1.5rem", color: "#991b1b" }}>
                    ⚠️ Something went wrong. Please email us directly at hello@wanderlux.com
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label-custom">Your Name *</label>
                      <input type="text" name="name" className="form-control form-control-custom" placeholder="Full name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-custom">Email Address *</label>
                      <input type="email" name="email" className="form-control form-control-custom" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-custom">Phone Number</label>
                      <input type="tel" name="phone" className="form-control form-control-custom" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label-custom">Subject *</label>
                      <select name="subject" className="form-control form-control-custom" value={form.subject} onChange={handleChange} required>
                        <option value="">Select a topic…</option>
                        <option>Package Enquiry</option>
                        <option>Custom Itinerary</option>
                        <option>Booking Support</option>
                        <option>Group Travel</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label-custom">Message *</label>
                      <textarea
                        name="message"
                        className="form-control form-control-custom"
                        rows={5}
                        placeholder="Tell us about your dream trip, preferred dates, budget, or any questions…"
                        value={form.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-12 mt-2">
                      <button type="submit" className="btn-gold" style={{ padding: "0.85rem 2.5rem", fontSize: "1rem" }} disabled={loading}>
                        {loading ? "⏳ Sending…" : "✈️ Send Message"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Google Map embed */}
          <div style={{ marginTop: "4rem" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "var(--navy)", marginBottom: "1.5rem", textAlign: "center" }}>
              Find Us in Trichy
            </h3>
            <div style={{ borderRadius: "var(--radius)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
              <iframe
                title="WanderLux Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3774.0197280439836!2d72.82800731489973!3d18.93350158716624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1c73a0000c1%3A0x7aa4b59ee88ce71c!2sFort%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1701865428000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0, display: "block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
