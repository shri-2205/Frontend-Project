import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import PackageDetail from "./pages/PackageDetail";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./assets/styles.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/packages"     element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetail />} />
          <Route path="/booking"      element={<Booking />} />
          <Route path="/about"        element={<About />} />
          <Route path="/contact"      element={<Contact />} />
          <Route path="*" element={
            <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
              <div>
                <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🗺️</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: "var(--navy)" }}>Page Not Found</h2>
                <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Looks like you've wandered off the map!</p>
                <a href="/" className="btn-gold">Back to Home</a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
