require("dotenv").config({ path: ".env" });
const constants = require("../utils/constants.js");
const services = require("../database/costs/costs");

addCost = (payload) => {
  if (payload.idStore && payload.description) {
    let idStore = parseInt(payload.idStore);

    if (payload.idCostCategory) {
      payload.idCostCategory = parseInt(payload.idCostCategory);
    }
    if (payload.ammount) {
      payload.ammount = parseInt(payload.ammount);
    }
    if (payload.idTipoPago) {
      payload.idTipoPago = parseInt(payload.idTipoPago);
    }
    if (payload.idStatus) {
      payload.idStatus = parseInt(payload.idStatus);
    }

    return services.addCost(payload);
  } else {
    return emptyData();
  }
};

getCategories = () => {
  return services.getCategories();
};

emptyData = () => {
  return new Promise((resolve, reject) => {
    resolve({
      result: constants.ERROR,
      message: "EMPTY DATA",
    });
  });
};

getStatus = () => {
  return services.getStatus();
};

getCosts = (payload) => {
  if (payload.idStore) {
    payload.idStore = parseInt(payload.idStore);

    return services.getCosts(payload);
  } else {
    return emptyData();
  }
};

getCost = (idStore, idCost) => {
  if (idStore && idCost) {
    idStore = parseInt(idStore);
    idCost = parseInt(idCost);

    return services.getCost(idStore, idCost);
  } else {
    return emptyData();
  }
};

updateCost = (payload) => {
  if ((payload.idStore, payload.idCost)) {
    payload.idStore = parseInt(payload.idStore);
    payload.idCost = parseInt(payload.idCost);

    return services.updateCost(payload);
  } else {
    return emptyData();
  }
};

delCost = (idStore, idCost) => {
  if (idStore && idCost) {
    idStore = parseInt(idStore);
    idCost = parseInt(idCost);

    return services.delCost(idStore, idCost);
  } else {
    return emptyData();
  }
};

module.exports = {
  addCost,
  getCategories,
  getStatus,
  getCosts,
  getCost,
  updateCost,
  delCost,
};
