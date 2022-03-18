const request = require("supertest");
const app = require("../app.js");

const mockGameList = [
    {
        id: "1234",
        players: [
            {
                name: "Isak",
                move: "--HIDDEN--",
            },
            {
                name: "Kalle",
                move: "",
            },
        ],
    },
];

describe("Game API", () => {
    test("POST /api/games --> Returns a new game ID", async () => {
        const response = await request(app)
            .post("/api/games")
            .send({ name: "playername" });
        expect(response.statusCode).toBe(201);
    });

    test("POST /api/games with invalid body should get 400 response", async () => {
        const response = await request(app)
            .post("/api/games")
            .send({ name: "" });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual(
            "The player name cannot be empty!"
        );
        const response2 = await request(app)
            .post("/api/games")
            .send({ nam: "playername" });
        expect(response2.statusCode).toBe(400);
        expect(response2.body.message).toEqual(
            "The request is missing a required field, the required fields are: name"
        );
    });

    test("POST /api/games/{id}/join with invalid body should get 400 response", async () => {
        const response = await request(app)
            .post("/api/games")
            .send({ name: "" });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toEqual(
            "The player name cannot be empty!"
        );
        const response2 = await request(app)
            .post("/api/games")
            .send({ nam: "playername" });
        expect(response2.statusCode).toBe(400);
        expect(response2.body.message).toEqual(
            "The request is missing a required field, the required fields are: name"
        );
    });

    test("POST /api/games/{id}/join with invalid ID should get 404 response", async () => {
        const response = await request(app)
            .post("/api/games/1234")
            .send({ name: "playername" });
        expect(response.statusCode).toBe(404);
    });

    /* 
    test("should be 3", () => {
        expect(1 + 3).toBe(4);
        done();
    }); */

    /*     it("GET /games/id --> 404 if not found", () => {
        return request(index).get("/games/11111").expect(404);
    });

    it("POST /games --> creates a new game and returns ID", () => {}); */
});
