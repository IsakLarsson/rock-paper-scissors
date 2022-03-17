const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const {
    assurePlayerName,
    assureFields,
} = require("../middleware/validationMiddleware");

router.get("/games", gameController.getGames);

router.get("/games/:id", gameController.getGameByID);

router.get(
    "/games/:id/results",
    assureFields(["name"]),
    assurePlayerName,
    gameController.getResults
);

router.post(
    "/games",
    assureFields(["name"]),
    assurePlayerName,
    gameController.newGame
);

router.post(
    "/games/:id/join",
    assureFields(["name"]),
    assurePlayerName,
    gameController.joinGameByID
);

router.post(
    "/games/:id/move",
    assureFields(["name", "move"]),
    gameController.makeMove
);

module.exports = router;
