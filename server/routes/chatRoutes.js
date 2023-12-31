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
		const chat = await Chat.findByIdAndUpdate(
			id,
			{
				$push: {
					messages: {
						sender,
						text,
						createdAt: new Date(),
					},
				},
			},
			{ new: true }
		);

		if (!chat) {
			return res.status(404).send("Chat not found");
		}
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

router.post("/removeRecipient/:chatId", async (req, res) => {
	const { currId } = req.body;
	const { chatId } = req.params;
	try {
		const chat = await Chat.findById(chatId);
		const newRecipients = chat.recipients.filter(r => r._id.toString() !== currId);
		chat.recipients = newRecipients;
		if (newRecipients.length <= 2) {
			chat.isGroupChat = false;
		}
		chat.save();

		const user = await User.findById(currId);
		const newChats = user.chats.filter(chat => chat.toString() !== chatId);
		user.chats = newChats;
		user.save();
		res.status(200).send(chat);
	} catch (err) {
		res.status(400).send(err.message);
	}
});
router.post("/", async (req, res) => {
	const { recipients, currId } = req.body;
	try {
		const chat = await Chat.create({ recipients: recipients });
		await User.findByIdAndUpdate(currId, { $addToSet: { chats: chat._id } });

		await recipients.map(async recipient => await User.findByIdAndUpdate(recipient._id, { $addToSet: { chats: chat._id } }));

		res.status(200).send(chat);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
