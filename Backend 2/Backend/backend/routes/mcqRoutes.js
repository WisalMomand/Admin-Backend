const express = require("express");
const router = express.Router();
const mcqController = require("../controllers/mcqController");


router.get("/", mcqController.getAllMcqs);


router.get("/random", mcqController.getRandomMcqs);


router.get("/subject/:subject", mcqController.getMcqsBySubject);

router.get("/:id", mcqController.getMcq);


router.post("/", mcqController.createMcq);


router.put("/:id", mcqController.updateMcq);


router.delete("/:id", mcqController.deleteMcq);

module.exports = router;




