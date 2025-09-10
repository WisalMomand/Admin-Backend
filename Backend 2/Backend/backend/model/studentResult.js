// models/studentResultModel.js
const mongoose = require("mongoose");

const studentResultSchema = new mongoose.Schema({
  studentEmail: { type: String, required: true },
  quizTitle: { type: String, required: true },
  subject: { type: String, required: true },
  score: { type: Number, required: true },
  totalMcqs: { type: Number, required: true },
  answers: [
    {
      question: String,
      selectedAnswer: String,
      correctAnswer: String,
      isCorrect: Boolean,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("studentResult", studentResultSchema);

