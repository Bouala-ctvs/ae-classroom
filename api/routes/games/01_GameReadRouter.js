const express = require("express");
const router = express.Router();
const game01Controller = require("../../controller/games/01_GameReadComtroller");

router.post("/get", game01Controller.getGameList);
router.post("/insert", game01Controller.insertGame);
router.post("/insert/list", game01Controller.insertListGame);
router.put("/update/:id", game01Controller.updateGame);
router.delete("/delete/:id", game01Controller.deleteGame);

module.exports = router;
