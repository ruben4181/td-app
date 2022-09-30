require('dotenv').config({path:'.env'});

const mysql_util = require(process.env.DIR_PATH+'/database/connections/mysql_connection');
const sql_constants = require('./constants');
const constants = require(process.env.DIR_PATH+"/utils/constants.js");

addCost = (payload) =>{
  let idStore = payload.idStore;
  var idCostCategory = payload.idCostCategory;
  let ammount = payload.ammount;
  let refCobro = payload.refCobro;
  let refPago = payload.refPago;
  var idTipoPago = payload.idTipoPago;
  let description = payload.description;
  var idStatus = payload.idStatus;


  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      conn.query(sql_constants.SP_COSTS_ADD_COST, [idStore, idCostCategory, ammount,
        refCobro, refPago, idTipoPago, description, idStatus], (err, result) => {
          conn.end();
          if(err){
            resolve({
              result : constants.ERROR,
              message : "Error while calling "+sql_constants.SP_COSTS_ADD_COST,
              err
            });
          } else{
            if(result[0][0].ERROR == 0){
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
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}

getCategories = () => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      conn.query(sql_constants.SP_COSTS_CATEGORIES_GET, [], (err, result) => {
        conn.end();
        if(err){
          resolve({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SP_COSTS_CATEGORIES_GET,
            err
          });
        } else{
          resolve({
            result : constants.RESULT_OK,
            messages : "Categories fetched",
            data : result[0]
          });
        }
      });
    }).catch((err) => {
      console.log(err);
    });
  });
}

getStatus = () => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      conn.query(sql_constants.SP_COSTS_STATUS_GET, [], (err, result) => {
        conn.end();
        if(err){
          resolve({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SP_COSTS_STATUS_GET,
            err
          });
        } else{
          resolve({
            result : constants.RESULT_OK,
            messages : "Status fetched",
            data : result[0]
          });
        }
      });
    }).catch((err) => {
      console.log(err);
      reject(err);
    });
  });
}

getCosts = (payload) => {
  return new Promise((resolve, reject) => {
    let idStore = parseInt(payload.idStore);
    let query = payload.query;
    let page = payload.page;
    let from = payload.from;
    let to = payload.to;

    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      conn.query(sql_constants.SP_COSTS_GET, [idStore, query, page, from, to], (err, result) => {
        conn.end();
        if(err){
          resolve({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SP_COSTS_GET,
            err
          });
        } else{
          resolve({
            result : constants.RESULT_OK,
            message : "Costs fetched",
            data : result[0],
            total : result[1][0].TOTAL_COUNT,
            lastPage : result[1][0].LAST_PAGE
          });
        }
      });
    }).catch((err) => {
      reject(err);
    });
  });
}

getCost = (idStore, idCost) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      conn.query(sql_constants.SP_COSTS_GET_ONE, [idStore, idCost], (err, result) => {
        conn.end();
        if(err){
          resolve({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SP_COSTS_GET_ONE,
            err
          });
        } else{
          if(result[0][0]){
            resolve({
              result : constants.RESULT_OK,
              message : "Cost fetched",
              data : result[0][0]
            });
          } else{
            resolve({
              result : constants.RESULT_FAIL,
              message : "Nothing fetched"
            });
          }
        }
      });
    })
  });
}

module.exports = {
  addCost,
  getCategories,
  getStatus,
  getCosts,
  getCost
}