const cors = require("cors");
const express = require("express");
//const { createServer } = require("http");
const socket = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());
const connectDB = require("./config/db");

const userRouter = require("./routes/userRoutes");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes");
app.use("/auth", userRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

const PORT = 4000;

let server = app.listen(PORT, async (req, res) => {
	try {
		await connectDB();
	} catch (err) {
		console.log(err.message);
	}
	console.log(`Server listening on http://localhost:${PORT}`);
});

const io = socket(server, { cors: { "Access-Control-Allow-Origin": "*", origin: "http://localhost:3000" } });

io.on("connection", socket => {
	socket.on("setup", userData => {
		socket.join(userData._id);
		socket.emit("connected");
	});

	socket.on("join chat", room => {
		socket.join(room);
	});
	socket.on("new message", recievedMessage => {
		var chat = recievedMessage.chat;
		chat.users.forEach(user => {
			if (user == recievedMessage.sender._id) return;
			socket.in(user).emit("message recieved", recievedMessage);
		});
	});
	socket.off("setup", () => {
		socket.leave(userData._id);
	});
});
