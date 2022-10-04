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

let parseCategories = (data) => {
  let items = [];
  for(let i=0; i<data.length; i++){
    items.push({
      value : data[i].ID_COST_CATEGORY,
      label : data[i].DESCRIPTION
    });
  }

  return items;
}

let parseStatus = (data) => {
  let items = [];
  for(let i=0; i<data.length; i++){
    items.push({
      value : data[i].ID_STATUS,
      label : data[i].DESCRIPTION
    });
  }

  return items;
}

let getCosts = (authToken, payload) => {
  if(payload.idStore){
    payload.idStore = parseInt(payload.idStore);
  }
  return new Promise((resolve, reject) => {
    let config = {
      method : "get",
      headers : { 'Authorization' : 'Bearer '+authToken },
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/costs/get",
      params : payload
    }

    axios(config).then((resp) => {
      resolve(resp.data);
    }).catch((err) => {
      reject(err);
    })
  });
}

let getCost = (authToken, idStore, idCost) => {
  if(idStore){
    idStore = parseInt(idStore);
    idCost = parseInt(idCost);
  }

  return new Promise((resolve, reject) => {
    let config = {
      method : "get",
      headers : { 'Authorization' : 'Bearer '+authToken },
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/costs/get/cost",
      params : {
        idStore,
        idCost
      }
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

let updateCost = (authToken, payload) => {
  return new Promise((resolve, reject) => {
    let config = {
      method : "post",
      headers : { 'Authorization' : 'Bearer '+authToken },
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/costs/update",
      data : {
        struct : "costs",
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

let delCost = (authToken, idStore, idCost) => {
  return new Promise((resolve, reject) => {
    let config = {
      method : "post",
      headers : { 'Authorization' : 'Bearer '+authToken },
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/costs/delete",
      data : {
        struct : "costs",
        data : {
          idStore,
          idCost
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

let toExport = {
  getStatus,
  getCategories,
  addCost,
  getCosts,
  getCost,
  parseCategories,
  parseStatus,
  updateCost,
  delCost
}

export default toExport;