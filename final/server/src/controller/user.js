const storage = require("../storage");
const {
  getSessionUser,
  checkUsernameExist,
  isValidUsername,
  addUser,
  addSession,
  deleteSession,
} = require("./user-utils");

function getSession(req, res) {
  const sid = req.cookies.sid;
  const username = getSessionUser(sid);
  res.json({ username, sid });
}

function login(req, res) {
  const username = req.body.username;

  // Log in will always refresh cookies
  // And will erase all previous session
  let oldSid = req.cookies.sid;
  deleteSession(oldSid);

  if (!checkUsernameExist(username)) {
    res.status(401).json({ error: "auth-error" });
    return;
  }

  const { sid } = addSession(username);
  res.cookie("sid", sid);
  res.send({
    username,
  });
}

function register(req, res) {
  const username = req.body.username;
  if (!isValidUsername(username)) {
    res.status(400).json({ error: "bad-username" });
    return;
  }

  if (checkUsernameExist(username)) {
    res.status(400).json({ error: "user-exist" });
    return;
  }

  addUser(username);
  const { sid } = addSession(username);
  res.cookie("sid", sid);
  res.json({ username });
}

function logout(req, res) {
  const sid = req.cookies.sid;
  deleteSession(sid);
  res.clearCookie("sid");
  res.send({ message: "success" });
}

module.exports = {
  getSession,
  login,
  logout,
  register,
};
