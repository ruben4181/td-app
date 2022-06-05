require('dotenv').config({path:'.env'});
const constants = require(process.env.DIR_PATH+"/utils/constants");
const utils = require(process.env.DIR_PATH+"/utils/utils");

const products_services = require(process.env.DIR_PATH+"/database/products/products");

createProduct = (payload) => {
  if(payload){
    return products_services.createProduct(payload);
  } else{
    return new Promise((resolve, reject)=>{
      resolve({
        result : constants.ERROR,
        message : "EMPTY DATA"
      });
    });
  }
}

updateProduct = (idStore, idProduct, payload) =>{
  if(idStore && idProduct && payload){
    return products_services.updateProduct(idStore, idProduct, payload);
  } else{
    return new Promise((resolve, reject)=>{
      resolve({
        result : constants.ERROR,
        message : "EMPTY DATA"
      });
    });
  }
}

deleteProduct = (idStore, idProduct) => {
  if(idStore && idProduct){
    return products_services.deleteProduct(idStore, idProduct);
  } else{
    return new Promise((resolve, reject)=>{
      resolve({
        result : constants.ERROR,
        message : "EMPTY DATA"
      });
    });
  }
}

getProducts = (idStore, page) => {
  if(idStore && page){
    return products_services.getProducts(idStore, page);
  } else{
    return new Promise((resolve, reject)=>{
      resolve({
        result : constants.ERROR,
        message : "EMPTY DATA"
      });
    });
  }
}

getProductsByCategory = (idStore, idCategory, page) =>{
  if(idStore, idCategory, page){
    return products_services.getProductsByCategory(idStore, idCategory, page);
  } else{
    return new Promise((resolve, reject)=>{
      resolve({
        result : constants.ERROR,
        message : "EMPTY DATA"
      });
    });
  }
}

findProducts = (idStore, query) => {
  if(idStore && query){
    return products_services.findProducts(idStore, query);
  } else{
    return new Promise((resolve, reject)=>{
      resolve({
        result : constants.ERROR,
        message : "EMPTY DATA"
      });
    });
  }
}

findProductsByCategory = (idStore, idCategory, query) => {
  if(idStore && idCategory && query) {
    return products_services.findProductsByCategory(idStore, idCategory, query);
  } else{
    return new Promise((resolve, reject)=>{
      resolve({
        result : constants.ERROR,
        message : "EMPTY DATA"
      });
    });
  }
}

getProduct = (idProduct) => {
  if(idProduct){
    return products_services.getProduct(idProduct);
  } else{
    return new Promise((resolve, reject)=>{
      resolve({
        result : constants.ERROR,
        message : "EMPTY DATA"
      });
    });
  }
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