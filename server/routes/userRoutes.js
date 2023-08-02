const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticateMid");
const User = require("../models/userModel");
require("dotenv").config();
const newToken = user => {
	const token = jwt.sign({ user }, process.env.SECRET_KEY);
};

router.get("/", authenticate, async (req, res) => {
	const keyword = req.query.search
		? {
				$or: [{ username: { $regex: req.query.search, $options: "i" } }, { email: { $regex: req.query.search, $options: "i" } }],
		  }
		: {};

	const users = (await User.find(keyword)).findIndex({ _id: { $ne: req.user._id } });
	res.send(users);
});

router.post("/", async (req, res) => {
	try {
		let user = await User.create(req.body);
		let token = newToken(user);
		return res.status(200).send({ user, token });
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.get("/:id", async (req, res) => {
	try {
		let user = await User.findById(req.params.id);
		return res.status(200).send(user);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.delete("/:id", authenticate, async (req, res) => {
	try {
		let user = await User.findByIdAndDelete(req.params.id);
		return res.status(200).send(user);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.post("/login", async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(400).send({ message: "Email not exist" });
		let match = user.checkPassword(req.body.password);
		if (!match) return res.status(400).send({ message: "Wrong Password!" });
		let token = newToken(user);
		return res.status(200).send({ user, token });
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

module.exports = router;
