const gameList = [{ id: "69", players: [{ name: "todd", move: "Scissors" }] }];
const allowedMoves = ["Rock", "Paper", "Scissors"];
const winningMoves = { Rock: "Scissors", Paper: "Rock", Scissors: "Paper" };

module.exports = { gameList, allowedMoves, winningMoves };
