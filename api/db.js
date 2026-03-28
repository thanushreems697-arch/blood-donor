const mysql = require("mysql2/promise");
require("dotenv").config();

// Standard TiDB Cloud Host: gateway01.ap-southeast-1.prod.aws.tidbcloud.com
// Port: 4000

const pool = mysql.createPool({
  host: process.env.TIDB_HOST,
  port: process.env.TIDB_PORT || 4000,
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE || "test",
  ssl: {
    rejectUnauthorized: true,
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Auto-initialize the table if it's not present
const initDB = async () => {
  try {
    const connection = await pool.getConnection();
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
    
    connection.release();
    console.log("Database table synchronized");
  } catch (error) {
    console.error("TiDB Connection/Init Error:", error.message);
  }
};

// Start initialization immediately
initDB();

module.exports = pool;
