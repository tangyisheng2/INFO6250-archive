"use strict";
const storage = require("../storage");
const { getRandomID } = require("./common");
const { getSessionUserId } = require("./user-utils");

function getComment(req, res) {
  const postId = req.params.id;

  res.json({ postId, comments: { ...storage.commentForPost[postId] } });
}

function addComment(req, res) {
  const postId = req.params.id;
  const commentId = getRandomID(5);

  const sid = req.cookies.sid;
  const uid = getSessionUserId(sid);

  const content = req.body.content;

  storage.commentForPost[postId][commentId] = {
    content,
    userId: uid,
  };
  console.log(storage);

  res.json({ postId, commentId, ...storage.commentForPost[postId][commentId] });
}

function deleteComment(req, res) {
  const postId = req.params.id;
  const commentId = req.body.commentId;

  const sid = req.cookies.sid;
  const userId = getSessionUserId(sid);

  if (
    storage.commentForPost[postId][commentId].userId != userId ||
    !storage.user[userId].isAdmin
  ) {
    res.status(400).json({ error: "permission-denied" });
    return;
  }

  delete storage.commentForPost[postId][commentId];
  res.json({ commentId });
}

module.exports = { getComment, addComment, deleteComment };
