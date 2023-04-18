require("dotenv").config({ path: ".env" });

const mysql_util = require("./mysql_connection");
const sql_constants = require("./constants");
const constants = require("../../utils/constants.js");

const MAX_RANDOM = 999999;
const MIN_RANDOM = 100000;

createBill = (payload) => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      let idStore = payload.idStore;
      let customerId = payload.customerId;
      let customerName = payload.customerName;
      let customerPhone = payload.customerPhone;
      let customerAddress = payload.customerAddress;

      if (!customerId && customerId == "") {
        customerId = Math.random() * (MAX_RANDOM - MIN_RANDOM) + MIN_RANDOM;
        customerId = Math.floor(customerId);
        customerId = customerId.toString();
      }

      conn.query(
        sql_constants.SQL_SP_BILLS_CREATE_BILL,
        [idStore, customerId, customerName, customerPhone, customerAddress],
        (err, result) => {
          conn.end();
          if (err) {
            reject({
              result: constants.ERROR,
              message:
                "Error while executing " + constants.SQL_SP_BILLS_CREATE_BILL,
              err,
            });
          } else {
            if (result[0][0] && result[0][0].ERROR == 0) {
              resolve({
                result: constants.RESULT_OK,
                message: result[0][0].MESSAGE,
                data: {
                  idBill: result[0][0].ID_BILL,
                  code: result[0][0].CODE,
                },
              });
            } else {
              resolve({
                result: constants.RESULT_FAIL,
                message: result[0][0].MESSAGE,
              });
            }
          }
        }
      );
    });
  });
};

