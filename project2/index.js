"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoute = require("./src/routes/user");
const chatRoute = require("./src/routes/chat");
const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("./public"));

app.use(userRoute);
app.use(chatRoute);

app.get("/", (req, res) => {
  res.send("IT WORKS!");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
