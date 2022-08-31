import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;

let delProductFromBill = (authToken, idBill, idBillDetail) => {
  return new Promise((resolve, reject) => {
    idBill = parseInt(idBill);
    idBillDetail = parseInt(idBillDetail);

    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/bill/product/delete",
      headers: { 'Authorization' : 'Bearer '+authToken },
      method : "post",
      data : {
        struct : "bill",
        data : {
          idBill,
          idBillDetail
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

let addProductToBill = (authToken, idBill, product) => {
  return new Promise((resolve, reject) => {
    let idProduct = parseInt(product.idProduct);
    let units = parseInt(product.units);
    let off = parseInt(product.off);
    console.log("Enviando off:", off);
    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/bill/product/add",
      headers: { 'Authorization' : 'Bearer '+authToken },
      method : "post",
      data : {
        struct : "bill",
        data : {
          idBill,
          idProduct,
          units,
          off
        }
      }
    }
    axios(config).then((resp)=>{
      resolve(resp.data);
    }).catch((err)=>{
      console.log(err);
      reject(err);
    });
  });
}

let createBill = (authToken, idStore, customerId, customerName, customerPhone, customerAddress) => {
  return new Promise((resolve, reject)=>{
    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/bill/create",
      headers: { 'Authorization' : 'Bearer '+authToken },
      method : "post",
      data : {
        struct : "bill",
        data : {
          idStore,
          customerId,
          customerName,
          customerPhone,
          customerAddress
        }
      }
    }
    axios(config).then((resp)=>{
      resolve(resp.data);
    }).catch((err)=>{
      console.log(err);
      reject(err);
    })
  });
}

function PromiseQueue(tasks = [], concurrentCount = 1) {
  this.total = tasks.length;
  this.todo = tasks;
  this.running = [];
  this.complete = [];
  this.count = concurrentCount;
 }

PromiseQueue.prototype.runNext = function(){
  return ((this.running.length < this.count) && this.todo.length);
}

PromiseQueue.prototype.run = function () {
  while (this.runNext()) {
    const promise = this.todo.shift();
    promise.then((resp) => {
      console.log(resp);
      this.complete.push(this.running.shift());
      this.run();
    });
    this.running.push(promise);
  }
}

PromiseQueue.prototype.then = function(){
  if (!this.runNext()){
    
  }
}

let saveProducts = (authToken, idBill, products)=>{
  const len = products.length;
  return new Promise((resolve, reject)=>{
    const promises = [];
    for(let i=0; i<len; i++){
      promises.push({
        authToken,
        idBill,
        product : products[i]
      });
    }
    enqueAddProducts(promises);
    resolve({
      result : "OK",
      message : "Productos agregados correctamente"
    });
  });
}

let enqueAddProducts = (props) => {
  if(props.length>0){
    let current = props.pop();
    addProductToBill(current.authToken, current.idBill, current.product).then((resp)=>{
      enqueAddProducts(props);
    });
  }
}

let updateProductFromBill = (authToken, product) => {
  return new Promise((resolve, reject) => {
    let idBill = product.idBill;
    let idBillDetail = product.idBillDetail;
    let units = parseInt(product.units);
    let description = product.description;
    let off = parseInt(product.off);

    let config = {
      method : "POST",
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/bill/product/update",
      headers: { 'Authorization' : 'Bearer '+authToken },
      data : {
        struct : "bill",
        data : {
          idBill,
          idBillDetail,
          units,
          description,
          off
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

let updateBillStatus = (authToken, idBill, idStatus) => {
  return new Promise((resolve, reject) => {
    let config = {
      method : "POST",
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/bill/status/update",
      headers: { 'Authorization' : 'Bearer '+authToken },
      data : {
        struct : "bill",
        data : {
          idBill,
          idStatus
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

let saveBill = (authToken, customerInfo, products, status)=>{
  return new Promise((resolve, reject)=>{
    let idStore = customerInfo.idStore;
    let customerId = customerInfo.customerId;
    let customerName = customerInfo.customerName;
    let customerPhone = customerInfo.customerPhone;
    let customerAddress = customerInfo.customerAddress;
    createBill(authToken, idStore, customerId, customerName, customerPhone, customerAddress).then((resp)=>{
      if(resp.result==="OK"){
        let idBill = resp.data.idBill;
        let code = resp.data.code;
        saveProducts(authToken, idBill, products).then((resp)=>{
          if(resp.result==="OK"){
            if(status!==9){
              updateBillStatus(authToken, idBill, status).then((resp) => {
                console.log(resp.data);
                if(resp.result==="OK"){
                  resolve({
                    result : "OK",
                    message : "Orden No. "+code+" creada correctamente"
                  });
                }
              }).catch((err)=>{
                console.log("Error al guardar el estado de la factura");
                reject(err);
              });
            } else{
              resolve({
                result : "OK",
                message : "Cuenta abierta No. "+code+" creada correctamente"
              });
            }
          }
        }).catch((err)=>{
          console.log("Error while saving bill - products", err);
          reject(err);
        })
      } else{
        resolve({
          resut : "FAIL",
          message : "Error al crear orden"
        });
      }
    }).catch((err)=>{
      console.log("Error while saving bill", err);
      reject(err);
    });
  });
}

let getBills = (authToken, idStore, page, query, starts, ends) => {
  return new Promise((resolve, reject) => {
    let config = {
      method : "GET",
      headers: { 'Authorization' : 'Bearer '+authToken },
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/bill/get/store",
      params : {
        idStore,
        page,
        query,
        starts, 
        ends
      }
    }
    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    })
  });
}

let getOpenedBills = (authToken, idStore, page) => {
  return new Promise((resolve, reject) => {
    let config = {
      method : "GET",
      headers: { 'Authorization' : 'Bearer '+authToken },
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/bill/get/open",
      params : {
        idStore,
        page
      }
    }
    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    })
  });
}

let getBillDetail = (authToken, idStore, idBill) => {
  return new Promise((resolve, reject) =>{
    let config = {
      method : "GET",
      headers: { 'Authorization' : 'Bearer '+authToken },
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/bill/detail/get",
      params : {
        idStore,
        idBill
      }
    }
    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    });
  });
}

let getBill = (authToken, idStore, idBill) => {
  return new Promise((resolve, reject) => {
    let config = {
      method : "get",
      headers : { 'Authorization' : 'Bearer '+authToken },
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/bill/get",
      params : {
        idStore,
        idBill
      }
    }
    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    }); 
  });
}

let getParTipoPago = (authToken) => {
  return new Promise((resolve, reject) => {
    let config = {
      method : "get",
      headers : { 'Authorization' : 'Bearer '+authToken },
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/bill/par/tipo_pago"
    }
    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    }); 
  });
}

let toCurrency = (price) => {
  if(price){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } 
  return '0'
}

let toExport = {
  saveBill,
  getBills,
  toCurrency,
  addProductToBill,
  getOpenedBills,
  getBillDetail,
  updateProductFromBill,
  delProductFromBill,
  updateBillStatus,
  getBill,
  getParTipoPago
}

export default toExport;