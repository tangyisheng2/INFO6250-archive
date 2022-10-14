const error = {
  generate401() {
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
                    <li><a href="/login">Log in</a></li>
                </ul>
            </nav>
            <main>
                <p class="login-prompt">Log in failed.</p>
                <p><a href="/">Return to Home Page</a></p>
            </main>
        </body>
        
        </html>`;
  },
};
module.exports = error;
