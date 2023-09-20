const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatSchema = new Schema(
	{
		isGroupChat: { type: Boolean, default: false },
		recipients: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, username: { type: String } }],
		messages: [
			{
				sender: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
				text: { type: String, trim: true },
				createdAt: { type: Date, default: Date.now },
			},
		],
	},
	{ timestamps: true, versionKey: false }
);
chatSchema.pre("save", function (next) {
	if (this.messages.length > 20) {
		this.messages = this.messages.slice(-20);
	}
	if (this.recipients.length > 2) {
		this.isGroupChat = true;
	}
	next();
});

const ChatModel = mongoose.model("chat", chatSchema);

module.exports = ChatModel;
