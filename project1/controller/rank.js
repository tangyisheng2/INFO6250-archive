const react = require("./react.js");
const storage = require("./storage.js");
const user = require("./user.js");
const rank = {
  renderRank(req, res) {
    const username = user.getUsername(req);
    res.send(`
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
                ${react.getRankElement(username)}
                ${react.getFooter()}
              </div>
          </body>
      
        </html>
        `);
  },
};

module.exports = rank;
