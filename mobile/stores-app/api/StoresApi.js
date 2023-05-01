import axios from "axios";

const PROTOCOL = "http://";
const BASE_URL = "192.168.101.3";
const PORT = "5116";
const PATH = PROTOCOL + BASE_URL + ":" + PORT;

const getStores = (authToken) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: PATH + "/api/v1/store/get/user",
      method: "get",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
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

const createStore = (authToken, payload) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: PATH + "/api/v1/store/create",
      method: "post",
      headers: {
        Authorization: "Bearer " + authToken,
        "Content-Type": "application/json",
      },
      data: {
        struct: "store",
        data: payload,
      },
    };

    console.log(config);

    axios(config)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const StoresApi = {
  getStores,
  createStore,
};

export default StoresApi;
