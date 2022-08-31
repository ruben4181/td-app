import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Select from 'react-select'
import Bills from "../par/Bills";
import BasicDialog from "./BasicDialog";
import Suppliers from  "../par/Suppliers";

class CreateSupplierBillDialog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authToken : localStorage.getItem("authToken"),
      idStore : this.props.idStore,
      isOpen : this.props.isOpen,
      products : this.props.products,
      refPago : "",
      idStauts : this.props.idStauts,
      statusOptions :   [{value : 14, label : "Pendiente"}, 
                            {value : 15, label : "Pagado NO entregado"},
                            {value : 17, label : "Pagado y entregado"},
                            {value : 18, label : "Cuenta abierta"}],
      supplierOptions : [],
      selectedStatus : this.props.status || {value : 17, label : "Pagado y entregado"},
      saving : false,
      showResult : false,
      message : "Numero de factura: LGM-201712131930",
			selectedSupplier : {},
			parTipoPagoOptions : [],
			selectedParTipoPago : {}
    }
    this.updateField = this.updateField.bind(this);
    this.close = this.close.bind(this);
    this.closeAfterSaving = this.closeAfterSaving.bind(this);
    this.saveBill = this.saveBill.bind(this);
  }

  componentDidMount(){
    Suppliers.getSuppliersAll(this.state.authToken, this.state.idStore).then((resp) => {
			let options = [];
			for(let i=0; i<resp.data.length; i++){
				let s = resp.data[i];
				options.push({
					value : s.ID_SUPPLIER,
					label : s.SUPPLIER_NAME
				});
			}
			this.setState({
				supplierOptions : options
			});
    });
		Bills.getParTipoPago(this.state.authToken).then((resp) => {
			let options = [];
			for(let i=0; i<resp.data.length; i++){
				let p = resp.data[i];
				options.push({
					value : p.ID_TIPO_PAGO,
					label : p.DESCRIPTION
				});
			}

			this.setState({
				parTipoPagoOptions : options
			});
		});
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
          <div className="col-12">
            Proveedor (opcional)
          </div>
          <div className="col-12 mb-3">
            <Select options={this.state.supplierOptions} placeholder="Estado" 
            value={this.state.selectedSupplier}
            onChange={(e)=>{this.setState({selectedSupplier : e})}}/>
          </div>
          <div className="col-12 mb-3">
            <div className="form-floating">
              <input type="text" className="form-control" value={this.state.refPago} 
              onChange={(e)=>{this.updateField("refPago", e.target.value)}}/>
              <label>Referencia de pago (opcional)</label>
            </div>
          </div>
          <div className="col-12">
            Tipo de pago (opcional)
          </div>
          <div className="col-12 mb-3">
            <Select options={this.state.parTipoPagoOptions} placeholder="Estado" 
            value={this.state.selectedParTipoPago}
            onChange={(e)=>{this.setState({selectedParTipoPago : e})}}/>
          </div>
          <div className="col-12 mb-3">
            <div className="form-floating">
              <input type="text" className="form-control" value={this.state.description} 
              onChange={(e)=>{this.updateField("description", e.target.value)}}/>
              <label>Descripción (opcional)</label>
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
    
    var status = undefined;
    if(this.state.selectedStatus){
      status = parseInt(this.state.selectedStatus.value);
    }

    console.log("statys", status);

    var idTipoPago = undefined;
    var idSupplier = undefined;


    if(this.state.selectedParTipoPago){
      idTipoPago = parseInt(this.state.selectedParTipoPago.value);
    }
    if(this.state.selectedSupplier){
      idSupplier = parseInt(this.state.selectedSupplier.value);
    }

    let data = {
      idStatus : status, 
      idStore : this.state.idStore,
      idSupplier,
      refPago : this.state.refPago,
      description : this.state.description,
      idTipoPago
    }

    console.log(data);

    Suppliers.createSupplierBill(this.state.authToken, data, this.state.products).then((resp) => {
      this.setState({
        showResult : true,
        message : resp.message
      });
    }).catch((err) => {
      console.log(err);
      this.setState({
        showResult : true,
        message : "Oops ha ocurrido un error"
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

export default CreateSupplierBillDialog;