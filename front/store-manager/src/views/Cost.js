import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Select from "react-select";
import CostServices from "../par/Costs";
import Bills from "../par/Bills";
import BasicDialog from "../components/BasicDialog";

class Cost extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      authToken : localStorage.getItem("authToken"),
      idStore : props.params.idStore,
      isDisabled : true,
      idCost : props.params.idCost,
      selectedCostCategory : {},
      selectedTipoPago : {},
      selectedEstadoPago : {},
      estadoPagoOptions : [],
      tipoPagoOptions : [],
      costCategoryOptions : [],
      saving : false,
      showResult : false,
      deleting : false
    }

    this.fetchCost = this.fetchCost.bind(this);
    this.editClicked = this.editClicked.bind(this);
    this.saveChangesClicked = this.saveChangesClicked.bind(this);
    this.saveCost = this.saveCost.bind(this);
    this.delCost = this.delCost.bind(this);
    this.deleteClicked = this.deleteClicked.bind(this);
    this.closeResult = this.closeResult.bind(this);
  }

  componentDidMount(){
    this.fetchCost();
    Bills.getParTipoPago(this.state.authToken).then((resp) => {
      this.setState({
        tipoPagoOptions : Bills.parseTipoPago(resp.data)
      });
    });
    CostServices.getCategories(this.state.authToken).then((resp) => {
      this.setState({
        costCategoryOptions : CostServices.parseCategories(resp.data)
      });
    });
    CostServices.getStatus(this.state.authToken).then((resp) => {
      console.log("Estados", resp);
      this.setState({
        estadoPagoOptions : CostServices.parseStatus(resp.data)
      });
    });

    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    if(params.edit && parseInt(params.edit) === 1){
      this.setState({
        isDisabled : false
      });
    }

  }

  fetchCost(){
    const {authToken, idStore, idCost} = this.state;
    CostServices.getCost(authToken, idStore, idCost).then((resp) => {
      if(resp.data){
        let cost = this.parseCost(resp.data);
        this.setState(cost);
      }
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
              func : ()=>{this.closeResult();}
            }
          ]
        }}>
      </BasicDialog>
      <BasicDialog isOpen={this.state.saving} config={{
          title : "Actualizar costo",
          body : "¿Seguro que deseas actualizar el costo?",
          actions : [
            {
              label : "Ok",
              func : ()=>{this.saveCost();}
            },
            {
              label : "Cancelar",
              func : () => {this.setState({saving : false})}
            }
          ]
        }}>
      </BasicDialog>
      <BasicDialog isOpen={this.state.deleting} config={{
          title : "Eliminar costo",
          body : "¿Seguro que deseas eliminar el costo?",
          actions : [
            {
              label : "Ok",
              func : ()=>{this.delCost();}
            },
            {
              label : "Cancelar",
              func : () => {this.setState({deleting : false})}
            }
          ]
        }}>
      </BasicDialog>
      <div className="container-fluid p-0 bg-light">
        <Navbar idStore={this.state.idStore}/>
        <div className="container body-container">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="row">
                <div className="col-6">
                  <h3>Costo</h3>
                </div>
                <div className="col-6">
                  <div className="d-flex flex-row w-100 justify-content-end">
                    <button type="button" className={!this.state.isDisabled?"btn btn-primary active":"btn btn-primary "} 
                    data-bs-toggle="button" autocomplete="off" aria-pressed="true"
                    onClick={this.editClicked}>Editar</button>
                    <button className="btn btn-danger ms-3" onClick={this.deleteClicked}>Borrar</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form mb-3">
                <div className="form-text">Referencia</div>
                <input className="form-control" value={this.state.refPago} 
                onChange={(e)=>{this.updateField("refPago", e.target.value)}}
                disabled={this.state.isDisabled}/>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form mb-3">
                <div className="form-text">Valor</div>
                <input className="form-control" value={this.state.ammount}
                onChange={(e)=>{this.updateField("ammount", e.target.value)}}
                disabled={this.state.isDisabled}/>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="mb-3">
              <div className="form-text">Categoria</div>
              <Select options={this.state.costCategoryOptions} placeholder="Categoría" 
                  isDisabled={this.state.isDisabled} value={this.state.selectedCostCategory}
                  onChange={(e)=>{this.setState({selectedCostCategory : e})}}
                  disabled={this.state.isDisabled}/>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="mb-3">
              <div className="form-text">Tipo pago</div>
              <Select options={this.state.tipoPagoOptions} placeholder="Tipo pago" 
                  isDisabled={this.state.isDisabled} value={this.state.selectedTipoPago}
                  onChange={(e)=>{this.setState({selectedTipoPago : e})}}
                  disabled={this.state.isDisabled}/>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="mb-3">
              <div className="form-text">Estado de pago</div>
              <Select options={this.state.estadoPagoOptions} placeholder="Tipo pago" 
                  isDisabled={this.state.isDisabled} value={this.state.selectedEstadoPago}
                  onChange={(e)=>{this.setState({selectedEstadoPago : e})}}/>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="form mb-3">
                <div className="form-text">Fecha</div>
                <input className="form-control" type="date" value={this.state.createdAt}
                disabled={this.state.isDisabled}/>
              </div>
            </div>
            <div className="col-12">
              <div className="form mb-3">
                <div className="form-text">Descripción</div>
                <input className="form-control" value={this.state.description}
                onChange={(e)=>{this.updateField("description", e.target.value)}}
                disabled={this.state.isDisabled}/>
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex flex-row w-100 justify-content-end">
                {
                  this.state.isDisabled?
                  <></>
                  :
                  <button className="btn btn-primary" onClick={this.saveChangesClicked}>Guardar</button>
                }
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
      </>
    );
  }
  closeResult(){
    const { saving, deleting, idStore } = this.state;

    if(saving){
      this.setState({
        showResult : false,
        saving : false,
        isDisabled : true
      })
    } else if(deleting){
      this.setState({
        showResult : false,
        deleting : false,
        isDisabled : true
      }, () => {
        window.location.href = "/suppliers/costs/"+idStore;
      });
    }
  }

  delCost(){
    const { authToken, idStore, idCost } = this.state;
    CostServices.delCost(authToken, idStore, idCost).then((resp) => {
      this.setState({
        resultMessage : "Resultado",
        resultMessage : resp.message,
        showResult : true,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  saveCost(){
    const { selectedCostCategory, selectedEstadoPago, 
      selectedTipoPago, authToken } = this.state;

    let payload = {
      idStore : this.state.idStore,
      idCost : this.state.idCost,
      refPago : this.state.refPago,
      ammount : this.state.ammount,
      idTipoPago : selectedTipoPago.value,
      idCostCategory : selectedCostCategory.value,
      idStatus : selectedEstadoPago.value,
      createdAt : this.state.createdAt,
      description : this.state.description
    }

    CostServices.updateCost(authToken, payload).then((resp) => {
      this.setState({
        resultState : "Resultado",
        resultMessage : resp.message,
        showResult : true,
        isDisabled : true
      });
    }).then((err) => {
      console.log(err);
    });
  }

  deleteClicked(e) {
    this.setState({
      deleting : true
    });
  }

  saveChangesClicked(e){
    this.setState({
      saving : true
    });
  }

  editClicked(e){
    let params = "";
    if(this.state.isDisabled){
      params="?edit=1";
    }
    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + params;
    window.history.pushState({path : newurl}, '', newurl);
    this.setState({
      isDisabled : !this.state.isDisabled
    });
  }

  updateField(target, value){
    let tmp = {};
    tmp[target] = value;
    this.setState(tmp);
  }

  parseCost(costData){
    let createdAt = new Date(costData.CREATED_AT);

    const offset = createdAt.getTimezoneOffset()
    createdAt = new Date(createdAt.getTime() - (offset*60*1000))
    createdAt = createdAt.toISOString().split("T")[0];

    let cost = {
      idCost : costData.ID_COST,
      idStore : costData.ID_STORE,
      idCostCategory : costData.ID_COST_CATEGORY,
      refPago : costData.REF_PAGO,
      ammount : costData.AMMOUNT,
      costCategory : costData.COST_CATEGORY,
      createdAt,
      description : costData.DESCRIPTION,
      idStatus : costData.ID_STATUS,
      idTipoPago : costData.ID_TIPO_PAGO,
      updatedAt : costData.UPDATED_AT,
      tipoPago : costData.TIPO_PAGO,
      selectedCostCategory : {value : costData.ID_COST_CATEGORY, label : costData.COST_CATEGORY},
      selectedTipoPago : {value : costData.ID_TIPO_PAGO, label : costData.TIPO_PAGO},
      selectedEstadoPago : {value : costData.ID_STATUS, label : costData.STATUS}
    }

    return cost;
  }
}


export default function ViewFunc(props) {
  const navigation = useNavigate();
  const params = useParams();
  return <Cost navigation={navigation} params = {params}/>;
}