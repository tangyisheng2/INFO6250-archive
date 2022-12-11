"use strict";
const storage = require("../storage");
const { getRandomID } = require("./common");
const { getSessionUserId } = require("./user-utils");

function getPost(req, res) {
  const ret = Object.keys(storage.post).map((postId) => {
    return { postId, ...storage.post[postId] };
  });
  ret.sort((a, b) => b.createDate - a.createDate);
  res.json(ret);
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
    createDate: new Date(),
  };
  // add comment array in storage to prevent reading undefined
  storage.commentForPost[postId] = [];
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

  /**
   * Check if a user can edit a post, there are 3 case that the user can edit the post:
   * 1. User is admin
   * 2. User is not admin, but is the author of the current post
   * 3. User is going to "Like" the post
   */
  if (
    userId != storage.post[postId].userId &&
    !storage.user[userId]?.isAdmin &&
    Object.keys(req.body).length != 2 &&
    req.body.likeCount === undefined
  ) {
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
