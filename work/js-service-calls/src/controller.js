const react = require("./react.js");
const storage = require("./storage");

const controller = {
  user: {
    fetchSession() {
      return fetch("/api/session/")
        .catch((err) => (storage.errMsg = "Invalid Credential, plesae login"))
        .then((res) => {
          if (!res.ok) {
            return res.json().then((err) => {
              storage.errMsg = "Invalid Credential, plesae login";
            });
          }
          return res.json();
        })
        .then((res) => console.log(res));
    },

    fetchLogin(username) {
      const session = fetch("/api/session/", {
        method: "PUT",
        headers: {
          "content-type": "application/json", // set this header when sending JSON in the body of request
        },
        body: JSON.stringify({ username }),
      })
        .catch((err) => {
          storage.errMsg = "Network Error, try again";
          // Promise.reject({ error: "network-error" });
        })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              storage.errMsg = "Invalid Credential, please login";
              // Promise.reject(err);
            });
          }
          return response.json();
        })
        .then((response) => {
          storage.username = response.username;
          console.log(storage);
        });
      return session;
    },

    fetchLogout() {
      const session = fetch("/api/session/", {
        method: "DELETE",
        headers: {
          "content-type": "application/json", // set this header when sending JSON in the body of request
        },
      }).catch((err) => Promise.reject({ error: "network-error" }));
      return session;
    },
  },
  word: {
    fetchWord() {
      return fetch("/api/word", {
        method: "GET",
      })
        .catch((err) => {
          console.log(err);
          storage.errMsg = "Network Error, try again";
        })
        .then((response) => {
          console.log("fetching words");
          if (!response.ok) {
            return response.json().then((err) => {
              storage.errMsg = "Error fetching words, try again";
            });
          }
          return response.json();
        })
        .then((res) => {
          console.log(res);
          if (res.storedWord.length > 0) {
            const wordList = res.storedWord.split(",");
            storage.wordList = wordList;
          }
          return;
        });
    },

    addWord(word) {
      console.log({ word: word });
      return fetch("/api/word", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ word }),
      })
        .catch((err) => {
          storage.errMsg = "Network Error, try again";
        })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              storage.errMsg = `Error adding word ${word}, try again`;
            });
          }
          return response.json();
        })
        .then((response) => (storage.wordList = response.storedWord));
    },
  },

  initEventListener() {
    const appEl = document.querySelector("#app");
    appEl.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(react);
      switch (e.target.className) {
        case "username-submit":
          const usernameEl = document.querySelector(".username-input");
          console.log(`Logging in with ${usernameEl.value}`);
          controller.user
            .fetchLogin(usernameEl.value)
            .then(() => controller.word.fetchWord())
            .then(() => react.render());
          break;
        case "logout":
          console.log("logging out");
          controller.user.fetchLogout().then(() => {
            storage.username = undefined;
            storage.wordList = [];
            react.render();
          });
          break;
        case "word-submit":
          const wordInputEl = document.querySelector(".word-input");
          controller.word
            .addWord(wordInputEl.value)
            .then(() => controller.word.fetchWord())
            .then(() => react.render());

          break;
        default:
          break;
      }
    });
  },
};
module.exports = controller;
