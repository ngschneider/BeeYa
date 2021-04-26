const sqlCommand = require("../database/sqlCommand.js")


getAllExplorePosts = (user_id, callback) => {
	let statement = sqlCommand.selectAllExcept("Posts", "user_id", user_id, "created_at DESC");
	sqlCommand.send([statement], (results) => {
		console.log(results)
		let response = results;
		response.reply = [];
		response.reply.push(results[1]);
		callback(response);
	});
}


exports.getAllExplorePosts = getAllExplorePosts;