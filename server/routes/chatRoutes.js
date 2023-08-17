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

router.post("/", async (req, res) => {
	const { recipients, currId } = req.body;
	try {
		const chat = await (await Chat.create({ recipients: recipients })).populate("recipients", "username");
		await User.findByIdAndUpdate(currId, { $addToSet: { chats: chat._id } });

		res.status(200).send(chat);
	} catch (err) {
		res.status(400).send(err.message);
	}
});

module.exports = router;
