import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Store from '../par/Store';
import BasicDialog from "./BasicDialog";

class CreateStoreDialog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authToken : localStorage.getItem("authToken"),
      isOpen : this.props.isOpen,
      idStore : this.props.idStore,
      page : 1,
      storeName : "",
      noId : "",
      phone : "",
      address : "",
      facebook : undefined,
      instagram : undefined,
      resultMessage : "",
      creating : false,
      showResult : false
    }
    this.handleClose = this.handleClose.bind(this);
    this.cancelStore = this.cancelStore.bind(this);
    this.updateField = this.updateField.bind(this);
    this.createStoreButton = this.createStoreButton.bind(this);
    this.createStore = this.createStore.bind(this);
  }

  render(){
    return(
      <>
        <BasicDialog isOpen={this.state.showResult} config={{
            title : "Crear nueva tienda",
            body : this.state.resultMessage,
            actions : [
              {
                label : "Ok",
                func : ()=>{this.setState({showResult : false}); this.props.closeFunc(); this.cancelStore();}
              }
            ]
          }}></BasicDialog>

        <BasicDialog isOpen={this.state.creating} config={{
            title : "Crear nueva tienda",
            body : "¿Seguro que deseas crear esta nueva tienda?",
            actions : [
              {
                label : "Cancelar",
                func : ()=>{this.setState({creating : false})}
              },
              {
                label : "Ok",
                func : ()=>{this.createStore();}
              }
            ]
          }}></BasicDialog>
          
          <Dialog
            open = {this.props.isOpen}
            onClose = {this.props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth maxWidth="sm"
              >
          <DialogTitle id="alert-dialog-title">
            {this.props.config.title}
          </DialogTitle>
          <DialogContent>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <input type="text" placeholder="type" className="form-control" value={this.state.storeName}
                    onChange={(e)=>{this.updateField("storeName", e.target.value)}}/>
                    <label>Nombre de tu tienda</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" placeholder="type" className="form-control" value={this.state.noId}
                    onChange={(e)=>{this.updateField("noId", e.target.value)}}/>
                    <label>NIT</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" placeholder="type" className="form-control" value={this.state.phone}
                    onChange={(e)=>{this.updateField("phone", e.target.value)}}/>
                    <label>Teléfono</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" placeholder="type" className="form-control" value={this.state.address}
                    onChange={(e)=>{this.updateField("address", e.target.value)}}/>
                    <label>Dirección</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" placeholder="type" className="form-control" value={this.state.facebook}
                    onChange={(e)=>{this.updateField("facebook", e.target.value)}}/>
                    <label>¿Tienes página de Facebook? copia la dirección URL</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" placeholder="type" className="form-control" value={this.state.instagram}
                    onChange={(e)=>{this.updateField("instagram", e.target.value)}}/>
                    <label>Pon tu @ de instagram</label>
                  </div>
                </div>
              </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelStore}>Cancelar</Button>
            <Button onClick={this.createStoreButton}>Crear Tienda</Button>
            </DialogActions>
        </Dialog> 
      </>
    )
  }

  updateField(target, value){
    let tmp = {};
    tmp[target] = value;
    this.setState(tmp);
  }

  cancelStore(e){
    this.props.closeFunc(e);
    this.setState({
      storeName : "",
      noId : "",
      phone : "",
      address : "",
      facebook : undefined,
      instagram : undefined,
      resultMessage : ""
    });
  }

  createStoreButton(e){
    this.setState({
      creating : true
    });
  }

  createStore(){
    let socialNetworks = `
      {
        "facebook" : ${this.state.facebook},
        "instagram" : ${this.state.instagram}
      }
    `;

    let store = {
      storeName : this.state.storeName,
      url : this.state.url || '',
      noId : this.state.noId,
      phone : this.state.phone,
      address : this.state.address,
      socialNetworks
    }
    Store.createNewStore(this.state.authToken, store).then((resp) => {
      console.log(resp);
      this.setState({
        creating : false,
        resultMessage : resp.message,
        showResult : true
      });
    }).catch((err) => {
      console.log(err);
    })
  }
  
  handleClose(e){
    
  }
}

export default CreateStoreDialog;