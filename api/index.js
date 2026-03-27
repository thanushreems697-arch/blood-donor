const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const donorRoutes = require("./routes/donorRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/donors", donorRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Export the app for Vercel Serverless Functions
module.exports = app;