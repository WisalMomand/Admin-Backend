const express = require("express");
const router = express.Router();
const {
  submitResult,
  getResultsByStudent,
  getResultsBySubjectAndTeacher, // ✅ Updated import
} = require("../controllers/AllStudentResultController");

// ✅ Student submits result
router.post("/submit", submitResult);

// ✅ Student views only their results
router.get("/student/:email", getResultsByStudent);

// ✅ Teacher filters by subject and only sees their assigned results
// Example: /api/results/by-subject?subject=Database&teacherEmail=teacher@example.com
router.get("/by-subject", getResultsBySubjectAndTeacher);

module.exports = router;

