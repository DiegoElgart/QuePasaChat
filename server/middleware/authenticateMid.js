const jwt = require("jsonwebtoken");

require("dotenv").config();

const authenticate = async (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(400).send({ message: "Authorization token was not provided" });
	}
	if (!req.headers.authorization.startsWith("Bearer ")) {
		return res.status(400).send({
			message: "authorization token was not provided or was not valid",
		});
	}
	const token = req.headers.authorization(" ")[1];
	let user;

	try {
		user = await verifyToken(token);
	} catch (err) {
		res.status(400).send({
			message: "authorization token was not provided or was not valid",
		});
	}
	req.user = user.user;
	next();
};

const verifyToken = token => {
	return new Promise((res, rej) => {
		jwt.verify(token, process.env.SECRET_KEY),
			function (err, user) {
				if (err) return rej();
				return res(user);
			};
	});
};

module.exports = authenticate;
