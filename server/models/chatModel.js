const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
	{
		chatName: { type: String, trim: true },
		isGroupChat: { type: Boolean, default: false },
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
		latestMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "message",
		},
		groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	},
	{ timestamps: true, versionKey: false }
);

const ChatModel = mongoose.model("chat", chatSchema);

module.exports = ChatModel;