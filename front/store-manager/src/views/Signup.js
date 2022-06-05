import React from "react";
import Navbar from "../components/Navbar";
import '../css/commons.css';
import axios from "axios";
import { useNavigate, Navigate } from 'react-router-dom';
import BasicDialog from "../components/BasicDialog";

const PROTOCOL = process.env.REACT_APP_PROTOCOL;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;

class Signup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      creatingAccount : "d-none",
      username : "",
      password : "",
      rePassword : "",
      email : "",
      showConfirmation : false,
      dialogConfig : {actions : []},
      authToken : localStorage.getItem("authToken")
    }
    this.createAccountClick = this.createAccountClick.bind(this);
    this.updateField = this.updateField.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.onCloseDialog = this.onCloseDialog.bind(this);
    this.onUserCreated = this.onUserCreated.bind(this);
  }
  render(){
    return(
      <div className="container-fluid">
        {this.state.authToken && <Navigate replace to="/stores" />}
        <BasicDialog isOpen={this.state.showConfirmation} 
          onClose = {this.onCloseDialog} config = {this.state.dialogConfig}/>
        <Navbar options={{right : "no-display"}}/>
        <div className="container">
          <div className="row full-screen-height">
            <div className="col-12">
              <div className="d-flex flex-column justify-content-center h-100">
                <div className="d-flex flex-row w-100">
                  <div className="d-flex flex-column w-100">
                    <div className="d-flex flex-column text-center">
                      <h1 className="title-primary-text text-center">Crear cuenta</h1>
                      <p>¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a></p>
                    </div>
                    <div className="row">
                      <form className="col-12 col-lg-6">
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control" placeholder="name@example.com"
                          onChange={(e)=>{this.updateField("username", e.target.value)}} required/>
                          <label>Nombre de usuario</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input type="email" className="form-control" placeholder="name@example.com" 
                          onChange={(e)=>{this.updateField("email", e.target.value)}} required/>
                          <label>Email</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control" placeholder="your password here"
                          onChange={(e)=>{this.updateField("password", e.target.value)}} required/>
                          <label>Contraseña</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control" placeholder="your password here"
                          onChange={(e)=>{this.updateField("rePassword", e.target.value)}} required/>
                          <label>Repite la contraseña</label>
                        </div>
                        <div className="mb-3 text-center">
                          <button className="btn btn-primary w-100" onClick={this.createAccountClick} type="submit">
                            Crear cuenta
                            <span className={"spinner-border spinner-border-sm ms-3 "+this.state.creatingAccount} role="status" aria-hidden="true"></span>
                          </button>
                        </div>
                      </form>  
                      <div className="col-12 col-lg-6">
                        <div className="d-flex flex-column h-100 justify-content-center">
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
            </div>
            <div className="col-12">
              <div className="d-flex flex-column justify-content-center align-items-content">
                <p className="text-center">Al crear una cuenta, aceptas nuestros Términos de uso</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  updateField(target, value){
    let tmp = {};
    tmp[target] = value;
    this.setState(tmp);
  }
  createAccountClick(e){
    e.preventDefault();
    let tmp = "";
    this.setState({
      creatingAccount : tmp
    });
    if(this.state.username !== "" && this.state.email!=="" && this.state.password!=="" && this.state.password===this.state.rePassword){
      this.createAccount();
    } else{
      let dConfig = {
        title : "Completa el formulario",
        body : "Hay campos vacios, por favor completa el formulario e intenta nuevamente",
        actions : [
          {
            "label" : "Ok",
            "func" : this.onCloseDialog
          }
        ]
      }
      this.setState({showConfirmation : true, dialogConfig : dConfig});
      this.setState({
        creatingAccount : "d-none"
      });
    }
  }
  onCloseDialog(){
    this.setState({showConfirmation : false});
  }
  onUserCreated(){
    this.setState({showConfirmation : false}, ()=>{
      this.props.navigation('/');
    });
  }
  createAccount(){
    let data = {
      struct : "user",
      data : {
        userName : this.state.username,
        email : this.state.email,
        password : this.state.password,
        mongoId : "6125aec10506fa59a674f56a"
      }
    }
    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/user/create",
      method : "post",
      data
    }
    axios(config).then((resp)=>{
      let data = resp.data;
      console.log(data);
      this.setState({creatingAccount : "d-none"});
      if(data.result === "OK"){
        let dConfig = {
          title : "Usuario creado",
          body : data.message,
          actions : [
            {
              label : "Ok",
              func : this.onUserCreated
            }
          ]
        }
        this.setState({showConfirmation : true, dialogConfig : dConfig, creatingAccount : "d-none"});
      } else{
        let dConfig = {
          title : "Lo sentimos",
          body : data.message,
          actions : [
            {
              label : "Ok",
              func : this.onCloseDialog
            }
          ]
        }
        this.setState({showConfirmation : true, dialogConfig : dConfig, creatingAccount : "d-none"});
      }
      
    }).catch((err)=>{
      let dConfig = {
        title : "Opps",
        body : "Lo sentimos, ocurrió un error mientras se creaba el usuario, por favor, intenta nuevamente más tarde",
        actions : [
          {
            label : "Ok",
            func : this.onCloseDialog
          }
        ]
      }
      this.setState({showConfirmation : true, dialogConfig : dConfig, creatingAccount : "d-none"});
    })
  }
}

export default function SignupFunc(props) {
  const navigation = useNavigate();

  return <Signup navigation={navigation} />;
}