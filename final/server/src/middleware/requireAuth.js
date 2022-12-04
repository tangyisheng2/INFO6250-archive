const { getSessionUser } = require("../controller/user-utils");

function requireAuth(req, res, next) {
  // Check if user is login
  const sid = req.cookies.sid;
  const username = getSessionUser(sid);
  if (!sid || !username) {
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  next();
}
module.exports = { requireAuth };
