'use strict';
const controller = require('./controller');
const storage = require('./storage');

function render() {
  renderChat();
  renderLogin();
}

function renderChat() {
  controller.fetchChat().then(() => {
    const chatEl = document.querySelector('.chat');

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
  });
}

function renderLogin() {
  controller.fetchSession().then(() => {
    const userEl = document.querySelector('.user');
    if (storage.username && storage.sid) {
      userEl.innerHTML = `
                <span>Logged in as ${storage.username}. Not ${storage.username}? </span>
                <button class='logout-button'>Log out</button>
            `;
    }
  });
}

function renderSendMessage() {
  controller.fetchSession().then(() => {
    const newMessageEl = document.querySelector('.new-message');
    if (storage.username && storage.sid) {
      newMessageEl.innerHTML = `
            <form action="">
            <label>
              Send Message:
              <input type="text" placeholder="Message" class="new-message-input">
            </label>
            <button type="submit" class="new-message-submit">Send</button>
          </form>`;
    }
  });
}

module.exports = render;
