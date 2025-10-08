require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// Route imports
const mcqRoutes = require("./routes/mcqRoutes");
const userRoutes = require("./routes/userRoutes");
const quizRoutes = require("./routes/quizRoutes");
const assignedQuizRoutes = require("./routes/assignedQuizRoutes");
const quizResultRoutes = require("./routes/quizResultRoutes");
const allStudentResultRoutes = require("./routes/AllStudentResultRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const studentResultRoutes = require("./routes/studentResultRoutes");

const app = express();


const FRONTEND_URL =
  process.env.FRONTEND_URL || "https://quizcraft2.netlify.app";

app.use(
  cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// ✅ Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running 🚀" });
});

// ✅ Routes
app.use("/api", userRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/assigned-quizzes", assignedQuizRoutes);
app.use("/api/mcqs", mcqRoutes);
app.use("/api/quiz-results", quizResultRoutes);
app.use("/api/results", allStudentResultRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/student-results", studentResultRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

