const sqlCommand = require("../database/sqlCommand.js");


//Create a user in the database
createUser = (username,displayname,email,pass,date,callback) => {
    let statement = sqlCommand.insert("Users",["username","displayname","email","password","created_at"],
    [username,  displayname, email , pass, date]);
    sqlCommand.send([statement], (results)=> {
        console.log(results);
        if(results.errnum == 1){
            callback({created:true});
        }else {
            callback({created:false});
        }
    })
}
//input id
//output username
getUserName = (userId,callback) => {

    let statement = sqlCommand.selectColumn("Users","id",userId,"username");
    sqlCommand.send([statement], (result) => {
        console.log(result);
        callback(result)
    })

}

// Retreive a user from the database
getUser = (username, callback) => {
    let statement = sqlCommand.select("Users","username",username);
	sqlCommand.send([statement], (results)=> {
        console.log(results)
		callback(results[0]);
	})

}



exports.getUser=getUser;
exports.getUserName=getUserName;

exports.createUser=createUser;