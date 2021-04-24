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
		let response = results;
		response.reply = [];
		response.reply.push(results[1]);
		callback(response);
	});
}

setLike = (postId, userId, callback) => {
	let tableRow = ["post_id", "likingUser_id"];
    let tableColumn = [postId, userId];
	let statement = sqlCommand.insert("Likes", tableRow, tableColumn );
	sqlCommand.send([statement], (result) => {
		if(result.errnum == 1){
			callback(createPostSuccess())
		}else {
			callback(createPostFailed())
		}
	});
}

setRetweet = (postId, userId, date, callback) => {
	let tableRow = ["post_id", "user_id", date];
    let tableColumn = [postId, userId, date];
	let statement = sqlCommand.insert("rebuzz", tableRow, tableColumn );
	sqlCommand.send([statement], (result) => {
		if(result.errnum == 1){
			callback(createPostSuccess())
		}else {
			callback(createPostFailed())
		}
	});
}


createPostSuccess = () =>{
	return {post:true}
}

createPostFailed = () => {
	return {post:false}
}

exports.createPost = createPost;
exports.setLike = setLike;
exports.setRetweet = setRetweet;
exports.getPost = getPost;
exports.createReply = createReply;

