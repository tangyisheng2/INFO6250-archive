"use strict";
const {
  initEventListener,
  fetchSession,
  fetchChat,
  initPolling,
} = require("./src/controller");
const render = require("./src/react");

setTimeout(() => {
  fetchSession()
    .then(() => fetchChat())
    .then(() => render());
  render();
  initEventListener();
  initPolling();
}, 1000); // Explicit set timeout to show "Loading" indicator
