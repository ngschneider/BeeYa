const express = require("express");
const router = express.Router();

router.get("/test", (req,res) =>	{
	console.log("received!");
	res.send("Request successfully received and sent!");
});

module.exports = router;
