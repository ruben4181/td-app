import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;
const FETCH_ROLES_PATH = "/api/v1/user/roles";

let fetchRoles = (authToken, idStore)=>{
  return new Promise((resolve, reject)=>{
    if(authToken){
      let url = PROTOCOL+"://"+BASE_URL+":"+PORT+FETCH_ROLES_PATH;
      let config = {
        url,
        method : "get",
        headers : {'Authorization' : 'Bearer '+authToken},
        params : {
          idStore
        }
      }
      axios(config).then((resp)=>{
        let data = resp.data.data;
        resolve(data);
      }).catch((err)=>{
        reject(err);
      });
    }
  });
}

let checkRoles = (roles, allowedIn)=>{
  for(let i=0; i<roles.length; i++){
    if(allowedIn.includes(roles[i].ROLE_NAME)){
      return true;
    }
  }
  return false;
}

export default {
  balanceAllowed : ["site_owner", "contability", "sales_chief"],
  inventoryAllowed : ["site_owner", "inventory_chief", "inventory_manager"],
  deliveryAllowed : ["site_owner"],
  billingAllowed :["site_owner", "sales"],
  staffAllowed :["site_owner"],
  webAllowed :["site_owner"],
  billsManagement : ["site_owner", "contability"],
  checkRoles,
  fetchRoles
}