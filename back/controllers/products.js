require("dotenv").config({ path: ".env" });
const constants = require("../utils/constants");
const utils = require("../utils/utils");

const products_services = require("../database/products/products");

createProduct = (payload) => {
  if (payload) {
    return products_services.createProduct(payload);
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        result: constants.ERROR,
        message: "EMPTY DATA",
      });
    });
  }
};

updateProduct = (idStore, idProduct, payload) => {
  if (idStore && idProduct && payload) {
    return products_services.updateProduct(idStore, idProduct, payload);
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        result: constants.ERROR,
        message: "EMPTY DATA",
      });
    });
  }
};

deleteProduct = (idStore, idProduct) => {
  if (idStore && idProduct) {
    return products_services.deleteProduct(idStore, idProduct);
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        result: constants.ERROR,
        message: "EMPTY DATA",
      });
    });
  }
};

getProducts = (idStore, page, stockAlert) => {
  if (idStore && page) {
    return products_services.getProducts(idStore, page, stockAlert);
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        result: constants.ERROR,
        message: "EMPTY DATA",
      });
    });
  }
};

getProductsByCategory = (idStore, idCategory, page, stockAlert) => {
  if ((idStore, idCategory, page)) {
    return products_services.getProductsByCategory(
      idStore,
      idCategory,
      page,
      stockAlert
    );
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        result: constants.ERROR,
        message: "EMPTY DATA",
      });
    });
  }
};

findProducts = (idStore, query, stockAlert) => {
  if (idStore && query) {
    return products_services.findProducts(idStore, query, stockAlert);
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        result: constants.ERROR,
        message: "EMPTY DATA",
      });
    });
  }
};

findProductsByCategory = (idStore, idCategory, query, stockAlert) => {
  if (idStore && idCategory && query) {
    return products_services.findProductsByCategory(
      idStore,
      idCategory,
      query,
      stockAlert
    );
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        result: constants.ERROR,
        message: "EMPTY DATA",
      });
    });
  }
};

getProduct = (idProduct) => {
  if (idProduct) {
    return products_services.getProduct(idProduct);
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        result: constants.ERROR,
        message: "EMPTY DATA",
      });
    });
  }
};

getAllProducts = (idStore) => {
  if (idStore) {
    return products_services.getAllProducts(idStore);
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        result: constants.ERROR,
        message: "EMPTY DATA",
      });
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductsByCategory,
  findProducts,
  findProductsByCategory,
  getProduct,
  getAllProducts,
};
