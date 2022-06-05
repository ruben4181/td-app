require('dotenv').config({path:'.env'});

const mysql_util = require(process.env.DIR_PATH+'/database/connections/mysql_connection');
const sql_constants = require('./constants');
const constants = require(process.env.DIR_PATH+"/utils/constants.js");

createStore = (payload) => {
  return new Promise((resolve, reject)=>{
    mysql_util.getConnection().then((resp)=>{
      let conn = resp;
      let vStoreName = payload.storeName;
      let vUrl = payload.url;
      let vMongoId = payload.mongoId;
      let nUserId = payload.userId;
      conn.query(sql_constants.SQL_SP_INSERT, [vStoreName, vUrl, vMongoId, nUserId], (err, result)=>{
        conn.end();
        if(err){
          reject({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SQL_SP_INSERT,
            err
          });
        } else{
          if(result[0][0] && result[0][0].ERROR == 0){
            resolve({
              result : constants.RESULT_OK,
              message : result[0][0].MESSAGE
            });
          } else{
            resolve({
              result : constants.RESULT_FAIL,
              message : result[0][0].MESSAGE
            });
          }
        }
      });
    }).catch((err)=>{
      reject(err);
    });
  });
}
updateStore = (idStore, payload) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp)=>{
      let conn = resp;
      let vStoreName = payload.storeName;
      let vUrl = payload.url;
      conn.query(sql_constants.SQL_SP_UPDATE, [idStore, vStoreName, vUrl], (err, result)=>{
        conn.end();
        if(err){
          reject({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SQL_SP_UPDATE,
            err
          });
        } else{
          if(result[0][0] && result[0][0].ERROR == 0){
            resolve({
              result : constants.RESULT_OK,
              message : result[0][0].MESSAGE
            });
          } else{
            resolve({
              result : constants.RESULT_FAIL,
              message : result[0][0].MESSAGE
            });
          }
        }
      });
    }).catch((err)=>{
      reject(err);
    })
  });
}

deleteStore = (idStore) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp)=>{
      let conn = resp;
      conn.query(sql_constants.SQL_SP_DELETE, [idStore], (err, result) => {
        conn.end();
        if(err){
          resolve({
            result : constants.ERROR,
            message : "Error while calling "+ sql_constants.SQL_SP_DELETE
          });
        } else{
          if(result[0][0] && result[0][0].ERROR == 0){
            resolve({
              result : constants.RESULT_OK,
              message : result[0][0].MESSAGE
            });
          } else{
            resolve({
              result : constants.RESULT_FAIL,
              message : result[0][0].MESSAGE
            });
          }
        }
      });
    }).catch((err)=>{
      reject(err);
    })
  });
}

getStoresByUser = (idUser)=>{
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp)=>{
      let conn = resp;
      conn.query(sql_constants.SQL_SP_GET_STORES_BY_USER, [idUser], (err, result)=>{
        if(err){
          resolve({
            result : constants.ERROR,
            message : "Error while calling "+ sql_constants.SQL_SP_GET_STORES_BY_USER,
            err
          });
        } else{
          resolve({
            result : constants.RESULT_OK,
            message : "STORES_FETCHED",
            data : result[0]
          });
        }
      });
    }).catch((err)=>{
      console.log(err);
      reject(err);
    });
  });
}

module.exports = {
  createStore,
  updateStore,
  deleteStore,
  getStoresByUser
}