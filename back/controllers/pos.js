require("dotenv").config({ path: ".env" });
const constants = require("../utils/constants");

const pos_services = require("../database/pos/pos");

createBill = (payload) => {
  if (payload) {
    return pos_services.createBill(payload);
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        result: constants.ERROR,
        message: "EMPTY DATA",
      });
    });
  }
};

addProductToBill = (idBill, idProduct, units, description, off) => {
  if (idBill && idProduct && units && typeof off == "number") {
    return pos_services.addProductToBill(
      idBill,
      idProduct,
      units,
      description,
      off
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

delProductFromBill = (idBill, idBillDetail) => {
  if (idBill && idBillDetail) {
    return pos_services.delProductFromBill(idBill, idBillDetail);
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        result: constants.ERROR,
        message: "EMPTY DATA",
      });
    });
  }
};

changeBillStatus = (idBill, idStatus) => {
  if (idBill && idStatus) {
    return pos_services.changeBillStatus(idBill, idStatus);
  } else {
    return new Promise((resolve, reject) => {
      resolve({
        result: constants.ERROR,
        message: "EMPTY DATA",
      });
    });
  }
};

updateProductFromBill = (idBill, idBillDetail, units, description, off) => {
  if (idBill && idBillDetail && typeof off === "number") {
    return pos_services.updateProductFromBill(
      idBill,
      idBillDetail,
      units,
      description,
      off
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

searchBill = (idStore, query) => {
  if (idStore && query) {
    return pos_services.searchBill(idStore, query);
  } else {
    resolve({
      result: constants.ERROR,
      message: "EMPTY DATA",
    });
  }
};

getBill = (idStore, idBill) => {
  if (idStore && idBill) {
    return pos_services.getBill(idStore, idBill);
  } else {
    resolve({
      result: constants.ERROR,
      message: "EMPTY DATA",
    });
  }
};

getBillsByStore = (idStore, page, query, starts, ends) => {
  if (idStore && page) {
    return pos_services.getBillsByStore(idStore, page, query, starts, ends);
  } else {
    resolve({
      result: constants.ERROR,
      message: "EMPTY DATA",
    });
  }
};

getBillDetail = (idStore, idBill) => {
  if (idStore && idBill) {
    return pos_services.getBillDetail(idStore, idBill);
  } else {
    resolve({
      result: constants.ERROR,
      message: "EMPTY DATA",
    });
  }
};

getOpenBills = (idStore, page) => {
  if (idStore && page) {
    return pos_services.getOpenBills(idStore, page);
  } else {
    resolve({
      result: constants.ERROR,
      message: "EMPTY DATA",
    });
  }
};

getParTipoPago = () => {
  return pos_services.getParTipoPago();
};

module.exports = {
  createBill,
  addProductToBill,
  changeBillStatus,
  delProductFromBill,
  updateProductFromBill,
  searchBill,
  getBill,
  getBillsByStore,
  getBillDetail,
  getOpenBills,
  getParTipoPago,
};
