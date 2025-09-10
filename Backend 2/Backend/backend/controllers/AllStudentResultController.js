// controllers/allStudentResultController.js

const AllStudentResult = require("../model/AllStudentResult");

// 📌 Save Result (called by student after quiz completion)
exports.submitResult = async (req, res) => {
  try {
    const {
      studentEmail,
      studentName,
      semester,
      section,
      quizTitle,
      subject,
      score,
      totalMcqs,
      answers,
      teacherEmail,  // 👈 required for filtering later
      teacherName,   // 👈 optional for display
    } = req.body;

    const percentage = ((score / totalMcqs) * 100).toFixed(2);

    const result = new AllStudentResult({
      studentEmail,
      studentName,
      semester,
      section,
      quizTitle,
      subject,
      score,
      totalMcqs,
      percentage,
      answers,
      teacherEmail,
      teacherName,
    });

    await result.save();
    res.status(201).json({ message: "✅ Result saved", result });
  } catch (error) {
    console.error("❌ Failed to save result:", error);
    res.status(500).json({ message: "❌ Failed to save result", error });
  }
};

// 🧑‍🎓 Get all quiz results for a specific student
exports.getResultsByStudent = async (req, res) => {
  try {
    const { email } = req.params;

    const results = await AllStudentResult.find({ studentEmail: email }).sort({ createdAt: -1 });
    res.status(200).json(results);
  } catch (error) {
    console.error("❌ Error fetching student results:", error);
    res.status(500).json({ message: "❌ Error fetching student results", error });
  }
};

// 🧑‍🏫 Get all results for a specific subject assigned by the current teacher
exports.getResultsBySubjectAndTeacher = async (req, res) => {
  try {
     const {id} = req.params;
     
    if (!subject || !teacherEmail) {
      return res.status(400).json({ message: "❌ Missing subject or teacherEmail" });
    }

    const results = await AllStudentResult.find({
      subject,
      teacherEmail,
    }).sort({ createdAt: -1 });

    res.status(200).json(results);
  } catch (error) {
    console.error("❌ Error fetching subject results:", error);
    res.status(500).json({ message: "❌ Error fetching subject results", error });
  }
};

