"use strict";
const guessResultConstant = require("../constant/guessResultConstant.js");
const gamesLogic = require("./gamesLogic.js");
const storage = require("./storage.js");
const react = {
  render(username, err) {
    return `
    <!DOCTYPE html>
    <html lang="en">
  
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="style.css">
          <title>Game</title>
      </head>
  
      <body>
          <div class="container">
            ${react.getNavElement(username)}
            ${react.getMainElement(username)}
            ${react.getFooter()}
          </div>
      </body>
  
    </html>
    `;
  },

  getNavElement(username) {
    return `
      <nav class="nav">
        <ul class="nav-list">
            <li><a href="/">Game</a></li>
            <li><a href="/rank">Rank</a></li>
            ${
              !username
                ? '<li><a href="/login">Log In</a></li>'
                : `<li>
                    <form action="/logout" method="post"><button type="submit">Log Out</button>
                    </form>
                  </li>`
            }
        </ul>
      </nav>
    `;
  },

  getMainElement(username) {
    const userStat = storage.userStatus[username];
    if (!username) {
      return react.getLoginPage();
    }
    let lastGuessElement = "";
    let guessHistoryElement = "";
    let guessCountElement = "";
    let wonMessageElement = "";
    let guessFormElement = "";
    if (Object.keys(userStat).length) {
      if (userStat.guessedWord.length) {
        lastGuessElement = `<p class="game-prompt">
                              Last guess "${
                                userStat.guessedWord[
                                  userStat.guessedWord.length - 1
                                ]
                              }" was 
                              ${userStat.lastGuessStatus}, and have 
                              ${gamesLogic.compare(
                                userStat.guessedWord[
                                  userStat.guessedWord.length - 1
                                ],
                                userStat.word
                              )}
                              characters in common.
                            </p>`;
      }
      guessHistoryElement = `<p class="game-prompt">
                        Your guest history: ${userStat.guessedWord.join(",")}
                      </p>`;
      guessCountElement = `<p class="game-prompt">
                            You have ${userStat.guessedCount} guess.
                           </p>`;
      guessFormElement = `<form action="/guess" method="post" class="new-guess">
                            <label>Guess a new word: <input type="text" name="guess" placeholder="word" required></label>
                            <button type="submit">Submit</button>
                          </form>`;
    }
    if (userStat.lastGuessStatus == guessResultConstant.correct) {
      wonMessageElement = `<p class="game-prompt">You won the game!</p>`;
    }
    return `
      <main class="main">
          <div class="welcome-prompt">
              <h1 class="welcome-prompt-text">Welcome! <span class="username-text">${username}</span></h1>
          </div>
              
                  <div class="game">
                      <!-- If have the correct guest -->
                      ${react.getErrorMsg(username)}
                      ${lastGuessElement}
                      ${guessHistoryElement}
                      ${guessCountElement}
                      ${wonMessageElement}
                      ${guessFormElement}
                  </div>
              <form action="/new-game" method="post" class="new-game">
                  <button type="submit">New Game</button>
              </form>
          </div>
      </main>
    `;
  },

  getRankElement(username) {
    username = typeof username == "string" ? username : "";
    const highScore = storage.highScore;
    highScore.sort((a, b) => a[1] - b[1]);
    const highScoreElement = highScore.map(
      (entry) => `<li class="ranking-item">${entry[0]}: ${entry[1]}</li>`
    );
    return `
    <main class="main">
  
      <div class="welcome-prompt">
          <h1 class="welcome-prompt-text">Welcome! <span class="username-text">${username}</span></h1>
      </div>
      <div class="rank">
          <h2 class="ranking-prompt">
              Top Ranking in the game
          </h2>
          <ol class="ranking-list">
              ${highScoreElement}
          </ol>
      </div>
    </main>
    `;
  },

  getFooter() {
    return `
    <footer class="footer">
      <p>By Yisheng Tang</p>
    </footer>
    `;
  },

  getLoginPage(err) {
    return `
    <main class="main">
      <div class="welcome-prompt">
          <h1 class="welcome-prompt-text">Welcome!</h1>
      </div>
      <div class="login">
          <p class="login-error-msg">${
            err || "Invalid Credential, please login again: "
          }</p>
          <form action="/login" method="POST" class="login-form">
              <label>Username<input type="text" name="username" required></label>
              <button type="submit">Log In</button>
          </form>
      </div>
    </main>     
  `;
  },

  getErrorMsg(username) {
    if (!Object.keys(storage.userStatus).length) {
      return ``;
    }
    const userStat = storage.userStatus[username];
    const msg = userStat.msg;
    return `
    <p class="msg">${msg}</p>
    `;
  },
};
module.exports = react;
