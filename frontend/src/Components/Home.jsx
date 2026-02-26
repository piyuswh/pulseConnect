import React from "react";
import "../pages/Home.css";

export default function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Pulse Connect</h1>
          <p>
            Connecting Hearts. Saving Lives.  
            Join our trusted network of blood and organ donors and make a real difference today.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn">Become a Donor</button>
            <button className="secondary-btn">Request Donation</button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>Why Choose Pulse Connect?</h2>
        <div className="about-cards">
          <div className="card">
            <h3>Instant Matching</h3>
            <p>Smart technology connects donors and recipients quickly and efficiently.</p>
          </div>
          <div className="card">
            <h3>Verified Donors</h3>
            <p>All donors are verified to ensure safety, trust, and reliability.</p>
          </div>
          <div className="card">
            <h3>Secure Platform</h3>
            <p>Your data is protected with advanced security systems and privacy controls.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-box">
          <h3>10,000+</h3>
          <p>Registered Donors</p>
        </div>
        <div className="stat-box">
          <h3>5,200+</h3>
          <p>Lives Saved</p>
        </div>
        <div className="stat-box">
          <h3>200+</h3>
          <p>Partner Hospitals</p>
        </div>
      </section>

      {/* Call To Action */}
      <section className="cta">
        <h2>Be Someone’s Lifeline Today</h2>
        <p>Your small act can give someone another chance at life.</p>
        <button className="primary-btn">Join Pulse Connect</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Pulse Connect | Saving Lives Together</p>
      </footer>

    </div>
  );
}