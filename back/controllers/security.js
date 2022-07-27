require('dotenv').config({path:'.env'});
const constants = require(process.env.DIR_PATH+"/utils/constants");

const path_services = require(process.env.DIR_PATH+"/database/paths/paths");

checkPathAccess = (userID, path) =>{
  if(userID>=1 && path!=undefined && typeof path==="string"){
    return path_services.checkPathAccess(userID, path);
  } else{
    console.log("Error 5");
    return new Promise((resolve, reject)=>{
      reject({
        result : constants.ERROR,
        message : constants.BAD_REQUEST_MSG
      });
    })
  }
}

module.exports = {
  checkPathAccess
}