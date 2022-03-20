const {
    bothPlayersPlayed,
    calculateResult,
    createGame,
    hidePlayerMoves,
    gameIDExists,
    getGame,
    joinGame,
    playMove,
    playerExists,
    validateNumberOfPlayers,
} = require("../functions/functions");

/**
 * Creates a new game of rock-paper-scissors and adds the first player
 * @param {*} req   HTTP request
 * @param {*} res   HTTP response
 */
const newGame = (req, res) => {
    const playerName = req.body.name;
    const createdID = createGame(playerName);
    res.status(201).json({ message: `Created new game with ID: ${createdID}` });
};

/**
 * Gets a specific game by its ID
 * @param {*} req   HTTP request
 * @param {*} res   HTTP response
 */
const getGameByID = (req, res) => {
    const gameID = req.params.id;
    checkGameID(gameID, res);

    if (!bothPlayersPlayed(gameID)) {
        return res.json({
            message: `Getting game by id ${req.params.id}`,
            game: hidePlayerMoves(getGame(gameID)),
        });
    }
    res.json({
        message: `Getting game by id ${req.params.id}`,
        result: calculateResult(gameID),
        game: getGame(gameID),
    });
};

/**
 * Joins a specific game by its ID
 * @param {*} req   HTTP request
 * @param {*} res   HTTP response
 */
const joinGameByID = (req, res) => {
    const gameID = req.params.id;
    const playerName = req.body.name;

    checkGameID(gameID, res);
    if (!validateNumberOfPlayers(gameID)) {
        res.status(400);
        throw new Error("The game already has two players!");
    }

    try {
        joinGame(gameID, playerName);
    } catch (err) {
        res.status(400);
        throw err;
    }
    res.status(201).json({
        message: `${playerName} successfully joined game ${gameID}!`,
    });
};

/**
 * Registers a given legal move in a specific game
 * @param {*} req   HTTP request
 * @param {*} res   HTTP response
 */
const makeMove = (req, res) => {
    const gameID = req.params.id;
    const playerName = req.body.name;
    const move = req.body.move;
    checkGameID(gameID, res);
    checkPlayerExists(gameID, playerName, res);
    try {
        const moveResults = playMove(gameID, playerName, move);
        res.json({ message: moveResults });
    } catch (err) {
        res.status(400);
        throw err;
    }
};

//Small helper functions for cleaner code

function checkGameID(gameID, res) {
    if (!gameIDExists(gameID)) {
        res.status(404);
        throw new Error("No game with that ID was found");
    }
}
function checkPlayerExists(gameID, playerName, res) {
    if (!playerExists(gameID, playerName)) {
        res.status(404);
        throw new Error(`Player ${playerName} was not found in this game!`);
    }
}

module.exports = {
    getGameByID,
    newGame,
    joinGameByID,
    makeMove,
};
