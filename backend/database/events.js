var mysql = require('mysql');
exports.select = (sql_statement, cb) => {
var responce = [];
var con = mysql.createConnection(
        {
                host: "ec2-3-22-234-88.us-east-2.compute.amazonaws.com",
                user: "beeya",
                password: "beeya123",
                database: "beeyaDB",
                stringifyObjects: "true",
		multipleStatements: "true",
		connectionLimit: 100
        }

);

	con.connect(function(err){

        if(err) throw err;
        // console.log("connected!");
        var typeSQL = sql_statement;
	//console.log(sql_statement);
        con.query(typeSQL, function(err, result, fields){
                if (err){
			// console.log(err)
			//console.log(err.name + " " + err.message);
			cb(err);
		}else {
                	if (result.length){
                        	for(var i = 1; i <= result.length;i++){
                        		responce.push(result);
                        	};
                	}
			//console.log(result)
                	cb(result);
		}
//              console.log(result);
//              console.log(fields)
        //      console.log(result.recordset)

        });


	});
	// console.log(responce.pop());
	return "123 123 123 123";

}

