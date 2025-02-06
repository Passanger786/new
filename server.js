const express = require("express");
const mysql = require("mysql2/promise");
const app = express();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.get("/api/data", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM your_table");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;