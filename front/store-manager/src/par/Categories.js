import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;

let fetchCategories = (idStore)=>{
  return new Promise((resolve, reject)=>{
    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/category/get/store",
      params : {
        idStore : idStore
      }
    }
  
    axios(config).then((resp)=>{
      if(resp.data.result==="OK"){
        let data = resp.data.data;
        let opt = [];
        for(let i=0; i<data.length; i++){
          let item = {
            value : data[i].ID_CATEGORY,
            label : data[i].CATEGORY_NAME
          }
          opt.push(item);
        }
        resolve(opt);
        /*
        this.setState({
          parentsOptions : opt
        });
        */
      } else{
        reject(resp);
      }
    }).catch((err)=>{
      console.log("Error fetching categories");
      reject(err);
    });
  });
}

let fetchCategoriesParent = (idStore)=>{
  return new Promise((resolve, reject)=>{
    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/category/get/store",
      params : {
        idStore : idStore
      }
    }
  
    axios(config).then((resp)=>{
      if(resp.data.result==="OK"){
        let data = resp.data.data;
        let opt = [];
        for(let i=0; i<data.length; i++){
          if(data[i].ID_CATEGORY_PARENT){
            if(skeepParent(data, data[i].ID_CATEGORY_PARENT)){
              continue;
            }
          }
          let item = {
            value : data[i].ID_CATEGORY,
            label : data[i].CATEGORY_NAME
          }
          opt.push(item);
        }
        resolve(opt);
        /*
        this.setState({
          parentsOptions : opt
        });
        */
      } else{
        reject(resp);
      }
    }).catch((err)=>{
      console.log("Error fetching categories");
      reject(err);
    });
  });
}

let skeepParent = (data, parent) => {
  for(let i=0; i<data.length; i++){
    if(data[i].ID_CATEGORY===parent){
      if(data[i].ID_CATEGORY_PARENT){
        return true;
      } else{
        return false;
      }
    }
  }
}

let toExpor = {
  fetchCategories,
  fetchCategoriesParent
}

export default toExpor;