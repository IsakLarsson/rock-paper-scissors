const express = require("express");
const res = require("express/lib/response");
const app = express();
const routes = require("./routes/router");
const PORT = 3000;

const errorHandling = (err, req, res, next) => {
    //Clean messages so you don't give away unecessary information
    console.error(err);

    res.status(500).send("Oops something went wrong!");
};
//släng på en middleware som validatar allt som validatas i kontrolleern nu

app.use(express.json());
app.use("/api", routes);
app.use(errorHandling); //Mount last to catch errors

const games = [{ id: "69", players: [{ name: "todd", move: "Scissors" }] }];
const allowedMoves = ["Rock", "Paper", "Scissors"];
const winningMoves = { Rock: "Scissors", Paper: "Rock", Scissors: "Paper" };
const losingMoves = { Rock: "Paper", Paper: "Scissors", Scissors: "Rock" };

const checkWin = ([player1, player2]) => {
    const move1 = player1.move;
    const move2 = player2.move;
    console.log(player1);
    if (move1 == move2) {
        return `Both players played ${move1}, it's a draw!`;
    }
    if (winningMoves[move1] == move2) {
        return `${player1.name} played ${move1} and beat ${player2.name}'s ${move2}!`;
    } else {
        return `${player1.name} played ${move1} and lost to ${player2.name}'s ${move2}!`;
    }
    r;
};

app.get("/games", (req, res) => {
    if (games.length == 0) {
        res.send("No games exist yet, create a new one!");
        return;
    }
    res.send(games);
});

app.get("/games/:id", (req, res) => {
    for (const element of games) {
        if (element.id == req.params.id) {
            res.send(element);
            return;
        }
    }
    res.status(404).send("Could not find a game with that id");
});

app.post("/games/create", (req, res) => {
    /* if (req.body.players.length !== 2) console.log("not 2 players"); */
    const id = games.length + 1;
    games.push({ id: id, players: [] });
    res.send(`Game was successfully created with id: ${id}, Happy playing!`);
});

app.post("/games/:id/join", (req, res) => {
    //case for same name
    id = req.params.id;
    for (const element of games) {
        if (element.id == id) {
            if (element.players.length >= 2) {
                res.send(`Game ${id} already has two players!`);
                return;
            }
            const playerName = req.body.name;
            const player = { name: playerName, move: "" };
            element.players.push(player);
            res.send(`${playerName} was successfully added to game ${id}`);
            return;
        }
    }
    res.status(404).send("Couldn't find a game with that ID!");
});

app.post("/games/:id/move", (req, res) => {
    const id = req.params.id;
    const playerName = req.body.name;
    const move = req.body.move;
    const foundGame = games.find((game) => game.id == id);
    const foundPlayer = foundGame.players.find(
        (player) => player.name == playerName
    );
    if (foundPlayer == undefined) {
        res.status(400).send(`${playerName} is not in this game!`);
        return;
    }
    if (allowedMoves.includes(move)) {
        foundPlayer.move = move;
        if (!foundGame.players.map((player) => player.move).includes("")) {
            const message = checkWin(foundGame.players.map((player) => player));
            res.send(message);
            return;
        }
        res.send(`${playerName} played ${move}!`);
    } else {
        res.status(400).send(
            "You played an illegal move, check your spelling and try again!"
        );
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
