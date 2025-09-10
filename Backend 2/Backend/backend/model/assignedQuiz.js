// models/assignedQuiz.js
const mongoose = require('mongoose');

const AssignedQuizSchema = new mongoose.Schema({
  teacherid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title:{
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  numberOfMcqs: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true // in minutes
  },
  deadline: {
    type: String, // Format: YYYY-MM-DD
    required: true
  },
 
  semester: {
    type: String, // Optional for group-based assignment
    required: false
  },
  section: {
    type: String, // Optional for group-based assignment
    required: false
  },
  mcqs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mcq"
    }
  ],
  type: {
    type: String,
    enum: ["custom", "random"],
    default: "custom"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AssignedQuiz', AssignedQuizSchema);
