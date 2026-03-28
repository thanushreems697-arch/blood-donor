const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Destructure from new export
const { initDB } = require("./db");

const donorRoutes = require("./routes/donorRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Middleware to ensure DB is initialized before requests
app.use(async (req, res, next) => {
  try {
    await initDB();
    next();
  } catch (error) {
    res.status(500).json({ 
      message: "Database Connection Error", 
      error: error.message,
      hint: "Check your TiDB Cloud IP Access List (should be 0.0.0.0/0) and Password." 
    });
  }
});

app.use("/api/donors", donorRoutes);

// Export the app for Vercel Serverless Functions
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}