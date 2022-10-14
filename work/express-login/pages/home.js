const home = {
  getHome(username, words) {
    if (username) {
      return `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="style.css">
          <title>Dashboard</title>
      </head>
      
      <body>
          <nav>
              <ul class="nav-list">
                  <li><a href="/">Go Home</a></li>
                  <li><form action="/logout" method="post"><button type="submit" class="logout-button">Log out</form></li>
              </ul>
          </nav>
          <main>
              <h1 class="title">Welcome! ${username}</h1>
              <div class="words-display">
                  <span class="words-prompt">Your saved words: </span>
                  <ol class="words-list">
                    ${this.getWordsListItem(words)}
                  </ol>
              </div>
              <form action="/word/add" method="post">
                  <label>
                      Add words:
                      <input type="text" name="word" placeholder="new word" required>
                  </label>
                  <button type="submit">Submit</button>
              </form>
              <form action="/word/replace" method="post">
              Replace words:
              <label>
                  Old words: 
                  <input type="text" name="oldWord" placeholder="old word" required>
              </label>
              <label>
                  New words:
                  <input type="text" name="word" placeholder="new word" required>
              </label>
              <button type="submit">Submit</button>
          </form>
          </main>
      </body>
      
      </html>
            `;
    }
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="style.css">
        <title>Log in</title>
    </head>
    
    <body>
        <nav>
            <ul class="nav-list">
                <li><a href="/">Go Home</a></li>
                <li><a href="/">Log in</a></li>
            </ul>
        </nav>
        <main>
            <h1 class="title">Welcome!</h1>
            <p class="login-prompt">Please Log in: </p>
            <form action="/login" method="post">
            <label>
                Username:
                <input type="text" name="username" required>
            </label>
            <button type="submit">Submit</button>
            </form>
        </main>
    </body>
    
    </html>
        `;
  },

  getWordsListItem(wordsArray) {
    if (wordsArray) {
      return wordsArray.map((word) => `<li>${word}</li>`).join("");
    }
    return "";
  },
};
module.exports = home;
