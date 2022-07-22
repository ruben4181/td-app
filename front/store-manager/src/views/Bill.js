import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BasicDialog from "../components/BasicDialog";
import Navbar from "../components/Navbar";
import Products from '../par/Products';
import Bills from '../par/Bills';
import Footer from "../components/Footer";

class Bill extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authToken : localStorage.getItem("authToken"),
      idStore : parseInt(this.props.params.idStore),
      idBill : parseInt(this.props.params.idBill),
      products : [],
      isDisabled : true,
      code : 'Codigo prueba',
      billStatus : 'PAGADO Y ENTREGADO',
      ammount : 0
    }
    this.calcTotalAmmound = this.calcTotalAmmound.bind(this);
    this.renderBillProducts = this.renderBillProducts.bind(this);
  }

  componentDidMount(){
    Bills.getBill(this.state.authToken, this.state.idStore, this.state.idBill).then((resp) => {
      if(resp.result==="OK"){
        let data = resp.data;
        this.setState({
          code : data.CODE,
          billStatus : data.ESTADO,
          ammount : data.AMMOUNT,
          customerId : data.CUSTOMER_ID,
          customerName : data.CUSTOMER_NAME,
          customerPhone : data.CUSTOMER_PHONE,
          customerAddress : data.CUSTOMER_ADDRESS
        })
      }
    });
    Bills.getBillDetail(this.state.authToken, this.state.idStore, this.state.idBill).then((resp) => {
      if(resp.result==="OK"){
        let data = resp.data;
        let tmp = [];
        for(let i=0; i<data.length; i++){
          tmp.push(this.parseProduct(data[i]));
        }
        this.setState({
          products : tmp
        });//, ()=>{this.calcTotalAmmound()});
      }
    });
  }

  parseProduct(product){
    let parsed = {
      "idBill" : product.ID_BILL,
      "idProduct" : product.ID_PRODUCT,
      "units" : product.UNITS,
      "cost" : product.COST,
      "off" : product.OFF,
      "productName" : product.PRODUCT_NAME,
      "price" : product.PRICE,
      "ammount" : Math.round(product.PRICE* (1-product.OFF/100) * product.UNITS),
      "idBillDetail" : product.ID_BILL_DETAIL
    };
    return parsed;
  }

  render(){
    return(
      <>
      {!this.state.authToken?
        <BasicDialog isOpen={true} config={{
            title : "No has iniciado sesión",
            body : "Por favor, inicia sesión e ingresa nuevamente a esta página",
            actions : [
              {
                label : "Ok",
                func : ()=>{this.props.navigation("/login")}
              }
            ]
          }}/>
        :
        <>
          <div className='container-fluid p-0'>
            <Navbar/>
            <div className='container body-container'>
              <div className='row'>
                <div className="col-12">
                  <h1>Factura</h1>
                </div>
                <div className="col-12">
                  <h5>Información del cliente</h5>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={this.state.code} disabled={this.state.isDisabled}/>
                    <label>Codigo</label>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={this.state.billStatus} disabled={this.state.isDisabled}/>
                    <label>Estado</label>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={this.state.customerName} disabled={this.state.isDisabled}/>
                    <label>Nombre cliente</label>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={this.state.customerId} disabled={this.state.isDisabled}/>
                    <label>Número identificación</label>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={this.state.customerPhone} disabled={this.state.isDisabled}/>
                    <label>Teléfono</label>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={this.state.customerAddress} disabled={this.state.isDisabled}/>
                    <label>Dirección</label>
                  </div>
                </div>
                <div className="col-12">
                  <h5>Detalle de factura</h5>
                </div>
                <div className="col-12">
                  {this.renderBillProducts()}
                </div>
                <div className="col-12">
                  <div className="d-flex flex-row justify-content-end">
                    Total:<span className="product-total ms-3 fw-bold">${Products.toCurrency(Math.round(this.state.ammount))}</span>
                  </div>
                </div>
              </div>
            </div>
            <Footer/>
          </div>
        </>
      }
      </>
    )
  }

  renderBillProducts(){
    const {products} = this.state;
    const items = [];
    for(let i=0; i<products.length; i++){
      let p = products[i];
      p.ammount = Math.round(p.price*(1-p.off/100)) * p.units;
      items.push(
        <tr key={"bill-products_"+i}>
          <td>{p.productName}</td>
          <td style={{maxWidth : "30px"}}>
            <input className="form-control" type="number" value={p.units} min="1" disabled={this.state.isDisabled}/>
          </td>
          <td>
            <div className="d-flex flex-column h-100 align-items-center justify-content-center">
              {
                p.off !== 0 ?
                <del>$<span className="product-price-old mb-3">{Products.toCurrency(p.price)}</span></del>
                :
                <></>
              }
              
              <span className="product-price mb-3">${Products.toCurrency(Math.round(p.price*(1-p.off/100)))}</span>
            </div>
          </td>
          <td style={{maxWidth : "30px"}}>
          <input className="form-control" type="number" value={p.off} disabled={this.state.isDisabled}/>
          </td>
          <td>$<span className="product-price mb-3">{Products.toCurrency(p.ammount)}</span></td>
          {
            this.state.isDisabled
            ?
            <>
            </>
            :
            <td style={{cursor : "pointer"}} onClick={(e)=>{this.delProductFromBill(p.idProduct)}}><i className="fa-solid fa-trash-can"></i></td>
          }
        </tr>
      )
    }


    let table = (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">Unidades</th>
              <th scope="col">Valor Unitario</th>
              <th scope="col">Descuento</th>
              <th scope="col">Total</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>  
      </div>
      
    );
    return table;
  }

  calcTotalAmmound(){
    const {products} = this.state;
    let ammount = 0;
    for(let i=0; i<products.length; i++){
      let p = products[i];
      ammount += p.units * (p.price*(1-p.off/100));
    }
    this.setState({
      ammount
    });
  }
}

export default function BillFunc(props) {
  const navigation = useNavigate();
  const params = useParams();
  return <Bill navigation={navigation} params = {params}/>;
}