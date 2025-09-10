const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema(
  {
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    quizTitle: { type: String, required: true },
    subject: { type: String, required: true },
    semester: { type: String },
    section: { type: String },

    score: { type: Number, required: true },
    totalMcqs: { type: Number, required: true },
    percentage: { type: Number, required: true },

    teacherName: { type: String },
    teacherEmail: { type: String },

    answers: [
      {
        question: { type: String },
        selected: { type: String },
        correct: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizResult", quizResultSchema);
