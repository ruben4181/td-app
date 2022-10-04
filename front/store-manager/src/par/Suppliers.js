import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;

let createSupplierBill = (authToken, billPayload, products) => {
  return new Promise((resolve, reject) => {
    addSupplierBill(authToken, billPayload).then((resp) => {
      if(resp.result === "OK") {
        let idBill = resp.idBill;
        let promises = [];
        for(let i=0; i<products.length; i++){
          let p = products[i];
          promises.push({
            idStore : billPayload.idStore,
            idBill,
            refPago : billPayload.refPago,
            idProduct : p.idProduct,
            units : p.units
          });
        }

        enqueAddProducts(authToken, promises, billPayload.idStore);
        resolve({
          result : "OK",
          message : resp.message
        });
      }
    }).catch((err) => {
      reject(err);
    });
  });
}

let enqueAddProducts = (authToken, props, idStore) => {
  if(props.length > 0) {
    let current = props.pop();
    addSupplierProductToBill(authToken, current, idStore).then((resp) => {
      enqueAddProducts(authToken, props);
    }).catch((err) => {
      console.log(err);
    });
  }
}

let addSupplierProductToBill = (authToken, product, idStore) => {
  return new Promise((resolve, reject) => {
    let p = parseProduct(product, idStore);
    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/suppliers/bill/product/add",
        headers: { 'Authorization' : 'Bearer '+ authToken },
        method : "post",
        data : {
          struct : "bill",
          data : p
        }
    }

    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    });
  });
}

let parseProduct = (p, idStore) => {
  let product = {
    idProduct : p.ID_PRODUCT || p.idProduct,
    productName : p.PRODUCT_NAME || p.productName,
    productLine : p.PRODUCT_LINE || p.productLine,
    productDescription : p.PRODUCT_DESCRIPTION || p.productDescription,
    productBrand : p.PRODUCT_BRAND || p.productBrand,
    productQuantity : p.PRODUCT_QUANTITY || p.productQuantity,
    productPrice : p.PRODUCT_PRICE || p.productPrice,
    productCost : p.PRODUCT_COST || p.productCost,
    productStock : p.PRODUCT_STOCK || p.productStock,
    stockAlert : p.STOCK_ALERT || p.stockAlert,
    productOff : p.PRODUCT_OFF || p.productOff,
    productCode : p.PRODUCT_CODE || p.productCode,
    idStore : p.ID_STORE || p.idStore || idStore,
    idCategory : p.ID_CATEGORY || p.idCategory,
    mongoId : p.MONGO_ID || p.mongoId,
    active : p.ACTIVE || p.active,
    createdAt : p.CREATED_AT || p.cretedAt,
    updatedAt : p.UPDATED_AT || p.updatedAt,
    idBill : p.ID_BILL || p.idBill,
    units : p.UNITS || p.units
  }
  return product;
}

let addSupplierBill = (authToken, payload) => {
  return new Promise((resolve, reject) => {
    payload.idStore = parseInt(payload.idStore);
    payload.idTipoPago = parseInt(payload.idTipoPago);
    payload.idStatus = parseInt(payload.idStatus);

    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/suppliers/bill/create",
        headers: { 'Authorization' : 'Bearer '+ authToken },
        method : "post",
        data : {
          struct : "bill",
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

let addSupplier = (authToken, payload) => {
    return new Promise((resolve, reject) => {
      payload.idStore = parseInt(payload.idStore);
      
      let config = {
        url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/suppliers/create",
        headers: { 'Authorization' : 'Bearer '+ authToken },
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
      headers: { 'Authorization' : 'Bearer '+ authToken },
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
      headers: { 'Authorization' : 'Bearer '+ authToken },
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
      headers: { 'Authorization' : 'Bearer '+ authToken },
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

let getSuppliersAll = (authToken, idStore, query) => {
  return new Promise((resolve, reject) => {
    idStore = parseInt(idStore);

    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/suppliers/get/all",
      headers: { 'Authorization' : 'Bearer '+ authToken },
      method : "get",
      params : {
        idStore,
        query
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
      headers: { 'Authorization' : 'Bearer '+ authToken },
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

let getBills = (authToken, payload) => {
  return new Promise((resolve, reject) => {
    console.log("GET Payload", payload);
    payload.idStore = parseInt(payload.idStore);
    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/suppliers/bill/costs/get",
      headers: { 'Authorization' : 'Bearer '+ authToken },
      method : "get",
      params : payload
    }

    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    });
  }).catch((err) => {
    
  });
}

let toExport = {
  addSupplier,
  updateSupplier,
  deleteSupplier,
  getSuppliers,
  getSupplier,
  getSuppliersAll,
  createSupplierBill,
  addSupplierProductToBill,
  addSupplierBill,
  getBills
}

export default toExport;