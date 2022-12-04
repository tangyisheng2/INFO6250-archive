"use strict";

const storage = {
  sessions: {}, // {sessionId: userId}
  user: {
    1: {
      username: "admin",
      postId: [1],
      commentId: [],
      isAdmin: true,
    },
  }, // {userId: {name, postId, commentId}}
  post: {
    1: {
      userId: 1,
      title: "Hello World!",
      content: "This is your first post",
      cover: "",
      likeCount: 0,
    },
  }, // {postId: userId, title, content, cover}
  commentForPost: {}, // {postId: {commentId: content, userId}}
};

module.exports = storage;
