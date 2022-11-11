import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import BasicDialog from "../components/BasicDialog";
import Navbar from "../components/Navbar";
import Products from '../par/Products';
import Bills from '../par/Bills';
import Footer from "../components/Footer";
import Select from "react-select";
import Costs from "../par/Costs";

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
      ammount : 0,
      statusOptions : [],
      tipoPagoOptions : [],
      selectedStatus : {},
      selectedTipoPago : {},
      searchProduct : "",
      productsSuggested : [],
      oldProducts : [],
      idStatus : 9
    }
    this.calcTotalAmmound = this.calcTotalAmmound.bind(this);
    this.renderBillProducts = this.renderBillProducts.bind(this);
    this.editClicked = this.editClicked.bind(this);
    this.delClicked = this.delClicked.bind(this);
    this.updateField = this.updateField.bind(this);
    this.productListener = this.productListener.bind(this);
    this.addProductToBill = this.addProductToBill.bind(this);
    this.updateBillProduct = this.updateBillProduct.bind(this);
    this.delProductFromBill = this.delProductFromBill.bind(this);
  }

  componentDidMount(){
    Bills.getBill(this.state.authToken, this.state.idStore, this.state.idBill).then((resp) => {
      if(resp.result==="OK"){
        let data = resp.data;
        this.setState({
          code : data.CODE,
          billStatus : data.ESTADO,
          ammount : data.AMMOUNT,
          supplierId : data.SUPPLIER_ID,
          supplierName : data.SUPPLIER_NAME,
          supplierPhone : data.SUPPLIER_PHONE,
          supplierAddress : data.SUPPLIER_ADDRESS,
          ammount : data.TOTAL,
          refPago : data.REF_PAGO,
          description : data.DESCRIPTION,
          selectedStatus : { value : data.ID_STATUS, label : data.ESTADO},
          selectedTipoPago : { value : data.ID_TIPO_PAGO, label : data.TIPO_PAGO}
        });
        
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
          products : tmp,
          oldProducts : [...tmp]
        });//, ()=>{this.calcTotalAmmound()});
      }
    });
    Bills.getParTipoPago(this.state.authToken).then((resp) => {
      if(resp.result==="OK"){
        let data = resp.data;
        let tmp = [];
        for(let i=0; i<data.length; i++){
          tmp.push({
            value : data[i].ID_TIPO_PAGO,
            label : data[i].DESCRIPTION
          });
        }
        this.setState({
          tipoPagoOptions : tmp
        });
      }
    });
    Costs.getStatus(this.state.authToken).then((resp) => {
      if(resp.result==="OK"){
        let data = resp.data;
        let tmp = [];
        for(let i=0; i<data.length; i++){
          tmp.push({
            value : data[i].ID_STATUS,
            label : data[i].DESCRIPTION
          });
        }
        this.setState({
          statusOptions : tmp
        });
      }
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
            <Navbar idStore={this.state.idStore}/>
            <div className='container body-container'>
              <div className='row'>
                <div className="col-12 col-lg-6">
                  <h3>Factura</h3>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="d-flex flex-row justify-content-end">
                    <button type="button" className={!this.state.isDisabled?"btn btn-primary active":"btn btn-primary "} 
                      data-bs-toggle="button" autocomplete="off" aria-pressed="true"
                      onClick={this.editClicked}>Editar</button>
                    <button className="btn btn-danger ms-3" onClick={this.delClicked}>Borrar</button>
                  </div>
                </div>
                <div className="col-12">
                  <h5>Información del proveedor</h5>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={this.state.supplierName} disabled={this.state.isDisabled}/>
                    <label>Nombre</label>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={this.state.supplierId} disabled={this.state.isDisabled}/>
                    <label>Número identificación</label>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={this.state.supplierPhone} disabled={this.state.isDisabled}/>
                    <label>Teléfono</label>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={this.state.supplierAddress} disabled={this.state.isDisabled}/>
                    <label>Dirección</label>
                  </div>
                </div>
                <div className="col-12">
                  <h5>Información de la transacción</h5>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="mb-3">
                    <div className="form-text">Estado</div>
                      <Select options={this.state.statusOptions} placeholder="Estado" 
                          isDisabled={this.state.isDisabled} value={this.state.selectedStatus}
                          onChange={(e)=>{this.setState({selectedStatus : e})}}
                          disabled={this.state.isDisabled}/>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="mb-3">
                    <div className="form-text">Tipo de pago</div>
                      <Select options={this.state.tipoPagoOptions} placeholder="Tipo de pago" 
                          isDisabled={this.state.isDisabled} value={this.state.selectedTipoPago}
                          onChange={(e)=>{this.setState({selectedTipoPago : e})}}
                          disabled={this.state.isDisabled}/>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={this.state.code} disabled={this.state.isDisabled}/>
                    <label>Codigo</label>
                  </div>
                </div>
                <div className="col-12 col-lg-6">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" value={this.state.refPago} disabled={this.state.isDisabled}/>
                    <label>Referencia</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                    <textarea className="form-control" disabled={this.state.isDisabled} value={this.state.description}></textarea>
                    <label>Descripción</label>
                  </div>
                </div>
                <div className="col-12">
                  <h5>Detalle de factura</h5>
                </div>
                {
                  !this.state.isDisabled?
                  <>
                  <div className="col-12">
                    <div className="m3">
                      <label>Agregar producto</label>
                      <input type="text" className="form-control" placeholder="Buscar productos"
                      value={this.state.searchProduct} 
                      onChange={this.productListener}/>
                    </div>
                  </div>
                  <div className="col-12" style={{position : "relative"}}>
                    <div className="d-flex flex-column w-100 bg-white">
                        {this.renderSuggestedProducts()}
                      </div>
                  </div>
                  </>
                  :
                  <></>
                }
                <div className="col-12">
                  {this.renderBillProducts()}
                </div>
                <div className="col-12 mb-3">
                  <div className="d-flex flex-row justify-content-end">
                    Total:<span className="product-total ms-3 fw-bold">${Products.toCurrency(Math.round(this.state.ammount))}</span>
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="d-flex flex-row justify-content-end">
                    <button className="btn btn-success">Guardar</button>
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

  productListener(e){
    let p = e.target.value;
    this.setState({
      searchProduct : p
    });
    if(p.length >= 4){
      let idCategory = undefined;
      Products.findProducts(this.state.idStore, idCategory, p).then((resp)=>{
        this.setState({
          productsSuggested : resp.data
        });
      }).catch((err)=>{
        console.log("Error while searching products", err);
      });
    } else{
      this.setState({
        productsSuggested : []
      });
    }
  }

  updateField(target, value){
    let tmp = {};
    tmp[target] = value;
    this.setState(tmp);
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

  delClicked(e){

  }

  renderBillProducts(){
    const {products} = this.state;
    const items = [];
    for(let i=0; i<products.length; i++){
      let p = products[i];
      p.ammount = Math.round(p.cost*(1-p.off/100)) * p.units;
      items.push(
        <tr key={"bill-products_"+i}>
          <td>{p.productName}</td>
          <td style={{maxWidth : "30px"}}>
            <input className="form-control" type="number" value={p.units} min="1" disabled={this.state.isDisabled}
            onChange={(e)=>{this.updateBillProduct(p.idProduct, "units", e.target.value)}}/>
          </td>
          <td>
            <div className="d-flex flex-column h-100 align-items-center justify-content-center">
              <span className="product-price mb-3">${Products.toCurrency(Math.round(p.cost*(1-p.off/100)))}</span>
            </div>
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

  renderSuggestedProducts(){
    const {productsSuggested} = this.state;
    const items = [];
    for(let i=0; i<productsSuggested.length; i++){
      let p = productsSuggested[i];
      items.push(
        <div className="d-flex flex-row justify-content-between p-3"
          style={{cursor : "pointer"}} onClick={(e)=>{this.addProductToBill(p)}} key={"suggested-product-"+i}>
          <span>{p.PRODUCT_NAME}</span>
          <span className="product-price">${Products.toCurrency(p.PRODUCT_COST)}</span>
        </div>
      )
    }
    return items;
  }

  calcTotalAmmound(){
    const {products} = this.state;
    let ammount = 0;
    for(let i=0; i<products.length; i++){
      let p = products[i];
      ammount += p.units * (p.cost*(1-p.off/100));
    }
    this.setState({
      ammount
    });
  }

  addProductToBill(product){
    const {products} = this.state;
    let flag = true;

    for(let i=0; i<products.length; i++){
      let p = products[i];

      if(p.idProduct === product.ID_PRODUCT){
        if(!p.cost){
          p.cost = 0;
        }
        p.units++;
        p.ammount+=p.cost*(1-p.off/100);
        flag = false;
        products[i] = p;
        break;
      }
    }

    console.log(product);

    if(flag){
      products.push({
        idProduct : product.ID_PRODUCT,
        productName : product.PRODUCT_NAME,
        units : 1,
        price : product.PRODUCT_PRICE,
        cost : product.PRODUCT_COST,
        description : "",
        ammount : product.PRODUCT_COST,
        off : product.PRODUCT_OFF,
        idBill : this.state.idBill,
        idBillDetail : null
      })
    }
    this.setState({
      products,
      searchProduct : "",
      productsSuggested : [],
      ammount : this.state.ammount + product.PRODUCT_COST
    });
  }
  updateBillProduct(idProduct, field, value){
    var {products} = this.state;
    products = [...products];
    for(let i=0; i<products.length; i++){
      let p = products[i];
      if(p.idProduct === idProduct){
        p[field] = value;
        p.ammount = p.units * (p.cost*(1-p.off/100));
        products[i] = p;
        this.setState({
          products
        });
      }
    }
    this.calcTotalAmmound();
  }

  delProductFromBill(idProduct){
    const {products, oldProducts, idStatus} = this.state;
    console.log("Status", idStatus, products.length);
    if(idStatus===0 || (idStatus===9 && products.length>=1)){
      for(let i=0; i<products.length; i++){
        let p = products[i];
        if(p.idProduct === idProduct){
          if(idStatus===9 && p.idBillDetail){
            Bills.delProductFromBill(this.state.authToken, this.state.idBill, p.idBillDetail).then((resp) => {
            }).catch((err) => {
              console.log(err);
            });
          }
          products.splice(i, 1);
          oldProducts.splice(i, 1);
          this.setState({
            products,
            oldProducts,
            ammount : this.state.ammount - (p.cost*(1-p.off/100)*p.units)
          });
          break;
        }
      }
    }
  }

  saveBillChangesClicked(){
    const {products, oldProducts} = this.state;
    for(let i=0; i<products.length; i++){
      let p = products[i];
      let isNew = true;
      var toSave;
      for(let j=0; j<oldProducts.length; j++){
        let p2 = oldProducts[j];
        if(p2.ID_PRODUCT === p.idProduct){
          toSave = p2;
          isNew = false;
          let isDifferent = this.checkDifference(p, toSave);
          if(!isNew && isDifferent){
            Bills.updateProductFromBill(this.state.authToken, p).then((resp) => {
              this.cancelBillChangesClicked();
            }).catch((err) => {
              console.log(err);
            });
          }
          break;
        }
      }
      if(isNew){
        Bills.addProductToBill(this.state.authToken, this.state.idBill, p).then((resp) => {
          this.cancelBillChangesClicked();
        }).catch((err)=> {
          console.log(err);
        });
      }
    }
  }
}

export default function BillFunc(props) {
  const navigation = useNavigate();
  const params = useParams();
  return <Bill navigation={navigation} params = {params}/>;
}