const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		contacts: [
			{
				contactId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
				isBlocked: { type: Boolean, default: false },
			},
		],
		chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "chat" }],
	},
	{ timestamps: true, versionKey: false }
);
userSchema.index({ "contacts.contactId._id": 1 }, { unique: true });

userSchema.pre("save", function (next) {
	if (!this.isModified("password")) return next();
	const hash = bcrypt.hashSync(this.password, 8);
	this.password = hash;
	return next();
});

userSchema.methods.checkPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
