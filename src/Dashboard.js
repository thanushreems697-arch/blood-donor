import React, { useEffect, useState } from "react";

function Dashboard() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcode some mockup data purely for aesthetics preview if API fails locally
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await fetch(`/api/donors`);
        if (response.ok) {
          const data = await response.json();
          setDonors(data.reverse()); // Show newest first
        } else {
          console.error("Failed to fetch donors");
        }
      } catch (error) {
        console.error("Error connecting to server:", error);
      } finally {
        setLoading(false);
      }
    };

    // Auto-refresh data every 5 seconds for dynamic feel
    fetchDonors();
    const interval = setInterval(fetchDonors, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <div style={{ color: "var(--primary)", fontSize: "1.2rem", fontWeight: 500 }}>Loading Heroes...</div>
    </div>
  );

  return (
    <div className="glass-panel" style={{ width: "100%", overflowX: "auto" }}>
      <h2 style={{ marginTop: 0, marginBottom: "1.5rem", fontSize: "1.5rem" }}>
        Recent Donors
      </h2>
      
      {donors.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
          <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>No donors yet.</p>
          <p>Be the first one to register and save a life!</p>
        </div>
      ) : (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Donor</th>
              <th>Blood Type</th>
              <th>Contact</th>
              <th>Age</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor, index) => (
              <tr key={donor._id || index}>
                <td style={{ fontWeight: 500 }}>{donor.name}</td>
                <td>
                  <span style={{ 
                    background: "rgba(239, 68, 68, 0.1)", 
                    color: "var(--primary)", 
                    padding: "0.3rem 0.6rem", 
                    borderRadius: "20px",
                    fontWeight: "bold",
                    fontSize: "0.9rem"
                  }}>
                    {donor.bloodGroup}
                  </span>
                </td>
                <td style={{ color: "var(--text-muted)" }}>{donor.contact}</td>
                <td>{donor.age} yrs</td>
                <td>{donor.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;