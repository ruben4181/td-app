import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

class Suppliers extends React.Component{
  render(){
    return(
      <div className="container-fluid p-0">
        <Navbar/>
        <div className="container body-container">
          <div className="row">
            <div className="col-12 col-lg-6">
              <h1 className="title-primary-text">Proveedores</h1>
            </div>
            <div className="col-12 col-lg-6">
              <div className="d-flex flex-row w-100 justify-content-end pt-2">
                <button className="btn btn-dark me-3">Agregar proveedor</button>
                <button className="btn btn-danger">Agregar factura</button>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default function ViewFunc(props) {
  const navigation = useNavigate();
  const params = useParams();
  return <Suppliers navigation={navigation} params = {params}/>;
}