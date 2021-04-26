const sql = require("./events");
const ErrorRecovery = require("./errorRecovery");

/* sqlCommands.js
 * Allows for easy mysql commmands
 *
 */


/*
 * Input : Table name, set of columns, set of cooresponding records
 * Output : sql insert command, formatted correctly
 *
 */
	const insert = (tableName, columnSet, recordSet) => {
		let insertString = "INSERT INTO " + tableName + " ( "; 	
		
		columnSet.forEach( (value, index) => {
			insertString +=  value  + ", ";	
		} );

		insertString = insertString.substring(0, insertString.length - 2) + " ) VALUES ( ";
		recordSet.forEach( (value,index) => {
			insertString += "\"" + value + "\"" + ", "	
		});
		insertString = insertString.substring(0,insertString.length - 2) + " );"
		
		return insertString;
	}
/*
 * Input : List of sql commands
 * Output : Sends to sql database;
 */
	let response = "";
	const send = (sendList,cb) => {
		let sendString = "";

		sendList.forEach((value, index) => {
			sendString += value + " ";
		} ); 
	
		sql.select(sendString, function(results){
	//		console.log(results)
			let errorNumber = ErrorRecovery.errorRecovery(results);
	//		console.log(errorNumber[1])
			cb(errorNumber);
			
		});
	}

	const select = (tableName, column, value) => {
		let selectStatement = `SELECT * FROM ${tableName} WHERE ${column}=\'${value}\';`;
		
		return selectStatement;
	
	}

	const selectOrder = (tableName, column, value, order) => {
		let selectStatement = `SELECT * FROM ${tableName} WHERE ${column}=\'${value}\'`;
		if (order) {
			selectStatement += ` ORDER BY ${order};`;
		}
		else {
			selectStatement += `;`;
		}
		return selectStatement;
	
	}

	const selectColumn = (tableName, column, value, getColumn) => {
		let selectStatement = `SELECT ${getColumn} FROM ${tableName} WHERE ${column}=\'${value}\';`;
		
		return selectStatement;
	
	}

	const selectAllExcept = (tableName, column, value, order) => {
		let selectStatement = `SELECT * FROM ${tableName} WHERE ${column}<>\'${value}\'`;
		if (order) {
			selectStatement += ` ORDER BY ${order};`;
		}
		else {
			selectStatement += `;`;
		}
		
		return selectStatement;
	
	}

	const update = (tableName, column, value, id) => {
		let selectStatement = `UPDATE ${tableName} SET ${column} = ${column} + \'${value}\' WHERE post_id = \'${id}\';`;

		return selectStatement;
	
	}

	const count = (tableName, column) => {
		let selectStatement = `SELECT COUNT(${column}) AS COUNT FROM ${table};`;

		return selectStatement;
	
	}

	const deleteRecord = (table,column,value) => {
		let sqlString = `DELETE FROM ${table} WHERE ${column[0]}=\'${value[0]}\'`;
		for(let i =1; i < column.length; i++){
			sqlString += ` AND ${column[i]}=\'${value[i]}\'`;
		}
		sqlString += ";";
		return sqlString;
	}

exports.insert = insert;
exports.send = send;
exports.deleteRecord = deleteRecord;
exports.select = select;
exports.selectColumn = selectColumn;
exports.update = update;
exports.count = count;
exports.selectAllExcept = selectAllExcept;
