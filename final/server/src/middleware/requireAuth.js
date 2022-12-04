const { getSessionUserId } = require("../controller/user-utils");
const storage = require("../storage");

function requireAuth(req, res, next) {
  // Check if user is login
  const sid = req.cookies.sid;
  const uid = getSessionUserId(sid);
  const username = storage.user[uid]?.username;
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  next();
}
module.exports = { requireAuth };
