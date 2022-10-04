import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Select from 'react-select';
import Bills from "../par/Bills";
import Costs from "../par/Costs";
import BasicDialog from "./BasicDialog";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;

class CreateCostDialog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authToken : localStorage.getItem("authToken"),
      isOpen : this.props.isOpen,
      idStore : this.props.idStore,
      page : 1,
      closeFunc : this.props.closeFunc,
      categoriesOptions : [],
      selectedCostCategory : {},
      ammount : 0,
      refPago : "",
      tipoPagoOptions : [],
      selectedTipoPago : {},
      description : "",
      statusOptions : [],
      selectedStatus : {},
      showResult : false,
      resultState : "",
      resultMessage : ""
    }
    this.updateField = this.updateField.bind(this);
		this.cancelCostClicked = this.cancelCostClicked.bind(this);
    this.createCostClicked = this.createCostClicked.bind(this);
  }

  componentDidMount(){
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
				tipoPagoOptions : options
			});
		}).catch((err) => {
      console.log(err);
    });

    Costs.getCategories(this.state.authToken).then((resp) => {
      let options = [];
      
      for(let i=0; i<resp.data.length; i++){
        let p = resp.data[i];
        options.push({
          value : p.ID_COST_CATEGORY,
          label : p.DESCRIPTION
        });

        this.setState({
          categoriesOptions : options
        });
      }
    }).catch((err) => {
      console.log(err);
    });

    Costs.getStatus(this.state.authToken).then((resp) => {
      let options = [];

      for(let i=0; i<resp.data.length; i++){
        let p = resp.data[i];

        options.push({
          value : p.ID_STATUS,
          label : p.DESCRIPTION
        });
      }

      this.setState({
        statusOptions : options
      });
    }).catch((err) => {
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
                func : ()=>{this.setState({showResult : false}); this.props.closeFunc('RELOAD');}
              }
            ]
          }}>
        </BasicDialog>
        <Dialog
          open = {this.props.isOpen}
          onClose = {()=>this.props.closeFunc('NO-RELOAD')}
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
                    <input type="text" placeholder="Nombre del producto" className="form-control" value={this.state.description}
                    onChange={(e)=>{this.updateField("description", e.target.value)}}/>
                    <label>Descripción gasto</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" placeholder="Total gasto" className="form-control" value={this.state.ammount}
                    onChange={(e)=>{this.updateField("ammount", e.target.value)}}/>
                    <label>Total</label>
                  </div>
                  <div className="mb-3">
                    <label>Tipo de pago</label>
                    <Select options={this.state.tipoPagoOptions} onChange={(e)=>{this.setState({idTipoPago : e.value})}}/>
                  </div>
                  <div className="mb-3">
                    <label>Tipo de gasto</label>
                    <Select options={this.state.categoriesOptions} onChange={(e)=>{this.setState({idCostCategory : e.value})}}/>
                  </div>
                  <div className="mb-3">
                    <label>Estado del gasto</label>
                    <Select options={this.state.statusOptions} onChange={(e)=>{this.setState({idStatus : e.value})}}/>
                  </div>
                  <div className="form-floating mb-3">
                    <input type="text" placeholder="Referencia" className="form-control" value={this.state.refPago}
                    onChange={(e)=>{this.updateField("refPago", e.target.value)}}/>
                    <label>Referencia de pago (opcional)</label>
                  </div>
                </div>
              </div>
          </DialogContent>
          <DialogActions>
              <Button onClick={this.cancelCostClicked}>Cancelar</Button>
              <Button onClick={this.createCostClicked}>Ok</Button>
            </DialogActions>
        </Dialog>
      </>
    )
  }

	cancelCostClicked(){
		if(true){
			this.props.closeFunc('NO-RELOAD');
		} else{

		}
	}

  createCostClicked(){
    const {authToken, idStore, idCostCategory, ammount, refPago, 
        idTipoPago, description, idStatus} = this.state;
    

    let payload = {
      idStore,
      idCostCategory,
      ammount,
      refPago,
      idTipoPago,
      description,
      idStatus
    }

    Costs.addCost(authToken, payload).then((resp) => {
      let title = "Oops, algo ha ocurrido"
      if(resp.result==="OK"){
        title = "Operación exitosa"
      }

      let message = resp.message;

      this.setState({showResult : true, resultState : title, resultMessage : message});

    }).catch((err) => {
      console.log(err);
    });
  }

  updateField(target, value){
    let tmp = {};
    tmp[target] = value;
    this.setState(tmp);
  }
}

export default CreateCostDialog;