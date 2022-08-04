import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CreateSupplier from "../components/CreateSupplier";
import SuppliersServices from "../par/Suppliers";
import "../css/commons.css";

class Suppliers extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authToken : localStorage.getItem("authToken"),
      idStore : props.params.idStore,
      suppliersQuery : "",
      suppliers : [],
      suppliersPage : 1
    }
    this.addSupplierClicked = this.addSupplierClicked.bind(this);
    this.onCloseAddSupplier = this.onCloseAddSupplier.bind(this);
    this.fetchSuppliers = this.fetchSuppliers.bind(this);
    this.renderSuppliers = this.renderSuppliers.bind(this);
  }

  componentDidMount(){
    this.fetchSuppliers();
  }

  render(){
    return(
      <div className="container-fluid p-0">
        <Navbar idStore={this.state.idStore}/>
        <div className="container body-container">
          <div className="row">
            <div className="col-12 col-lg-6">
              <h1 className="title-primary-text">Gastos y proveedores</h1>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-row w-100 justify-content-end pt-2">
                <button className="btn btn-dark me-3" onClick={()=>{this.addSupplierClicked()}}>Agregar proveedor</button>
                <button className="btn btn-danger">Agregar gasto</button>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 col-lg-4 mb-3">
              <h3>Proveedores</h3>
            </div>
            <div className="col-12 col-lg-8 mb-3">
              <input type="text" className="form-control" placeholder="Buscar proveedor"/>
            </div>
            <div className="col-12">
              <div className="row">
                {this.renderSuppliers()}
              </div>
            </div>
          </div>
        </div>
        <Footer/>
        {
          this.state.addProveedorShow
          ?
          <CreateSupplier idStore={this.state.idStore} isOpen={this.state.addProveedorShow}
          onClose={this.onCloseAddSupplier}/>
          :
          <>
          </> 
        }
      </div>
    )
  }

  renderSuppliers(){
    const {suppliers} = this.state;
    const items = [];

    for(let i=0; i<suppliers.length; i++){
      let supplier = suppliers[i];
      items.push(
        <div className="col-12 col-md-6 col-xxl-3 mb-3">
          <div className="card m-1 h-100 bg-light">
            <div className="card-body">
              <div className="d-flex flex-row h-100 align-items-center">
                <div className="card-text">
                  <div className="d-flex flex-row w-100 align-items-center">
                    <div className="contact-circle me-3">
                      {this.getContactLetters(supplier.SUPPLIER_NAME)}
                    </div>
                    <div className="d-flex flex-column">
                      <span className="">{supplier.SUPPLIER_NAME}</span>
                      <span className="fw-light text-secondary">{supplier.SUPPLIER_PHONE}</span>
                      <span className="fw-light text-secondary">{supplier.SUPPLIER_EMAIL}</span>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )
    }
    return items;
  }

  getContactLetters(text){
    let letters = "";
    let splitted = text.split(" ");
    if(splitted.length>1){
      letters = splitted[0][0] + splitted[splitted.length-1][0];
    } else{
      if(splitted.length>1){
        letters = splitted[0][0]+splitted[1][0];
      } else{
        letters = splitted[0][0]+splitted[0][0];
      }
    }
    return letters.toLocaleUpperCase();
  }

  fetchSuppliers(){
    let {idStore, query, page, authToken} = this.state;

    if(query && query === ""){
      query = undefined;
    }

    SuppliersServices.getSuppliers(authToken, idStore, query, page).then((resp) => {
      this.setState({
        suppliers : resp.data
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  addSupplierClicked(){
    this.setState({
      addProveedorShow : true
    });
  }
  onCloseAddSupplier(){
    this.setState({
      addProveedorShow : false
    });
  }
}

export default function ViewFunc(props) {
  const navigation = useNavigate();
  const params = useParams();
  return <Suppliers navigation={navigation} params = {params}/>;
}