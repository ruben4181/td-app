
import React from "react";
import Navbar from "../components/Navbar";
import '../css/commons.css';
import axios from "axios";
import BasicDialog from "../components/BasicDialog";
import { useNavigate, Navigate } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;
const PORT = process.env.REACT_APP_SERVER_PORT;

class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      openLoginDialog : false,
      userName : "",
      password : "",
      dialogConfig : {actions:[]},
      showDialog : false,
      authToken : localStorage.getItem("authToken")
    }
    this.updateField = this.updateField.bind(this);
    this.onLoginClicked = this.onLoginClicked.bind(this);
    this.onCloseDialog = this.onCloseDialog.bind(this);
    this.login = this.login.bind(this);
  }
  render(){
    return(
      <div className="container-fluid">
        {/*Si se debe redireccionar porque el usuario ya está loggeado*/}
        {this.state.authToken && <Navigate replace to="/stores" />}
        <BasicDialog isOpen={this.state.showDialog} onClose={this.onCloseDialog}
        config={this.state.dialogConfig}/>
        <Navbar options={{right : "no-display"}}/>
        <div className="container">
          <div className="row full-screen-height">
            <div className="col-12">
              <div className="d-flex flex-column justify-content-center h-100">
                <div className="d-flex flex-row w-100">
                  <div className="d-flex flex-column w-100">
                    <div className="d-flex flex-column text-center">
                      <h1 className="title-primary-text text-center">Iniciar sesión</h1>
                      <p>¿No tienes cuenta aún? <a href="/signup">Registrate</a></p>
                    </div>
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control" placeholder="name@example.com"
                          onChange={(e)=>{this.updateField("userName", e.target.value)}}
                          />
                          <label>Nombre de usuario</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control" placeholder="your password here"
                          onChange={(e)=>{this.updateField("password", e.target.value)}}
                          />
                          <label>Contraseña</label>
                        </div>
                        <div className="mb-3 text-center">
                          <button className="btn btn-primary w-100 " onClick={this.onLoginClicked}>Iniciar sesión</button>
                        </div>
                      </div>  
                      <div className="col-12 col-lg-6">
                        <div className="mb-3 text-center bg-light btn w-100">
                          <div className="btn btn-light btn-labeled">
                            <div className="d-flex flex-row">
                              <div className="btn-icon">
                                <i className="fa-brands fa-google"></i>    
                              </div>  
                              <div className="btn-label">
                                Continuar con Google
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3 text-center bg-light btn w-100">
                          <div className="btn btn-light btn-labeled ">
                            <div className="d-flex flex-row ">
                              <div className="btn-icon">
                                <i className="fa-brands fa-facebook-f"></i>    
                              </div>  
                              <div className="btn-label">
                                Continuar con Facebook
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mb-3 text-center bg-light btn w-100">
                          <div className="btn btn-light btn-labeled">
                            <div className="d-flex flex-row">
                              <div className="btn-icon">
                                <i className="fa-brands fa-apple"></i>    
                              </div>  
                              <div className="btn-label">
                                Continuar con Apple
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex flex-column justify-content-center align-items-content">
                <p className="text-center">Al iniciar sesión, aceptas nuestros Términos de uso</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  onLoginClicked(e){
    e.preventDefault();
    if(this.state.userName==="" || this.state.password===""){
      let dConfig = {
        title : "Completa el formulario",
        body : "El campo usuario o contraseña están vacios",
        actions : [
          {
            label : "Ok",
            func : this.onCloseDialog
          }
        ]
      }
      this.setState({
        showDialog : true,
        dialogConfig : dConfig
      });
    } else{
      this.login();
    }
  }
  login(){
    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/login",
      method : "post",
      data : {
        username : this.state.userName,
        password : this.state.password
      }
    }
    axios(config).then((resp)=>{
      if(resp.data.result==="OK"){
        localStorage.setItem('authToken', resp.data.token);
        this.props.navigation('/stores');
      } else{
        let dConfig = {
          title : "Inicio de sesión",
          body : resp.data.message,
          actions : [
            {
              label : "Ok",
              func : this.onCloseDialog
            }
          ] 
        }
        this.setState({showDialog : true, dialogConfig : dConfig});
      }
    }).catch((err)=>{
      console.log(err);
      let dConfig = {
        title : "Opps",
        body : "Al parecer tenemos problemas técnicos, por favor intenta más tarde",
        actions : [
          {
            label : "Ok",
            func : this.onCloseDialog
          }
        ]
      }
      this.setState({showDialog : true, dialogConfig : dConfig});
    });
  }
  updateField(target, value){
    let tmp = {};
    tmp[target] = value;
    this.setState(tmp);
  }
  onCloseDialog(){
    this.setState({
      showDialog : false
    });
  }
}

export default function LoginFunc(props) {
  const navigation = useNavigate();
  
  return <Login navigation={navigation} />;
}