import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;

let addSupplier = (authToken, payload) => {
    return new Promise((resolve, reject) => {
      payload.idStore = parseInt(payload.idStore);
      
      let config = {
        url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/suppliers/create",
        headers: { 'Authorization' : 'Bearer '+authToken },
        method : "post",
        data : {
          struct : "supplier",
          data : payload
        }
      }

      axios(config).then((resp) => {
        resolve(resp.data);
      }).catch((err) => {
        console.log(err);
        reject(err);
      });
    });
}

let updateSupplier = (authToken, payload) => {
  return new Promise((resolve, reject) => {
    payload.idStore = parseInt(payload.idStore);
    payload.idSupplier = parseInt(payload.idSupplier);

    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/suppliers/update",
      headers: { 'Authorization' : 'Bearer '+authToken },
      method : "post",
      data : {
        struct : "supplier",
        data : payload
      }
    }

    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    });
  });
}

let deleteSupplier = (authToken, idStore, idSupplier) => {
  return new Promise((resolve, reject) => {
    idStore = parseInt(idStore);
    idSupplier = parseInt(idSupplier);

    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/suppliers/delete",
      headers: { 'Authorization' : 'Bearer '+authToken },
      method : "post",
      data : {
        struct : "supplier",
        data : {
          idStore,
          idSupplier
        }
      }
    }
    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    });
  });
}

let getSuppliers = (authToken, idStore, query, page) => {
  return new Promise((resolve, reject) => {
    idStore = parseInt(idStore);

    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/suppliers/get/store",
      headers: { 'Authorization' : 'Bearer '+authToken },
      method : "get",
      params : {
        idStore,
        query,
        page
      }
    }

    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    });
  });
}

let getSupplier = (authToken, idStore, idSupplier) => {
  return new Promise((resolve, reject) => {
    idStore = parseInt(idStore);
    idSupplier = parseInt(idSupplier);

    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/suppliers/get",
      headers: { 'Authorization' : 'Bearer '+authToken },
      method : "get",
      params : {
        idStore,
        idSupplier
      }
    }

    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    });
  });
}

let toExport = {
  addSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliers,
  getSupplier
}

export default toExport;