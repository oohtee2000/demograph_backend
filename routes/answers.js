const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Submit an answer
router.post("/", (req, res) => {
  const { user_id, question_id, answer_text } = req.body;

  if (!user_id || !question_id || !answer_text) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const query = `
    INSERT INTO answers (user_id, question_id, answer_text)
    VALUES (?, ?, ?)
  `;

  db.query(query, [user_id, question_id, answer_text], (err, results) => {
    if (err) {
      console.error("Error inserting answer:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    res.status(201).json({ message: "Answer submitted successfully." });
  });
});


// Get all answers (optional for admin dashboard)
router.get("/", (req, res) => {
  const query = `
    SELECT a.*, u.email, q.question_text
    FROM answers a
    JOIN users u ON a.user_id = u.id
    JOIN questions q ON a.question_id = q.id
    ORDER BY a.answered_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching answers:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    res.json(results);
  });
});

module.exports = router;
