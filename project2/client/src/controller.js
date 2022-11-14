"use strict";
const render = require("./react");
const storage = require("./storage");

function fetchSession() {
  return fetch("/api/v1/user")
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => Promise.reject({ err }));
      }
      return res.json();
    })
    .then((res) => {
      const { username, sid, loggedInUserList } = res;
      storage.username = username;
      storage.sid = sid;
      storage.loggedInUserList = loggedInUserList;
    });
}

function createSession(username) {
  return fetch("/api/v1/user", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ username }),
  })
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          storage.warningMessage = "Login failed, try again.";
          return Promise.reject({ err });
        });
      }
      return res.json();
    })
    .then((res) => {
      const { username, sid, loggedInUserList } = res;
      storage.username = username;
      storage.sid = sid;
      storage.loggedInUserList = loggedInUserList;
    });
}

function deleteSession() {
  return fetch("/api/v1/user", {
    method: "DELETE",
  })
    .catch((err) => Promise.reject({ err }))
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => Promise.reject(err));
      }
      return res.json();
    })
    .then(() => {
      storage.username = undefined;
      storage.sid = undefined;
      storage.curChat = [];
    });
}

function fetchChat() {
  return fetch("/api/v1/chat")
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => Promise.reject({ err }));
      }
      return res.json();
    })
    .then((chatArr) => {
      if (chatArr) {
        storage.curChat = chatArr;
      }
    });
}

function sendMessage(message) {
  if (!message) {
    storage.warningMessage = "Can not send empty message, try again!";
    return Promise.resolve();
  }

  return fetch("/api/v1/chat", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
}

function initEventListener() {
  const appEl = document.querySelector("#app");
  appEl.addEventListener("click", (e) => {
    e.preventDefault();
    storage.warningMessage = "";
    console.log(e.target);
    console.log(e.target.className);

    switch (e.target.className) {
      case "user-login-submit":
        const username = document.querySelector(".user-login-input").value;
        console.log(username);
        createSession(username)
          .then(() => fetchChat())
          .then(() => render())
          .catch(() => render());
        break;
      case "logout-button":
        deleteSession().then(() => {
          render();
          console.log(storage);
        });
        break;
      case "new-message-submit":
        const message = document.querySelector(".new-message-input").value;
        sendMessage(message)
          .catch((err) => render())
          .then(() => fetchChat())
          .then(() => render());
        break;

      default:
        break;
    }
  });
}

function initPolling() {
  setInterval(() => {
    return fetchSession()
      .then(() => fetchChat())
      .then(() => render());
  }, 5000);
}

module.exports = {
  fetchSession,
  createSession,
  deleteSession,
  fetchChat,
  sendMessage,
  initEventListener,
  initPolling,
};
