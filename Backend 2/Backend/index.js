// index.js
require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Route imports
const mcqRoutes = require("./routes/mcqRoutes");
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const assignedQuizRoutes = require("./routes/assignedQuizRoutes");
const quizResultRoutes = require("./routes/quizResultRoutes");
const allStudentResultRoutes = require("./routes/AllStudentResultRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const studentResultRoutes = require("./routes/studentResultRoutes"); // ✅ NEW

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// API Routes
app.use("/api", userRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/assigned-quizzes", assignedQuizRoutes);
app.use("/api/mcqs", mcqRoutes);
app.use("/api/quiz-results", quizResultRoutes);
app.use("/api/results", allStudentResultRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/student-results", studentResultRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
