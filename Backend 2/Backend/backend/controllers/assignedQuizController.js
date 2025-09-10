const AssignedQuiz = require("../model/assignedQuiz");
const Student = require("../model/student");

// ✅ Get assigned quizzes for a specific student using their email
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
      deadline: { $gte: today },
      assignedTo: email
    }).populate("mcqs"); // ✅ Ensures quiz.mcqs are full MCQ objects

    res.status(200).json(quizzes);
  } catch (error) {
    console.error("❌ Error fetching assigned quizzes:", error);
    res.status(500).json({ message: "Server error while fetching assigned quizzes." });
  }
};

// ✅ Assign a quiz to all students in a semester + section
exports.assignQuiz = async (req, res) => {
 const { teacherid } = req.params;
 console.log("Assigning quiz for teacher:", teacherid);
   try {
    const {
      title,
      subject,
      deadline,
      duration,
      mcqs, // should be array of MCQ IDs
      semester,
      section,
      type = "custom"
    } = req.body;

    if (!title || !subject || !deadline || !duration || !mcqs || !semester || !section) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!Array.isArray(mcqs) || mcqs.length === 0) {
      return res.status(400).json({ message: "MCQs must be a non-empty array" });
    }

    const students = await Student.find({ semester, section });

    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No students found in this semester and section" });
    }

    const quizzesToAssign = students.map((student) => ({
      teacherid,
      title,
      subject,
      deadline,
      duration,
      type,
      mcqs,
      semester,
      section,
      assignedTo: student.email
    }));
  console.log("Quizzes to assign:", quizzesToAssign);
    const createdQuizzes = await AssignedQuiz.insertMany(quizzesToAssign);

    res.status(201).json({
      message: "Quiz assigned to section successfully",
      quizzes: createdQuizzes
    });
  } catch (error) {
    console.error("❌ Error assigning quiz:", error);
    res.status(500).json({ message: "Failed to assign quiz" });
  }
};

// ✅ Get a single assigned quiz by ID (needed for StartQuiz)
exports.getAssignedQuizById = async (req, res) => {
  try {
    const quiz = await AssignedQuiz.findById(req.params.id).populate("mcqs");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error("❌ Error fetching quiz by ID:", error);
    res.status(500).json({ message: "Server error while fetching quiz" });
  }
};
