const express = require("express");
const {
  getPost,
  updatePost,
  addPost,
  deletePost,
} = require("../controller/post");
const { requireAuth } = require("../middleware/requireAuth");

const route = express.Router();

route.get("/api/v1/post", requireAuth, getPost); // Get content of a post
route.post("/api/v1/post", requireAuth, updatePost); // Edit post, including like
route.put("/api/v1/post", requireAuth, addPost); // Create a new post
route.delete("/api/v1/post", requireAuth, deletePost); // delete a post

module.exports = route;
