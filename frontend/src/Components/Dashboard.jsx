import { useState, useEffect } from "react";
import axios from "axios";
import "../pages/Dashboard.css";

// ==============================
//   YOUR API URL — change this
// ==============================
const API_URL = "http://localhost:8800";

// ==============================
//   Fetch all users
// ==============================
async function getUsers() {
  const res = await axios.get(`${API_URL}/users/verified-users`);
  const data = await res.data.users;
  return data.map((u) => ({
    id:    u._id || u.id,
    name:  u.name,
    email: u.email,
    role:  u.role || "user",   // "user" or "donor"
    type:  u.donorType || null, // "blood" | "organ" | "both"  (only for donors)
    blood: u.bloodGroup || "—",
  }));
}

// ==============================
//   Helpers
// ==============================
const COLORS = ["#e8433a", "#4f8ef7", "#3ecf6e", "#f59e0b", "#9b5cf6"];

function initials(name = "") {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function avatarColor(id = "") {
  return COLORS[String(id).charCodeAt(0) % COLORS.length];
}

// ==============================
//   DASHBOARD
// ==============================
export default function Dashboard() {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [tab,     setTab]     = useState("users");   // "users" | "donors"
  const [search,  setSearch]  = useState("");
  const [toasts,  setToasts]  = useState([]);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (e) {
      setError("Failed to load. Check your API URL.");
    } finally {
      setLoading(false);
    }
  }

  function toast(msg, type = "ok") {
    const id = Date.now();
    setToasts((p) => [...p, { id, msg, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3000);
  }

  // Filter by tab and search
  const allUsers  = users.filter((u) => u.role !== "donor");
  const allDonors = users.filter((u) => u.role === "donor");

  const q    = search.toLowerCase();
  const list = (tab === "users" ? allUsers : allDonors).filter(
    (u) => !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q)
  );

  return (
    <div className="layout">

      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">🩸</div>
          LifeLink
        </div>

        <button className={`nav-btn ${tab === "users"  ? "active" : ""}`} onClick={() => setTab("users")}>
          👤 &nbsp; Users
        </button>
        <button className={`nav-btn ${tab === "donors" ? "active" : ""}`} onClick={() => setTab("donors")}>
          💉 &nbsp; Donors
        </button>
      </aside>

      {/* ── MAIN ── */}
      <div className="main">

        {/* TOPBAR */}
        <div className="topbar">
          <h1>{tab === "users" ? "Users" : "Donors"}</h1>
          <input
            className="search"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="refresh-btn" onClick={load}>↻ Refresh</button>
        </div>

        {/* CONTENT */}
        <div className="content">

          {/* STAT CARDS */}
          <div className="cards">
            <div className="card">
              <div className="card-label">Total Users</div>
              <div className="card-value blue">{allUsers.length}</div>
            </div>
            <div className="card">
              <div className="card-label">Total Donors</div>
              <div className="card-value green">{allDonors.length}</div>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-box">
            <div className="table-box-header">
              <span>{tab === "users" ? "All Users" : "All Donors"}</span>
            </div>

            <div className="table-wrap">
              {loading && <div className="msg">Loading…</div>}
              {error   && <div className="msg err">{error}</div>}
              {!loading && !error && list.length === 0 && (
                <div className="msg">No {tab} found</div>
              )}

              {!loading && !error && list.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      {tab === "donors" && <th>Donor Type</th>}
                      {tab === "donors" && <th>Blood Group</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((user) => (
                      <tr key={user.id}>

                        {/* Name */}
                        <td>
                          <div className="user-cell">
                            <div className="avatar" style={{ background: avatarColor(user.id) }}>
                              {initials(user.name)}
                            </div>
                            <div>
                              <div className="user-name">{user.name}</div>
                            </div>
                          </div>
                        </td>

                        {/* Email */}
                        <td style={{ color: "#6b7080", fontSize: 13 }}>{user.email}</td>

                        {/* Donor-only columns */}
                        {tab === "donors" && (
                          <td>
                            <span className={`type-badge ${user.type || "blood"}`}>
                              {user.type || "—"}
                            </span>
                          </td>
                        )}
                        {tab === "donors" && (
                          <td style={{ fontWeight: 600 }}>{user.blood}</td>
                        )}

                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* TOASTS */}
      <div className="toast-wrap">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>{t.msg}</div>
        ))}
      </div>

    </div>
  );
}