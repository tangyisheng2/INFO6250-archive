/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var react = __webpack_require__(/*! ./react.js */ "./src/react.js");
var storage = __webpack_require__(/*! ./storage */ "./src/storage.js");
var controller = {
  user: {
    fetchSession: function fetchSession() {
      return fetch("/api/session/")["catch"](function (err) {
        return storage.errMsg = "Invalid Credential, plesae login";
      }).then(function (res) {
        if (!res.ok) {
          return res.json().then(function (err) {
            storage.errMsg = "Invalid Credential, plesae login";
          });
        }
        return res.json();
      }).then(function (res) {
        return console.log(res);
      });
    },
    fetchLogin: function fetchLogin(username) {
      var session = fetch("/api/session/", {
        method: "PUT",
        headers: {
          "content-type": "application/json" // set this header when sending JSON in the body of request
        },

        body: JSON.stringify({
          username: username
        })
      })["catch"](function (err) {
        storage.errMsg = "Network Error, try again";
        // Promise.reject({ error: "network-error" });
      }).then(function (response) {
        if (!response.ok) {
          return response.json().then(function (err) {
            storage.errMsg = "Invalid Credential, please login";
            // Promise.reject(err);
          });
        }

        return response.json();
      }).then(function (response) {
        storage.username = response.username;
        console.log(storage);
      });
      return session;
    },
    fetchLogout: function fetchLogout() {
      var session = fetch("/api/session/", {
        method: "DELETE",
        headers: {
          "content-type": "application/json" // set this header when sending JSON in the body of request
        }
      })["catch"](function (err) {
        return Promise.reject({
          error: "network-error"
        });
      });
      return session;
    }
  },
  word: {
    fetchWord: function fetchWord() {
      return fetch("/api/word", {
        method: "GET"
      })["catch"](function (err) {
        console.log(err);
        storage.errMsg = "Network Error, try again";
      }).then(function (response) {
        console.log("fetching words");
        if (!response.ok) {
          return response.json().then(function (err) {
            storage.errMsg = "Error fetching words, try again";
          });
        }
        return response.json();
      }).then(function (res) {
        console.log(res);
        if (res.storedWord.length > 0) {
          var wordList = res.storedWord.split(",");
          storage.wordList = wordList;
        }
        return;
      });
    },
    addWord: function addWord(word) {
      console.log({
        word: word
      });
      return fetch("/api/word", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          word: word
        })
      })["catch"](function (err) {
        storage.errMsg = "Network Error, try again";
      }).then(function (response) {
        if (!response.ok) {
          return response.json().then(function (err) {
            storage.errMsg = "Error adding word ".concat(word, ", try again");
          });
        }
        return response.json();
      }).then(function (response) {
        return storage.wordList = response.storedWord;
      });
    }
  },
  initEventListener: function initEventListener() {
    var appEl = document.querySelector("#app");
    appEl.addEventListener("click", function (e) {
      e.preventDefault();
      console.log(react);
      switch (e.target.className) {
        case "username-submit":
          var usernameEl = document.querySelector(".username-input");
          console.log("Logging in with ".concat(usernameEl.value));
          controller.user.fetchLogin(usernameEl.value).then(function () {
            return controller.word.fetchWord();
          }).then(function () {
            return react.render();
          });
          break;
        case "logout":
          console.log("logging out");
          controller.user.fetchLogout().then(function () {
            storage.username = undefined;
            storage.wordList = [];
            react.render();
          });
          break;
        case "word-submit":
          var wordInputEl = document.querySelector(".word-input");
          controller.word.addWord(wordInputEl.value).then(function () {
            return controller.word.fetchWord();
          }).then(function () {
            return react.render();
          });
          break;
        default:
          break;
      }
    });
  }
};
module.exports = controller;

/***/ }),

/***/ "./src/react.js":
/*!**********************!*\
  !*** ./src/react.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var controller = __webpack_require__(/*! ./controller.js */ "./src/controller.js");
var storage = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
console.log(controller);
var react = {
  render: function render() {
    react.renderUserStatus();
    react.renderLoginForm();
    react.renderWordForm();
  },
  renderUserStatus: function renderUserStatus() {
    var userEl = document.querySelector(".user");
    var isLoggedIn = storage.username !== undefined;
    var loginHTML = "<a href=\"\" class=\"login\">Log In</a>";
    var logoutHTML = "<a href=\"\" class=\"logout\">Log out</a>";
    userEl.innerHTML = isLoggedIn ? logoutHTML : loginHTML;
    console.log(storage.username);
  },
  renderLoginForm: function renderLoginForm() {
    var loginEl = document.querySelector(".login-form");
    if (!storage.username) {
      loginEl.innerHTML = "\n          <form action=\"\">\n              <label>Username: <input type=\"text\" class=\"username-input\"></label>\n              <button type=\"submit\" class=\"username-submit\">Submit</button>\n          </form>\n          ";
    } else {
      loginEl.innerHTML = "";
    }
  },
  renderWordForm: function renderWordForm() {
    var wordList = storage.wordList;
    var wordEl = document.querySelector(".words");
    console.log(wordList.length > 0 && wordList[0].length > 0);
    if (storage.username) {
      var wordListHTML = "<ul class=\"word-list\">\n      ".concat(wordList.map(function (entry) {
        return "<li class='word-list-item'>".concat(entry, "</li>");
      }).join(""), "\n    </ul>");
      var wordInputHTML = "\n    <form action=\"\">\n      <label>\n        Update word: <input type=\"text\" class=\"word-input\"></input>\n      </label>\n      <button class='word-submit' type=\"submit\">Submit</button>\n    </form>";
      wordEl.innerHTML = [wordListHTML, wordInputHTML].join("");
    } else {
      wordEl.innerHTML = "";
    }
  }
};
module.exports = react;

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((module) => {

var storage = {
  username: undefined,
  wordList: [],
  errMsg: ""
};
module.exports = storage;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
var controller = __webpack_require__(/*! ./controller.js */ "./src/controller.js");
var react = __webpack_require__(/*! ./react.js */ "./src/react.js");
// controller.user.fetchLogout();
react.render();
controller.initEventListener();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map