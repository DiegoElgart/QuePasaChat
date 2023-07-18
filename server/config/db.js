const mongoose = require("mongoose");

const connectDB = () => {
	mongoose
		.connect("mongodb://127.0.0.1:27017/QuePasaChat")
		.then(() => console.log("Connected to QuePasaChat"))
		.catch(error => console.log(error));
};

module.exports = connectDB;
