// pages/Packages.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PackageCard from "../components/PackageCard";
import { fetchPackages } from "../services/apiService";
import useScrollReveal from "../hooks/useScrollReveal";

const CATEGORIES = ["All", "Hill Stations", "Beaches", "Heritage & Temples", "Wildlife & Forests", "Kerala", "Tamil Nadu"];

const Packages = () => {
  const [allPackages, setAllPackages] = useState([]);
  const [filtered, setFiltered]       = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading]         = useState(true);
  const [searchParams]                = useSearchParams();
  const searchQuery                   = searchParams.get("q") || "";

  useScrollReveal();

  useEffect(() => {
    fetchPackages().then((data) => {
      setAllPackages(data);
      setFiltered(data);
      setLoading(false);
    });
  }, []);

  // Apply filter + search query
  useEffect(() => {
    let result = allPackages;

    if (activeFilter !== "All") {
      result = result.filter(
        (p) => p.category === activeFilter || p.state === activeFilter
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.destination.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    setFiltered(result);
  }, [activeFilter, allPackages, searchQuery]);

  return (
    <>
      {/* Page header */}
      <div className="page-header">
        <div className="container text-center" style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ color: "white", fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Tour Packages
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", marginTop: "0.75rem" }}>
            Discover extraordinary journeys to every corner of the world
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "1rem", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem" }}>
            <a href="/" style={{ color: "rgba(255,255,255,0.6)" }}>Home</a>
            <span>/</span>
            <span style={{ color: "var(--gold-light)" }}>Packages</span>
          </div>
        </div>
      </div>

      <section className="section-pad bg-ivory">
        <div className="container">
          {/* Filters + result count */}
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-5">
            <div className="d-flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`filter-pill ${activeFilter === cat ? "active" : ""}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              {loading ? "Loading..." : `${filtered.length} package${filtered.length !== 1 ? "s" : ""} found`}
              {searchQuery && ` for "${searchQuery}"`}
            </span>
          </div>

          {/* Grid */}
          {loading ? (
            // Skeleton loader
            <div className="row g-4">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="col-md-6 col-lg-4">
                  <div style={{ background: "#e5e7eb", borderRadius: "var(--radius)", height: "400px", animation: "pulse 1.5s infinite" }} />
                  <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}`}</style>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-5">
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌍</div>
              <h4 style={{ color: "var(--navy)" }}>No packages found</h4>
              <p style={{ color: "var(--text-muted)" }}>Try a different filter or search term</p>
              <button className="btn-gold mt-3" onClick={() => setActiveFilter("All")}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {filtered.map((pkg, i) => (
                <div key={pkg.id} className="col-md-6 col-lg-4 d-flex">
                  <PackageCard pkg={pkg} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Packages;
