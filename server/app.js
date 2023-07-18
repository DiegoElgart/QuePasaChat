const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http").Server(app);
const PORT = 4000;

const authRouter = require("./routes/authRoute");
const socketIO = require("socket.io")(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

app.use(express.json());
app.use(cors());

connectDB();

socketIO.on("connection", socket => {
	console.log(`⚡: ${socket.id} user just connected!`);
	socket.on("disconnect", () => {
		console.log("🔥: A user disconnected");
	});
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
