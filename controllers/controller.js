/* const { gamesExist } = require("../functions/functions"); */
const { v4: uuidv4, validate } = require("uuid");
const {
    calculateResult,
    createGame,
    gameIDExists,
    gamesExist,
    getGame,
    joinGame,
    playMove,
    playerExists,
    validateFields,
    validateNumberOfPlayers,
} = require("../functions/functions");

const getGames = (req, res) => {
    if (gamesExist(gameList)) {
        res.json({ message: "Getting games", res: gameList });
    } else {
        res.status(404).json({
            message: "No games were found, create a new one!",
        });
    }
};

const getGameByID = (req, res) => {
    const gameID = req.params.id;
    if (!gameIDExists(gameID)) {
        res.status(404).json({ message: "No game with that ID was found" });
        return;
    } else {
        res.json({
            message: `Getting game by id ${req.params.id}`,
            res: getGame(gameID),
        });
    }
};

const newGame = (req, res) => {
    const body = req.body;
    const requiredFields = ["name"];
    if (!validateFields(body, requiredFields)) {
        res.status(400).json({
            message: `The request is missing a required field, the required fields are: ${requiredFields}`,
        });
        return;
    }

    const playerName = body.name;
    if (playerName === "") {
        res.status(400).json({
            message: "The player name cannot be empty!",
        });
        return;
    }
    const createdID = createGame(playerName);
    res.status(201).json({ message: `Created new game with ID: ${createdID}` });
};

const joinGameByID = (req, res) => {
    const gameID = req.params.id;
    const playerName = req.body.name;
    //kolla om man hittar gamet ens
    if (!gameIDExists(gameID)) {
        res.status(404).json({ message: "No game with that ID was found" });
        return;
    }
    /* if (!validate(gameID)) { 
        res.status(400).json({ message: `The given ID is not valid!` });
        return;
    } */
    if (playerName === "") {
        res.status(400).json({
            message: "The player name cannot be empty!",
        });
        return;
    }
    if (!validateNumberOfPlayers(gameID)) {
        res.status(400).json({
            message: "The game already has two players!",
        });
        return;
    }
    if (gameIDExists(gameID)) {
        joinGame(gameID, playerName);
        res.status(201).json({
            message: `${playerName} successfully joined game ${gameID}!`,
        });
    }
};

const makeMove = (req, res) => {
    const gameID = req.params.id;
    const playerName = req.body.name;
    const body = req.body;
    const move = body.move;
    const requiredFields = ["name", "move"];
    //Better practice att flytta ner dessa deklarationer till efter valideringen?
    if (!validateFields(body, requiredFields)) {
        res.status(400).json({
            message: `The request is missing a required field, the required fields are: ${requiredFields}`,
        });
        return;
    }
    if (!playerExists(gameID, playerName)) {
        res.status(404).json({
            message: `Player ${playerName} was not found in this game!`,
        });
        return;
    }
    const moveResults = playMove(gameID, playerName, move);
    res.json({ message: moveResults });
};

const getResults = (req, res) => {
    const gameID = req.params.id;
    const body = req.body;
    const playerName = req.body.name;
    //Validera fields/id/playername
    const requiredFields = ["name"];

    if (!validateFields(body, requiredFields)) {
        res.status(400).json({
            message: `The request is missing a required field, the required fields are: ${requiredFields}`,
        });
        return;
    }
    if (!playerExists(gameID, playerName)) {
        res.status(404).json({
            message: `Player ${playerName} was not found in this game!`,
        });
        return;
    }
    if (!gameIDExists(gameID)) {
        res.status(404).json({ message: "No game with that ID was found" });
        return;
    }

    const result = calculateResult(gameID, playerName);
    res.json({ message: result });
};

//FUNCTIONS

module.exports = {
    getGames,
    getGameByID,
    newGame,
    joinGameByID,
    makeMove,
    getResults,
};
