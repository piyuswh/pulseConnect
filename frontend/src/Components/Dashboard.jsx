// ================================
//  Dashboard.jsx — LifeLink User
//  Dark charcoal theme
//  Layout: slim icon sidebar
// ================================

import { useState } from "react";
import "../pages/Dashboard.css";

// ── User info (replace with real API data) ──
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

// ── 4 stat cards ──
const STATS = [
  { emoji: "🩸", number: "1,284", label: "Total Donors",   color: "#e63946", bg: "rgba(230,57,70,0.12)"  },
  { emoji: "🏥", number: "34",    label: "Requests Today", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  { emoji: "❤️", number: "892",   label: "Lives Saved",    color: "#22c55e", bg: "rgba(34,197,94,0.12)"  },
  { emoji: "🫘", number: "456",   label: "Organ Donors",   color: "#a78bfa", bg: "rgba(167,139,250,0.12)"},
];

// ── Recent requests ──
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

// ── Sidebar nav items ──
const NAV = [
  { id: "dashboard", icon: "🏠", label: "Dashboard"  },
  { id: "requests",  icon: "🩸", label: "Requests"   },
  { id: "donors",    icon: "👥", label: "Donors"      },
  { id: "profile",   icon: "📋", label: "My Profile" },
  { id: "settings",  icon: "⚙️",  label: "Settings"  },
];

// ================================
//  MAIN COMPONENT
// ================================
export default function Dashboard() {

  // tracks which sidebar nav is active
  const [activePage, setActivePage] = useState("dashboard");

  // get first name only
  const firstName = USER.name.split(" ")[0];

  // greeting by time of day
  const hour   = new Date().getHours();
  const greet  = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="layout">

      {/* ====== SLIM SIDEBAR ======
          Shows only icons by default.
          Hover over it to expand and see labels.
      ============================== */}
      <aside className="sidebar">

        {/* Logo icon */}
        <div className="sidebar-logo">🩸</div>

        {/* Nav items — loop through NAV array */}
        {NAV.map(item => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => setActivePage(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}

        {/* Logout at bottom */}
        <div className="nav-bottom">
          <button className="nav-item" style={{ color: "#e63946" }}>
            <span className="nav-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>

      </aside>

      {/* ====== RIGHT SIDE ====== */}
      <div className="right-side">

        {/* ── TOP BAR ── */}
        <div className="topbar">
          <div className="topbar-left">
            <h1>{greet}, {firstName} 👋</h1>
            <p>Welcome back to LifeLink</p>
          </div>
          <div className="topbar-right">
            <div className="online-dot" />
            <div className="avatar">{USER.name.charAt(0)}</div>
            <span className="topbar-name">{firstName}</span>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="content">

          {/* STAT CARDS */}
          <div className="stats">
            {STATS.map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-icon" style={{ background: s.bg }}>
                  {s.emoji}
                </div>
                <div>
                  <div className="stat-number" style={{ color: s.color }}>{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* TWO COLUMN: Requests + Profile */}
          <div className="two-col">

            {/* LEFT — Requests */}
            <div className="card">
              <div className="card-title">🩸 Recent Donation Requests</div>
              {REQUESTS.map(r => (
                <div className="request-item" key={r.id}>
                  <div className="blood-bubble">{r.blood}</div>
                  <div>
                    <div className="req-name">{r.name}</div>
                    <div className="req-info">🏥 {r.type} • 📍 {r.city}</div>
                  </div>
                  <div className={`badge ${r.status}`}>
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT — Profile */}
            <div className="card">
              <div className="card-title">👤 My Profile</div>
              <div className="profile-box">

                <div className="big-avatar">{USER.name.charAt(0)}</div>
                <div className="p-name">{USER.name}</div>
                <div className="p-email">{USER.email}</div>

                <div className="detail-row">
                  <span className="d-label">Blood</span>
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

                {/* Show organs only if user is organ donor */}
                {USER.organDonor && (
                  <div className="detail-row">
                    <span className="d-label">Donating</span>
                    <span className="d-value">{USER.organs.join(", ")}</span>
                  </div>
                )}

                {/* Completion bar */}
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

          {/* NEARBY DONORS */}
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
        {/* end content */}
      </div>
      {/* end right-side */}

    </div>
  );
}