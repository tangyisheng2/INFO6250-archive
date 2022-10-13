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
    return `<ol class="messages">
      ${chat.messages
        .map((message) => {
          knownSender = ["Amit", "Bao"].includes(message.sender);
          return `<li class="message-item"><img class='avatar' src=${
            knownSender
              ? `avatar/avatar-${message.sender.toLowerCase()}.jpg`
              : "https://placekitten.com/100/100"
            // Add this ramdon page when sender is not preset for better experience
          }><span class="message-text">${message.sender}: ${
            message.text
          }</span></li>`;
        })
        .join("")}
      </ol>`;
  },
  getUserList: function (chat) {
    return `
    
    <ul class="users">
      ${Object.values(chat.users)
        .map(
          (user) => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `
        )
        .join("")}
      </ul>`;
  },
  getOutgoing: function () {
    return `      
      <div class="sender-field">
        <form action="/chat" method="post" class="sender-form">
          <label>Your Name: 
          <input
            class="sender-data"
            name='username'
            type="text"
            placeholder="anonymous"
            value="anonymous"
            required
          /></label>
          <label>Input text: 
          <input
            class="sender-data"
            name='text'
            type="text"
            placeholder="New Messages"
          /></label>
          <button type="submit">Send</button>
        </form>
      </div>`;
  },
};
module.exports = chatWeb;
