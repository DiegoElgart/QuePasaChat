const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatHistorySchema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
		History: [{ chatHistory: { type: String } }],
	},
	{ versionKey: false }
);

const ChatHistroy = mongoose.model("chatHistory", chatHistorySchema);

module.exports = ChatHistroy;
