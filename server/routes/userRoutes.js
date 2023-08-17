const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const router = express.Router();

require("dotenv").config();

const newToken = user => {
	const token = jwt.sign({ user }, process.env.SECRET_KEY);
	return token;
};

router.get("/users", async (req, res) => {
	try {
		const users = await User.find().select("username").select("email").select("isAdmin");
		res.status(200).send(users);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email: email }).populate("contacts", "username");

		if (!user) return res.status(400).send({ message: "Email not exist" });
		let match = user.checkPassword(password);
		if (!match) return res.status(400).send({ message: "Wrong Password!" });
		let token = newToken(user);
		return res.status(200).send({ user, token });
	} catch (err) {
		return res.status(500).send(err.message);
	}
});
router.post("/register", async (req, res) => {
	const { email, username, password } = req.body;
	try {
		let checkIfExists = await User.findOne({ email: email });
		if (checkIfExists == null) {
			let user = await User.create({ email: email, username: username, password: password });
			let token = newToken(user);
			return res.status(200).send({ user, token });
		} else {
			res.status(400).send({ message: "Email already registered" });
		}
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		let user = await User.findById(id).populate("contacts", "username");

		return res.status(200).send(user);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.post("/:id", async (req, res) => {
	const { id } = req.params;
	const updateUser = req.body;
	try {
		await User.findByIdAndUpdate(id, updateUser);
		let user = await User.findById(id);
		return res.status(200).send(user);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});
router.post("/:id/contacts", async (req, res) => {
	const { id } = req.params;
	const { contactId } = req.body;
	try {
		let thisUser = await User.findById(id);
		if (thisUser.contacts.includes(contactId)) {
			return res.status(400).send("Users Already are contacts");
		} else {
			thisUser.contacts.push(new mongoose.Types.ObjectId(contactId));
			thisUser.save();
		}

		let otherUser = await User.findById(contactId);
		if (otherUser.contacts.includes(id)) {
			return res.status(400).send("Users Already are contacts");
		} else {
			otherUser.contacts.push(new mongoose.Types.ObjectId(id));
			otherUser.save();
		}
		return res.status(200).send({ _id: otherUser._id, username: otherUser.username });
	} catch (err) {
		return res.status(500).send(err.message);
	}
});
router.post("/delete/:id", async (req, res) => {
	try {
		let user = await User.findByIdAndDelete(req.params.id);
		return res.status(200).send(`User ${user.username} deleted!`);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

module.exports = router;
