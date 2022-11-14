'use strict';
const render = require('./react');
const storage = require('./storage');

function fetchSession() {
  return fetch('/api/v1/user')
    .catch((err) => Promise.reject({ error: 'network-error' }))
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => Promise.reject({ err }));
      }
      return res.json();
    })
    .then(({ username, sid }) => {
      if (username && sid) {
        storage.username = username;
        storage.sid = sid;
      }
    });
}

function createSession(username) {
  return fetch('/api/v1/user', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
    .catch((err) => Promise.reject({ error: 'network-error' }))
    .then((res) => {
      if (!res.ok) {
        return res.json().then((err) => Promise.reject({ err }));
      }
      return res.json();
    })
    .then(({ username, sid }) => {
      storage.username = username;
      storage.sid = sid;
    });
}

function deleteSession() {
  return fetch('/api/v1/user', {
    method: 'DELETE',
  });
}

function fetchChat() {
  return fetch('/api/v1/chat')
    .catch((err) => Promise.reject({ error: 'network-error' }))
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
  return fetch('/api/v1/chat', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ message }),
  });
}

function initEventListener() {
  const appEl = document.querySelector('#app');
  appEl.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(e.target);
    console.log(e.target.className);

    switch (e.target.className) {
      case 'user-login-submit':
        const username = document.querySelector('.user-login-input').value;
        console.log(username);
        createSession(username).then(() => render());
        break;

      default:
        break;
    }
  });
}

module.exports = {
  fetchSession,
  createSession,
  deleteSession,
  fetchChat,
  sendMessage,
  initEventListener,
};
