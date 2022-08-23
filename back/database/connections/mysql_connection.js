require('dotenv').config({path:'.env'});
/*
  CREATE A CONNECTION TO TIENDAPP MYSQL DATABASE
*/

var mysql      = require('mysql');
getConnection = function(){
  return new Promise((resolve, reject)=>{
    var connection = mysql.createConnection({
        host     : process.env.DATABASE_SQL_HOST,
        database : process.env.DATABASE_SQL_DBNAME,
        user     : process.env.DATABASE_SQL_USER,
        password : process.env.DATABASE_SQL_PASSWORD,
        multipleStatements: true,
        multipleResults : true
    });

    console.log("Here I am");
    console.log("host", process.env.DATABASE_SQL_HOST);
    console.log("db", process.env.DATABASE_SQL_DBNAME);
    console.log("username", process.env.DATABASE_SQL_USER);
    console.log("password", process.env.DATABASE_SQL_PASSWORD);

    connection.connect(function(err) {
    if (err) {
      console.error('Error connecting: ' + err.stack);
      reject({
        err
      });
    }
    resolve(connection);
    });
  });
}

module.exports = {
  getConnection
};