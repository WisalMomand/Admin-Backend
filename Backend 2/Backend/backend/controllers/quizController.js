const Quiz = require("../model/quiz");
const Mcq = require("../model/mcq");
const AssignedQuiz = require("../model/assignedQuiz");
const Student = require("../model/student"); // ✅ Make sure this model exists

// ✅ Create Custom Quiz (assign to semester + section)
exports.createCustomQuiz = async (req, res) => {
  const { teacherid } = req.params;
  console.log("Creating custom quiz for teacher:", teacherid);
  try {
    const {
      title,
      subject,
      numberOfMcqs,
      duration,
      deadline,
      semester,
      section,
      mcqs,
    } = req.body;
    console.log("Received quiz data:", {
      title,
      subject,
      numberOfMcqs,
      duration,
      deadline,
      semester,
      section,
      mcqs,
    });

    if (!title || !subject || !deadline || !semester || !section || !mcqs || mcqs.length === 0) {
      return res.status(400).json({ error: "Missing required quiz fields" });
    }

    const newQuiz = new AssignedQuiz({
      teacherid,
      title,
      subject,
      numberOfMcqs,
      duration,
      deadline,
      semester,
      section,
      mcqs,
      type: "custom"
    });

    await newQuiz.save();

    res.status(201).json({ message: "✅ Custom quiz created successfully", quiz: newQuiz });
  } catch (error) {
    console.error("❌ Error creating custom quiz:", error.message);
    res.status(500).json({ error: "Server Error" });
  }
};
// ✅ Create Random Quiz (assign to semester + section + teacher)
exports.createRandomQuiz = async (req, res) => {
  const { teacherid } = req.params;
  console.log("Creating random quiz for teacher:", teacherid);

  try {
    const { title, subject, numberOfMcqs, deadline, semester, section } = req.body;

    const duration = parseInt(numberOfMcqs) * 1;

    const questions = await Mcq.aggregate([
      { $match: { subject } },
      { $sample: { size: parseInt(numberOfMcqs) } },
    ]);

    if (questions.length < numberOfMcqs) {
      return res.status(400).json({
        success: false,
        message: `Only ${questions.length} MCQs found for ${subject}. Cannot create quiz with ${numberOfMcqs} questions.`,
      });
    }

    const questionIds = questions.map((q) => q._id);

    const newQuiz = await AssignedQuiz.create({
      teacherid,
      title,
      subject,
      type: "random",
      numberOfMcqs: parseInt(numberOfMcqs),
      duration,
      deadline,
      semester,
      section,
      mcqs: questionIds,
    });

    res.status(201).json({
      success: true,
      message: "✅ Random quiz assigned to semester and section",
      quiz: newQuiz,
    });
  } catch (error) {
    console.error("❌ Error creating random quiz:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create random quiz",
      error: error.message,
    });
  }
};


// ✅ Get quizzes for a student by email (based on semester + section)
exports.getAssignedQuizzesForStudent = async (req, res) => {
  const { email } = req.params;

  try {
    const student = await Student.findOne({ email });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const { semester, section } = student;

    const today = new Date().toISOString().split("T")[0];

    const quizzes = await AssignedQuiz.find({
      semester,
      section,
      deadline: { $gte: today }
    }).populate("mcqs");

    res.status(200).json(quizzes);
  } catch (error) {
    console.error("❌ Error fetching quizzes:", error);
    res.status(500).json({ message: "Server error while fetching assigned quizzes." });
  }
};

// ✅ Get all quizzes (optional)
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("questions");
    res.status(200).json({ success: true, quizzes });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching quizzes",
      error: error.message,
    });
  }
};

