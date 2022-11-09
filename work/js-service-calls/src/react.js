const controller = require("./controller.js");
const storage = require("./storage.js");
console.log(controller);

const react = {
  render() {
    react.renderUserStatus();
    react.renderErrMsg();
    react.renderLoginForm();
    react.renderWordForm();
  },
  renderUserStatus() {
    const userEl = document.querySelector(".user");
    const isLoggedIn = storage.username !== undefined;
    const loginHTML = `<a href="" class="login">Log In</a>`;
    const logoutHTML = `<a href="" class="logout">Log out</a>`;
    userEl.innerHTML = isLoggedIn ? logoutHTML : loginHTML;
    console.log(storage.username);
  },

  renderLoginForm() {
    const loginEl = document.querySelector(".login-form");
    if (!storage.username) {
      loginEl.innerHTML = `
          <form action="">
              <label>Username: <input type="text" class="username-input"></label>
              <button type="submit" class="username-submit">Submit</button>
          </form>
          `;
    } else {
      loginEl.innerHTML = "";
    }
  },
  renderWordForm() {
    const wordList = storage.wordList;
    const wordEl = document.querySelector(".words");
    console.log(wordList.length > 0 && wordList[0].length > 0);
    if (storage.username) {
      const wordListHTML = wordList[0]
        ? `<p>Your word is ${wordList[0]} </p>`
        : `<p>You do not have any word</p>`;
      const wordInputHTML = `
    <form action="">
      <label>
        Update word: <input type="text" class="word-input"></input>
      </label>
      <button class='word-submit' type="submit">Submit</button>
    </form>`;
      wordEl.innerHTML = [wordListHTML, wordInputHTML].join("");
    } else {
      wordEl.innerHTML = "";
    }
  },
  renderErrMsg() {
    const errorMsgEl = document.querySelector(".error-msg");
    if (storage.errMsg) {
      errorMsgEl.innerHTML = `<p>${storage.errMsg}</p>`;
    } else {
      errorMsgEl.innerHTML = "";
    }
  },
};

module.exports = react;
