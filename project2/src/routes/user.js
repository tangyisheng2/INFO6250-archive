"use strict";
const express = require("express");
const {
  fetchCurrentSession,
  createSession,
  deleteSession,
} = require("../controller/user");

const router = express.Router();
router.get("/api/v1/user", fetchCurrentSession);
router.put("/api/v1/user", createSession);
router.delete("/api/v1/user", deleteSession);

module.exports = router;
