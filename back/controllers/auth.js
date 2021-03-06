require('dotenv').config({path:'.env'});
const constants = require(process.env.DIR_PATH+"/utils/constants");

const auth_services = require(process.env.DIR_PATH+"/database/auth/auth");

authUser = (username, password)=>{
  if(username!=undefined && typeof username === "string" && password!=undefined && typeof password === "string"){
    return auth_services.authUser(username, password);
  } else{
    console.log("Error 1");
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
    console.log("Error 2");
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
    console.log("Error 3");
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
    console.log("Error 4");
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
