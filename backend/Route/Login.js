const sqlCommand = require("../database/sqlCommand.js")
const user = require("./User.js");


loginAttempt = (username,password, callback) => {
    user.getUser(username, (results) =>{
        if(results.password == password){
            callback({login:true})
        }else {
            callback({login:false})
        }
    });

   
}


responseFailed = () => {
    return {login:false}
}

responseSuccess = () => {
    return {login:true}
}
exports.loginAttempt=loginAttempt;