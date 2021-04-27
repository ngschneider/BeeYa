const express = require("express");
const router = express.Router();
const sqlCommand = require("./database/sqlCommand.js")
const post = require("./route/Post.js");
const user = require("./Route/User.js");
const login = require("./route/Login.js");
const UserInformation = require("./Route/UserInformation.js");
const explore = require("./Route/ExploreRoute");

let currentImg = {
	imgname:null
}

router.post("/img", (req,res) =>{
	let imgid = generateUniqueId();
	post.uploadImg(req.files.file.data,imgid);
	currentImg.imgname = imgid;
	console.log("IMAGE UPLOADED")
	res.send({imgUpload:true});
});
router.get("/User:input", (req,res) =>	{
	let input = JSON.parse(req.params.input);
	user.getUser(input.username, (results) => {
		res.send(results);
	});
});

router.post("/Follow:input", (req,res) => {
	let input = JSON.parse(req.params.input);
	UserInformation.followUser(input.id,input.followedId, getDate(), (result) => {
		res.send(result);	
	});
});

router.post("/Unfollow:input", (req,res) => {
	let input = JSON.parse(req.params.input);
	UserInformation.unFollowUser(input.id,input.followedId, (result) => {
		res.send(result);	
	});
});

router.get("/Following:input", (req,res) => {
	let input = JSON.parse(req.params.input);
	UserInformation.getFollowers(input.id, (result) => {
		res.send(result);	
	});
});

router.get("/FeedFollowing:input", (req,res) => {
	let input = JSON.parse(req.params.input);
	UserInformation.getFollowing(input.id, (result) => {
		res.send(result);	
	});
});

router.post("/Tweet/Like:input", (req,res) => {
	let input = JSON.parse(req.params.input);
	post.setLike(input.postId,input.userId, (result) => {
		res.send(result);	
	});
});

router.post("/Tweet/Retweet:input", (req,res) => {
	let input = JSON.parse(req.params.input);
	post.setLike(input.postId,input.userId, getDate(), (result) => {
		res.send(result);	
	});
});

router.post("/User:input", (req,res) =>	{
	console.log("received!");
	let input = JSON.parse(req.params.input);
	user.createUser(input.username, input.displayname, input.email, input.password, getDate(), (result) => {
		res.send(result);
	});
});

router.post("/Changepassword:input", (req,res) =>	{
	
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
	
	post.createPost(input.id, input.text, getDate(), currentImg, (response) => {
		res.send(response);
	});
	currentImg.imgname = null;
	
});

router.post("/Reply:input", (req,res) =>	{
	let input = JSON.parse(req.params.input);
	post.createReply(input.id, input.replyId ,input.text, getDate(), (response) => {
		res.send(response);
	});
	
});

router.get("/Homefeed:input", (req,res) =>	{
	let input = JSON.parse(req.params.input);
	UserInformation.getUserFeed(input.id, (response) => {
		res.send(response);
	});
});

router.get("/IDGet:input", (req,res) =>	{
	let input = JSON.parse(req.params.input);
	user.getUserID(input.username, (response) => {
		res.send(response);
	});
});
//Get all global posts NOT from User
router.get("/Explore:input", (req, res) => {
	let input = JSON.parse(req.params.input);
	explore.getAllExplorePosts(input.user_id, (response) => {
		res.send(response);
	});
});

router.get("/GetUsername:input", (req, res) => {
	let input = JSON.parse(req.params.input);
	user.getUserName(input.id, (response) => {
		res.send(response);
	});
});

router.get("/Search:input", (req, res) => {
	let input = JSON.parse(req.params.input);
	explore.searchPosts(input.posttext, (response) => {
		res.send(response);
	});
});

function getDate() {
	let dateObj = new Date();
		let date = dateObj.getFullYear() + "-" + (dateObj.getMonth()+1) + "-" + dateObj.getDate() + "T" 
		+ dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();
		return date;
}
const generateUniqueId = () => {
	return Math.floor(Math.random() * 999999999);	

}
module.exports = router;