addProductToBill = (idBill, idProduct, units, description, off) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SQL_SP_BILLS_ADD_PRODUCT_TO_BILL,
          [idBill, idProduct, units, description, off],
          (err, result) => {
            conn.end();
            if (err) {
              reject({
                result: constants.ERROR,
                message:
                  "Error while executing " +
                  sql_constants.SQL_SP_BILLS_ADD_PRODUCT_TO_BILL,
                err,
              });
            } else {
              if (result[0][0] && result[0][0].ERROR == 0) {
                resolve({
                  result: constants.RESULT_OK,
                  message: result[0][0].MESSAGE,
                });
              } else {
                resolve({
                  result: constants.RESULT_FAIL,
                  message: result[0][0].MESSAGE,
                });
              }
            }
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

delProductFromBill = (idBill, idBillDetail) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SQL_SP_BILLS_DEL_PRODUCT_FROM_BILL,
          [idBill, idBillDetail],
          (err, result) => {
            conn.end();
            if (err) {
              reject({
                result: constants.ERROR,
                message:
                  "Error while executing " +
                  sql_constants.SQL_SP_BILLS_DEL_PRODUCT_FROM_BILL,
                err,
              });
            } else {
              if (result[0][0] && result[0][0].ERROR == 0) {
                resolve({
                  result: constants.RESULT_OK,
                  message: result[0][0].MESSAGE,
                });
              } else {
                resolve({
                  result: constants.RESULT_FAIL,
                  message: result[0][0].MESSAGE,
                });
              }
            }
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

updateProductFromBill = (idBill, idBillDetail, units, description, off) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SQL_SP_BILLS_UPDATE_PRODUCT_FROM_BILL,
          [idBill, idBillDetail, units, description, off],
          (err, result) => {
            conn.end();
            if (err) {
              reject({
                result: constants.ERROR,
                message:
                  "Error while executing " +
                  sql_constants.SQL_SP_BILLS_UPDATE_PRODUCT_FROM_BILL,
                err,
              });
            } else {
              if (result[0][0] && result[0][0].ERROR == 0) {
                resolve({
                  result: constants.RESULT_OK,
                  message: result[0][0].MESSAGE,
                });
              } else {
                resolve({
                  result: constants.RESULT_FAIL,
                  message: result[0][0].MESSAGE,
                });
              }
            }
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

changeBillStatus = (idBill, idStatus) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SQL_SP_BILLS_CHANGE_STATUS,
          [idBill, idStatus],
          (err, result) => {
            conn.end();
            if (err) {
              reject({
                result: constants.ERROR,
                message:
                  "Error while executing " +
                  sql_constants.SQL_SP_BILLS_CHANGE_STATUS,
              });
            } else {
              if (result[0][0] && result[0][0].ERROR == 0) {
                resolve({
                  result: constants.RESULT_OK,
                  message: result[0][0].MESSAGE,
                });
              } else {
                resolve({
                  result: constants.RESULT_FAIL,
                  message: result[0][0].MESSAGE,
                });
              }
            }
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

searchBill = (idStore, query) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SQL_SP_BILLS_FIND_BILL,
          [idStore, query],
          (err, result) => {
            conn.end();
            if (err) {
              reject({
                result: constants.ERROR,
                message:
                  "Error while executing " +
                  sql_constants.SQL_SP_BILLS_FIND_BILL,
              });
            } else {
              resolve({
                result: constants.RESULT_OK,
                message: "Bills fetched",
                data: result[0],
              });
            }
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

getBill = (idStore, idBill) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SQL_SP_BILLS_GET_BILL,
          [idStore, idBill],
          (err, result) => {
            conn.end();
            if (err) {
              reject({
                result: constants.ERROR,
                message:
                  "Error while executing " +
                  sql_constants.SQL_SP_BILLS_GET_BILL,
              });
            } else {
              if (result[0].length > 0) {
                resolve({
                  result: constants.RESULT_OK,
                  message: "Bill fetched",
                  data: result[0][0],
                });
              } else {
                resolve({
                  result: constants.RESULT_FAIL,
                  message: "Bill not exists",
                });
              }
            }
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

getBillsByStore = (idStore, page, query, starts, ends) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SQL_SP_BILLS_GET_BY_STORE,
          [idStore, page, query, starts, ends],
          (err, result) => {
            conn.end();
            if (err) {
              reject({
                result: constants.ERROR,
                message:
                  "Error while executing " +
                  sql_constants.SQL_SP_BILLS_GET_BY_STORE,
              });
            } else {
              resolve({
                result: constants.RESULT_OK,
                message: "Bills fetched",
                page: result[1][0].ACTUAL_PAGE,
                lastPage: result[1][0].LAST_PAGE,
                totalCount: result[1][0].TOTAL_COUNT,
                ammount: result[1][0].AMMOUNT,
                data: result[0],
              });
            }
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

getBillDetail = (idStore, idBill) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SQL_SP_BILLS_GET_BILL_DETAIL,
          [idStore, idBill],
          (err, result) => {
            conn.end();
            if (err) {
              reject({
                result: constants.ERROR,
                message:
                  "Error while executing " +
                  sql_constants.SQL_SP_BILLS_GET_BILL_DETAIL,
              });
            } else {
              resolve({
                result: constants.RESULT_OK,
                message: "Bill details fetched",
                data: result[0],
              });
            }
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

getOpenBills = (idStore, page) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SQL_SP_BILLS_GET_OPEN_BILLS,
          [idStore, page],
          (err, result) => {
            conn.end();
            if (err) {
              reject({
                result: constants.ERROR,
                message:
                  "Error while executing " +
                  sql_constants.SQL_SP_BILLS_GET_OPEN_BILLS,
              });
            } else {
              resolve({
                result: constants.RESULT_OK,
                message: "Bills opened fetched",
                page: result[1][0].ACTUAL_PAGE,
                lastPage: result[1][0].LAST_PAGE,
                totalCount: result[1][0].TOTAL_COUNT,
                data: result[0],
              });
            }
          }
        );
      })
      .catch((err) => {
        reject(err);
      });
  });
};

getParTipoPago = () => {
  return new Promise((resolve, reject) => {
    mysql_util.getConnection().then((resp) => {
      let conn = resp;
      conn.query(sql_constants.SP_PAR_TIPO_PAGO_GET, [], (err, result) => {
        conn.end();
        if (err) {
          reject({
            result: constants.ERROR,
            message:
              "Error while executing " +
              sql_constants.SQL_SP_BILLS_GET_OPEN_BILLS,
          });
        } else {
          resolve({
            result: constants.RESULT_OK,
            message: "Par tipo pago fetched",
            data: result[0],
          });
        }
      });
    });
  });
};

module.exports = {
  createBill,
  addProductToBill,
  changeBillStatus,
  delProductFromBill,
  updateProductFromBill,
  searchBill,
  getBill,
  getBillsByStore,
  getBillDetail,
  getOpenBills,
  getParTipoPago,
};
