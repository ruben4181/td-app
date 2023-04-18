require("dotenv").config({ path: ".env" });

const mysql_util = require("../../database/connections/mysql_connection");
const sql_constants = require("./constants");
const constants = require("../../utils/constants.js");

(authUser = (username, password) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        conn.query(
          sql_constants.SQL_AUTH_USER,
          [username, password],
          (err, result) => {
            conn.end();
            if (err) {
              reject({
                result: constants.ERROR,
                message: "Error while authenticating user",
                err,
              });
            } else {
              if (result && result[0].length > 0) {
                resolve({
                  result: constants.RESULT_OK,
                  message: "AUTHORIZATION",
                  data: result[0],
                });
              } else {
                resolve({
                  result: constants.RESULT_FAIL,
                  message: "AUTHORIZATION FAILED",
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
}),
  (createUser = (payload) => {
    return new Promise((resolve, reject) => {
      mysql_util
        .getConnection()
        .then((resp) => {
          let conn = resp;
          let userName = payload.userName;
          let email = payload.email;
          let password = payload.password;
          let mongoId = payload.mongoId;
          conn.query(
            sql_constants.SQL_SP_INSERT,
            [userName, email, password, mongoId],
            (err, result) => {
              conn.end();
              if (err) {
                reject({
                  result: constants.ERROR,
                  message: "Error while calling " + sql_constants.SQL_SP_INSERT,
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
  });

(updateUser = (idUser, payload) => {
  return new Promise((resolve, reject) => {
    mysql_util
      .getConnection()
      .then((resp) => {
        let conn = resp;
        let oldUsername = payload.oldUsername;
        let newUsername = payload.newUsername;
        let oldPassword = payload.oldPassword;
        let newPassword = payload.newPassword;
        let email = payload.email;
        conn.query(
          sql_constants.SQL_SP_UPDATE,
          [idUser, oldUsername, newUsername, oldPassword, newPassword, email],
          (err, result) => {
            conn.end();
            if (err) {
              resolve({
                result: constants.ERROR,
                message: "Error while calling " + sql_constants.SQL_SP_INSERT,
                err,
              });
            } else {
              if (result[1][0] && result[1][0].ERROR == 0) {
                resolve({
                  result: constants.RESULT_OK,
                  message: result[1][0].MESSAGE,
                });
              } else {
                resolve({
                  result: constants.RESULT_FAIL,
                  message: result[1][0].MESSAGE,
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
}),
  (getUserRoles = (idUser, idStore) => {
    return new Promise((resolve, reject) => {
      mysql_util
        .getConnection()
        .then((resp) => {
          let conn = resp;
          conn.query(
            sql_constants.SQL_SP_GET_ROLES,
            [idUser, idStore],
            (err, result) => {
              conn.end();
              if (err) {
                resolve({
                  result: constants.ERROR,
                  message: "Error while calling " + sql_constants.SQL_SP_INSERT,
                  err,
                });
              } else {
                resolve({
                  result: constants.RESULT_OK,
                  message: "ROLES FETCHED",
                  data: result[0],
                });
              }
            }
          );
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  });

module.exports = {
  authUser,
  createUser,
  updateUser,
  getUserRoles,
};
