const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Create a question with options
// router.post("/", (req, res) => {
//   const { question_text, options } = req.body;

//   if (!question_text || !Array.isArray(options) || options.length < 2) {
//     return res.status(400).json({ message: "Question text and at least two options are required." });
//   }

//   // Insert question
//   const insertQuestion = `INSERT INTO questions (question_text) VALUES (?)`;

//   db.query(insertQuestion, [question_text], (err, result) => {
//     if (err) {
//       console.error("Error inserting question:", err);
//       return res.status(500).json({ message: "Failed to insert question." });
//     }

//     const questionId = result.insertId;

//     const insertOptions = `
//   INSERT INTO options (question_id, option_label, option_text, isCorrect)
//   VALUES ?
// `;


//     // const optionValues = options.map(opt => [questionId, opt.label, opt.text]);
//     const optionValues = options.map(opt => [questionId, opt.label, opt.text, opt.isCorrect ? 'yes' : 'no']);


//     db.query(insertOptions, [optionValues], (err2) => {
//       if (err2) {
//         console.error("Error inserting options:", err2);
//         return res.status(500).json({ message: "Failed to insert options." });
//       }

//       res.status(201).json({ message: "Question and options created successfully." });
//     });
//   });
// });
router.post("/", (req, res) => {
    const { question_text } = req.body;
  
    if (!question_text) {
      return res.status(400).json({ message: "Question text is required." });
    }
  
    const insertQuestion = `INSERT INTO questions (question_text) VALUES (?)`;
  
    db.query(insertQuestion, [question_text], (err, result) => {
      if (err) {
        console.error("Error inserting question:", err);
        return res.status(500).json({ message: "Failed to insert question." });
      }
      res.status(201).json({ message: "Question created successfully.", questionId: result.insertId });
    });
  });
  

// Get all questions with their options
router.get("/", (req, res) => {
    const query = `SELECT id, question_text FROM questions ORDER BY id`;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching questions:", err);
        return res.status(500).json({ message: "Internal server error." });
      }
      res.json(results); // returns array of { id, question_text }
    });
  });
  
  

module.exports = router;
