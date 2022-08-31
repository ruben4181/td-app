import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Select from 'react-select'
import Bills from "../par/Bills";
import BasicDialog from "./BasicDialog";

class CreateBillDialog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authToken : localStorage.getItem("authToken"),
      idStore : this.props.idStore,
      isOpen : this.props.isOpen,
      products : this.props.products,
      customerId : "",
      customerName : "",
      customerPhone : "",
      customerAddress : "",
      idStauts : this.props.idStauts,
      statusOptions : [{value : 4, label : "Pagado y entregado"}, {value : 9, label : "Cuenta abierta"}],
      selectedStatus : this.props.status || {value : 4, label : "Pagado y entregado"},
      saving : false,
      showResult : false,
      message : "Numero de factura: LGM-201712131930"
    }
    this.updateField = this.updateField.bind(this);
    this.close = this.close.bind(this);
    this.closeAfterSaving = this.closeAfterSaving.bind(this);
    this.saveBill = this.saveBill.bind(this);

  }

  render(){
    return(
      <>
      <BasicDialog isOpen={this.state.saving} config={{
            title : "Guardar orden",
            body : "¿Seguro que deseas guardar los cambios?",
            actions : [
              {
                label : "Cancelar",
                func : ()=>{this.setState({saving : false})}
              },
              {
                label : "Ok",
                func : ()=>{this.saveBill();}
              }
            ]
          }}/>
      <BasicDialog isOpen={this.state.showResult} config={{
            title : "Ordén",
            body : this.state.message,
            actions : [
              {
                label : "Imprimir",
                func : ()=>{this.setState({showResult : false})}
              },
              {
                label : "Ok",
                func : ()=>{this.closeAfterSaving(); this.setState({showResult : false});}
              }
            ]
          }}/>
      <Dialog
        open = {this.props.isOpen}
        onClose = {this.props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth maxWidth="sm">
      <DialogTitle id="alert-dialog-title">
        {this.props.config.title}
      </DialogTitle>
      <DialogContent>
        <div className="row">
          <div className="col-12">
            Estado de la orden ({this.state.products.length} productos)
          </div>
          <div className="col-12 mb-3">
            <Select options={this.state.statusOptions} placeholder="Estado" 
            value={this.state.selectedStatus}
            onChange={(e)=>{this.setState({selectedStatus : e})}}/>
          </div>
          <div className="col-12 mb-3">
            Información del cliente(opcional)
          </div>
          <div className="col-12">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" value={this.state.customerId} 
              onChange={(e)=>{this.updateField("customerId", e.target.value)}}/>
              <label>Documento de identidad</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" value={this.state.customerName} 
              onChange={(e)=>{this.updateField("customerName", e.target.value)}}/>
              <label>Nombre</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" value={this.state.customerPhone} 
              onChange={(e)=>{this.updateField("customerPhone", e.target.value)}}/>
              <label>Telefono</label>
            </div>
          </div>
          <div className="col-12">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" value={this.state.customerAddress} 
              onChange={(e)=>{this.updateField("customerAddress", e.target.value)}}/>
              <label>Dirección</label>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={this.close}>Cancelar</Button>
        <Button onClick={(e)=>{this.setState({saving : true})}}>Guardar</Button>
      </DialogActions>
     </Dialog>
      </>
    )
  }

  saveBill(){
    this.setState({
      saving : false
    });
    
    let status = this.state.selectedStatus;
    status = parseInt(status.value);

    let customerInfo = {
      idStore : this.state.idStore,
      customerId : this.state.customerId,
      customerName : this.state.customerName,
      customerPhone : this.state.customerPhone,
      customerAddress : this.state.customerAddress
    }
    Bills.saveBill(this.state.authToken, customerInfo, this.state.products, status).then((resp)=>{
      this.setState({
        showResult : true,
        message : resp.message
      });
    });
  }

  updateField(target, value){
    let tmp = {};
    tmp[target] = value;
    this.setState(tmp);
  }

  close(e){
    this.props.closeFunc("STILL-PRODUCTS");
    this.setState({
      customerId : "",
      customerName : "",
      customerPhone : "",
      customerAddress : ""
    });
  }
  closeAfterSaving(e){
    this.props.closeFunc("DEL-PRODUCTS");
    this.setState({
      customerId : "",
      customerName : "",
      customerPhone : "",
      customerAddress : ""
    });
  }
}

export default CreateBillDialog;