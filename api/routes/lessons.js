const express = require("express");
const router = express.Router();
const lessonsController = require("../controller/lessonsController");

router.post("/get", lessonsController.getLessonList);
router.post("/insert", lessonsController.insertLesson);
router.post("/insert/list", lessonsController.insertListLesson);
router.put("/update/:id", lessonsController.updateLesson);
router.delete("/delete/:id", lessonsController.deleteLesson);

module.exports = router;
