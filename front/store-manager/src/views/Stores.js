import React from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";
import axios from "axios";
import BasicDialog from "../components/BasicDialog";
import CreateStoreDialog from "../components/CreateStoreDialog";
import Store from '../par/Store';

import Footer from "../components/Footer";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;
const FETCH_ROLES_PATH = "/api/v1/user/roles";

class Stores extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authToken : localStorage.getItem("authToken"),
      stores : [],
      showCreateNewStore : false
    }
    this.fetchRoles = this.fetchRoles.bind(this);
    this.renderAdminTools = this.renderAdminTools.bind(this);
    this.fetchRoles = this.fetchStores.bind(this);
    this.renderStores =this.renderStores.bind(this);
  }

  fetchRoles(){
    if(this.state.authToken){
      let url = PROTOCOL+"://"+BASE_URL+":"+PORT+FETCH_ROLES_PATH;
      let config = {
        url,
        method : "get",
        headers : {'Authorization' : 'Bearer '+this.state.authToken}
      }
      axios(config).then((resp)=>{
        let data = resp.data.data;
        for(let i=0; i<data.length; i++){
          let roles = this.state.roles || {};
          roles[data[i].ROLE_NAME] = true;
          this.setState({roles}, ()=>{console.log("roles: ", roles)});
        }
      }).catch((err)=>{
        console.log("Error", err);
      });
    }
  }

  fetchStores(){

    if(this.state.authToken){
      Store.fetchStoresByUser(this.state.authToken).then((resp) => {
        let stores = resp.data;
        this.setState({stores});
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  componentDidMount(){
    this.fetchRoles();
  }

  render(){
    return(
      <>
      {!this.state.authToken?
      <BasicDialog isOpen={true} config={{
          title : "No has iniciado sesión",
          body : "Por favor, inicia sesión e ingresa nuevamente a esta página",
          actions : [
            {
              label : "Ok",
              func : ()=>{this.props.navigation("/login")}
            }
          ]
        }}/>
      :<>
        <div className="container-fluid p-0">
          <CreateStoreDialog isOpen={this.state.showCreateNewStore} config={{title : "Nueva tienda"}} 
            closeFunc = {()=>{this.onCreateNewStoreClose()}}/>
          <Navbar/>
          <div className="container body-container">
            {this.renderAdminTools()}
            <div className="row mt-3 mb-3">
              <div className="col-12 col-lg-10">
                <h1 className="title-primary-text">Tiendas</h1>
              </div>
              <div className="col-12 col-lg-2">
                <div className="d-flex flex-row justify-content-center mb-3 w-100 h-100 align-items-start">
                  <button className="btn btn-primary" onClick={()=>{
                    this.setState({showCreateNewStore : true});
                  }}>
                    Nueva tienda
                  </button>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              {this.renderStores()}
            </div>
          </div>
          <Footer/>
        </div>
      </>}
      </>
      
    );
  }

  onCreateNewStoreClose(){
    this.setState({showCreateNewStore : false});
    this.fetchStores();
  }

  renderAdminTools(){
    if(this.state.roles){
      return(
      <div className="row">
        
      </div>);
    } else{
      return <></>;
    }
  }
  renderStores(){
    const {stores} = this.state;

    const items = [];
    for(let i=0; i<stores.length; i++){
      let creada = new Date(stores[i].CREATED_AT);
      items.push(
      <div className="col-12 col-lg-6 mb-3" style={{cursor : "pointer"}} key={"stores-"+i}>
        <div className="card p-3 text-decoration-none" onClick={()=>{this.props.navigation("/store/"+stores[i].ID_STORE)}}>
          <h5 className="card-title">{stores[i].STORE_NAME}</h5>
          <a href={PROTOCOL+"://"+stores[i].URL} target="_blank" style={{width:"fit-content"}} rel="noreferrer" onClick={(e)=>{e.stopPropagation();}}>{stores[i].URL}</a>
          <span className="text-muted">Creada: {creada.toDateString()}</span>
        </div>
      </div>
      );
    }
    return items;
  }
}

export default function SignupFunc(props) {
  const navigation = useNavigate();

  return <Stores navigation={navigation} />;
}