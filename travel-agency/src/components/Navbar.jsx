import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar navbar-wanderlux navbar-expand-lg ${scrolled ? "shadow-lg" : ""}`}>
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span style={{ color: "var(--gold)", fontSize: "1.4rem" }}>✦</span> WanderLux
        </Link>
        <button className="navbar-toggler border-0" type="button" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {[{ path: "/", label: "Home" }, { path: "/packages", label: "Packages" }, { path: "/about", label: "About" }, { path: "/contact", label: "Contact" }].map(({ path, label }) => (
              <li className="nav-item" key={path}>
                <NavLink to={path} end={path === "/"} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="nav-item ms-lg-3">
              <Link to="/booking" className="btn-gold" style={{ padding: "0.55rem 1.5rem", fontSize: "0.9rem" }} onClick={() => setMenuOpen(false)}>
                Book a Trip
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
