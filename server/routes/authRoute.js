const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/userModel");
const router = express.Router();

require("dotenv").config();

router.route("/login").post(async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username: username });

		const checkPassword = await bcrypt.compare(password, user.password);

		if (user && checkPassword) {
			const ACCESS_SECRET_TOKEN = process.env.SECRET_KEY;
			const accessToken = jwt.sign({ id: user._id }, ACCESS_SECRET_TOKEN);
			res.header("access-token", accessToken);
			res.json({ accessToken, username: user.username });
		} else {
			res.status(401).json("Wrong username or password");
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.route("/signup").post(async (req, res) => {
	try {
		const { username, password } = req.body;
		const checkIfUserExists = await User.findOne({ username: username });
		if (checkIfUserExists) {
			res.status(401).json("User already exists!");
		} else {
			const hashPassword = await bcrypt.hash(password, saltRounds);
			const user = new User({ username: username, password: hashPassword });

			user.save();
			res.status(200).json("User signed up!");
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

module.exports = router;
