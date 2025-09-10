// routes/studentResultRoutes.js
const express = require("express");
const router = express.Router();
const {
  submitStudentResult,
  getResultsByStudentEmail,
} = require("../controllers/studentResultController");

// POST: Submit a result
router.post("/submit", submitStudentResult);

// GET: Get all results by student email
router.get("/student/:email", getResultsByStudentEmail);

module.exports = router;
