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

/**
 * This function checks if a message is valid
 * @param {String} message message
 * @returns {Boolean} if message is valid
 */
function isValidMessage(message) {
  let isValid = true;
  return isValid;
}

/**
 * This function create a new session and return the generated user name#uuid
 * @param {*} username
 * @returns
 */
function addSession(userId) {
  const sid = uuid();
  sessions[sid] = userId;
  return { sid };
}

/**
 * This function takes the userid and return the corresponsding username, if any
 * @param {String} sid session id
 * @returns {String} corresponding username (if have)
 */
function getSessionUser(sid) {
  return sessions[sid];
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

/**
 * This function checks if a username is already used.
 * Called by user.register()
 * @param {String} username
 * @returns if a username is already used
 */
function checkUsernameExist(username) {
  console.log(username);
  const registeredUsername = Object.keys(storage.user).map(
    (userId) => storage.user[userId]?.username
  );
  console.log(registeredUsername);
  return registeredUsername.includes(username);
}

/**
 * This function adds a new user to storage.user
 * Called by user.register()
 * @param {*} username
 * @returns userId
 */
function addUser(username) {
  const userId = getRandomID(5);
  storage.user[userId] = {
    username,
    postId: [],
    commentId: [],
    isAdmin: false,
  };
  return userId;
}

/**
 * This method get uid by username.
 * Called by user.login(), when user login,
 * need to update storage.session with the uid
 * using this function
 * If uid is not found, return undefined
 * @param {String} username username
 * @returns uid
 */
function getUidByUsername(username) {
  const uid = Object.keys(storage.user).filter(
    (key) => storage.user[key].username == username
  ); // Returns an array containing the valid uid (should only contain one element)
  return uid ? uid[0] : undefined;
}

function getRandomID(length) {
  const uuidString = uuid().toString();
  return uuidString.substring(uuidString.length - length);
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
  getUidByUsername,
};
