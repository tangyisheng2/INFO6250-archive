const storage = require("../storage");
const {
  getSessionUserId,
  checkUsernameExist,
  isValidUsername,
  addUser,
  addSession,
  deleteSession,
  getUidByUsername,
} = require("./user-utils");

function getSession(req, res) {
  const sid = req.cookies.sid;
  const userId = getSessionUserId(sid);
  const username = storage.user[userId]?.username;
  const isAdmin = storage.user[userId]?.isAdmin;
  res.json({ userId, username, sid, isAdmin });
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
  const userId = getUidByUsername(username);
  const { sid } = addSession(userId);
  const isAdmin = storage.user[userId]?.isAdmin;

  res.cookie("sid", sid);
  res.send({
    username,
    userId,
    sid,
    isAdmin,
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

  const userId = addUser(username);
  const { sid } = addSession(userId);
  const isAdmin = storage.user[userId]?.isAdmin;
  res.cookie("sid", sid);
  res.json({ userId, username, sid, isAdmin });
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
