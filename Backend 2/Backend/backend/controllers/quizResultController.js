const QuizResult = require("../model/quizResult");

const submitQuizResult = async (req, res) => {
  console.log("Received quiz result submission:", req.body);
  try {
    const {
      teacherId,
      studentName,
      studentEmail,
      quizTitle,
      subject,
      semester,
      section,
      score,
      totalMcqs,
      percentage,
      teacherName,
      teacherEmail,
      answers
    } = req.body;

    const newResult = new QuizResult({
      teacherId,
      studentName,
      studentEmail,
      quizTitle,
      subject,
      semester,
      section,
      score,
      totalMcqs,
      percentage,
      teacherName,
      teacherEmail,
      answers,
    });
    console.log("Submitting quiz result:", newResult);

    await newResult.save();
    res.status(201).json({ message: "✅ Quiz result submitted successfully", result: newResult });
  } catch (error) {
    console.error("❌ Error submitting quiz result:", error);
    res.status(500).json({ error: "Server error while submitting result" });
  }
};

const getAllResultsByTeacherId = async (req, res) => {
  const { teacherId } = req.params;
  console.log("Fetching results for teacher:", teacherId);
  try{
    const resultbyid = await QuizResult.find({ teacherId }).sort({ createdAt: -1 });
    if (!resultbyid || resultbyid.length === 0) {
      return res.status(404).json({ message: "No results found for this teacher" });
    }
    return res.status(200).json({ status: true, results: resultbyid });
  } catch (error) {
    console.error("❌ Error fetching quiz results:", error);
    res.status(500).json({ error: "Server error while fetching results" });
  }
}

module.exports = { submitQuizResult, getAllResultsByTeacherId };
