"use strict";
const storage = require("./storage");

function render() {
  renderWarningMessage();
  renderLogin();
  renderUserlist();
  renderChat();
  renderMessageInput();
}

function renderWarningMessage() {
  const warningMessageEl = document.querySelector(".warning-message");
  warningMessageEl.innerHTML = storage.warningMessage
    ? `<p>&#9888;${storage.warningMessage}</p>`
    : "";
}

function renderUserlist() {
  const userlistEl = document.querySelector(".loggedin-users");
  if (!storage.username || !storage.sid) {
    userlistEl.innerHTML = "";
    return;
  }
  const userlistHTML = storage.loggedInUserList
    .map((username) => `<li class='user-list-item'>${username}</li>`)
    .join("");

  userlistEl.innerHTML = `<p>Active User:</p><ul class=user-list>${userlistHTML}</ul>`;
}

function renderChat() {
  const chatEl = document.querySelector(".chat");

  if (!storage.username) {
    chatEl.innerHTML = "";
    return;
  }

  const chatArr = storage.curChat;
  const chatListItemHTML = chatArr
    .map((messageObject) => {
      if (!messageObject) {
        return;
      }

      const username = Object.keys(messageObject)[0];
      const message = messageObject[username];

      return `<li class='chat-list-item'>${username}: ${message}</li>`;
    })
    .join("");
  chatEl.innerHTML = chatListItemHTML
    ? `<p>Chats: </p><ul class=chat-list>${chatListItemHTML}<ul>`
    : `<p class="chat-list empty">You dont have any chat yet.</p>`;
}

function renderLogin() {
  const userEl = document.querySelector(".user");
  if (storage.username && storage.sid) {
    userEl.innerHTML = `
                <span class='username-prompt'>Logged in as <span class='username'>${storage.username}</span>. Not <span class='username'>${storage.username}</span>? </span>
                <button class='logout-button'>Log out</button>
            `;
  } else {
    userEl.innerHTML = `<form action="">
      <span class='login-prompt'>You are not logged in.</span>
      <label>Login:
        <input type="text" class="user-login-input" placeholder='Username'></label>
      <button type="submit" class="user-login-submit">Log In</button>
    </form>`;
  }
}

function renderMessageInput() {
  const messageInputEl = document.querySelector(".new-message");

  if (!storage.username) {
    messageInputEl.innerHTML = "";
    return;
  }

  messageInputEl.innerHTML = `
  <form action="">
    <label>
      Send Message:
      <input type="text" placeholder="Message" class="new-message-input">
    </label>
    <button type="submit" class="new-message-submit">Send</button>
  </form>
  `;
}

module.exports = render;
