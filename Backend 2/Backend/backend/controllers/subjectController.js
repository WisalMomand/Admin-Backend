const Subject = require("../model/subject");

// ✅ Get All Subjects
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};

// ✅ Create New Subject
exports.createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    const exists = await Subject.findOne({ name });
    if (exists) return res.status(400).json({ error: "Subject already exists" });

    const newSubject = new Subject({ name });
    await newSubject.save();
    res.status(201).json({ message: "Subject created", subject: newSubject });
  } catch (err) {
    res.status(500).json({ error: "Failed to create subject" });
  }
};
