const express = require("express");

const app = express();
const gameRoutes = require("./routes/gameRouter");
const { errorHandling } = require("./middleware/errorMiddleware");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(express.json());
app.use("/api", gameRoutes);
app.use(errorHandling);

module.exports = app;
