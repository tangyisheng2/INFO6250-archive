"use strict";
const storage = {
  sessions: {},
  conversation: [], // elements are in {sender username: message}
};

module.exports = storage;
