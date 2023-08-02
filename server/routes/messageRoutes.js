const express = require("express");
const authenticate = require("../middleware/authenticateMid");
const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const router = express.Router();

// Get all messages
router.get("/:chatId", authenticate, async (req, res) => {
	try {
		const messages = await Message.find({ chat: req.params.chatId }).populate("sender", "username email").populate("chat");
		return res.status(200).send(messages);
	} catch (err) {
		return res.status(400).send(error.messages);
	}
});

// Create New Message
router.post("/", authenticate, async (req, res) => {
	const { content, chatId } = req.body;
	if (!content || !chatId) {
		return express.status(400).send("Invalid request");
	}

	var newMessage = {
		sender: req.user._id,
		content: content,
		chat: chatId,
	};

	try {
		var message = await Message.create(newMessage);
		message = Message.findOne({ _id: message._id }).populate("sender", "username").populate("chat");
		message = await User.populate(message, { path: "chat.users", select: "username email" });

		let data = await Chat.findByIdAndUpdate(req.body.chatId, {
			latestMessage: message._id,
		});
		return res.status(200).send(message);
	} catch (err) {
		return res.status(400).send(error.messages);
	}
});

module.exports = router;
