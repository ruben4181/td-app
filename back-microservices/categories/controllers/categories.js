require('dotenv').config({path:'.env'});
const constants = require("../utils/constants");

const categories_services = require("../database/categories");

createCategory = (payload) => {
  if(payload){
    return categories_services.createCategory(payload);
  } else{
    return new Promise((resolve, reject) => {
      resolve({
        result : constants.ERROR,
        message : "EMPTY DATA"
      });
    });
  }
}
updateCategory = (idStore, idCategory, payload) =>{
  if(idStore && idCategory && payload){
    return categories_services.updateCategory(idStore, idCategory, payload);
  } else{
    return new Promise((resolve, reject) => {
      resolve({
        result : constants.ERROR,
        message : "EMPTY DATA"
      });
    });
  }
}

getCategoriesByStore = (idStore) => {
  if(idStore){
    return categories_services.getCategoriesByStore(idStore);
  } else{
    return new Promise((resolve, reject) => {
      resolve({
        result : constants.ERROR,
        message : "EMPTY DATA"
      });
    });
  }
}

module.exports = {
  createCategory,
  updateCategory,
  getCategoriesByStore
}