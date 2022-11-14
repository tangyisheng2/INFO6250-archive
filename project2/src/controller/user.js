"use strict";
const userUtil = require("./user-utils");

function fetchCurrentSession(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? userUtil.getSessionUser(sid) : "";
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const loggedInUserList = userUtil.getAllUser();
  res.json({ username, sid, loggedInUserList });
}

function createSession(req, res) {
  const { username } = req.body;

  if (!userUtil.isValidUsername(username)) {
    console.log(username);
    res.status(400).json({ error: "required-username" });
    return;
  }

  if (username === "dog") {
    res.status(403).json({ error: "auth-insufficient" });
    return;
  }

  const { sid, newUsername } = userUtil.addSession(username);
  const loggedInUserList = userUtil.getAllUser();

  res.cookie("sid", sid);
  res.json({ username: newUsername, sid, loggedInUserList });
}

function deleteSession(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? userUtil.getSessionUser(sid) : "";

  if (sid) {
    res.clearCookie("sid");
  }

  if (username) {
    // Delete the session, but not the user data
    userUtil.deleteSession(sid);
  }

  // We don't report any error if sid or session didn't exist
  // Because that means we already have what we want
  res.json({ wasLoggedIn: !!username }); // Provides some extra info that can be safely ignored
}

module.exports = {
  fetchCurrentSession,
  createSession,
  deleteSession,
};
