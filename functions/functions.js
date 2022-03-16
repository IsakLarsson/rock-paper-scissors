const { gameList, allowedMoves, winningMoves } = require("../game");

//TODO: Functions for validating data in the game. Functions for retreiving game and players for readability and also middleware for validating, refactor this from the controller functions

const playerExists = (gameID, playerName) => {
    const foundGame = gameList.find((game) => game.id === gameID);
    return foundGame.players.find((player) => player.name === playerName)
        ? true
        : false;
};

const validateFields = (body, fields) => {
    for (const field of fields) {
        if (!body.hasOwnProperty(field)) {
            return false;
        }
    }
    return true;
};

const gamesExist = (gameList) => {
    return gameList.length > 0 ? true : false;
};

const gameIDExists = (gameID) => {
    const foundGame = gameList.find((game) => game.id === gameID);
    return foundGame !== undefined ? true : false;
};

const calculateResult = (gameID, playerName) => {
    //Also check that there are any players in the first place

    const foundGame = gameList.find((game) => game.id === gameID);
    const foundPlayer = foundGame.players.find(
        (player) => player.name === playerName
    );
    const opponent = foundGame.players.find(
        (player) => player.name !== playerName
    );
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

//Maybe unecessary to check if exists again but just to be sure that it cant break the wole thing
const getGame = (gameID) => {
    return (foundGame = gameList.find((game) => game.id === gameID));

    /* Alternatively, since its the exact same thing, maybe returning something else is better practice?
    if (gameIDExists(gameID)) {
        const foundGame = gameList.find((game) => game.id == gameID);
        return foundGame
    }
    return undefined 
    */
};

const createGame = (playerName) => {
    const uuid = uuidv4();
    gameList.push({ id: uuid, players: [{ name: playerName, move: "" }] });
    return uuid;
};

const validateNumberOfPlayers = (gameID) => {
    const foundGame = gameList.find((game) => game.id === gameID);
    if (foundGame.players.length >= 2) {
        return false;
    }
    return true;
};

const joinGame = (gameID, playerName) => {
    const foundGame = gameList.find((game) => game.id === gameID);
    foundGame.players.push({ name: playerName, move: "" });
};

const playMove = (gameID, playerName, move) => {
    const foundGame = gameList.find((game) => game.id === gameID);
    const foundPlayer = foundGame.players.find(
        (player) => player.name === playerName
    );
    if (foundPlayer.move !== "") {
        return "Player already played a move!";
    }
    if (!allowedMoves.includes(move)) {
        return "Player tried to play an illegal move, check your spelling and try again!";
    }
    foundPlayer.move = move;
    return `${playerName} played ${move}!`;
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
