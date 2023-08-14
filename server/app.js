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

app.use("/auth", userRouter);
app.use("/chat", chatRouter);

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
	//console.log(`User Connected: ${socket.id}`);

	socket.on("send_message", data => {
		console.log(data);
		const room = socket.join(data.senderId);
		socket.to(room).emit("receive_message", data);
	});
});
