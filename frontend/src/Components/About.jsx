// ================================
//  AboutPage.jsx — LifeLink
//  Clean UI, easy to understand
// ================================

import "../pages/About.css";

// ── Nav links ──
const NAV_LINKS = ["Home", "About", "Donors", "Contact"];

// ── Our values section ──
const VALUES = [
  {
    emoji: "❤️",
    title: "Compassion First",
    desc:  "Every donor and recipient is treated with care, dignity, and respect at every step.",
  },
  {
    emoji: "🔒",
    title: "Trust & Safety",
    desc:  "All profiles are verified by our admin team before being activated on the platform.",
  },
  {
    emoji: "⚡",
    title: "Speed Matters",
    desc:  "In emergencies, every second counts. We connect donors and recipients in real time.",
  },
];

// ── Team members ──
const TEAM = [
  {
    initial: "A",
    name:    "Aryan Sharma",
    role:    "Founder & Developer",
    bio:     "Built LifeLink to solve the gap between donors and recipients across India.",
  },
  {
    initial: "P",
    name:    "Priya Verma",
    role:    "Medical Advisor",
    bio:     "Ensures all medical guidelines and safety protocols are followed on the platform.",
  },
  {
    initial: "R",
    name:    "Rahul Nair",
    role:    "UI/UX Designer",
    bio:     "Designed the clean, accessible interface that makes LifeLink easy to use for all.",
  },
];

// ================================
//  MAIN COMPONENT
// ================================
export default function AboutPage() {
  return (
    <div>

      {/* ====== NAVBAR ====== */}
      <nav className="navbar">
        <div className="nav-logo">
          <div className="nav-logo-box">🩸</div>
          <span className="nav-logo-text">LifeLink</span>
        </div>

        <div className="nav-links">
          {NAV_LINKS.map(link => (
            <a key={link} href="#" className={`nav-link ${link === "About" ? "active" : ""}`}>
              {link}
            </a>
          ))}
        </div>

        <div className="nav-btns">
          <button className="btn-outline">Login</button>
          <button className="btn-red">Register</button>
        </div>
      </nav>


      {/* ====== RED HERO BANNER ====== */}
      <div className="about-hero">
        <div className="about-tag">Our Story</div>
        <h1>About LifeLink 🩸</h1>
        <p>
          We started LifeLink with one mission — make it effortless
          for people to donate blood and organs, and for those in need
          to find a match quickly and safely.
        </p>
      </div>


      {/* ====== PAGE CONTENT ====== */}
      <div className="about-page">

        {/* ── MISSION SECTION ── */}
        <div className="mission">

          {/* Left: Text */}
          <div>
            <div className="section-tag">Our Mission</div>
            <h2 className="section-heading">Why LifeLink Exists</h2>
            <p className="section-text">
              Every year, thousands of people in India die because they
              cannot find a matching blood or organ donor in time.
              LifeLink was created to bridge that gap — connecting
              willing donors with patients who urgently need help.
              <br /><br />
              We believe technology can save lives. Our platform makes
              it simple to register as a donor, get verified, and be
              notified when someone nearby needs you.
            </p>
          </div>

          {/* Right: Red card */}
          <div className="mission-card">
            <h3>🎯 Our Goal</h3>
            <p>
              To build India's largest, most trusted network of blood
              and organ donors — where every registered user can
              potentially save a life with a single click.
              <br /><br />
              We aim to cover all major Indian cities and make same-day
              donor matching a reality for hospitals and patients.
            </p>
          </div>

        </div>


        {/* ── OUR VALUES ── */}
        <div className="values">
          <div className="section-tag">What We Stand For</div>
          <h2 className="section-heading">Our Core Values</h2>

          {/* Loop through VALUES array */}
          <div className="values-grid">
            {VALUES.map(v => (
              <div className="value-card" key={v.title}>
                <div className="value-emoji">{v.emoji}</div>
                <div className="value-title">{v.title}</div>
                <div className="value-desc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>


        {/* ── TEAM ── */}
        <div className="team">
          <div className="section-tag">The People</div>
          <h2 className="section-heading">Meet Our Team</h2>

          {/* Loop through TEAM array */}
          <div className="team-grid">
            {TEAM.map(member => (
              <div className="team-card" key={member.name}>
                {/* Avatar circle with first letter of name */}
                <div className="team-avatar">{member.initial}</div>
                <div className="team-name">{member.name}</div>
                <div className="team-role">{member.role}</div>
                <div className="team-bio">{member.bio}</div>
              </div>
            ))}
          </div>
        </div>


        {/* ── CTA STRIP ── */}
        <div className="cta-strip">
          <h2>Ready to Save a Life? 🩸</h2>
          <p>
            Join thousands of donors on LifeLink today.<br />
            Registration takes less than 2 minutes.
          </p>
          <button className="btn-cta">Register as a Donor</button>
        </div>

      </div>


      {/* ====== FOOTER ====== */}
      <footer className="footer">
        Made with <span>❤️</span> by LifeLink Team — Saving lives, one donation at a time.
      </footer>

    </div>
  );
}