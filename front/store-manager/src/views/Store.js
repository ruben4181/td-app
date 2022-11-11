import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import BasicDialog from "../components/BasicDialog";
import axios from "axios";
import "../css/store.css";
import Roles from "../par/Roles";
import Footer from "../components/Footer";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;

const FETCH_STORES_PATH = "/api/v1/store/get/user";



class Store extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      params : props.params,
      idStore : props.params.idStore,
      authToken : localStorage.getItem("authToken"),
      roles : [],
      store : {ID_STORE : 'null'},
      storeFetched : false
    }
    this.fetchStores = this.fetchStores.bind(this);
    this.checkStore = this.checkStore.bind(this);
  }
  componentDidMount(){
    this.fetchStores();
    Roles.fetchRoles(this.state.authToken, this.state.idStore).then((resp)=>{
      this.setState({roles : resp});
    }).catch((err)=>{
      console.log("Error while fetching roles", err);
    });
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
        }}/>:
          <div className="container-fluid bg-light p-0">
            {
              !this.checkStore()?
              <div>
              <BasicDialog isOpen={true} config={{
                title : "Usuario no valido",
                body : "Lo sentimos, pero tu usuario no tiene permiso para ver esta pagina",
                actions : [
                  {
                    label : "Ok",
                    func : ()=>{this.props.navigation("/login")}
                  }
                ]
              }}/>
              </div>
              :
              <div>
                <Navbar idStore={this.state.idStore}/>
                <div className="container body-container">
                  <div className="row">
                    <div className="col-12">
                      <h1 className="title-primary-text">{this.state.store.STORE_NAME}</h1>
                    </div>
                    {
                      Roles.checkRoles(this.state.roles, Roles.balanceAllowed)
                      ?
                      <div className="col-12 col-lg-4 mb-3">
                          <div className="card h-100 p-3">
                            <img src="/vectors/balance.svg" className="card-img-top" alt="Balance"/>
                            <div className="card-body">
                              <div className="card-title card-title-store">Balance</div>
                              <span className="card-text">Reporte de ventas, costos, utilidades y más</span>
                            </div>
                          </div>
                        </div>
                        :
                        <></>
                    }

                    {
                      Roles.checkRoles(this.state.roles, Roles.billingAllowed)
                      ?
                      <div className="col-12 col-lg-4 mb-3">
                        <div className="card h-100 p-3" onClick={()=>{this.props.navigation("/pos/"+this.state.idStore)}}>
                          <img src="/vectors/billing.svg" className="card-img-top" alt="Balance"/>
                          <div className="card-body">
                            <div className="card-title card-title-store">Punto de venta</div>
                            <span className="card-text">Revisa y crea facturas, cuentas abiertas y creditos</span>
                          </div>
                        </div>
                      </div>
                      :
                      <></>
                    }

                    {
                      Roles.checkRoles(this.state.roles, Roles.inventoryAllowed)
                      ?
                      <div className="col-12 col-lg-4 mb-3">
                        <div className="card h-100 p-3" onClick={()=>{this.props.navigation("/inventory/"+this.state.idStore+"/1")}}>
                          <img src="/vectors/inventory.svg" className="card-img-top" alt="Balance"/>
                          <div className="card-body">
                            <div className="card-title card-title-store">Inventario</div>
                            <span className="card-text">Agrega, actualiza o elimina productos de tu inventario</span>
                          </div>
                        </div>
                      </div>
                      :
                      <></>
                    }

                    {
                      Roles.checkRoles(this.state.roles, Roles.billingAllowed)
                      ?
                      <div className="col-12 col-lg-4 mb-3">
                        <div className="card h-100 p-3" onClick={()=>{this.props.navigation("/suppliers/"+this.state.idStore)}}>
                          <img src="/vectors/suppliers.svg" className="card-img-top" alt="Balance"/>
                          <div className="card-body">
                            <div className="card-title card-title-store">Gastos y proveedores</div>
                            <span className="card-text">Lleva las cuentas de tu negocio</span>
                          </div>
                        </div>
                      </div>
                      :
                      <></>
                    }

                    {
                      Roles.checkRoles(this.state.roles, Roles.deliveryAllowed)
                      ?
                      <div className="col-12 col-lg-4 mb-3">
                        <div className="card h-100 p-3">
                          <img src="/vectors/delivery.svg" className="card-img-top" alt="Balance"/>
                          <div className="card-body">
                            <div className="card-title card-title-store">Pedidos</div>
                            <span className="card-text">Administra los pedidos de tu negocio</span>
                          </div>
                        </div>
                      </div>
                      :
                      <></>
                    }

                    {
                      Roles.checkRoles(this.state.roles, Roles.staffAllowed)
                      ?
                      <div className="col-12 col-lg-4 mb-3">
                        <div className="card h-100 p-3">
                          <img src="/vectors/people.svg" className="card-img-top" alt="Balance"/>
                          <div className="card-body">
                            <div className="card-title card-title-store">Colaboradores</div>
                            <span className="card-text">Gestiona el personal que ayuda este negocio a crecer todos los días</span>
                          </div>
                        </div>
                      </div>
                      :
                      <></>
                    }

                    {
                      Roles.checkRoles(this.state.roles, Roles.webAllowed)
                      ?
                      <div className="col-12 col-lg-4 mb-3">
                        <div className="card h-100 p-3">
                          <img src="/vectors/web.svg" className="card-img-top" alt="Balance"/>
                          <div className="card-body">
                            <div className="card-title card-title-store">Web y App movil</div>
                            <span className="card-text">Diseña, crea y administra tu sitio web y aplicativo movil</span>
                          </div>
                        </div>
                      </div>
                      :
                      <></>
                    }
                  </div>
                </div>
                <Footer/>
              </div>
            }
          </div>
        }
      </>
    );
  }

  checkStore(){
    const {store, storeFetched} = this.state;
    if(storeFetched===true){
      if(this.state.idStore.toString() !== store.ID_STORE.toString()){
        return false;
      }
    }

    return true;
  }

  fetchStores(){
    if(this.state.authToken){
      let url = PROTOCOL+"://"+BASE_URL+":"+PORT+FETCH_STORES_PATH;
      let config = {
        url,
        method : "get",
        headers : {'Authorization' : 'Bearer '+this.state.authToken}
      }
      axios(config).then((resp)=>{
        let stores = resp.data.data;
        for(let i=0; i<stores.length; i++){
          if(stores[i].ID_STORE.toString() === this.state.idStore){
            this.setState({store : stores[i], storeFetched : true});
            break;
          }
        }
        this.setState({storeFetched : true});
      }).catch((err)=>{
        console.log(err);
      })
    }
  }
}

export default function StoreFunc(props) {
  const navigation = useNavigate();
  const params = useParams();
  return <Store navigation={navigation} params = {params}/>;
}
