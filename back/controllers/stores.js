require("dotenv").config({ path: ".env" });
const constants = require("../utils/constants");
const utils = require("../utils/utils");

const store_services = require("../database/stores/stores");

createStore = (payload) => {
  if (payload) {
    return store_services.createStore(payload);
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        result: constants.ERROR,
        message: "EMPTY DATA",
      });
    });
  }
};

updateStore = (idStore, payload) => {
  if (idStore && payload) {
    return store_services.updateStore(idStore, payload);
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        result: constants.ERROR,
        message: "EMPTY DATA",
      });
    });
  }
};

deleteStore = (idStore) => {
  if (idStore) {
    return store_services.deleteStore(idStore);
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        result: constants.ERROR,
        message: "EMPTY DATA",
      });
    });
  }
};
getStoresByUser = (idUser) => {
  if (idUser) {
    return store_services.getStoresByUser(idUser);
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
  createStore,
  updateStore,
  deleteStore,
  getStoresByUser,
};
