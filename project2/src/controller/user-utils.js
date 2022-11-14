'use strict';
const uuid = require('uuid').v4;
const storage = require('../storage.js');

const sessions = storage.sessions;

function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function isValidMessage(word) {
  let isValid = true;
  // isValid = isValid && word.match(/^[A-Za-z]*$/);
  return isValid;
}

function addSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return sid;
}

function getSessionUser(sid) {
  // Conditional Chaining operator ?.
  // Use MDN to learn more
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

function getAllUser(sid) {
  return Object.keys(sessions).map((sid) => sessions[sid]?.username);
}

module.exports = {
  isValidUsername,
  isValidMessage,
  addSession,
  deleteSession,
  getSessionUser,
  getAllUser,
};
