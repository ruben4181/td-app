import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;

let fetchStoresByUser = (authToken) => {
  return new Promise((resolve, reject) => {
    let config = {
      method : "get",
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/store/get/user",
      headers: { 'Authorization' : 'Bearer '+authToken }
    }
    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    });
  });
}

let createNewStore = (authToken, payload) => {
  return new Promise((resolve, reject) => {
    let config = {
      method : "post",
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/store/create",
      headers: { 'Authorization' : 'Bearer '+authToken },
      data : {
        struct : "store",
        data : {
          storeName : payload.storeName,
          //url : payload.url,
          mongoId : payload.mongoId,
          noId : payload.noId,
          phone : payload.phone,
          address : payload.address,
          socialNetworks : payload.socialNetworks
        }
      }
    }
    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    })
  });
}

let updateNewStore = (authToken, payload) => {
  return new Promise((resolve, reject) => {
    let config = {
      method : "post",
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/store/create",
      headers: { 'Authorization' : 'Bearer '+authToken },
      data : {
        struct : "store",
        data : {
          storeName : payload.storeName,
          noId : payload.noId,
          phone : payload.phone,
          address : payload.address,
          socialNetworks : payload.socialNetworks
        }
      }
    }
    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    })
  });
}

let toExport = {
  fetchStoresByUser,
  createNewStore,
  updateNewStore
}

export default toExport;