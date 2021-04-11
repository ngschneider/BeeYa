const express = require("express");
const router = express.Router();
const sqlCommand = require("./database/sqlCommand.js")
const post = require("./route/Post.js");
const user = require("./Route/User.js");
const login = require("./route/Login.js");


router.get("/User:input", (req,res) =>	{
	let input = JSON.parse(req.params.input);
	user.getUser(input.username, (results) => {
		res.send(results);
	});
});

router.post("/User:input", (req,res) =>	{
	console.log("received!");
	let input = JSON.parse(req.params.input);
	user.createUser(input.username, input.displayname, input.email, input.password, getDate(), (result) => {
		res.send(result);
	});
});

router.get("/Login:input", (req,res) => {
	let input = JSON.parse(req.params.input);
	login.loginAttempt(input.username,input.password, (results) => {
		res.send(results);
	});
});

// Retreive post
router.get("/Post:input", (req,res) =>	{
	let input = JSON.parse(req.params.input);
	post.getPost(input.id, (response) => {
		res.send(response);
	});
});

router.post("/Post:input", (req,res) =>	{
	let input = JSON.parse(req.params.input);
	post.createPost(input.id, input.text, getDate(), (response) => {
		res.send(response);
	});
	
});

function getDate() {
	let dateObj = new Date();
		let date = dateObj.getFullYear() + "-" + dateObj.getMonth() + "-" + dateObj.getDate();
		return date;
}
module.exports = router;
