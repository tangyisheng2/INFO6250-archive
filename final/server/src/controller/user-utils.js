"use strict";

const uuid = require("uuid").v4;

const storage = require("../storage");
const sessions = storage.sessions;

/**
 * This function checks if the username is valid
 * @param {String} username Username to check
 * @returns {Boolean} if the username is valid
 */
function isValidUsername(username) {
  // isValid &= username.match(/^[A-Za-z0-9_]+$/); // Filter in-valid username
  const isValid = /^[A-Za-z0-9_]+$/.test(username); // Filter in-valid username
  return isValid;
}

function isValidMessage(message) {
  let isValid = true;
  return isValid;
}

/**
 * This function create a new session and return the generated user name#uuid
 * @param {*} username
 * @returns
 */
function addSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return { sid };
}

/**
 * This function takes the userid and return the corresponsding username, if any
 * @param {String} sid session id
 * @returns {String} corresponding username (if have)
 */
function getSessionUser(sid) {
  return sessions[sid]?.username;
}

/**
 * This function removes the session id
 * @param {String} sid session id
 */
function deleteSession(sid) {
  delete sessions[sid];
}

/**
 *
 * @returns {Array} This function returns all username on record
 */
function getAllUser() {
  return Object.keys(sessions).map((sid) => sessions[sid]?.username);
}

function checkUsernameExist(username) {
  console.log(username);
  return username in storage.user;
}

function addUser(username) {
  storage.user[username] = {
    postId: [],
    commentId: [],
  };
}

module.exports = {
  isValidUsername,
  isValidMessage,
  addSession,
  deleteSession,
  getSessionUser,
  getAllUser,
  checkUsernameExist,
  addUser,
};
