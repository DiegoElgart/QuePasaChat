const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatSchema = new Schema(
	{
		chatName: { type: String, trim: true },
		isGroupChat: { type: Boolean, default: false },
		users: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
		messages: [
			{
				sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
				content: { type: String, trim: true },
				receiver: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
				createdAt: { type: Date, default: Date.now },
			},
		],
		groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
	},
	{ timestamps: true, versionKey: false }
);
// Define a pre-save hook to limit the number of messages to 20.
chatSchema.pre("save", function (next) {
	if (this.messages.length > 20) {
		this.messages = this.messages.slice(-20);
	}
	next();
});

const ChatModel = mongoose.model("chat", chatSchema);

module.exports = ChatModel;
