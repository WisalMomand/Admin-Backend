const express = require("express");
const router = express.Router();
const { submitQuizResult , getAllResultsByTeacherId } = require("../controllers/quizResultController");

router.post("/", submitQuizResult);
router.get("/result/:teacherId", getAllResultsByTeacherId);
module.exports = router;
