import React, { useState, useEffect } from "react";
import DonorForm from "./DonorForm";
import Dashboard from "./Dashboard";
import AdminDashboard from "./AdminDashboard";
import "./App.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }
    
    // Check if previously authenticated as admin during this session
    if (sessionStorage.getItem("adminAuth") === "true") {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  const handleAdminToggle = () => {
    if (isAdminView) {
      setIsAdminView(false); // Return to public
      return;
    }

    // Trying to enter admin mode
    if (isAdminAuthenticated) {
      setIsAdminView(true);
    } else {
      const password = window.prompt("Admin Access Required. Enter Password:");
      if (password === "admin123") {
        setIsAdminAuthenticated(true);
        sessionStorage.setItem("adminAuth", "true");
        setIsAdminView(true);
      } else if (password !== null) {
        alert("Incorrect password!");
      }
    }
  };

  return (
    <div className="animate-slide-up">
      <nav style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: "1rem 2rem", 
        backgroundColor: "var(--card-bg)",
        boxShadow: "var(--shadow)",
        backdropFilter: "var(--blur)",
        position: "sticky",
        top: 0,
        zIndex: 100
      }}>
        <h1 style={{ margin: 0, color: "var(--primary)", fontSize: "1.5rem", fontWeight: 700 }}>
          BloodDrop <span style={{color: "var(--text-main)", fontWeight: 400}}>Network</span>
        </h1>
        
        <div style={{ display: "flex", gap: "1rem" }}>
          {/* Admin Login Button Aligned With Project */}
          <button 
            onClick={handleAdminToggle} 
            className="btn-primary"
            style={{ 
              background: "transparent", 
              color: "var(--text-main)", 
              boxShadow: "none", 
              border: "1px solid var(--input-border)",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            {isAdminView ? "🔙 View Public App" : "🛡️ Admin Login"}
          </button>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="btn-primary"
            style={{ background: isDarkMode ? "#334155" : "#e2e8f0", color: isDarkMode ? "#f8fafc" : "#0f172a", boxShadow: "none" }}
          >
            {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </nav>

      <main style={{ padding: "3rem 1rem", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "3rem" }}>
        
        {isAdminView ? (
          <section className="animate-slide-up">
             <AdminDashboard />
          </section>
        ) : (
          <>
            <section className="animate-slide-up delay-100" style={{ textAlign: "center", marginBottom: "2rem" }}>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Save a Life Today</h2>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
                Join our network of heroes. Register as a blood donor and make a difference in your community. Every drop counts.
              </p>
            </section>

            <section className="animate-slide-up delay-200">
              <DonorForm />
            </section>

            <section className="animate-slide-up delay-300">
              <Dashboard />
            </section>
          </>
        )}

      </main>
    </div>
  );
}

export default App;