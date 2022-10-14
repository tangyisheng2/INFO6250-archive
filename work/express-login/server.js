const express = require("express");
const cookieParser = require("cookie-parser");
const uuid = require("uuid");
const app = express();
const PORT = 3000;

app.use(express.static("./public"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Use express.urlencoded to parse form data, use extended: true to omit warning

const home = require("./pages/home"); // homepage generator
const storage = require("./storage"); // storage module
const error = require("./pages/error"); // error page generator
const wordStorage = storage.word;
const userStorage = storage.user;

/**
 * Handles showing home page
 * This route handler will pass the username and the wordlist to the home page generator
 */
app.get("/", (req, res) => {
  const userUUID = req.cookies["session-id"];
  const username = userStorage[userUUID];
  const words = wordStorage[username] || undefined;
  res.send(home.getHome(username, words));
});

/**
 * Handles log in request
 * This route handler will add the username in to browser's cookie
 * and the backend will identify user through the cookies
 */
app.post("/login", (req, res) => {
  const username = req.body.username;
  const userUUID = uuid.v5.URL;
  if (username != "dog" && /^[a-z0-9]+$/i.test(username)) {
    userStorage[userUUID] = username;
    console.log(`Read username: ${username}`);
    res.cookie("session-id", userUUID);
    res.redirect("/");
  } else {
    res.status(401);
    res.send(error.generate401());
  }
});

/**
 * Handles log out request
 * This route handler will destroy the 'session-id' cookie to log out user
 */
app.post("/logout", (req, res) => {
  const sessionId = req.cookies["session-id"];
  delete userStorage[sessionId];
  res.clearCookie("session-id");
  res.redirect("/");
});

/**
 * Handles add word request
 * This route handler will add new words to the word list
 */
app.post("/word/add", (req, res) => {
  const sessionId = req.cookies["session-id"];
  const username = userStorage[sessionId];
  const newWords = req.body.word;
  if (username === undefined) {
    // If user is not valid, probably change the session-id and then submit a new word, do nothing
    res.redirect("/");
  }
  if (!(username in wordStorage)) {
    wordStorage[username] = []; // Add the key to avoid reading undefined
  }
  wordStorage[username][wordStorage[username].length] = newWords;

  res.redirect("/");
});

/**
 * Handles replace word request
 * This route handler will replace the old word in the list to the new one
 * If the old word does not exist, do nothing
 */
app.post("/word/replace", (req, res) => {
  const userUUID = req.cookies["session-id"];
  const username = userStorage[userUUID];
  const oldWord = req.body.oldWord;
  const newWord = req.body.word;
  if (wordStorage[username].includes(oldWord)) {
    const oldWordIndex = wordStorage[username].indexOf(oldWord);
    wordStorage[username][oldWordIndex] = newWord;
  }

  res.redirect("/");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
