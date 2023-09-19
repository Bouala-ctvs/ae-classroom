const express = require("express");
const router = express.Router();
const gameTestingController = require("../../controller/games/GameTestingController");

router.post("/get", gameTestingController.getGameList);
router.post("/insert", gameTestingController.insertGame);
router.post("/insert/list", gameTestingController.insertListGame);
router.put("/update/:id", gameTestingController.updateGame);
router.delete("/delete/:id", gameTestingController.deleteGame);
router.post("/get/file", gameTestingController.readFile);
router.post("/insert/file/path", gameTestingController.insertFilePath);

module.exports = router;
