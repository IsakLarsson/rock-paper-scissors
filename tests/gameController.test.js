const { response } = require("express");
const request = require("supertest");
const app = require("../index.js");

describe("Game API", () => {
    it("GET /games --> array of games", () => {
        return request(app)
            .get("/games")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            message: expect.any(String),
                            players: expect.any(Array),
                        }),
                    ])
                );
            });
    });

    it("GET /games/id --> specific game by ID", () => {
        return request(app)
            .get("/games")
            .expect("Content-Type", /json/)
            .expect(200)
            .then((response) => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        message: expect.any(String),
                        players: expect.any(Array),
                    })
                );
            });
    });

    it("GET /games/id --> 404 if not found", () => {
        return request(app).get("/games/11111").expect(404);
    });

    it("POST /games --> creates a new game and returns ID", () => {});
});
