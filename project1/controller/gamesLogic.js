const wordList = require("./words.js");
const storage = require("./storage.js");
const guessResultConstant = require("../constant/guessResultConstant.js");

const gamesLogic = {
  newGame(req, res) {
    // Get the userinfo
    const sessionId = req.cookies["session-id"];
    const username = storage.user[sessionId];
    // Requires authenication
    if (!username) {
      res.status(401);
      res.redirect("/"); //TODO: add error page
    }
    // Clear previous state
    storage.userStatus[username] = {};

    // Pick one ramdom word
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    // Update user status
    storage.userStatus[username] = {
      word,
      lastGuessStatus: undefined,
      guessedWord: [],
      guessedCount: 0,
      won: false,
      msg: "",
    };
    console.log(`User ${username} started a new game`);
    console.log(`User ${username}'s secret word is ${word}`);
    // User took a guess
    res.redirect("/");
  },

  guess(req, res) {
    // Get the userinfo
    const sessionId = req.cookies["session-id"];
    const username = storage.user[sessionId];
    // Requires authenication
    if (!username) {
      res.status(401);
      res.redirect("/"); // TODO: add error page
      return;
    }
    // Load info
    const userStat = storage.userStatus[username];
    const highScore = storage.highScore;
    const word = storage.userStatus[username].word;
    // If word is undefined, means that the game is not started yet
    const guess = req.body.guess;
    // Update count
    userStat.guessedCount += 1;
    userStat.guessedWord[userStat.guessedWord.length] = [
      guess,
      gamesLogic.compare(guess, word),
    ];
    // Compare results

    if (gamesLogic.correctGuess(guess, word)) {
      userStat.lastGuessStatus = guessResultConstant.correct;
      highScore[highScore.length] = [username, userStat.guessedCount];
    } else if (gamesLogic.validGuess(guess, word, userStat)) {
      userStat.lastGuessStatus = guessResultConstant.valid;
    } else if (gamesLogic.incorrectGuess(guess, word, userStat)) {
      userStat.lastGuessStatus = guessResultConstant.incorrect;
    } else if (gamesLogic.invalidGuess(guess, word, userStat)) {
      userStat.lastGuessStatus = guessResultConstant.invalid;
    }
    res.redirect("/");
  },

  validGuess(guess, word, userStat) {
    return (
      wordList.includes(guess.toLowerCase()) &&
      !userStat.guessedWord.includes(guess) &&
      guess.toLowerCase() != word
    );
  },

  invalidGuess(guess, word, userStat) {
    return (
      userStat.guessedWord.includes(guess.toLowerCase()) ||
      !wordList.includes(guess.toLowerCase())
    );
  },

  incorrectGuess(guess, word, userStat) {
    return (
      wordList.includes(guess.toLowerCase()) &&
      userStat.guessedWord.includes(guess) &&
      word.toLowerCase() != this.word
    );
  },

  correctGuess(guess, word) {
    return guess.toLowerCase() == word;
  },

  compare(word, guess) {
    let ans = 0;

    word = word.toLowerCase();
    guess = guess.toLowerCase();

    let wordCnt = {};
    let guessCnt = {};
    // Update Count
    for (let ch of word) {
      if (!(ch in wordCnt)) {
        wordCnt[ch] = 0;
      }
      wordCnt[ch] += 1;
    }

    for (let ch of guess) {
      if (!(ch in guessCnt)) {
        guessCnt[ch] = 0;
      }
      guessCnt[ch] += 1;
    }
    // Cross check two dicts
    for (let ch in guessCnt) {
      if (ch in wordCnt) {
        ans += Math.min(wordCnt[ch], guessCnt[ch]);
      }
    }

    return ans;
  },
};

module.exports = gamesLogic;
