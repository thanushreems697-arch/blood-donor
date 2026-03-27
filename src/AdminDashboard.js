import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchDonors = async () => {
    try {
      const response = await fetch(`/api/donors`);
      if (response.ok) {
        const data = await response.json();
        setDonors(data.reverse());
      } else {
        console.error("Failed to fetch donors");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donor? This action cannot be undone.")) {
      return;
    }

    setDeleteLoading(id);
    try {
      const response = await fetch(`/api/donors/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove from UI without having to fetch the whole list again
        setDonors(donors.filter((donor) => donor._id !== id));
      } else {
        alert("Failed to delete donor. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting donor:", error);
      alert("Error connecting to server while trying to delete.");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <div style={{ color: "var(--primary)", fontSize: "1.2rem", fontWeight: 500 }}>Loading Admin Portal...</div>
    </div>
  );

  return (
    <div className="glass-panel" style={{ width: "100%", overflowX: "auto", border: "2px solid rgba(239, 68, 68, 0.3)" }}>
      <h2 style={{ marginTop: 0, marginBottom: "0.5rem", fontSize: "1.8rem", display: "flex", alignItems: "center", gap: "10px" }}>
        🔒 Admin Control Panel
      </h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
        Manage registered donors. Deleting a record is permanent.
      </p>

      {donors.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
          <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Database is empty.</p>
        </div>
      ) : (
        <table className="custom-table" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Donor Name</th>
              <th>Blood Type</th>
              <th>Contact</th>
              <th>Location</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor) => (
              <tr key={donor._id} style={{ transition: "background-color 0.2s" }}>
                <td style={{ color: "var(--text-muted)", fontSize: "0.85rem", fontFamily: "monospace" }}>
                  {donor._id.slice(-6)}
                </td>
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
                <td>{donor.city}</td>
                <td style={{ textAlign: "center" }}>
                  <button 
                    onClick={() => handleDelete(donor._id)}
                    disabled={deleteLoading === donor._id}
                    style={{
                      background: deleteLoading === donor._id ? "gray" : "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                      cursor: deleteLoading === donor._id ? "not-allowed" : "pointer",
                      fontWeight: 600,
                      transition: "0.2s",
                      boxShadow: "0 2px 10px rgba(220, 38, 38, 0.3)"
                    }}
                    onMouseOver={(e) => {
                      if(deleteLoading !== donor._id) e.target.style.background = "#991b1b";
                    }}
                    onMouseOut={(e) => {
                      if(deleteLoading !== donor._id) e.target.style.background = "#dc2626";
                    }}
                  >
                    {deleteLoading === donor._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
