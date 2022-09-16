require('dotenv').config({path:'.env'});

const services = require(process.env.DIR_PATH+"/database/costs/costs");

addCost = (payload)=> {
  if(payload.idStore && payload.description){
    let idStore = parseInt(payload.idStore);
    
    if(payload.idCostCategory){
      payload.idCostCategory = parseInt(payload.idCostCategory);
    }
    if(payload.ammount) {
      payload.ammount = parseInt(payload.ammount);
    }
    if(payload.idTipoPago){
      payload.idTipoPago = parseInt(payload.idTipoPago);
    }
    if(payload.idStatus){
      payload.idStatus = parseInt(payload.idStatus);
    }

    return services.addCost(payload);
  } else{
    return emptyData();
  }

}

getCategories = () => {
  return services.getCategories();
}

emptyData = () => {
  return new Promise((resolve, reject) => {
    resolve({
      result : constants.ERROR,
      message : "EMPTY DATA"
    });
  });  
}

getStatus = () => {
  return services.getStatus();
}

getCosts = (payload) => {
  if(payload.idStore){
    payload.idStore = parseInt(payload.idStore);

    return services.getCosts(payload);
  } else{
    return emptyData();
  }
}

module.exports = {
  addCost,
  getCategories,
  getStatus,
  getCosts
}