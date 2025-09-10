const mongoose = require("mongoose");

const mcqSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  question: { type: String, required: true },
  options: {
    type: [String],
    required: true,
    validate: [(val) => val.length === 4, "Exactly 4 options required"]
  },
  correctAnswer: { type: String, required: true },
});

module.exports = mongoose.model("Mcq", mcqSchema);



