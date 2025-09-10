const express = require("express");
const router = express.Router();
const mcqController = require("../controllers/mcqController");

// ✅ Get all MCQs
router.get("/", mcqController.getAllMcqs);

// ✅ Get random MCQs
router.get("/random", mcqController.getRandomMcqs);

// ✅ Get MCQs by subject
router.get("/subject/:subject", mcqController.getMcqsBySubject);

// ✅ Get a single MCQ by ID
router.get("/:id", mcqController.getMcq);

// ✅ Create a new MCQ
router.post("/", mcqController.createMcq);

// ✅ Update an MCQ by ID
router.put("/:id", mcqController.updateMcq);

// ✅ Delete an MCQ by ID
router.delete("/:id", mcqController.deleteMcq);

module.exports = router;




