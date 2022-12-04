const storage = require("../storage");
const { getRandomID } = require("./common");
const { getSessionUserId } = require("./user-utils");

function getPost(req, res) {
  res.json(storage.post);
}
function addPost(req, res) {
  const sid = req.cookies.sid;
  const userId = getSessionUserId(sid);

  const postId = getRandomID(5);

  const title = req.body.title;
  const content = req.body.content;
  const cover = req.body.cover;

  storage.post[postId] = {
    userId,
    title,
    content,
    cover,
    likeCount: 0,
  };

  res.json({ postId, ...storage.post[postId] });
}

function updatePost(req, res) {
  const sid = req.cookies.sid;
  const userId = getSessionUserId(sid);

  const postId = req.body.postId;

  const title = req.body.title || storage.post[postId].title;
  const content = req.body.content || storage.post[postId].content;
  const cover = req.body.cover || storage.post[postId].cover;
  const likeCount = req.body.likeCount || storage.post[postId].likeCount;

  // If user is neither the author of the post or admin, they can not modify the post
  if (userId != storage.post[postId].userId && !storage.user[userId]?.isAdmin) {
    res.status(401).json({ error: "permission-denied" });
    return;
  }

  storage.post[postId] = {
    ...storage.post[postId],
    title,
    content,
    cover,
    likeCount,
  };

  res.json({ postId, ...storage.post[postId] });
}

function deletePost(req, res) {
  const sid = req.cookies.sid;
  const userId = getSessionUserId(sid);

  const postId = req.body.postId;

  // If user is neither the author of the post or admin, they can not modify the post
  if (userId != storage.post[postId].userId && !storage.user[userId]?.isAdmin) {
    res.status(401).json({ error: "permission-denied" });
    return;
  }

  delete storage.post[postId];
  delete storage.commentForPost[postId];

  res.json({ postId });
}

module.exports = { getPost, addPost, updatePost, deletePost };
