require('dotenv').config({path:'.env'});

const mysql_util = require(process.env.DIR_PATH+'/database/connections/mysql_connection');
const sql_constants = require('./constants');
const constants = require(process.env.DIR_PATH+"/utils/constants.js");

createProduct = (payload) => {
  return new Promise((resolve, reject)=>{
    mysql_util.getConnection().then((resp)=>{
      let conn = resp;
      let productName = payload.productName;
      let productLine = payload.productLine;
      let productDescription = payload.productDescription;
      let productBrand = payload.productBrand;
      let quantity = payload.quantity;
      let productPrice = payload.productPrice;
      let productCost = payload.productCost;
      let productStock = payload.productStock;
      let off = payload.off;
      let productCode = payload.productCode;
      let idStore = payload.idStore;
      let idCategory = payload.idCategory;
      let mongoId = payload.mongoId;
      let imgSrc = payload.imgSrc;
      let stockAlert = payload.stockAlert;

      conn.query(sql_constants.SQL_SP_INSERT, [productName, productLine,
        productDescription, productBrand, quantity, productPrice, productCost,
      productStock, off, productCode, idStore, idCategory, mongoId, imgSrc, stockAlert], (err, result)=>{
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

updateProduct = (idStore, idProduct, payload) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp)=>{
      let conn = resp;
      let productName = payload.productName;
      let productLine = payload.productLine;
      let productDescription = payload.productDescription;
      let productBrand = payload.productBrand;
      let quantity = payload.quantity;
      let productPrice = payload.productPrice;
      let productCost = payload.productCost;
      let productStock = payload.productStock;
      let off = payload.off;
      let productCode = payload.productCode;
      let idCategory = payload.idCategory;
      let imgSrc = payload.imgSrc;
      let stockAlert = payload.stockAlert;
      
      console.log('stockAlert:', stockAlert);

      conn.query(sql_constants.SQL_SP_UPDATE, [idProduct, productName, productLine, productDescription,
        productBrand, quantity, productPrice, productCost, productStock, off, 
        productCode, idCategory, imgSrc, stockAlert], (err, result)=>{
          conn.end();
          if(err){
            resolve({
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
    });
  });
}

deleteProduct = (idStore, idProduct) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp)=>{
      let conn = resp.query(sql_constants.SQL_SP_DELETE, [idStore, idProduct], (err, result)=>{
        if(err){
          resolve({
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

getProducts = (idStore, page) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp)=>{
      let conn = resp;
      conn.query(sql_constants.SQL_SP_PRODUCTS_GET_BY_STORE, [idStore, page], (err, resp)=>{
        conn.end();
        if(err){
          resolve({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SQL_SP_PRODUCTS_GET_BY_STORE,
            err
          });
        } else{
          resolve({
            result : constants.RESULT_OK,
            message : "Products fetched",
            data : resp[0]
          });
        }
      });
    }).catch((err)=>{
      reject(err);
    });
  });
}

getProductsByCategory = (idStore, idCategory, page) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp)=>{
      let conn = resp;
      conn.query(sql_constants.SQL_SP_PRODUCTS_GET_BY_CATEGORY, [idStore, idCategory, page], (err, resp)=>{
        conn.end();
        if(err){
          resolve({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SQL_SP_PRODUCTS_GET_BY_CATEGORY,
            err
          });
        } else{
          resolve({
            result : constants.RESULT_OK,
            message : "Products fetched",
            data : resp[0]
          });
        }
      });
    }).catch((err)=>{
      reject(err);
    });
  });
}

findProducts = (idStore, query) => {
  return new Promise((resolve, reject)=>{
    mysql_util.getConnection().then((resp)=>{
      let conn = resp;
      conn.query(sql_constants.SQL_SP_PRODUCTS_FIND_PRODUCTS, [idStore, query], (err, resp)=>{
        conn.end();
        if(err){
          resolve({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SQL_SP_PRODUCTS_FIND_PRODUCTS,
            err
          });
        } else{
          resolve({
            result : constants.RESULT_OK,
            message : "Products found",
            data : resp[0]
          });
        }
      });
    });
  });
}

findProductsByCategory = (idStore, idCategory, query) => {
  return new Promise((resolve, reject)=>{
    mysql_util.getConnection().then((resp)=>{
      let conn = resp;
      conn.query(sql_constants.SQL_SP_PRODUCTS_FIND_PRODUCTS_BY_CATEGORY, [idStore, idCategory, query], (err, resp)=>{
        conn.end();
        if(err){
          resolve({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SQL_SP_PRODUCTS_FIND_PRODUCTS_BY_CATEGORY,
            err
          });
        } else{
          resolve({
            result : constants.RESULT_OK,
            message : "Products found",
            data : resp[0]
          });
        }
      });
    });
  });
}

getProduct = (idProduct) => {
  return new Promise((resolve, reject)=>{
    mysql_util.getConnection().then((resp)=>{
      let conn = resp;
      conn.query(sql_constants.SQL_SP_PRODUCTS_GET_PRODUCT, [idProduct], (err, result) => {
        if(err){
          resolve({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SQL_SP_PRODUCTS_FIND_PRODUCTS_BY_CATEGORY,
            err
          });
        } else{
          resolve({
            result : constants.RESULT_OK,
            message : "Product fetched",
            data : result[0][0]
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
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductsByCategory,
  findProducts,
  findProductsByCategory,
  getProduct
}