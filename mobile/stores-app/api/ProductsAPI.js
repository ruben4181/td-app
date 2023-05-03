import axios from "axios";

const PROTOCOL = "http://";
const BASE_URL = "192.168.101.3";
const PORT = "5116";
const PATH = PROTOCOL + BASE_URL + ":" + PORT;

const getProductsByStore = (authToken, idStore, page, stockAlert) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: PATH + "/api/v1/product/get/store",
      method: "get",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      params: {
        idStore,
        page,
        stockAlert,
      },
    };

    axios(config)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const findProducts = (authToken, idStore, q, idCategory) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: PATH + "/api/v1/product/search",
      method: "get",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      params: {
        idStore,
        q,
        idCategory,
      },
    };

    axios(config)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const ProductsAPI = {
  getProductsByStore,
  findProducts,
};

export default ProductsAPI;
