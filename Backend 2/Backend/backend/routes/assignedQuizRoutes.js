const express = require("express");
const router = express.Router();
const AssignedQuiz = require("../model/assignedQuiz");

// ✅ GET all quizzes for semester and section
router.get("/", async (req, res) => {
  try {
    const { semester, section } = req.query;
    if (!semester || !section) {
      return res.status(400).json({ error: "Semester and section are required" });
    }

    const quizzes = await AssignedQuiz.find({ semester, section });
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching assigned quizzes:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ GET single assigned quiz by ID and populate MCQs
router.get("/:id", async (req, res) => {
  try {
    const quiz = await AssignedQuiz.findById(req.params.id).populate("mcqs"); // ✅ FIXED

    if (!quiz) {
      return res.status(404).json({ error: "Assigned quiz not found" });
    }

    res.status(200).json(quiz); // ✅ Will now include full MCQ objects
  } catch (error) {
    console.error("Error fetching quiz by ID:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
