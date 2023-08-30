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
// Define a pre-save hook to limit the number of messages to 20.
chatSchema.pre("save", function (next) {
	if (this.messages.length > 20) {
		this.messages = this.messages.slice(-20);
	}
	next();
});

const ChatModel = mongoose.model("chat", chatSchema);

module.exports = ChatModel;
