const jwt = require("jsonwebtoken");

require("dotenv").config();

const auth = (req, res, next) => {
	const token = req.header("access-token");
	if (!token) return res.status(401).send("Acces denied - No Token");
	try {
		const verified = jwt.verify(token, process.env.SECRET_KEY);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send("Invalid Token");
	}
};

module.exports = auth;
