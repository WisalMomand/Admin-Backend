const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: { type: String, required: true },
  type: { type: String, enum: ["custom", "random"], required: true },
  mcqs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Mcq" }], // renamed from 'questions' to 'mcqs' to stay consistent

  // ✅ Support individual assignment by email
  assignedTo: { type: String }, // student email (optional)

  // ✅ Support group assignment by semester & section
  semester: { type: String, enum: ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"] },
  section: { type: String, enum: ["A", "B", "C", "D"] },

  deadline: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", quizSchema);

