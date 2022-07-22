require('dotenv').config({path:'.env'});

const services = require(process.env.DIR_PATH+"/database/suppliers/suppliers");

createSupplier = (payload) => {
  if(payload){
    return services.createSupplier(payload);
  } else{
    return emptyData();
  }
}

updateSupplier = (payload) => {
  if(payload){
    return services.updateSupplier(payload);
  } else{
    return emptyData();
  }
}

deleteSupplier = (idStore, idSupplier) => {
  if(idStore && idSupplier){
    return services.deleteSupplier(idStore, idSupplier);
  } else{
    return emptyData();
  }
}

createSupplierBill = (payload) => {
  if(payload){
    return services.createSupplierBill(payload);
  } else{
    return emptyData();
  }
}

addProductToBill = (payload) => {
  if(payload){
    return services.addProductToBill(payload);
  } else{
    return emptyData();
  }
}

updateProductFromBill = (payload) => {
  if(payload){
    return services.updateProductFromBill(payload);
  } else{
    return emptyData();
  }
}

deleteProductFromBill = (payload) => {
  if(payload){
    return services.deleteProductFromBill(payload);
  } else{
    return emptyData();
  }
}

emptyData = () => {
  return new Promise((resolve, reject) => {
    resolve({
      result : constants.ERROR,
      message : "EMPTY DATA"
    });
  });  
}

module.exports = {
  createSupplier,
  updateSupplier,
  deleteSupplier,
  createSupplierBill,
  addProductToBill,
  updateProductFromBill,
  deleteProductFromBill
}