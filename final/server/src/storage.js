"use strict";

const storage = {
  sessions: {}, // {sessionId: userId}
  user: {
    1: {
      username: "admin",
      postId: [1],
      commentId: [],
    },
  }, // {userId: {name, postId, commentId}}
  post: { 1: { title: "Hello World!", content: "This is your first post" } }, // {postId: userId, title, content, cover}
  commentForPost: {}, // {postId: {commentId: content, user}}
  currentPostId: 1,
  currentUserId: 1,
};

module.exports = storage;
