// ================================
//  HomePage.jsx — LifeLink
//  Clean UI, easy to understand
// ================================

import "../pages/Home.css";

// ── Steps shown in "How it works" section ──
const STEPS = [
  {
    number: "1",
    title:  "Register",
    desc:   "Create your free account and fill in your profile with blood group and health details.",
  },
  {
    number: "2",
    title:  "Get Verified",
    desc:   "Our admin team reviews and verifies your profile to ensure safety for all users.",
  },
  {
    number: "3",
    title:  "Save a Life",
    desc:   "Get matched with nearby recipients or donors in real time during emergencies.",
  },
];

// ── Big numbers shown in the red band ──
const BAND_STATS = [
  { number: "1,284", label: "Registered Donors"  },
  { number: "892",   label: "Lives Saved"         },
  { number: "456",   label: "Organ Donors"        },
  { number: "38",    label: "Cities Covered"      },
];

// ── Nav links ──
const NAV_LINKS = ["Home", "About", "Donors", "Contact"];

// ================================
//  MAIN COMPONENT
// ================================
export default function HomePage() {
  return (
    <div>

      {/* ====== NAVBAR ====== */}
      <nav className="navbar">

        {/* Logo */}
        <div className="nav-logo">
          <div className="nav-logo-box">🩸</div>
          <span className="nav-logo-text">LifeLink</span>
        </div>

        {/* Nav links */}
        <div className="nav-links">
          {NAV_LINKS.map(link => (
            <a key={link} href="#" className={`nav-link ${link === "Home" ? "active" : ""}`}>
              {link}
            </a>
          ))}
        </div>

        {/* Login / Register buttons */}
        <div className="nav-btns">
          <button className="btn-outline">Login</button>
          <button className="btn-red">Register</button>
        </div>

      </nav>


      {/* ====== HERO SECTION ====== */}
      <div className="hero">

        {/* Left: Text */}
        <div>
          <div className="hero-tag">
            🩸 India's Donor Network
          </div>

          <h1>
            Donate Blood.<br />
            <span>Save Lives.</span><br />
            Be a Hero.
          </h1>

          <p>
            LifeLink connects blood and organ donors with recipients
            across India. Register today and be the reason someone
            gets a second chance at life.
          </p>

          <div className="hero-btns">
            <button className="btn-hero-red">Become a Donor</button>
            <button className="btn-hero-outline">Find a Donor</button>
          </div>
        </div>

        {/* Right: Stats card */}
        <div className="hero-card">
          <div className="hero-card-title">
            Platform at a Glance 🌟
          </div>

          <div className="hero-card-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">1,284</div>
              <div className="hero-stat-label">Total Donors</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">892</div>
              <div className="hero-stat-label">Lives Saved</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">38</div>
              <div className="hero-stat-label">Cities</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">24/7</div>
              <div className="hero-stat-label">Support</div>
            </div>
          </div>
        </div>

      </div>


      {/* ====== HOW IT WORKS ====== */}
      <div style={{ background: "#f7f8fc" }}>
        <div className="section">

          <div className="section-tag">How it works</div>
          <h2 className="section-heading">Three Simple Steps</h2>
          <p className="section-sub">
            Getting started on LifeLink is quick and easy.
            Join thousands of donors making a difference every day.
          </p>

          {/* Step cards — loop through STEPS array */}
          <div className="steps">
            {STEPS.map(step => (
              <div className="step-card" key={step.number}>
                <div className="step-number">{step.number}</div>
                <div className="step-title">{step.title}</div>
                <div className="step-desc">{step.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </div>


      {/* ====== RED STATS BAND ====== */}
      <div className="stats-band">
        {BAND_STATS.map((s, i) => (
          <div key={i}>
            <div className="band-stat-number">{s.number}</div>
            <div className="band-stat-label">{s.label}</div>
          </div>
        ))}
      </div>


      {/* ====== FOOTER ====== */}
      <footer className="footer">
        Made with <span>❤️</span> by LifeLink Team — Saving lives, one donation at a time.
      </footer>

    </div>
  );
}