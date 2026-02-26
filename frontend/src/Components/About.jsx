import React from "react";
import "../pages/About.css";

export default function About() {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About Pulse Connect</h1>
          <p>
            We are building a bridge between generosity and hope — 
            connecting donors with those in urgent need of blood and organs.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="mv-box">
          <h2>Our Mission</h2>
          <p>
            To create a secure and efficient platform that connects blood 
            and organ donors with recipients, ensuring timely support and saving lives.
          </p>
        </div>

        <div className="mv-box">
          <h2>Our Vision</h2>
          <p>
            To become a globally trusted donor network where no life is lost 
            due to the unavailability of blood or organs.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="our-story">
        <h2>Our Story</h2>
        <p>
          Pulse Connect was founded with a simple yet powerful belief — 
          every second counts when a life is at stake. 
          We saw the gap between willing donors and patients in need, 
          and we decided to create a digital solution that bridges this gap.
        </p>
        <p>
          Today, Pulse Connect stands as a reliable and secure platform, 
          helping communities come together to save lives through technology, 
          trust, and compassion.
        </p>
      </section>

      {/* Core Values */}
      <section className="core-values">
        <h2>Our Core Values</h2>
        <div className="values-container">

          <div className="value-card">
            <h3>Compassion</h3>
            <p>We believe kindness and humanity are at the heart of saving lives.</p>
          </div>

          <div className="value-card">
            <h3>Integrity</h3>
            <p>Transparency and trust guide every connection we create.</p>
          </div>

          <div className="value-card">
            <h3>Innovation</h3>
            <p>We use smart technology to make donor matching faster and safer.</p>
          </div>

          <div className="value-card">
            <h3>Community</h3>
            <p>We build a supportive network that empowers people to help one another.</p>
          </div>

        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <h2>Our Dedicated Team</h2>
        <p>
          Our team consists of healthcare professionals, developers, 
          and volunteers committed to creating a meaningful impact.
        </p>
      </section>

      {/* Call To Action */}
      <section className="about-cta">
        <h2>Join Us in Saving Lives</h2>
        <p>
          Whether you're a donor, volunteer, or supporter — 
          you can make a difference today.
        </p>
        <button className="about-btn">Become Part of Pulse Connect</button>
      </section>

    </div>
  );
}