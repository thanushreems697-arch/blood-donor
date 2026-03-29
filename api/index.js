const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const donorRoutes = require("./routes/donorRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Reusable Database connection for serverless
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  if (!process.env.MONGO_URI) {
    throw new Error("Missing MONGO_URI: Add your MongoDB Atlas link to Vercel Environment Variables.");
  }

  return mongoose.connect(process.env.MONGO_URI);
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ 
      message: "Database Connection Error", 
      error: error.message,
      hint: "Check if you have added your MongoDB Atlas link to Vercel Environment Variables." 
    });
  }
});

app.use("/api/donors", donorRoutes);

// Health check route for diagnostics
app.get("/api/health", async (req, res) => {
  try {
    await connectDB();
    res.json({ status: "ok", message: "MongoDB Connected and Ready" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Export the app for Vercel Serverless Functions
module.exports = app;