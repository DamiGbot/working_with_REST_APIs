const express = require("express");
const router = express.Router();
const User = require("../models/User");

// RETURN ALL USERS
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		// Internal Server Error
		res.status(500).json({ message: err.message });
	}
});

// ADD A NEW USER TO THE DATABASE
router.post("/", async (req, res) => {
	const user = new User({
		name: req.body.name,
		age: req.body.age,
	});

	try {
		const newUser = await user.save();
		//Created
		res.status(201).json(newUser);
	} catch (err) {
		// Bad Request
		res.status(400).json({ message: err.message });
	}
});

// EDIT A USER BY ID
router.patch("/:id", getUser, async (req, res) => {
	if (res.body.name != null) {
		res.user.name = req.body.name;
	}
	if (req.body.age != null) {
		res.user.age = req.body.age;
	}

	try {
		const updatedUser = await res.user.save();
		res.json(updatedUser);
	} catch (err) {
		// Bad Request
		res.status(400).json({ message: err.message });
	}
});

// REMOVE A USER BY ID
router.delete("/:id", getUser, async (req, res) => {
	try {
		await res.user.remove();
		res.json({ message: "Deleted User" });
	} catch (err) {
		// Internal Server Error
		res.status(500).json({ message: err.message });
	}
});

async function getUser(req, res, next) {
	let user;
	try {
		user = await User.findById(req.params.id);
		if (user === null) {
			// Not Found
			return res.status(404).json({ message: "Cannot find user" });
		}
	} catch (err) {
		// Internal Server Error
		return res.status(500).json({ message: err.message });
	}

	res.user = user;
	next();
}

module.exports = router;
