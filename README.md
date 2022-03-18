# Rock Paper Scissors
A simple application for playing rock-paper-scissors over HTTP

Do you have a friend or colleague who you disagree with? This is the adult way of settling your differences, nothing else matters but the results of this game. It's a game of **rock-paper-scissors**. Sudden death, one game determines the winner.

## The rules
The rules are very simple, each player chooses one move: Rock, Paper or Scissors.  
As we all know: **Rock** beats **Scissors**, **Scissors** beat **Paper**, and **Paper** beats **Rock**.

## Setting up the game
To install all the necessary dependencies, open your command line, navigate to the root of the project and run either of the following commands
`npm install`
or
`yarn install`  
The server is then started by running `npm start` or `yarn start`, let the games begin!  
You can now proceed to make calls to the API using your preferred API testing software such as:  
- curl
- wget
- Postman
- HTTPie

## Game example
1. Player 1 sends a request to create a new game and gets a game ID from the server
2. Player 1 sends this ID to his challenger via any given means of communication
3. Player 2 joins the game using the game ID
4. Player 1 plays his/her move (Paper)
5. Player 2 plays his/her move (Rock)
6. Player 1 checks the results of the match and discovers that he/she won and lives forever in glory 
7. Player 2 checks the results of the match and discovers that he/she has lost and is forever in shame



## API calls and request requirements
If the server setup has succeeded you can continue to the fun part, playing the actualy game. But how do you play? this section outlines the valid API calls and what is required in the body of each request.



### POST /api/games
Creates a new game and returns the ID of the created game. The name of the player creating the game is required  
Request example:
```JSON
{
  "name": "Isak"
}
```
Success response example:
```JSON
{
  "message": "Created new game with ID: e3b92a1e-ebc1-4c2e-9027-a971145d32f8"
}
```

### POST /api/games/{id}/join
Joins a specific game given its ID, a name is required for this request as well. **NOTE**: There can only be two players per game and they cannot have the same name, this will result in an failed request. 
Request example:
```JSON
{
  "name": "Kalle"
}
```
Success response example:
```JSON
{
    "message": "Kalle successfully joined game 8ddac1cd-f3dc-46f1-98cb-bbc1d64c19d5!"
}
```

### POST /api/games/{id}/move
Plays the given move for the given player if that player exists in the game. Request requires a name and a move, the valid moves are "Rock", "Paper", and "Scissors".
Request example:
```JSON
{
  "name": "Kalle"
  "move": "Rock"
}
```
Success response example:
```JSON
{
    "message": "Kalle played Rock!"
}
```
### GET /api/games/{id}
This returns a specific game object containing its players and their moves. If only one player has made their move, that move will be hidden in the response to prevent cheating. If both players have made their move, a winner will be crowned and the result will be sent back in the response. This call does not require a request body

Response example:
```JSON
{
    "message": "Getting game by id cf48eb71-9cb1-4781-b4c1-84bd7f0fb60e",
    "game": {
        "id": "cf48eb71-9cb1-4781-b4c1-84bd7f0fb60e",
        "players": [
            {
                "name": "Isak",
                "move": "--HIDDEN--"
            },
            {
                "name": "Kalle",
                "move": ""
            }
        ]
    }
}
```
