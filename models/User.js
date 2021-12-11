const mongoose = require("mongoose");

//Create Person Schema
const usersSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
	},
	dateAdded: {
		type: Date,
		required: true,
		default: Date.now(),
	},
});

module.exports = mongoose.model("User", usersSchema);
