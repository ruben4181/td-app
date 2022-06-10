require('dotenv').config({path:'.env'});

const mysql_util = require(process.env.DIR_PATH+'/database/connections/mysql_connection');
const sql_constants = require('./constants');
const constants = require(process.env.DIR_PATH+"/utils/constants.js");

createCategory = (payload) =>{
  return new Promise((resolve, reject)=>{
    mysql_util.getConnection().then((resp)=>{
      let conn = resp;
      let categoryName = payload.categoryName;
      let categoryDescription = payload.categoryDescription;
      let idCategoryParent = payload.idCategoryParent;
      let idStore = payload.idStore;
      let mongoId = payload.mongoId;
      let imgSrc = payload.imgSrc;

      conn.query(sql_constants.SQL_SP_INSERT, [categoryName, categoryDescription, idCategoryParent, idStore, mongoId, imgSrc], (err, result)=>{
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

updateCategory = (idStore, idCategory, payload) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp)=>{
      let conn = resp;
      let categoryName = payload.categoryName;
      let categoryDescription = payload.categoryDescription;
      let idCategoryParent = payload.idCategoryParent;
      let imgSrc = payload.imgSrc;
      conn.query(sql_constants.SQL_SP_UPDATE, [idCategory, categoryName, categoryDescription, idCategoryParent, imgSrc], (err, result)=>{
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
      })
    }).catch((err) => {
      reject(err);
    })
  });
}

getCategoriesByStore = (idStore)=>{
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp)=>{
      let conn = resp;
      conn.query(sql_constants.SQL_SP_CATEGORIES_GET_BY_STORE_ALL, [idStore], (err, result)=>{
        conn.end();
        if(err){
          reject({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SQL_SP_CATEGORIES_GET_BY_STORE,
            err
          });
        } else{
          resolve({
            result : constants.RESULT_OK,
            message : "Categories fetched",
            data : result[0]
          });
        }
      });
    });
  });
}

module.exports = {
  createCategory,
  updateCategory,
  getCategoriesByStore
}