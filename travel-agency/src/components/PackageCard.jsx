import React from "react";
import { Link } from "react-router-dom";

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  return <span className="star-rating">{"★".repeat(full)}{"☆".repeat(5 - full)}</span>;
};

const PackageCard = ({ pkg }) => (
  <div className="package-card h-100">
    <div className="package-card-img">
      <img
        src={pkg.image}
        alt={pkg.title}
        loading="lazy"
        onError={(e) => { e.target.src = `https://picsum.photos/seed/${pkg.id}-card/800/500`; }}
      />
      <span className="package-badge">{pkg.category}</span>
    </div>
    <div className="package-card-body">
      <p style={{ color: "var(--text-muted)", fontSize: "0.82rem", fontWeight: 500, marginBottom: "0.25rem", letterSpacing: "0.5px" }}>
        📍 {pkg.destination}
      </p>
      <h5 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--navy)", marginBottom: "0.75rem", fontSize: "1.15rem" }}>
        {pkg.title}
      </h5>
      <div className="d-flex align-items-center gap-2 mb-3">
        <StarRating rating={pkg.rating} />
        <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{pkg.rating} ({pkg.reviews} reviews)</span>
      </div>
      <div className="d-flex align-items-center gap-2 mb-3" style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
        <span>🕐</span><span>{pkg.duration}</span>
      </div>
      <div className="flex-grow-1" />
      <div className="d-flex align-items-center justify-content-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(10,22,40,0.07)" }}>
        <div className="package-price">
          ₹{pkg.price.toLocaleString("en-IN")}<span> / person</span>
        </div>
        <Link to={`/packages/${pkg.id}`} className="btn-gold" style={{ padding: "0.55rem 1.3rem", fontSize: "0.88rem" }}>
          View Details
        </Link>
      </div>
    </div>
  </div>
);

export default PackageCard;
