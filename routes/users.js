const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Add a new user
router.post("/", (req, res) => {
  const { email, country, state, ip_address, device_id } = req.body;

  if (!email || !ip_address) {
    return res.status(400).json({ message: "Email and IP address are required." });
  }

  const query = `
    INSERT INTO users (email, country, state, ip_address, device_id)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [email, country, state, ip_address, device_id], (err, results) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "User already exists or IP already used." });
      }
      console.error("DB error:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    res.status(201).json({ message: "User created.", userId: results.insertId });
  });
});

// Get total participants & locations
router.get("/stats", (req, res) => {
  const query = `
    SELECT 
      COUNT(*) AS total_participants,
      country,
      state,
      COUNT(*) AS count
    FROM users
    GROUP BY country, state
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching stats:", err);
      return res.status(500).json({ message: "Internal server error." });
    }
    res.json({ stats: results });
  });
});

module.exports = router;
