"use strict";
const express = require("express");
const { postMessage, fetchConversation } = require("../controller/chat");

const router = express.Router();

router.get("/api/v1/chat", fetchConversation);
router.post("/api/v1/chat", postMessage);

module.exports = router;
