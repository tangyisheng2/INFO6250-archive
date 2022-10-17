const react = require("./react");
const storage = require("./storage");

const home = {
  renderHome(req, res) {
    const userStorage = storage.user;

    const sessionId = req.cookies["session-id"];
    const username = userStorage[sessionId];
    res.send(react.render(username));
  },
};

module.exports = home;
