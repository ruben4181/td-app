require('dotenv').config({path:'.env'});

const mysql_util = require('./mysql_connection');
const sql_constants = require('./constants');
const constants = require("../utils/constants.js");

checkPathAccess = (userID, path)=>{
  return new Promise((resolve, reject)=>{
    mysql_util.getConnection().then((resp)=>{
      let conn = resp;
      conn.query(sql_constants.SQL_CHECK_PATH_ACCESS, [userID, path], (err, result)=>{
        if(err){
          reject({
            result : constants.ERROR,
            message : "Error while verifying path access",
            err
          });
        } else{
          conn.end();
          if(result && result.length>0){
            resolve({
              result : constants.RESULT_OK,
              message : "Access Granted"
            });
          } else{
            resolve({
              result : constants.RESULT_FAIL,
              message : "Access Denied",
              userID,
              path
            });
          }
        }
      });
    }).catch((err)=>{
      reject(err);
    })
  });
};

module.exports = {
  checkPathAccess
}