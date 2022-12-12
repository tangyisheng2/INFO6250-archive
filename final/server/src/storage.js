"use strict";

const storage = {
  sessions: {}, // {sessionId: userId}
  user: {
    1: {
      username: "admin",
      postId: [1],
      commentId: [],
      isAdmin: true,
      isBanned: false,
    },
    2: {
      username: "dog",
      postId: [],
      commentId: [],
      isAdmin: false,
      isBanned: true,
    },
  }, // {userId: {name, postId, commentId}}
  post: {
    1: {
      userId: "1",
      title: "Hello World!",
      content: "This is your first post",
      cover: "https://placekitten.com/1600/900",
      likeCount: 0,
      createDate: new Date("2022-01-01"),
    },
  }, // {postId: userId, title, content, cover}
  commentForPost: {
    1: {
      1: {
        content: "Hello first content!",
        userId: "1",
        createDate: new Date("2022-01-01"),
      },
    },
  }, // {postId: {commentId: content, userId}}
};

module.exports = storage;
