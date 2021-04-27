const sqlCommand = require("../database/sqlCommand.js");
const { followUser } = require("./UserInformation.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;


//Create a user in the database
createUser = (username,displayname,email,pass,date,callback) => {
    const passwordHash = bcrypt.hashSync(pass, saltRounds);
    let statement = sqlCommand.insert("Users",["username","displayname","email","password","created_at"],
    [username,  displayname, email , passwordHash, date]);
    sqlCommand.send([statement], (results)=> {
        console.log(results);
        if(results.errnum == 1){
            //All users auto-follow themselves
            followUser(results.insertId, results.insertId, getDate(), (res) => {
                console.log(res);
            });
            callback({created:true,username:username});
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

//Input Username
//Output ID
getUserID= (username,callback) => {

    let statement = sqlCommand.selectColumn("Users","username",username,"id");
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

function getDate() {
	let dateObj = new Date();
		let date = dateObj.getFullYear() + "-" + dateObj.getMonth() + "-" + dateObj.getDate();
		return date;
}

exports.getUser=getUser;
exports.getUserName=getUserName;
exports.getUserID = getUserID;
exports.createUser=createUser;