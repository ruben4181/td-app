import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Suppliers from "../par/Suppliers";
import BasicDialog from "./BasicDialog";

class CreateSupplier extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      idStore : props.idStore,
      authToken : localStorage.getItem("authToken"),
      supplierName : "",
      supplierId : "",
      supplierPhone : "",
      supplierEmail : "",
      supplierAddress : "",
      showResult : false,
      resultMessage : "",
      resultState : ""
    }
    this.addSupplierClicked = this.addSupplierClicked.bind(this);
    this.prepareData = this.prepareData.bind(this);
  }
  render(){
    return(
      <>
        <BasicDialog isOpen={this.state.showResult} config={{
            title : this.state.resultState,
            body : this.state.resultMessage,
            actions : [
              {
                label : "Ok",
                func : ()=>{this.setState({showResult : false}); this.props.onClose();}
              }
            ]
          }}>
        </BasicDialog>

        <Dialog
          open = {this.props.isOpen}
          onClose = {this.props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth maxWidth="sm"
        >
          <DialogTitle>
            Agregar proveedor
          </DialogTitle>
          <DialogContent>
            <div className="row mt-3">
              <div className="col-12">
                <div className="form-floating mb-3">
                  <input type="text" placeholder="Antonio Pérez" value={this.state.supplierName}
                  className="form-control" onChange={(e)=>{this.updateField("supplierName", e.target.value)}}
                  />
                  <label>Nombre</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" placeholder="Antonio Pérez" value={this.state.supplierId}
                  className="form-control" onChange={(e)=>{this.updateField("supplierId", e.target.value)}}
                  />
                  <label>Número de identificación</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" placeholder="Antonio Pérez" value={this.state.supplierPhone}
                  className="form-control" onChange={(e)=>{this.updateField("supplierPhone", e.target.value)}}
                  />
                  <label>Télefono</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" placeholder="Antonio Pérez" value={this.state.supplierEmail}
                  className="form-control" onChange={(e)=>{this.updateField("supplierEmail", e.target.value)}}
                  />
                  <label>Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" placeholder="Antonio Pérez" value={this.state.supplierAddress}
                  className="form-control" onChange={(e)=>{this.updateField("supplierAddress", e.target.value)}}
                  />
                  <label>Dirección</label>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose}>Cancelar</Button>
            <Button onClick={this.addSupplierClicked}>Agregar</Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  addSupplierClicked(e){
    let payload = this.prepareData();
    Suppliers.addSupplier(this.state.authToken, payload).then((resp) => {
      if(resp.result === "OK"){
        this.setState({
          showResult : true,
          resultState : "¡Éxito!",
          resultMessage : resp.message
        });
      } else{
        this.setState({
          showResult : true,
          resultState : "Ooops",
          resultMessage : resp.message
        });
      }
    }).catch((err) => {
      console.log(err);
      this.setState({
        showResult : true,
        resultState : "Ooops",
        resultMessage : "Un error inesperado ha ocurrido"
      });
    });
  }

  prepareData(){
    let {idStore, supplierName, supplierId, supplierPhone, supplierEmail, supplierAddress} = this.state;
    idStore = parseInt(idStore);
    let data = {
      idStore,
      supplierName,
      supplierId : supplierId!==""?supplierId:undefined,
      supplierPhone : supplierPhone!==""?supplierPhone:undefined,
      supplierEmail : supplierEmail!==""?supplierEmail:undefined,
      supplierAddress : supplierAddress!==""?supplierAddress:undefined
    }

    if(idStore && supplierName && supplierName != ""){
      return data;
    } else{
      return undefined;
    }
  }

  updateField(target, value){
    if(value && value===""){
      value = undefined;
    }
    let tmp = {};
    tmp[target] = value;
    this.setState(tmp);
  }
}

export default CreateSupplier;