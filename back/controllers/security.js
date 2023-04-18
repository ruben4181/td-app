require("dotenv").config({ path: ".env" });
const constants = require("../utils/constants");

const path_services = require("../database/paths/paths");

checkPathAccess = (userID, path) => {
  if (userID >= 1 && path != undefined && typeof path === "string") {
    return path_services.checkPathAccess(userID, path);
  } else {
    return new Promise((resolve, reject) => {
      reject({
        result: constants.ERROR,
        message: constants.BAD_REQUEST_MSG,
      });
    });
  }
};

module.exports = {
  checkPathAccess,
};
