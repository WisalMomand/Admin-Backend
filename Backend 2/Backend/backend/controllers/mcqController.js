// controllers/mcqController.js
const Mcq = require("../model/mcq");

// ✅ Get MCQs by Subject (e.g., /api/mcqs/subject/:subject)
exports.getMcqsBySubject = async (req, res) => {
  try {
    const subject = req.params.subject;
    const mcqs = await Mcq.find({ subject });
    res.status(200).json(mcqs);
  } catch (error) {
    console.error("Error fetching MCQs by subject:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

// ✅ Get all MCQs or filtered by query (e.g., /api/mcqs?subject=OS)
exports.getAllMcqs = async (req, res) => {
  try {
    const filter = {};
    if (req.query.subject) {
      filter.subject = req.query.subject;
    }
    const mcqs = await Mcq.find(filter);
    res.json(mcqs);
  } catch (err) {
    res.status(500).json({ error: "Failed to get MCQs" });
  }
};

// ✅ Get Single MCQ by ID
exports.getMcq = async (req, res) => {
  try {
    const mcq = await Mcq.findById(req.params.id);
    if (!mcq) return res.status(404).json({ error: "MCQ not found" });
    res.json(mcq);
  } catch (err) {
    res.status(500).json({ error: "Error getting MCQ" });
  }
};

// ✅ Create MCQ (single or bulk)
exports.createMcq = async (req, res) => {
  try {
    const data = req.body;
    if (Array.isArray(data)) {
      const inserted = await Mcq.insertMany(data);
      res.status(201).json({ message: "Bulk MCQs inserted", count: inserted.length });
    } else {
      const mcq = new Mcq(data);
      const saved = await mcq.save();
      res.status(201).json({ message: "Single MCQ saved", mcq: saved });
    }
  } catch (err) {
    res.status(500).json({ error: "Error saving MCQ(s)", details: err.message });
  }
};

// ✅ Update MCQ by ID
exports.updateMcq = async (req, res) => {
  try {
    const updated = await Mcq.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "MCQ not found" });
    res.json({ message: "MCQ updated", mcq: updated });
  } catch (err) {
    res.status(500).json({ error: "Error updating MCQ", details: err.message });
  }
};

// ✅ Delete MCQ by ID
exports.deleteMcq = async (req, res) => {
  try {
    const deleted = await Mcq.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "MCQ not found" });
    res.json({ message: "MCQ deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting MCQ", details: err.message });
  }
};
// ✅ Get Random MCQs by Subject and Limit
exports.getRandomMcqs = async (req, res) => {
  try {
    const { subject, limit } = req.query;

    if (!subject || !limit) {
      return res.status(400).json({ error: "Subject and limit are required" });
    }

    const mcqs = await Mcq.aggregate([
      { $match: { subject } },
      { $sample: { size: parseInt(limit) } }
    ]);

    res.status(200).json(mcqs);
  } catch (error) {
    console.error("Error fetching random MCQs:", error);
    res.status(500).json({ error: "Server Error" });
  }
};







