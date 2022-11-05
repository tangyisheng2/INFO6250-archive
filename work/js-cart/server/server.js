const PORT = 3000;

const express = require("express");

const app = express();

app.use(express.static("./src"));

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
