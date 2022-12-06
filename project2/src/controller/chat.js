"use strict";
const { conversation } = require("../storage");
const { getSessionUser, isValidMessage } = require("./user-utils");

function fetchConversation(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? getSessionUser(sid) : "";

  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  res.json(conversation);
}

function postMessage(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? getSessionUser(sid) : "";

  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const { message } = req.body;

  if (!message && message !== "") {
    res.status(400).json({ error: "require-message" });
  }

  if (!isValidMessage(message)) {
    res.status(400).json({ error: "invalid-message" });
  }

  conversation[conversation.length] = { [username]: message };

  res.json({ username, message });
}

module.exports = { fetchConversation, postMessage };
