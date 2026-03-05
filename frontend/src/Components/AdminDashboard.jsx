// ================================
//  AdminDashboard.jsx — LifeLink
//  Dark charcoal theme
//  Layout: slim icon sidebar
// ================================

import { useState } from "react";
import "../pages/AdminDashboard.css";

// ── Stat cards ──
const STATS = [
  { emoji: "👥", number: "1,284", label: "Total Users",    color: "#e63946", bg: "rgba(230,57,70,0.12)"  },
  { emoji: "🩸", number: "892",   label: "Blood Donors",   color: "#22c55e", bg: "rgba(34,197,94,0.12)"  },
  { emoji: "🫘", number: "456",   label: "Organ Donors",   color: "#a78bfa", bg: "rgba(167,139,250,0.12)"},
  { emoji: "⏳", number: "34",    label: "Pending Verify", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
];

// ── Users list ──
// status can be: "pending" | "verified" | "rejected"
const INITIAL_USERS = [
  { id: 1, name: "Riya Patel",  email: "riya@gmail.com",  blood: "O+",  role: "donor",     status: "pending"  },
  { id: 2, name: "Karan Mehta", email: "karan@gmail.com", blood: "A-",  role: "recipient", status: "pending"  },
  { id: 3, name: "Sneha Joshi", email: "sneha@gmail.com", blood: "B+",  role: "donor",     status: "verified" },
  { id: 4, name: "Dev Kapoor",  email: "dev@gmail.com",   blood: "AB+", role: "donor",     status: "pending"  },
  { id: 5, name: "Priya Singh", email: "priya@gmail.com", blood: "O-",  role: "recipient", status: "rejected" },
  { id: 6, name: "Arjun Rao",   email: "arjun@gmail.com", blood: "B-",  role: "donor",     status: "verified" },
  { id: 7, name: "Meena Das",   email: "meena@gmail.com", blood: "A+",  role: "recipient", status: "pending"  },
];

// ── Activity log ──
const ACTIVITY = [
  { id: 1, text: "Riya Patel registered as a new blood donor",     time: "2 mins ago",  color: "#e63946" },
  { id: 2, text: "Admin verified Sneha Joshi's profile",            time: "15 mins ago", color: "#22c55e" },
  { id: 3, text: "Karan Mehta submitted a new kidney request",      time: "1 hour ago",  color: "#f59e0b" },
  { id: 4, text: "Dev Kapoor registered as an organ donor",         time: "2 hours ago", color: "#e63946" },
  { id: 5, text: "Admin rejected Priya Singh (incomplete profile)", time: "3 hours ago", color: "#888888" },
];

// ── Sidebar nav ──
const NAV = [
  { id: "overview",   icon: "🏠", label: "Overview"   },
  { id: "users",      icon: "👥", label: "Users"       },
  { id: "donors",     icon: "🩸", label: "Donors"      },
  { id: "recipients", icon: "🏥", label: "Recipients"  },
  { id: "activity",   icon: "📋", label: "Activity"    },
  { id: "settings",   icon: "⚙️",  label: "Settings"  },
];

// ================================
//  MAIN COMPONENT
// ================================
export default function AdminDashboard() {

  // which sidebar item is active
  const [activePage, setActivePage] = useState("overview");

  // users stored in state so verify/reject updates the UI instantly
  const [users, setUsers] = useState(INITIAL_USERS);

  // which filter is selected: "all" | "pending" | "verified" | "rejected"
  const [filter, setFilter] = useState("all");

  // ── Verify a user ──
  // find user by id and set their status to "verified"
  function verifyUser(id) {
    setUsers(users.map(u => u.id === id ? { ...u, status: "verified" } : u));
  }

  // ── Reject a user ──
  // find user by id and set their status to "rejected"
  function rejectUser(id) {
    setUsers(users.map(u => u.id === id ? { ...u, status: "rejected" } : u));
  }

  // ── Filtered users list ──
  // if filter is "all" show everyone, otherwise show matching status
  const filteredUsers = filter === "all"
    ? users
    : users.filter(u => u.status === filter);

  // count each status for the filter buttons
  const counts = {
    all:      users.length,
    pending:  users.filter(u => u.status === "pending").length,
    verified: users.filter(u => u.status === "verified").length,
    rejected: users.filter(u => u.status === "rejected").length,
  };

  return (
    <div className="layout">

      {/* ====== SLIM SIDEBAR ======
          Slim icon-only by default.
          Hover to expand and see labels.
      ============================== */}
      <aside className="sidebar">

        <div className="sidebar-logo">🩸</div>

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
            <h1>Admin Dashboard 🛡️</h1>
            <p>Manage users and monitor platform activity</p>
          </div>
          <div className="topbar-right">
            <span className="admin-badge">Admin</span>
            <div className="online-dot" />
            <div className="avatar">A</div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="content">

          {/* STAT CARDS */}
          <div className="stats">
            {STATS.map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-icon" style={{ background: s.bg }}>{s.emoji}</div>
                <div>
                  <div className="stat-number" style={{ color: s.color }}>{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* USER VERIFICATION TABLE */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">👥 User Verification</span>
              <span className="card-count">{users.length} total</span>
            </div>

            {/* Filter buttons */}
            <div className="filters">
              {["all", "pending", "verified", "rejected"].map(f => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
                </button>
              ))}
            </div>

            {/* Table column headers */}
            <div className="table-head">
              <span>User</span>
              <span>Blood</span>
              <span>Role</span>
              <span>Status</span>
              <span>Actions</span>
            </div>

            {/* One row per user */}
            {filteredUsers.map(user => (
              <div className="user-row" key={user.id}>

                {/* Name + email */}
                <div>
                  <div className="user-name">{user.name}</div>
                  <div className="user-email">{user.email}</div>
                </div>

                {/* Blood group */}
                <div><span className="blood-pill">{user.blood}</span></div>

                {/* Role */}
                <div className="role-text">{user.role}</div>

                {/* Status */}
                <div>
                  <span className={`status ${user.status}`}>
                    ● {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </div>

                {/* Action buttons — only show if pending */}
                <div className="action-btns">
                  {user.status === "pending" && (
                    <>
                      <button className="btn-verify" onClick={() => verifyUser(user.id)}>✓ Verify</button>
                      <button className="btn-reject" onClick={() => rejectUser(user.id)}>✕ Reject</button>
                    </>
                  )}
                  {user.status === "verified" && <span style={{ fontSize: "12px", color: "#22c55e" }}>✓ Done</span>}
                  {user.status === "rejected" && <span style={{ fontSize: "12px", color: "#888" }}>Rejected</span>}
                </div>

              </div>
            ))}
          </div>

          {/* ACTIVITY LOG */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">📋 Recent Activity</span>
              <span className="card-count">{ACTIVITY.length} events</span>
            </div>

            {ACTIVITY.map(item => (
              <div className="activity-item" key={item.id}>
                <div className="activity-dot" style={{ background: item.color }} />
                <div>
                  <div className="activity-text">{item.text}</div>
                  <div className="activity-time">{item.time}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
        {/* end content */}
      </div>
      {/* end right-side */}

    </div>
  );
}