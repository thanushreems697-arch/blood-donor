import React, { useState } from "react";

function DonorForm() {
  const [name, setName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5001/api";

    try {
      const response = await fetch(`${apiUrl}/donors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, bloodGroup, contact, age: Number(age), city }),
      });

      if (response.ok) {
        alert("Donor added successfully! Thank you for your kindness.");
        setName(""); setBloodGroup(""); setContact(""); setAge(""); setCity("");
      } else {
        alert("Failed to add donor.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "var(--primary)", marginTop: 0, marginBottom: "1.5rem", fontSize: "1.8rem" }}>
        Become a Donor
      </h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem", alignItems: "end" }}>
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-muted)", fontSize: "0.9rem" }}>Full Name</label>
          <input className="input-field" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-muted)", fontSize: "0.9rem" }}>Blood Group</label>
          <select className="input-field" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required>
            <option value="" disabled>Select Type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div>
           <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-muted)", fontSize: "0.9rem" }}>Age</label>
           <input className="input-field" type="number" placeholder="Years" value={age} onChange={(e) => setAge(e.target.value)} required min="18" max="65" />
        </div>

        <div>
           <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-muted)", fontSize: "0.9rem" }}>Contact Number</label>
           <input className="input-field" type="tel" placeholder="+1 (555) 000-0000" value={contact} onChange={(e) => setContact(e.target.value)} required />
        </div>

        <div>
           <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, color: "var(--text-muted)", fontSize: "0.9rem" }}>City</label>
           <input className="input-field" type="text" placeholder="New York" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>

        <div style={{ gridColumn: "1 / -1", marginTop: "1rem" }}>
          <button className="btn-primary" type="submit" disabled={loading} style={{ width: "100%", padding: "1rem" }}>
            {loading ? "Registering..." : "Register Now"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DonorForm;