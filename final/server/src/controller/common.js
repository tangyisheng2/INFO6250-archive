"use strict";
const uuid = require("uuid").v4;

function getRandomID(length) {
  const uuidString = uuid().toString();
  return uuidString.substring(uuidString.length - length);
}

module.exports = { getRandomID };
