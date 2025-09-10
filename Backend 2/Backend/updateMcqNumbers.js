const mongoose = require("mongoose");
const Mcq = require("./model/quizModel"); // adjust path if needed

async function updateMcqNumbers() {
  try {
    await mongoose.connect("mongodb://localhost:27017/quizcraft", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const subjects = await Mcq.distinct("subject");

    for (const subject of subjects) {
      const mcqs = await Mcq.find({ subject }).sort({ _id: 1 });

      let counter = 1;

      for (let mcq of mcqs) {
        // 🛡️ Skip if correctAnswer is missing
        if (!mcq.correctAnswer) {
          console.warn(`⚠️ Skipped MCQ without correctAnswer: ${mcq._id}`);
          continue;
        }

        mcq.mcqNumber = counter++;
        await mcq.save();
        console.log(`✅ Updated ${subject} - mcqNumber: ${mcq.mcqNumber}`);
      }
    }

    console.log("🎉 All mcqNumber fields updated successfully.");
    process.exit();
  } catch (error) {
    console.error("❌ Error updating mcqNumber:", error);
    process.exit(1);
  }
}

updateMcqNumbers();
