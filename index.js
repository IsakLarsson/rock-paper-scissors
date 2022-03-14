const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello Word!");
});

app.get("/users", (req, res) => {
  const users = ["Ted", "Todd", "Tudd"];

  res.send({ users: users });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
