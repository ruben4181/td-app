import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CostsServices from "../par/Costs";
import Products from "../par/Products";
import Pagination from "../components/Pagination";

class Costs extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      idStore : props.params.idStore,
      authToken : localStorage.getItem("authToken"),
      costs : [],
      costsFetched : false,
      actualPage : 0,
      lastPage : 0,
      from : undefined,
      to : undefined,
      query : undefined,
      q : "",
      tmpFrom : null,
      tmpTo : null
    }
    this.renderCosts = this.renderCosts.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.fetchCosts = this.fetchCosts.bind(this);
    this.loadParams = this.loadParams.bind(this);
    this.putParams = this.putParams.bind(this);
    this.toPage = this.toPage.bind(this);
    this.filterClicked = this.filterClicked.bind(this);
    this.resetClicked = this.resetClicked.bind(this);
  }

  componentDidMount(){
    this.loadParams();
  }

  loadParams(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let page = urlParams.get("page") || 1;
    console.log("Page", page);
    page = parseInt(page);
    let query = urlParams.get("query");
    let from = urlParams.get("from");
    let to = urlParams.get("to");

    this.setState({
      actualPage : page,
      query,
      from,
      to,
      q : query,
      tmpFrom : from,
      tmpTo : to
    }, ()=> { this.fetchCosts() });
  }

  putParams(reloadBills){
    const {actualPage, query, from, to} = this.state;
    let params = "?";
    if(actualPage){
      params += "page="+parseInt(actualPage)+"&";
    }
    if(query){
      params+="query="+query+"&";
    }
    if(from){
      params+="from="+from+"&";
    }
    if(to){
      params+="to="+to+"&";
    }

    console.log("Here putting", params);

    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + params;
    window.history.pushState({path : newurl}, '', newurl);

    if(reloadBills){
      this.fetchCosts();
    }
  }

  render(){
    const {actualPage, lastPage} = this.state;
    return(
      <>
      <div className="container-fluid p-0 bg-light">
        <Navbar idStore={this.state.idStore}/>
        <div className="container body-container">
          <div className="row">
            <div className="col-12 col-lg-6 mb-3">
              <h3>Costsos</h3>
            </div>
            <div className="col-12 col-lg-6 mb-3">
              <div className="d-flex flex-row w-100 justify-content-end">
                <button className="btn btn-primary me-3" onClick={this.filterClicked}>Filtrar</button>
                <button className="btn btn-secondary" onClick={this.resetClicked}>Reset</button>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating mb-3">
                <input type="text" className="form-control" placeholder="buscar" value={this.state.q}
                onChange={(e)=>{this.updateField("q", e.target.value)}}/>
                <label>Buscar factura</label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating mb-3">
                <input type="date" placeholder="from" className="form-control" value={this.state.tmpFrom}
                onChange={(e)=>{this.updateField("tmpFrom", e.target.value)}}/>
                <label>Desde</label>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="form-floating mb-3">
                <input type="date" placeholder="from" className="form-control" value={this.state.tmpTo}
                onChange={(e)=>{this.updateField("tmpTo", e.target.value)}}/>
                <label>Hasta</label>
              </div>
            </div>
            <div className="col-12">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Referencia</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo Gasto</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderCosts()}
                </tbody>
              </table>
            </div>
            <div className="col-12">
              <div className="d-flex flex-row w-100 justify-content-end">
                {
                  this.state.costsFetched
                  ?
                  <Pagination config={{actualPage, lastPage}} onBack = {this.prevPage}
                    onNext = {this.nextPage} onItem = {this.toPage}/>
                  :
                  <></>
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

  resetClicked(e){
    this.setState({
      query : undefined,
      from : undefined,
      to : undefined,
      actualPage : 1,
      q : "",
      tmpFrom : "",
      tmpTo : ""
    }, ()=>{ this.putParams(true) });
  }

  filterClicked(e){
    const {q, tmpFrom, tmpTo} = this.state;

    this.setState({
      query : q,
      from : tmpFrom===""?null:tmpFrom,
      to : tmpTo===""?null:tmpTo
    }, ()=> {this.putParams(true)});
  }

  updateField(target, value){
    let tmp = {};
    tmp[target] = value;
    this.setState(tmp);
  }

  renderCosts(){
    const {idStore, costs} = this.state;
    const items = [];

    for(let i=0; i<costs.length; i++){
      let c = costs[i];

      items.push(
        <tr key={"bill-"+i}>
          <td>{c.REF_PAGO}</td>
          <td><span className="fw-bold">${Products.toCurrency(c.AMMOUNT)}</span></td>
          <td>{c.COST_CATEGORY}</td>
          <td>{c.STATUS}</td>
          <td>{c.CREATED_AT}</td>
          <td>
            <div className="d-flex flex-row">
            <a href={"/cost/"+idStore+"/"+c.ID_COST}><i class="fa-regular fa-eye me-2"></i></a>
            <a href={"/cost/"+idStore+"/"+c.ID_COST+"?edit=1"}><i class="fa-regular fa-pen-to-square me-2"></i></a>
            <a href={"/cost/"+idStore+"/"+c.ID_COST+"?del=1"}><i class="fa-regular fa-trash me-2"></i></a>
            </div>
          </td>
        </tr>
      )
    }
    return items;
  }

  fetchCosts(){
    const {idStore, actualPage, query, from, to} = this.state;

    let payload = {
      idStore,
      page : actualPage,
      query,
      from,
      to
    }

    console.log("Payload", payload);

    this.setState({
      costsFetched : false
    }, () => {
      CostsServices.getCosts(this.state.authToken, payload).then((resp) => {
        this.setState({
          costs : resp.data,
          lastPage : resp.lastPage,
          costsFetched : true,
        })
      });
    });
  }

  prevPage(){
    const {actualPage} = this.state;
    if(actualPage>1){
      this.setState({
        actualPage : actualPage - 1
      }, ()=> { this.putParams(true) });
    }
  }
  
  nextPage(){
    const {actualPage, lastPage} = this.state;
    if(actualPage < lastPage){
      this.setState({
        actualPage : actualPage + 1
      }, ()=> { this.putParams(true) });
    }
  }

  toPage(page){  
    const {actualPage} = this.state;
    if(page != actualPage){
      this.setState({
        actualPage : page
      }, ()=> { this.putParams(true) });
    }
  }
}


export default function ViewFunc(props) {
  const navigation = useNavigate();
  const params = useParams();
  return <Costs navigation={navigation} params = {params}/>;
}