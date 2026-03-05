// =============================================
//  ProfilePage.jsx  —  Organ & Blood Donor App
//  Easy to read, separated CSS file
// =============================================

import { useState } from "react";
import axios from "axios";
import "../pages/Profile.css";
import { Navigate, useNavigate } from "react-router-dom";

// ── Step titles shown in the header ──────────
const STEPS = ["Personal", "Medical", "Donation", "Location"];

// ── Organ options ─────────────────────────────
const ORGANS = [
  { name: "Kidney",   emoji: "🫘" },
  { name: "Liver",    emoji: "🫁" },
  { name: "Heart",    emoji: "❤️" },
  { name: "Lungs",    emoji: "🌬️" },
  { name: "Pancreas", emoji: "🧬" },
  { name: "Eyes",     emoji: "👁️" },
];

// ── Blood group options ───────────────────────
const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────
export default function ProfilePage() {
  const navigate=useNavigate()

  // Which step are we on? (0 = Personal, 1 = Medical, 2 = Donation, 3 = Location)
  const [step, setStep] = useState(0);

  // Is the form fully submitted?
  const [submitted, setSubmitted] = useState(false);

  // All form data lives in ONE object
  const [form, setForm] = useState({
    phone:                       "",
    age:                         "",
    weight:                      "",
    DOB:                         "",
    role:                        "donor",
    bloodGroup:                  "",
    lastDonationDate:            "",
    isAvailableForBloodDonation: true,
    isOrganDonor:                false,
    organsDonating:              [],   // array of selected organs
    state:                       "",
    city:                        "",
    pincode:                     "",
    medicalConditions:           "",
    emergencyContact:            "",
  });

  // ── Helper: update a single field ─────────────
  // Example: update("phone", "9876543210")
  function update(fieldName, value) {
    setForm({ ...form, [fieldName]: value });
  }

  // ── Helper: toggle an organ in the array ──────
  function toggleOrgan(organName) {
    const already = form.organsDonating.includes(organName);
    if (already) {
      update("organsDonating", form.organsDonating.filter(o => o !== organName));
    } else {
      update("organsDonating", [...form.organsDonating, organName]);
    }
  }

  // ── Submit to backend ──────────────────────────
  async function handleSubmit() {
    try {
      const response=await axios.post("http://localhost:8800/pulseConnect-userDetails",form,{withCredentials:true})
console.log(response);

      if (response.data.success) {
        setSubmitted(true);
      } else {
        const data = await response.json();
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      alert("Cannot connect to server. Is it running?");
    }
  }

  if (submitted) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <div className="success-screen">
            <span className="success-icon">❤️</span>
            <h2>Profile Complete!</h2>
            <p>Thank you for registering. Your profile is under review and will be verified shortly.</p>
            <button className="btn-next" onClick={() => { setSubmitted(false); setStep(0); navigate('/user-DashBoard') }}>
         Go To 
         DashBoard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────
  //  MAIN RENDER
  // ─────────────────────────────────────────────
  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* ── TOP RED HEADER ── */}
        <div className="card-header">
          <div className="logo">🩸 pulseConnect</div>
          <h2>Complete Your Profile</h2>
          <p>Step {step + 1} of {STEPS.length} — {STEPS[step]}</p>

          {/* Step dots (little bars showing progress) */}
          <div className="step-dots">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`dot ${i === step ? "active" : ""}`}
                style={{ width: i === step ? "28px" : "8px" }}
              />
            ))}
          </div>
        </div>

        {/* ── FORM BODY ── */}
        <div className="card-body">
          <div className="step-label">
            Step {step + 1} / {STEPS.length} — {STEPS[step]}
          </div>

          {/* ── STEP 0: Personal ── */}
          {step === 0 && (
            <div>
              <div className="two-col">
                <div className="field">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={form.DOB}
                    onChange={e => update("DOB", e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Age</label>
                  <input
                    type="number"
                    placeholder="e.g. 22"
                    min="18"
                    value={form.age}
                    onChange={e => update("age", e.target.value)}
                  />
                </div>
              </div>

              <div className="two-col">
                <div className="field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={e => update("phone", e.target.value)}
                  />
                </div>
                <div className="field">
                  <label>Weight (kg)</label>
                  <input
                    type="number"
                    placeholder="e.g. 65"
                    value={form.weight}
                    onChange={e => update("weight", e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label>I am a</label>
                <select value={form.role} onChange={e => update("role", e.target.value)}>
                  <option value="donor">Donor</option>
                  <option value="recipient">Recipient</option>
                </select>
              </div>

              <div className="field">
                <label>Emergency Contact (Name and Number)</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul — 98765 43210"
                  value={form.emergencyContact}
                  onChange={e => update("emergencyContact", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ── STEP 1: Medical ── */}
          {step === 1 && (
            <div>
              <div className="field">
                <label>Blood Group</label>
                <div className="blood-grid">
                  {BLOOD_GROUPS.map(bg => (
                    <button
                      key={bg}
                      className={`blood-btn ${form.bloodGroup === bg ? "selected" : ""}`}
                      onClick={() => update("bloodGroup", bg)}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field">
                <label>Available for Blood Donation?</label>
                <div className="toggle-row">
                  <button
                    className={`toggle-btn ${form.isAvailableForBloodDonation ? "selected" : ""}`}
                    onClick={() => update("isAvailableForBloodDonation", true)}
                  >
                    ✓ Yes
                  </button>
                  <button
                    className={`toggle-btn ${!form.isAvailableForBloodDonation ? "selected" : ""}`}
                    onClick={() => update("isAvailableForBloodDonation", false)}
                  >
                    ✗ No
                  </button>
                </div>
              </div>

              <div className="field">
                <label>Last Blood Donation Date</label>
                <input
                  type="date"
                  value={form.lastDonationDate}
                  onChange={e => update("lastDonationDate", e.target.value)}
                />
              </div>

              <div className="field">
                <label>Medical Conditions / Allergies</label>
                <textarea
                  placeholder="Any chronic illness, medications, allergies..."
                  value={form.medicalConditions}
                  onChange={e => update("medicalConditions", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ── STEP 2: Organ Donation ── */}
          {step === 2 && (
            <div>
              <div className="field">
                <label>Are you an Organ Donor?</label>
                <div className="toggle-row">
                  <button
                    className={`toggle-btn ${form.isOrganDonor ? "selected" : ""}`}
                    onClick={() => update("isOrganDonor", true)}
                  >
                    ❤️ Yes
                  </button>
                  <button
                    className={`toggle-btn ${!form.isOrganDonor ? "selected" : ""}`}
                    onClick={() => update("isOrganDonor", false)}
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Only show organ picker if they said YES */}
              {form.isOrganDonor && (
                <div className="field">
                  <label>Which organs are you willing to donate?</label>
                  <div className="organ-grid">
                    {ORGANS.map(organ => (
                      <button
                        key={organ.name}
                        className={`organ-btn ${form.organsDonating.includes(organ.name) ? "selected" : ""}`}
                        onClick={() => toggleOrgan(organ.name)}
                      >
                        <span>{organ.emoji}</span>
                        {organ.name}
                        {form.organsDonating.includes(organ.name) && (
                          <span style={{ marginLeft: "auto", color: "#e63946" }}>✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 3: Location ── */}
          {step === 3 && (
            <div>
              <div className="field">
                <label>State</label>
                <input
                  type="text"
                  placeholder="e.g. Maharashtra"
                  value={form.state}
                  onChange={e => update("state", e.target.value)}
                />
              </div>

              <div className="field">
                <label>City</label>
                <input
                  type="text"
                  placeholder="e.g. Mumbai"
                  value={form.city}
                  onChange={e => update("city", e.target.value)}
                />
              </div>

              <div className="field">
                <label>Pincode</label>
                <input
                  type="text"
                  placeholder="e.g. 400001"
                  maxLength="6"
                  value={form.pincode}
                  onChange={e => update("pincode", e.target.value)}
                />
              </div>

              <div className="info-box">
                📍 Your location helps connect you with nearby donors or recipients during emergencies. It is kept secure and only shared with verified users.
              </div>
            </div>
          )}

          {/* ── NAVIGATION BUTTONS ── */}
          <div className="btn-row">

            {/* Show Back button only after step 0 */}
            {step > 0 && (
              <button className="btn-back" onClick={() => setStep(step - 1)}>
                ← Back
              </button>
            )}

            {/* Continue OR Submit on last step */}
            <button
              className="btn-next"
              onClick={() => {
                if (step < STEPS.length - 1) {
                  setStep(step + 1);  // go to next step
                } else {
                  handleSubmit();      // last step → submit to backend
                }
              }}
            >
              {step < STEPS.length - 1 ? "Continue →" : "Submit Profile ❤️"}
            </button>

          </div>
        </div>
        {/* end card-body */}

      </div>
      {/* end profile-card */}
    </div>
  );
}