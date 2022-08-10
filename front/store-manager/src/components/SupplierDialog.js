import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Suppliers from "../par/Suppliers";
import BasicDialog from "./BasicDialog";

class SupplierDialog extends React.Component{
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
      description : "",
      showResult : false,
      resultMessage : "",
      resultState : "",
      updating : false,
      idSupplier : props.idSupplier,
      showConfirmation : false,
      showMessage : false,
      updateMessage : "",
      showConfirmDelete : false
    }
    this.prepareData = this.prepareData.bind(this);
    this.updateClicked = this.updateClicked.bind(this);
    this.saveClicked = this.saveClicked.bind(this);
    this.saveSupplier = this.saveSupplier.bind(this);
    this.cancelSaveSupplier = this.cancelSaveSupplier.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
    this.cancelDeleteSupplier = this.cancelDeleteSupplier.bind(this);
    this.deleteSupplier = this.deleteSupplier.bind(this);
    this.deleteClicked = this.deleteClicked.bind(this);
  }

  componentDidMount(){
    const {authToken, idStore, idSupplier} = this.state;
    Suppliers.getSupplier(authToken, idStore, idSupplier).then((resp) => {
      if(resp.result==="OK"){
        let data = resp.data;
        this.setState({
          supplierName : data.supplierName,
          supplierId : data.supplierId,
          supplierPhone : data.supplierPhone,
          supplierAddress : data.supplierAddress,
          supplierEmail : data.supplierEmail,
          description : data.description
        });
      }
    }).catch((err) =>{
      console.log(err);
    }); 
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
            Proveedor
          </DialogTitle>
          <DialogContent>
            <div className="row mt-3">
              <div className="col-12">
                <div className="form-floating mb-3">
                  <input type="text" placeholder="Antonio Pérez" value={this.state.supplierName}
                  className="form-control" onChange={(e)=>{this.updateField("supplierName", e.target.value)}}
                  disabled={!this.state.updating}
                  />
                  <label>Nombre</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" placeholder="Antonio Pérez" value={this.state.supplierId}
                  className="form-control" onChange={(e)=>{this.updateField("supplierId", e.target.value)}}
                  disabled={!this.state.updating}
                  />
                  <label>Número de identificación</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" placeholder="Antonio Pérez" value={this.state.supplierPhone}
                  className="form-control" onChange={(e)=>{this.updateField("supplierPhone", e.target.value)}}
                  disabled={!this.state.updating}
                  />
                  <label>Télefono</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" placeholder="Antonio Pérez" value={this.state.supplierEmail}
                  className="form-control" onChange={(e)=>{this.updateField("supplierEmail", e.target.value)}}
                  disabled={!this.state.updating}
                  />
                  <label>Email</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" placeholder="Antonio Pérez" value={this.state.supplierAddress}
                  className="form-control" onChange={(e)=>{this.updateField("supplierAddress", e.target.value)}}
                  disabled={!this.state.updating}
                  />
                  <label>Dirección</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" placeholder="Antonio Pérez" value={this.state.description}
                  className="form-control" onChange={(e)=>{this.updateField("description", e.target.value)}}
                  disabled={!this.state.updating}
                  />
                  <label>Descripción</label>
                  <span className="form-text">Información adicional o de ayuda para futuras busquedas</span>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            {
              !this.state.updating
              ?
              <>
                <Button onClick={this.deleteClicked}>
                  <span className="btn btn-danger">Eliminar</span>
                </Button>
                <Button onClick={this.updateClicked}>Modificar</Button>
                <Button onClick={this.props.onClose}>Cerrar</Button>
              </>
              :
              <>
                <Button onClick={this.saveClicked}>Guardar</Button>
                <Button onClick={this.props.onClose}>Cerrar</Button>
              </>
            }
          </DialogActions>
        </Dialog>
        {
          this.state.showConfirmation
          ?
          <>
            <BasicDialog isOpen={true} config={{
              title : "Modificar proveedor",
              body : "¿Seguro que deseas actualizar este proveedor?",
              actions : [
                {
                  label : "Cancelar",
                  func : ()=>{this.cancelSaveSupplier()}
                },
                {
                  label : "OK",
                  func : ()=>{this.saveSupplier()}
                }
              ]
            }}/>
          </>
          :
          <></>
        }
        {
          this.state.showConfirmDelete
          ?
          <>
            <BasicDialog isOpen={true} config={{
              title : "Modificar proveedor",
              body : "¿Seguro que deseas eliminar?",
              actions : [
                {
                  label : "Cancelar",
                  func : ()=>{this.cancelSaveSupplier()}
                },
                {
                  label : "OK",
                  func : ()=>{this.deleteSupplier()}
                }
              ]
            }}/>
          </>
          :
          <></>
        }
        {
          this.state.showMessage
          ?
          <>
            <BasicDialog isOpen={true} config={{
              title : "Cambios en proveedor",
              body : this.state.updateMessage,
              actions : [
                {
                  label : "Ok",
                  func : ()=>{this.closeMessage()}
                }
              ]
            }}/>
          </>
          :
          <></>
        }
      </>
    );
  }

  deleteClicked(e){
    this.setState({
      showConfirmDelete : true
    });
  }

  deleteSupplier(){
    const {authToken, idStore, idSupplier} = this.state;

    Suppliers.deleteSupplier(authToken, idStore, idSupplier).then((resp)=>{
      console.log(resp);
      this.setState({
        showMessage : true,
        updateMessage : resp.message
      });
    });
  }

  cancelDeleteSupplier(){
    this.setState({
      showConfirmDelete : false
    });
  }

  saveSupplier(){
    const { authToken } = this.state;

    let data = this.prepareData();
    data.idSupplier = this.state.idSupplier;
    Suppliers.updateSupplier(authToken, data).then((resp) => {
      this.setState({
        showConfirmation : false,
        showMessage : true,
        updateMessage : resp.message
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  cancelSaveSupplier(){
    this.setState({
      showConfirmation : false
    });
  }

  closeMessage(){
    if(this.state.updating){
      this.setState({
        updating : false,
        showConfirmation : false,
        showMessage : false
      });
    } else{
      this.props.onClose();
    }
  }

  saveClicked(e){
    this.setState({
      showConfirmation : true
    });
  }

  updateClicked(e){
    this.setState({
      updating : true
    });
  }

  prepareData(){
    let {idStore, supplierName, supplierId, supplierPhone, 
      supplierEmail, supplierAddress, description} = this.state;
    idStore = parseInt(idStore);
    let data = {
      idStore,
      supplierName,
      supplierId : supplierId!==""?supplierId:undefined,
      supplierPhone : supplierPhone!==""?supplierPhone:undefined,
      supplierEmail : supplierEmail!==""?supplierEmail:undefined,
      supplierAddress : supplierAddress!==""?supplierAddress:undefined,
      description : description!==""?description:undefined
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

export default SupplierDialog;