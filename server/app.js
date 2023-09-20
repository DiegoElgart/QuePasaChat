const cors = require("cors");
const express = require("express");
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
	const id = socket.handshake.query.id;
	socket.join(id);

	socket.on("send-message", ({ recipients, text, conversationId }) => {
		recipients.forEach(recipient => {
			const newRecipients = recipients.filter(r => r !== recipient);

			socket.broadcast.to(recipient._id).emit("receive-message", {
				_id: conversationId,
				recipients: newRecipients,
				sender: id,
				text,
			});
		});
	});
	socket.on("left-conversation", recipients => {
		recipients.forEach(recipient => {
			socket.broadcast.to(recipient._id).emit("has-left-conversation");
		});
	});
});
