"use strict";

const storage = {
  sessions: {}, // {sessionId: userId}
  user: {}, // {username: {postId, commentId}}
  post: {}, // {postId: userId, title, content, cover}
  commentForPost: {}, // {postId: {commentId: content, user}}
};

module.exports = storage;
