const { gameList, allowedMoves, winningMoves } = require("../assets/game");
const { v4: uuidv4 } = require("uuid");

/**
 * Checks if a given player exists in a given game
 * @param {string} gameID
 * @param {string} playerName
 * @returns True if player exists, otherwise false
 */
const playerExists = (gameID, playerName) => {
    const foundGame = getGame(gameID);
    return foundGame.players.find((player) => player.name === playerName)
        ? true
        : false;
};

/**
 * Validates that the given fields exist in the given body
 * @param {Object} body  JSON object
 * @param {Array<string>} requiredFields    Array of fieldnames that are required, eg.     ['name','id']
 * @returns True if fields exist
 */
const validateFields = (body, requiredFields) => {
    for (const field of requiredFields) {
        if (!body.hasOwnProperty(field)) {
            return false;
        }
    }
    return true;
};

/**
 * Checks if there are any active games
 * @param {Object[]} gameList
 * @returns True if there are any games in the list, false otherwise
 */
const gamesExist = (gameList) => {
    return gameList.length > 0 ? true : false;
};

/**
 * Returns a game that matches the given ID
 * @param {string} gameID
 * @returns a game that matches the given ID
 */
const getGame = (gameID) => {
    return (foundGame = gameList.find((game) => game.id === gameID));
};

/**
 * Returns a player with the given name
 * @param {Object} game  Game object
 * @param {string} playerName
 * @param {Boolean} opponent  If it should return opponent instead
 * @returns A player with the given name
 */
function getPlayer(game, playerName, opponent) {
    if (opponent) {
        return game.players.find((player) => player.name !== playerName);
    }
    return game.players.find((player) => player.name === playerName);
}

/**
 * Creates a new game and adds it to the list of games
 * @param {string} playerName    The player who started the game
 * @returns The ID of the new game
 */
const createGame = (playerName) => {
    const uuid = uuidv4();
    gameList.push({ id: uuid, players: [{ name: playerName, move: "" }] });
    return uuid;
};

/**
 * Checks if a game with a given ID exists
 * @param {string} gameID
 * @returns True if exists, false otherwise
 */
const gameIDExists = (gameID) => {
    const foundGame = getGame(gameID);
    return foundGame !== undefined ? true : false;
};

/**
 * Checks that the number of players isn't equal to or larger than 2
 * @param {string} gameID
 * @returns True if smaller than 2, false otherwise
 */
const validateNumberOfPlayers = (gameID) => {
    const foundGame = getGame(gameID);
    if (foundGame.players.length >= 2) {
        return false;
    }
    return true;
};

/**
 * Adds a player to a game with the given ID
 * @param {string} gameID
 * @param {string} playerName
 */
const joinGame = (gameID, playerName) => {
    const foundGame = getGame(gameID);
    if (playerExists(gameID, playerName)) {
        throw new Error(
            "There is already a player with this name in this game!"
        );
    }
    foundGame.players.push({ name: playerName, move: "" });
};

/**
 * Plays a move for a given player
 * @param {string} gameID
 * @param {string} playerName
 * @param {string} move
 * @returns A success message if move is valid, error message if not
 */
const playMove = (gameID, playerName, move) => {
    const foundGame = getGame(gameID);
    const foundPlayer = getPlayer(foundGame, playerName);
    if (foundPlayer.move !== "") {
        return "Player already played a move!";
    }
    if (!allowedMoves.includes(move)) {
        return "Player tried to play an illegal move, check your spelling and try again!";
    }
    foundPlayer.move = move;
    return `${playerName} played ${move}!`;
};

/**
 * Calculates the result of a given game and returns the response
 * @param {string} gameID
 * @param {string} playerName    The player who checks the results
 * @returns A message containing the result of the game
 */
const calculateResult = (gameID, playerName) => {
    const foundGame = getGame(gameID);
    const foundPlayer = getPlayer(foundGame, playerName);
    const opponent = getPlayer(foundGame, playerName, true);
    for (const player of foundGame.players) {
        if (player.move == "" || foundGame.players.length !== 2) {
            //maybe not hardcode 2
            return "All players need to play a move before the results can be calculated!";
        }
    }
    const playerMove = foundPlayer.move;
    const opponentMove = opponent.move;

    if (winningMoves[playerMove] == opponentMove) {
        return "You win!";
    } else if (playerMove == opponentMove) {
        return "It's a draw!";
    }
    return "You lose! :(";

    /*  if (foundGame.players.map((player) => player.move === "")) {
        return "All players need to play a move before the results can be calculated!";
    } */
};

module.exports = {
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
};
