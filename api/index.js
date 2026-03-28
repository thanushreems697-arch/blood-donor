const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Initialize TiDB connection pool
require("./db");

const donorRoutes = require("./routes/donorRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/donors", donorRoutes);

// Export the app for Vercel Serverless Functions
module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}