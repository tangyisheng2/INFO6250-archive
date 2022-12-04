"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const route = require("./src/routes/user-route");

const PORT = 3000;

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.send("It works");
});

app.use(route);

app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`);
});
