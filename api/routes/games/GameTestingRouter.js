const express = require("express");
const router = express.Router();
const gameTestingController = require("../../controller/games/GameTestingController");

router.post("/get", gameTestingController.getGameList);
router.post("/insert", gameTestingController.insertGame);
router.post("/insert/list", gameTestingController.insertListGame);
router.put("/update/:id", gameTestingController.updateGame);
router.delete("/delete/:id", gameTestingController.deleteGame);

module.exports = router;
