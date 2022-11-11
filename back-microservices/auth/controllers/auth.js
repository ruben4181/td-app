require('dotenv').config({path:'.env'});
const constants = require("../utils/constants");

const auth_services = require("../database/auth");

authUser = (username, password)=>{
  if(username!=undefined && typeof username === "string" && password!=undefined && typeof password === "string"){
    return auth_services.authUser(username, password);
  } else{
    return new Promise((resolve, reject)=>{
      reject({
        result : constants.ERROR,
        message : constants.BAD_REQUEST_MSG
      });
    });
  }
},
createUser = (payload) => {
  if(payload){
    return auth_services.createUser(payload);
  } else{
    return new Promise((resolve, reject)=>{
      reject({
        result : constants.ERROR,
        message : constants.BAD_REQUEST_MSG
      });
    });
  }
},
updateUser = (idUser, payload) => {
  if(payload){
    return auth_services.updateUser(idUser, payload);
  } else{
    return new Promise((resolve, reject)=>{
      reject({
        result : constants.ERROR,
        message : constants.BAD_REQUEST_MSG
      });
    });
  }
}

getUserRoles = (idUser, idStore) =>{
  if(idUser, idStore){
    return auth_services.getUserRoles(idUser, idStore);
  } else{
    return new Promise((resolve, reject)=>{
      reject({
        result : constants.ERROR,
        message : constants.BAD_REQUEST_MSG
      });
    });
  }
}

module.exports = {
  authUser,
  createUser,
  updateUser,
  getUserRoles
}
