"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const gamesRoutes = require("./routes/game.js");

const app = express();
const PORT = 3000;

app.use(express.static("./res"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// PUT ROUTES HERE
app.use("/", gamesRoutes);

app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`);
});
