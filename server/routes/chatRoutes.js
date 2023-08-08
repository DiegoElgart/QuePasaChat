const express = require("express");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const chats = await Chat.find().populate({ path: "messages.sender", select: "username" });
		res.status(200).send(chats);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
