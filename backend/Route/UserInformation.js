const sqlCommand = require("../database/sqlCommand.js");

followUser = (userId, toFollowId, date, callback) => {
    let table = "FollowingTable";
    let column = ["followingUser","followedUser","created_at"];
    let record = [userId,toFollowId,date];
    statement = sqlCommand.insert(table,column,record);

    sqlCommand.send([statement], result =>{
        console.log(result);
        
        if(result.errnum == 1){
            callback({followed:true});
        }else{
            callback({followed:false});
        }
    });
}

unFollowUser = (userId,followId, callback) => {
    let table = "FollowingTable";
    let column = ["followingUser", "followedUser"];
    let record = [userId, followId];

    let statement = sqlCommand.deleteRecord(table, column, record);
    console.log(statement);
    sqlCommand.send([statement], result => {
        if(result.errnum == 1){
            callback({unfollowed:true})
        }else{
            callback({unfollowed:false})
        }
    });

}


getFollowers = (userId, callback) => {
    let table = "FollowingTable";
    let column = "followingUser";
    console.log(userId);
    let statement = sqlCommand.select(table, column, userId);
    console.log(statement);
    sqlCommand.send([statement], result => {
        console.log(result)
        let response = {
            followers:result
        }
        callback(response)
    });
}

exports.followUser = followUser;
exports.getFollowers = getFollowers;
exports.unFollowUser = unFollowUser;