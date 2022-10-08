const chatWeb = {
  chatPage: function (chat) {
    // Fill in/modify anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link href="styles.css" rel="stylesheet">
        </head>
        <body>
          <div id="chat-app">
            <h1>Node Chat</h1>
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function (chat) {
    return (
      `<ol class="messages">` +
      chat.messages
        .map(
          (message) =>
            `<li class="messages__item">${message.sender}: ${message.text}</li>`
        )
        .join("") +
      `</ol>`
    );
  },
  getUserList: function (chat) {
    return (
      `<ul class="users">` +
      Object.values(chat.users)
        .map(
          (user) => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `
        )
        .join("") +
      `</ul>`
    );
  },
  getOutgoing: function () {
    return `      
      <div class="sender-field">
        <form action="/chat" method="post" class="sender-form">
          <label>Your Name: </label>
          <input
            class="sender-data"
            name='username'
            type="text"
            placeholder="anonymous"
          />
          <label>Input text: </label>
          <input
            class="sender-data"
            name='text'
            type="text"
            placeholder="New Messages"
          />
          <button type="submit">Send</button>
        </form>
      </div>`;
  },
};
module.exports = chatWeb;
