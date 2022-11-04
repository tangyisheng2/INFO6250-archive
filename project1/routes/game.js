const express = require("express");
const { guess, newGame } = require("../controller/gamesLogic.js");
const { login, logout } = require("../controller/user.js");
let react = require("../controller/react.js");
const home = require("../controller/home.js");
const rank = require("../controller/rank.js");
const router = express.Router();

// PUT ROUTE HERE
router.get("/", home.renderHome);
router.get("/rank", rank.renderRank);

router.post("/login", login);
router.post("/logout", logout);

router.post("/guess", guess);
router.post("/new-game", newGame);

module.exports = router;
