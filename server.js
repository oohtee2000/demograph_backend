// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/db");
const path = require("path");
const userRoutes = require("./routes/users");
const answerRoutes = require("./routes/answers");
const questionRoutes = require("./routes/questions");


dotenv.config();

const app = express();

// Apply middleware BEFORE routes
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true // needed for cookies/sessions
}));

app.use(express.json()); // for parsing JSON body
app.use(express.urlencoded({ extended: true })); // for parsing form data
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mount routes AFTER middleware
app.use("/api/users", userRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/questions", questionRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Express backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
