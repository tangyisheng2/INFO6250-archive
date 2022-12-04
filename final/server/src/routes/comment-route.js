"use strict";
const express = require("express");
const {
  getComment,
  addComment,
  deleteComment,
} = require("../controller/comment");
const { requireAuth } = require("../middleware/requireAuth");

const route = express.Router();

route.get("/api/v1/post/:id/comment", requireAuth, getComment); // Get content of a post
route.put("/api/v1/post/:id/comment", requireAuth, addComment); // Create a new post
route.delete("/api/v1/post/:id/comment", requireAuth, deleteComment); // delete a post

module.exports = route;
