const { gameList } = require("../game");
const {
    calculateResult,
    createGame,
    gameIDExists,
    gamesExist,
    getGame,
    joinGame,
    playMove,
    playerExists,
    validateNumberOfPlayers,
} = require("../functions/functions");

/**
 * Gets the currently active games if there are any.
 * @param {*} req   HTTP request
 * @param {*} res   HTTP response
 */
const getGames = (req, res) => {
    if (gamesExist(gameList)) {
        res.json({ message: "Getting games", res: gameList });
    } else {
        res.status(404).json({
            message: "No games were found, create a new one!",
        });
    }
};

/**
 * Gets a specific game by its ID
 * @param {*} req   HTTP request
 * @param {*} res   HTTP response
 * @returns
 */
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

/**
 * Creates a new game of rock-paper-scissors
 * @param {*} req   HTTP request
 * @param {*} res   HTTP response
 */
const newGame = (req, res) => {
    const playerName = req.body.name;

    const createdID = createGame(playerName);
    res.status(201).json({ message: `Created new game with ID: ${createdID}` });
};

/**
 * Joins a specific game
 * @param {*} req   HTTP request
 * @param {*} res   HTTP response
 * @returns
 */
const joinGameByID = (req, res) => {
    const gameID = req.params.id;
    const playerName = req.body.name;

    if (!gameIDExists(gameID)) {
        res.status(404).json({ message: "No game with that ID was found" });
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

/**
 * Registers a given legal move
 * @param {*} req   HTTP request
 * @param {*} res   HTTP response
 * @returns
 */
const makeMove = (req, res) => {
    const gameID = req.params.id;
    const playerName = req.body.name;
    const move = req.body.move;
    if (!gameIDExists(gameID)) {
        res.status(404).json({ message: "No game with that ID was found" });
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

/**
 * Gets the results of a given game
 * @param {*} req   HTTP request
 * @param {*} res   HTTP response
 * @returns
 */
const getResults = (req, res) => {
    const gameID = req.params.id;
    const playerName = req.body.name;

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

module.exports = {
    getGames,
    getGameByID,
    newGame,
    joinGameByID,
    makeMove,
    getResults,
};