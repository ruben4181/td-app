import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;

let fetchProducts = (idStore, page, stockAlert) => {
  return new Promise((resolve, reject)=>{
    let config = {
      method : "get",
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/product/get/store",
      params : {
        idStore,
        page,
        stockAlert
      }
    }
    axios(config).then((resp)=>{
      resolve(resp.data);
    }).catch((err)=>{
      reject(err);
    })
  });
}

let fetchProductsByCategory = (idStore, idCategory, page, stockAlert) => {
  return new Promise((resolve, reject)=>{
    let config = {
      method : "get",
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/product/get/category",
      params : {
        idStore,
        idCategory,
        page,
        stockAlert
      }
    }
    axios(config).then((resp)=>{
      resolve(resp.data);
    }).catch((err)=>{
      reject(err);
    })
  });
}

let findProducts = (idStore, idCategory, q, stockAlert) => {
  return new Promise((resolve, reject)=>{
    let config = {
      method : "get",
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/product/search",
      params : {
        idStore,
        idCategory,
        q,
        stockAlert
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

let fetchProduct = (idProduct) => {
  return new Promise((resolve, reject) => {
    let config = {
      method : "get",
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/product/get",
      params : {
        idProduct
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

let updateProduct = (authToken, product) => {
  return new Promise((resolve, reject) => {
    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/product/update",
      method : "post",
      data : {
        struct : "product",
        data : product
      },
      headers: { 'Authorization' : 'Bearer '+authToken }
    }
    console.log(config);
    axios(config).then((resp)=>{
      resolve(resp.data);
    }).catch((err)=>{
      console.log(err);
      reject(err);
    })
  });
}

let toCurrency = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

let toExport = {
  fetchProducts,
  fetchProductsByCategory,
  findProducts,
  fetchProduct,
  updateProduct,
  toCurrency
}

export default toExport;