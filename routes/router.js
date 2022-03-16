const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

// router.use("/games");

router.get("/games", controller.getGames);

router.get("/games/:id", controller.getGameByID);

router.get("/games/:id/results", controller.getResults);

router.post("/games", controller.newGame); //getting game when making get request here, fix this pls future isak

router.post("/games/:id/join", controller.joinGameByID);

router.post("/games/:id/move", controller.makeMove);

module.exports = router;
