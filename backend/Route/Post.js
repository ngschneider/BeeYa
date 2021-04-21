const sqlCommand = require("../database/sqlCommand.js")

createPost = (userid, text, date, callback) => {
    let tableRow = ["posttext", "created_at", "user_id"];
    let tableColumn = [text, date, userid];
	let statement = sqlCommand.insert("Posts", tableRow, tableColumn );
	sqlCommand.send([statement], (result) => {
		if(result.errnum == 1){
			callback(createPostSuccess())
		}else {
			callback(createPostFailed())
		}
	});
}

createReply = (userid,replyToID ,text, date, callback) => {
    let tableRow = ["posttext", "created_at", "user_id", "in_reply_to_postid"];
    let tableColumn = [text, date, userid,replyToID];
	let statement = sqlCommand.insert("Posts", tableRow, tableColumn );
	sqlCommand.send([statement], (result) => {
		if(result.errnum == 1){
			callback(createPostSuccess())
		}else {
			callback(createPostFailed())
		}
	});
}

getPost = (userid, callback) => {
	let statement = sqlCommand.select("Posts", "user_id", userid);
	sqlCommand.send([statement], (results) => {
		console.log(results)
		let response = results[0];
		response.reply = [];
		response.reply.push(results[1]);
		callback(response);
	});
}


createPostSuccess = () =>{
	return {post:true}
}

createPostFailed = () => {
	return {post:false}
}

exports.createPost = createPost;
exports.getPost = getPost;
exports.createReply = createReply;

