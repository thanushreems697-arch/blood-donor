const mysql = require("mysql2/promise");
require("dotenv").config();

// Standard TiDB Cloud Host: gateway01.ap-southeast-1.prod.aws.tidbcloud.com
// Port: 4000

let pool;
let isInitialized = false;

// Lazy initialize the connection pool
const getPool = () => {
  if (pool) return pool;
  
  if (!process.env.TIDB_HOST || !process.env.TIDB_PASSWORD) {
    throw new Error("Missing Database Configuration: Check TIDB_HOST and TIDB_PASSWORD in Vercel.");
  }

  pool = mysql.createPool({
    host: process.env.TIDB_HOST,
    port: process.env.TIDB_PORT || 4000,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE || "test",
    ssl: {
      rejectUnauthorized: true,
    },
    // CRITICAL: Fail fast instead of hanging/crashing Vercel
    connectTimeout: 10000, 
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
  });
  
  return pool;
};

// Auto-initialize the table if it's not present
const initDB = async () => {
  if (isInitialized) return;
  
  const currentPool = getPool();
  let connection;
  try {
    // Attempt a quick connection test
    connection = await currentPool.getConnection();
    console.log("TiDB Connected Successfully");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS donors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        bloodGroup VARCHAR(10) NOT NULL,
        contact VARCHAR(50) NOT NULL,
        age INT,
        city VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    isInitialized = true;
    console.log("Database table synchronized");
  } catch (error) {
    console.error("TiDB Connection/Init Error:", error.message);
    throw error; // Rethrow so the middleware knows something is wrong
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getPool, initDB };
