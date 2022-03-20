const request = require("supertest");
const app = require("../app.js");

/**
 * Very basic testing of API endpoints
 */
describe("Game API", () => {
    test("POST /api/games --> Creates a new game", async () => {
        const response = await request(app)
            .post("/api/games")
            .send({ name: "playername" });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toContain("Created new game");
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

    test("GET /api/games/{id}/join with invalid ID should get 404 response", async () => {
        const response = await request(app)
            .get("/api/games/1234")
            .send({ name: "playername" });
        expect(response.statusCode).toBe(404);
    });

    test("GET /api/games/{id} should get a specific game", async () => {
        const postResponse = await request(app)
            .post("/api/games")
            .send({ name: "player" });
        const gameID = postResponse.body.message.split(":")[1].trim();
        const getResponse = await request(app).get(`/api/games/${gameID}`);
        expect(getResponse.statusCode).toBe(200);
    });
});
