const express = require("express");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const chats = await Chat.find().populate({ path: "recipients", select: "username" });
		res.status(200).send(chats);
	} catch (err) {
		res.status(400).send(err.message);
	}
});
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const chat = await Chat.findById(id);
		res.status(200).send(chat);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.post("/:id", async (req, res) => {
	const { id } = req.params;
	const { sender, text } = req.body;

	try {
		// Find the chat by ID
		const chat = await Chat.findById(id);

		if (!chat) {
			return res.status(404).send("Chat not found");
		}

		// Add the new message to the messages array
		chat.messages.push({
			sender,
			text,
			createdAt: new Date(),
		});

		// Save the updated chat
		await chat.save();
		res.status(200).send(chat);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.get("/user/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const user = await User.findById(id);
		const chats = await Chat.find().populate({ path: "recipients", select: "username" });
		const currUserChats = chats.filter(chat => user.chats.includes(chat._id));
		res.status(200).send(currUserChats);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

router.post("/", async (req, res) => {
	const { recipients, currId } = req.body;
	try {
		const chat = await (await Chat.create({ recipients: recipients })).populate("recipients", "username");
		await User.findByIdAndUpdate(currId, { $addToSet: { chats: chat._id } });

		await recipients.map(async recipient => await User.findByIdAndUpdate(recipient, { $addToSet: { chats: chat._id } }));

		res.status(200).send(chat);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
