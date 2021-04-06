const express = require("express");
const router = express.Router();
const sqlCommand = require("./database/sqlCommand.js")

router.get("/test", (req,res) =>	{
	console.log("received!");
	let s = sqlCommand.insert("users",["username","displayname","email","password","created_at","followerCount","postsCount", "user_bio", "user_profile_img_id"],
							["testUser",  "testUser", "testUser@gmail.com" ,"TEST","12/12/2021",0,0,"test test test", 34523452345234]);
								console.log(s);
	let t = sqlCommand.select("Users","username","test");
	sqlCommand.send([s], (results)=> {
		console.log(results)

	})
	res.send("Request successfully received and sent!");
});

router.get("/User:input", (req,res) =>	{
	let input = JSON.parse(req.params.input);
	console.log(input)
	let t = sqlCommand.select("Users","username",input.username);
	sqlCommand.send([t], (results)=> {
		//console.log(results)
		res.send(results[0])
	})
});

router.get("/CreateUser:input", (req,res) =>	{
	console.log("received!");
	let input = JSON.parse(req.params.input);
	let s = sqlCommand.insert("Users",["username","displayname","email","password","created_at"],
							[input.username,  input.displayname, input.email ,input.password, getDate()]);
								console.log(s);
	
	sqlCommand.send([s], (results)=> {
		console.log(results)
		res.send("{created:true}");
	})
});

router.get("/Post:input", (req,res) =>	{
	let input = JSON.parse(req.params.input);
	//console.log(input)
	let t = sqlCommand.select("Posts","user_id",input.id);
	sqlCommand.send([t], (results)=> {
		console.log(results)
		let response = results[0];
		response.reply = results[1];
		res.send(response);
	})
});
function getDate() {
	let dateObj = new Date();
		let date = dateObj.getFullYear() + "-" + dateObj.getMonth() + "-" + dateObj.getDate();
		return date;
}
module.exports = router;
