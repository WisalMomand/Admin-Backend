const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Routes
router.post('/custom/:teacherid', quizController.createCustomQuiz);
router.post('/random/:teacherid', quizController.createRandomQuiz); // ✅ updated to include teacherid
router.get('/', quizController.getAllQuizzes); 

module.exports = router;
