"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const uuid = require("uuid");
const userRoute = require("./src/routes/user-route");
const postRoute = require("./src/routes/post-route");
const commentRoute = require("./src/routes/comment-route");

const PORT = 3000;

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static("./public"));

app.use(userRoute);
app.use(postRoute);
app.use(commentRoute);

app.listen(PORT, () => {
  console.log(`Listening http://localhost:${PORT}`);
});
