
const mongoose = require("mongoose");

const AllStudentResultSchema = new mongoose.Schema(
  {
    studentEmail: String,
    studentName: String,
    semester: String,
    section: String,
    quizTitle: String,
    subject: String,
    score: Number,
    totalMcqs: Number,
    percentage: Number,
    answers: Array,

    // 🔐 For secure teacher filtering
    teacherEmail: {
      type: String,
      required: true,
    },
    teacherName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AllStudentResult", AllStudentResultSchema);

