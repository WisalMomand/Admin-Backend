// controllers/studentResultController.js
const StudentResult = require("../model/studentResult");

// POST /api/student-results/submit
const submitStudentResult = async (req, res) => {
  try {
    const newResult = new StudentResult(req.body);
    const saved = await newResult.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Failed to submit student result:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/student-results/student/:email
const getResultsByStudentEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const results = await StudentResult.find({ studentEmail: email }).sort({ date: -1 });
    res.status(200).json(results);
  } catch (err) {
    console.error("❌ Failed to get student results:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  submitStudentResult,
  getResultsByStudentEmail,
};

