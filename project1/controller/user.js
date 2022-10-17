const storage = require("./storage.js");
const uuid = require("uuid");
const react = require("./react.js");
const gamesLogic = require("./gamesLogic.js");
const user = {
  login(req, res) {
    const username = req.body.username;
    const userStorage = storage.user;
    const userStatus = storage.userStatus;
    const userUUID = uuid.v5.URL;
    if (username && username != "dog" && /^[a-z0-9]+$/i.test(username)) {
      const firstLogin = !userStatus[username];
      userStorage[userUUID] = username;
      console.log(`Read username: ${username}`);
      res.cookie("session-id", userUUID);
      if (firstLogin) {
        // If the user first login, return a new game
        gamesLogic.newGame(req, res);
      } else {
        res.redirect("/");
      }
    } else {
      res.status(401);
      // res.send(error.generate401());
      res.redirect("/");
    }
  },

  logout(req, res) {
    const sessionId = req.cookies["session-id"];
    const userStorage = storage.user;
    delete userStorage[sessionId];
    res.redirect("/");
  },

  getUsername(req) {
    const sessionId = req.cookies["session-id"];
    return storage.user[sessionId];
  },
};

module.exports = user;
