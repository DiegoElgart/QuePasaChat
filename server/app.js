const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http").Server(app);
const PORT = 4000;
const io = require("socket.io")(5000, { cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] } });
const authRouter = require("./routes/authRoute");

app.use(express.json());
app.use(cors());

//connectDB();
io.on("connection", socket => {
	const id = socket.handshake.query.id;
	socket.join(id);

	socket.on("send-message", ({ recipients, text }) => {
		recipients.forEach(recipient => {
			const newRecipients = recipients.filter(r => r !== recipient);
			newRecipients.push(id);
			socket.broadcast.to(recipient).emit("receive-message", { recipients: newRecipients, sender: id, text });
		});
	});
});
app.use("/auth", authRouter);

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
