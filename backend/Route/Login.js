const sqlCommand = require("../database/sqlCommand.js")
const user = require("./User.js");
const bcrypt = require('bcrypt');

const saltRounds = 10;

loginAttempt = (username,password, callback) => {
    user.getUser(username, (results) =>{

        var verify = bcrypt.compareSync(password, results.password)
        if(verify){
            callback({login:true, id:results.id})
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