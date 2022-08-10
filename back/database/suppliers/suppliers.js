require('dotenv').config({path:'.env'});

const mysql_util = require(process.env.DIR_PATH+'/database/connections/mysql_connection');
const sql_constants = require('./constants');
const constants = require(process.env.DIR_PATH+"/utils/constants.js");

createSupplier = (payload) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;

      let idStore = payload.idStore;
      let supplierName = payload.supplierName;
      let supplierId = payload.supplierId;
      let supplierAddress = payload.supplierAddress;
      let supplierPhone = payload.supplierPhone;
      let supplierEmail = payload.supplierEmail;
      let description = payload.description;

      conn.query(sql_constants.SP_SUPPLIERS_ADD_SUPPLIER, [idStore, supplierName, supplierId,
        supplierAddress, supplierPhone, supplierEmail, description], (err, result) => {
          conn.end();
          if(err){
            reject({
              result : constants.ERROR,
              message : "Error while calling "+sql_constants.SP_SUPPLIERS_ADD_SUPPLIER,
              err
            })
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
    });
  });
}

updateSupplier = (payload) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;

      let idStore = payload.idStore;
      let idSupplier = payload.idSupplier;
      let supplierName = payload.supplierName;
      let supplierId = payload.supplierId;
      let supplierAddress = payload.supplierAddress;
      let supplierPhone = payload.supplierPhone;
      let supplierEmail = payload.supplierEmail;
      let description = payload.description;

      conn.query(sql_constants.SP_SUPPLIERS_UPDATE_SUPPLIER, [idStore, idSupplier, supplierName,
        supplierId, supplierAddress, supplierPhone, supplierEmail, description], (err, result) => {
          conn.end();
          if(err){
            reject({
              result : constants.ERROR,
              message : "Error while calling "+sql_constants.SP_SUPPLIERS_UPDATE_SUPPLIER,
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
    });
  });
}

deleteSupplier = (idStore, idSupplier) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      conn.query(sql_constants.SP_SUPPLIERS_DEL_SUPPLIER, [idStore, idSupplier], (err, result) => {
        conn.end();
        if(err){
          reject({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SP_SUPPLIERS_DEL_SUPPLIER,
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
    });
  });
}

getSuppliers = (idStore, query, page) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      conn.query(sql_constants.SP_SUPPLIERS_GET_BY_STORE, [idStore, query, page], (err, result) => {
        conn.end();
        if(err){
          reject({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SP_SUPPLIERS_GET_BY_STORE,
            err
          });
        } else{
          resolve({
            result : constants.RESULT_OK,
            message : "Suppliers fetched",
            data : result[0],
            lastPage : result[1][0].LAST_PAGE,
            total : result[1][0].TOTAL
          });
        }
      });
    });
  });
}

getSupplier = (idStore, idSupplier) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      conn.query(sql_constants.SP_SUPPLIERS_GET, [idStore, idSupplier], (err, result) => {
        if(err){
          reject({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SP_SUPPLIERS_GET,
            err
          });
        } else{
          if(result[1][0] && result[1][0].RESULT == 'OK'){
            let tmp = result[0][0];
            resolve({
              result : constants.RESULT_OK,
              message : result[1][0].MESSAGE,
              data : {
                idSupplier : tmp.ID_SUPPLIER,
                supplierName : tmp.SUPPLIER_NAME,
                supplierId : tmp.SUPPLIER_ID,
                supplierAddress : tmp.SUPPLIER_ADDRESS,
                supplierPhone : tmp.SUPPLIER_PHONE,
                supplierEmail : tmp.SUPPLIER_EMAIL,
                description : tmp.DESCRIPTION,
                idStore : tmp.ID_STORE
              }
            });
          } else{
            resolve({
              result : constants.RESULT_FAIL,
              message : result[1][0].MESSAGE
            })
          }
        }
      });
    });
  });
}

createSupplierBill = (payload) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      
      let idStore = payload.idStore;
      let idSupplier = payload.idSupplier;
      let refPago = payload.refPago;

      conn.query(sql_constants.SP_SUPPLIERS_ADD_BILL, [idStore, idSupplier, refPago], (err, result) => {
        conn.end();
        if(err){
          reject({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SP_SUPPLIERS_ADD_BILL,
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
    });
  });
}

addProductToBill = (payload) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      
      let idStore = payload.idStore;
      let idBill = payload.idBill;
      let idProduct = payload.idProduct;
      let units = payload.units;

      conn.query(sql_constants.SP_SUPPLIERS_ADD_PRODUCT_TO_BILL, 
          [idStore, idBill, idProduct, units], (err, result) => {
        conn.end();
        if(err){
          reject({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SP_SUPPLIERS_ADD_PRODUCT_TO_BILL,
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
    });
  });
}

updateProductFromBill = (payload) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      
      let idStore = payload.idStore;
      let idBill = payload.idBill;
      let idBillDetail = payload.idBillDetail;
      let units = payload.units;

      conn.query(sql_constants.SP_SUPPLIERS_UPDATE_PRODUCT_FROM_BILL, 
          [idStore, idBill, idBillDetail, units], (err, result) => {
        conn.end();
        if(err){
          reject({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SP_SUPPLIERS_UPDATE_PRODUCT_FROM_BILL,
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
    });
  });
}

deleteProductFromBill = (payload) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      
      let idStore = payload.idStore;
      let idBill = payload.idBill;
      let idBillDetail = payload.idBillDetail;

      conn.query(sql_constants.SP_SUPPLIERS_DEL_PRODUCT_FROM_BILL, 
          [idStore, idBill, idBillDetail], (err, result) => {
        conn.end();
        if(err){
          reject({
            result : constants.ERROR,
            message : "Error while calling "+sql_constants.SP_SUPPLIERS_DEL_PRODUCT_FROM_BILL,
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
    });
  });
}

module.exports = {
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliers,
  getSupplier,
  createSupplierBill,
  addProductToBill,
  updateProductFromBill,
  deleteProductFromBill
}