const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  semester: {
    type: String,
    required: true,
    enum: [
      "1st", "2nd", "3rd", "4th",
      "5th", "6th", "7th", "8th"
    ]
  },
  section: {
    type: String,
    required: true,
    enum: ["A", "B", "C", "D"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
