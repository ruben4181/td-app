import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from "react-router-dom";
import "../css/commons.css";
import BillsService from "../par/Bills";

class Bills extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authToken : localStorage.getItem("authToken"),
      idStore : parseInt(this.props.params.id),
      page : parseInt(this.props.params.page) || 1,
      lastPage : 1,
      totalCount : 0,
      bills : []
    }

    this.renderBills = this.renderBills.bind(this);
    this.renderPagination = this.renderPagination.bind(this);
  }

  componentDidMount(){
    BillsService.getBills(this.state.authToken, this.state.idStore, this.state.page).then((resp)=>{
      console.log("Respuesta", resp);
      if(resp.result === "OK"){
        this.setState({bills : resp.data, lastPage : resp.lastPage, totalCount : resp.totalCount});
      }
    });
  }

  render(){
    return(
      <>
        <div className='container-fluid'>
          <Navbar/>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <div className='row mt-3'>
                  <div className='col-12 col-lg-10'>
                    <div className='row'>
                      <div className='col-12 col-lg-4'>
                        <label className='ms-1'>Cliente</label>
                        <input className='form-control' placeholder='Cliente' type="text"/>
                      </div>
                      <div className='col-12 col-lg-4'>
                        <label className='ms-1'>Inicio</label>
                        <input className='form-control' placeholder='Inicio' type="date"/>
                      </div>
                      <div className='col-12 col-lg-4'>
                        <label className='ms-1'>Fin</label>
                        <input className='form-control' placeholder='Fin' type="date"/>
                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-lg-2'>
                    <div className='d-flex flex-row align-items-end h-100'>
                      <button className='btn btn-primary'>Filtrar</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-12'>
                {this.renderBills()}
              </div>
              <div className='col-12'>
                <div className='d-flex flex-row justify-content-end mt-3 mb-3'>
                  <a className='btn btn-dark me-3' href={'/bills/'+this.state.idStore+'/'+Math.max(this.state.page-1, 1)}>Anterior</a>
                  {this.renderPagination()}
                  <a href={'/bills/'+this.state.idStore+'/'+parseInt(this.state.page+1)} className="btn btn-dark">Siguiente</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderBills(){
    const bills = this.state.bills;
    const items = [];
    for(let i=0; i<bills.length; i++){
      let b = bills[i];
      let fecha = new Date(b.CREATED_AT);
      items.push(
        <tr key={"bill-"+b.ID_BILL}>
          <td>{fecha.toDateString()}</td>
          <td>{b.CUSTOMER_NAME}</td>
          <td>${BillsService.toCurrency(b.AMMOUNT)}</td>
          <td>Abrir</td>
        </tr>
      )
    }
    let table = (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope='col'>Cliente</th>
              <th scope="col">Total</th>
              <th scope="col">Ver más</th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>  
      </div>
    )
    return table;
  }
  renderPagination(){
    const { lastPage, page, idStore} = this.state;
    const items = [];
    let selectedClass = "";
    if(lastPage <=3){
      for(let i=0; i<lastPage; i++){
        if(i+1===page){
          selectedClass = "selected-pagination";
        }
        items.push(
          <a href={'/bills/'+idStore+'/'+parseInt(i+1)} className={selectedClass+" me-3"} key={"page-"+i}>{i+1}</a>
        )
      }
    } else{
      if(page===1){
        selectedClass="selected-pagination me-3";
        items.push(
          <a href={'/bills/'+idStore+'/1'} className={selectedClass} key={"page-1"}>1</a>
        )
        items.push(
          <a href={'/bills/'+idStore+'/2'} className="me-3" key={"page-2"}>2</a>
        )
        items.push(
          <a href={'/bills/'+idStore+'/3'} className="me-3" key={"page-3"}>3</a>
        )
        items.push(
          <a href={'#'} key={"page-dots"} className="me-3">...</a>
        )
        items.push(
          <a href={'/bills/'+idStore+'/'+lastPage} className="me-3" key={"page-"+lastPage}>{lastPage}</a>
        )
      }
      else if(page!==lastPage){
        if(page-2>=1){
          items.push(
            <a href={'/bills/'+idStore+'/1'} className="me-3" key={"page-1"}>1</a>
          )
          items.push(
            <a href={'#'} key={"page-dots"} className="me-3">...</a>
          )
        }

        for(let i=page-2; i<page+1; i++){
          if(page===i){
            selectedClass="selected-pagination me-3";
          } else{
            selectedClass="me-3";
          }
          items.push(
            <a href={'/bills/'+idStore+'/'+parseInt(i+1)} className={selectedClass} key={"page-"+i}>{i+1}</a>
          )
        }
        if(page+1<lastPage){
          items.push(
            <a href={'#'} key={"page-dots-2"} className="me-3">...</a>
          )
          items.push(
            <a href={'/bills/'+idStore+'/'+parseInt(lastPage)} className={selectedClass} key={"page-"+lastPage}>{lastPage}</a>
          )
        }
      }
      else{
        items.push(
          <a href={'/bills/'+idStore+'/1'} className="me-3" key={"page-1"}>1</a>
        )

        items.push(
          <a href={'#'} key={"page-dots-2"} className="me-3">...</a>
        )

        items.push(
          <a href={'/bills/'+idStore+'/'+parseInt(lastPage-2)} className="me-3" key={"page-"+lastPage}>{lastPage-2}</a>
        )
        items.push(
          <a href={'/bills/'+idStore+'/'+parseInt(lastPage-1)} className="me-3" key={"page-"+lastPage}>{lastPage-1}</a>
        )
        items.push(
          <a href={'/bills/'+idStore+'/'+parseInt(lastPage)} className="selected-pagination me-3" key={"page-"+lastPage}>{lastPage}</a>
        )
      }
    }
    return items;
  }
}

export default function BillsFunc(props) {
  const navigation = useNavigate();
  const params = useParams();
  return <Bills navigation={navigation} params = {params}/>;
}