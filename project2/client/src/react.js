'use strict';
const storage = require('./storage');

function render() {
  renderWarningMessage();
  renderLogin();
  renderChat();
  renderMessageInput();
}

function renderWarningMessage() {
  const warningMessageEl = document.querySelector('.warning-message');
  console.log(`warning message: ${storage.warningMessage}`);
  warningMessageEl.innerHTML = storage.warningMessage || '';
}

function renderChat() {
  const chatEl = document.querySelector('.chat');

  if (!storage.username) {
    chatEl.innerHTML = '';
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
    .join('');
  chatEl.innerHTML = chatListItemHTML
    ? `<ol class=chat-list>${chatListItemHTML}<ol>`
    : `<p class="chat-list empty">You dont have any chat yet.</p>`;
}

function renderLogin() {
  const userEl = document.querySelector('.user');
  if (storage.username && storage.sid) {
    userEl.innerHTML = `
                <span>Logged in as ${storage.username}. Not ${storage.username}? </span>
                <button class='logout-button'>Log out</button>
            `;
  } else {
    userEl.innerHTML = `<form action="">
      <span>You are not logged in.</span>
      <label>Login:
        <input type="text" class="user-login-input"></label>
      <button type="submit" class="user-login-submit">Log In</button>
    </form>`;
  }
}

function renderMessageInput() {
  const messageInputEl = document.querySelector('.new-message');

  if (!storage.username) {
    messageInputEl.innerHTML = '';
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
