// ================================
//  Dashboard.jsx — LifeLink App
//  Light white & red theme
//  Top navbar layout
// ================================

import { useState } from "react";
import "../pages/Dashboard.css";

// ── User data (replace with real API later) ──
const USER = {
  name:       "Aryan Sharma",
  email:      "aryan@gmail.com",
  blood:      "B+",
  city:       "Mumbai",
  organDonor: true,
  organs:     ["Kidney", "Eyes"],
  available:  true,
  completion: 80,
};

// ── 4 stat cards at the top ──
const STATS = [
  { emoji: "🩸", number: "1,284", label: "Total Donors",   color: "#e63946", bg: "#fff0f1" },
  { emoji: "🏥", number: "34",    label: "Requests Today", color: "#d97706", bg: "#fffbeb" },
  { emoji: "❤️", number: "892",   label: "Lives Saved",    color: "#16a34a", bg: "#f0fdf4" },
  { emoji: "🫘", number: "456",   label: "Organ Donors",   color: "#7c3aed", bg: "#f5f3ff" },
];

// ── Recent donation requests ──
const REQUESTS = [
  { id: 1, name: "Riya Patel",  blood: "O+",  type: "Blood",  city: "Mumbai", status: "urgent"    },
  { id: 2, name: "Karan Mehta", blood: "A-",  type: "Kidney", city: "Pune",   status: "pending"   },
  { id: 3, name: "Sneha Joshi", blood: "B+",  type: "Blood",  city: "Nagpur", status: "fulfilled" },
  { id: 4, name: "Dev Kapoor",  blood: "AB+", type: "Liver",  city: "Thane",  status: "urgent"    },
  { id: 5, name: "Priya Singh", blood: "O-",  type: "Blood",  city: "Mumbai", status: "pending"   },
];

// ── Nearby donors ──
const NEARBY = [
  { id: 1, emoji: "👨", name: "Amit K.",  blood: "A+",  city: "Mumbai", dist: "1.2 km" },
  { id: 2, emoji: "👩", name: "Pooja R.", blood: "O+",  city: "Mumbai", dist: "2.5 km" },
  { id: 3, emoji: "🧑", name: "Rahul S.", blood: "B-",  city: "Thane",  dist: "4.1 km" },
  { id: 4, emoji: "👩", name: "Neha T.",  blood: "AB-", city: "Mumbai", dist: "5.3 km" },
  { id: 5, emoji: "👨", name: "Vijay M.", blood: "O-",  city: "Pune",   dist: "7.8 km" },
  { id: 6, emoji: "👩", name: "Anita D.", blood: "A-",  city: "Mumbai", dist: "9.0 km" },
];

// ── Navbar links ──
const NAV_LINKS = ["Dashboard", "Requests", "Donors", "Profile", "Settings"];

// ================================
//  MAIN COMPONENT
// ================================
export default function Dashboard() {

  // tracks active nav link
  const [activePage, setActivePage] = useState("Dashboard");

  // get first name only
  const firstName = USER.name.split(" ")[0];

  // greeting by time of day
  const hour    = new Date().getHours();
  const greet   = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div>

      {/* ====== TOP NAVBAR ====== */}
      <nav className="navbar">

        {/* Left: Logo */}
        <div className="nav-logo">
          <div className="nav-logo-box">🩸</div>
          <span className="nav-logo-text">LifeLink</span>
        </div>

        {/* Middle: Nav links */}
        <div className="nav-links">
          {NAV_LINKS.map(link => (
            <button
              key={link}
              className={`nav-link ${activePage === link ? "active" : ""}`}
              onClick={() => setActivePage(link)}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right: Avatar + name */}
        <div className="nav-right">
          <div className="nav-avatar">{USER.name.charAt(0)}</div>
          <span className="nav-name">{firstName}</span>
        </div>

      </nav>

      {/* ====== PAGE CONTENT ====== */}
      <div className="page">

        {/* Greeting */}
        <div className="greeting">
          <h2>{greet}, {firstName} 👋</h2>
          <p>Here's what's happening on LifeLink today.</p>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="stats">
          {STATS.map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-icon-wrap" style={{ background: s.bg }}>
                {s.emoji}
              </div>
              <div className="stat-number" style={{ color: s.color }}>{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── TWO COLUMN: Requests + Profile ── */}
        <div className="two-col">

          {/* LEFT — Recent Requests */}
          <div className="card">
            <div className="card-title">🩸 Recent Donation Requests</div>

            {REQUESTS.map(r => (
              <div className="request-item" key={r.id}>

                {/* Blood group circle */}
                <div className="blood-bubble">{r.blood}</div>

                {/* Name and info */}
                <div>
                  <div className="req-name">{r.name}</div>
                  <div className="req-info">🏥 {r.type} &nbsp;•&nbsp; 📍 {r.city}</div>
                </div>

                {/* Status badge */}
                <div className={`badge ${r.status}`}>
                  {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                </div>

              </div>
            ))}
          </div>

          {/* RIGHT — My Profile */}
          <div className="card">
            <div className="card-title">👤 My Profile</div>

            <div className="profile-box">

              {/* Big avatar with first letter */}
              <div className="big-avatar">{USER.name.charAt(0)}</div>

              <div className="p-name">{USER.name}</div>
              <div className="p-email">{USER.email}</div>

              {/* Info rows */}
              <div className="detail-row">
                <span className="d-label">Blood Group</span>
                <span className="d-value" style={{ color: "#e63946" }}>{USER.blood}</span>
              </div>

              <div className="detail-row">
                <span className="d-label">City</span>
                <span className="d-value">{USER.city}</span>
              </div>

              <div className="detail-row">
                <span className="d-label">Organ Donor</span>
                <span className="d-value">{USER.organDonor ? "✅ Yes" : "❌ No"}</span>
              </div>

              <div className="detail-row">
                <span className="d-label">Available</span>
                <span className="d-value">{USER.available ? "🟢 Yes" : "🔴 No"}</span>
              </div>

              {/* Only show organs if user is organ donor */}
              {USER.organDonor && (
                <div className="detail-row">
                  <span className="d-label">Donating</span>
                  <span className="d-value">{USER.organs.join(", ")}</span>
                </div>
              )}

              {/* Profile completion bar */}
              <div className="bar-wrap">
                <div className="bar-label">
                  <span>Profile Complete</span>
                  <span style={{ color: "#e63946" }}>{USER.completion}%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${USER.completion}%` }} />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── NEARBY DONORS ── */}
        <div className="card">
          <div className="card-title">📍 Nearby Donors</div>
          <div className="nearby-grid">
            {NEARBY.map(d => (
              <div className="nearby-card" key={d.id}>
                <div className="n-emoji">{d.emoji}</div>
                <div className="n-name">{d.name}</div>
                <div className="n-blood">{d.blood}</div>
                <div className="n-city">{d.city}</div>
                <div className="n-dist">📍 {d.dist}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}