const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Users = require("./routes/Users");

require("dotenv").config({ path: path.join(__dirname, "config", ".env") });
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

main()
	.then(() => console.log("Connected to Database"))
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
}

app.use(express.json());
app.use("/users", Users);

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.listen(PORT, () => {
	console.log(`The server is running on port ${PORT}`);
});
