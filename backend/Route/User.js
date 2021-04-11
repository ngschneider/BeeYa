const sqlCommand = require("../database/sqlCommand.js");

createUser = (username,displayname,email,pass,date,callback) => {
    let statement = sqlCommand.insert("Users",["username","displayname","email","password","created_at"],
    [username,  displayname, email , pass, date]);
    sqlCommand.send([statement], (results)=> {
        console.log(results);
        callback({user:true});
    })
}

getUser = (username, callback) => {
    let statement = sqlCommand.select("Users","username",username);
	sqlCommand.send([statement], (results)=> {
        console.log(results)
		callback(results[0]);
	})

}

exports.getUser=getUser;
exports.createUser=createUser;