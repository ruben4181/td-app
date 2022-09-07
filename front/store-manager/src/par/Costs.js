import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;

let getStatus = (authToken) => {
  return new Promise((resolve, reject) => {
    let config = {
      method : "get",
      headers : { 'Authorization' : 'Bearer '+authToken },
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/costs/status/get"
    }

    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    })
  });
}

let getCategories = (authToken) => {
  return new Promise((resolve, reject) => {
    let config = {
      method : "get",
      headers : { 'Authorization' : 'Bearer '+authToken },
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/costs/categories/get"
    }

    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    })
  });
}

let addCost = (authToken, payload) => {
  return new Promise((resolve, reject) => {
    let config = {
      method : "post",
      headers : { 'Authorization' : 'Bearer '+authToken },
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/costs/add",
      data : {
        struct : "costs",
        data : payload
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
  getStatus,
  getCategories,
  addCost
}

export default toExport;