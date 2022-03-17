const express = require("express");
const app = express();
const routes = require("./routes/gameRouter");
const { errorHandling } = require("./middleware/errorMiddleware");
const PORT = 3000;

app.use(express.json());
app.use("/api", routes);
app.use(errorHandling);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
