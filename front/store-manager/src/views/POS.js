import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import "../css/commons.css";
import Products from "../par/Products";
import CreateBillDialog from "../components/CreateBillDialog";
import BasicDialog from "../components/BasicDialog";
import Bills from "../par/Bills";

class POS extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authToken : localStorage.getItem("authToken"),
      idStore : parseInt(this.props.params.id),
      products : [],
      oldProducts : [],
      productsOptions : [],
      customerId : "",
      customerName : "",
      customerPhone : "",
      customerAddress : "",
      ammount : 0,
      idStatus : 0, //0->factura nueva
      productsSuggested : [],
      searchProducts : "",
      showCreateBill : false,
      showNotProducts : false,
      openedBills : [],
      openBillspage : 1,
      idBill : undefined,
      idBillDetail : undefined
    }
    this.keyUpFindProducts = this.keyUpFindProducts.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.renderSuggestedProducts = this.renderSuggestedProducts.bind(this);
    this.renderBillProducts = this.renderBillProducts.bind(this);
    this.addProductToBill = this.addProductToBill.bind(this);
    this.delProductFromBill = this.delProductFromBill.bind(this);
    this.updateBillProduct = this.updateBillProduct.bind(this);
    this.onCreateBillClose = this.onCreateBillClose.bind(this);
    this.openCreateBill = this.openCreateBill.bind(this);
    this.calcTotalAmmound = this.calcTotalAmmound.bind(this);
    this.renderOpenedBills = this.renderOpenedBills.bind(this);
    this.openedBillClicked = this.openedBillClicked.bind(this);
    this.cancelBillChangesClicked = this.cancelBillChangesClicked.bind(this);
    this.saveBillChangesClicked = this.saveBillChangesClicked.bind(this);
    this.closeBill = this.closeBill.bind(this);
  }

  componentDidMount(){
    Bills.getOpenedBills(this.state.authToken, this.state.idStore, this.state.openBillspage).then((resp)=>{
      let data = resp;
      if(data.result === "OK"){
        this.setState({
          openedBills : data.data
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  render(){
    const {products} = this.state;
    return(
      <>
        <BasicDialog isOpen={this.state.showNotProducts} config={{
            title : "No hay productos",
            body : "Debes tener por lo menos un producto en la orden para finalizar o guardar",
            actions : [
              {
                label : "Ok",
                func : ()=>{this.setState({showNotProducts : false})}
              }
            ]
          }}/>
        {
          products.length>0 && this.state.showCreateBill
          ?
          <>
          <CreateBillDialog idStore = {this.state.idStore} isOpen = {this.state.showCreateBill}
            config={{title : "Crear nueva factura/cuenta"}} closeFunc = {this.onCreateBillClose}
            products={products}
            />
          </>
          :
          <>
          </>
        }
        <div className="container-fluid bg-light">
          <Navbar/>
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-8" style={{position : "relative"}}>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text h-100"><i className="fa-solid fa-magnifying-glass"></i></span>
                    </div>
                    <input type="text" className="form-control" placeholder="Buscar producto por codigo de o nombre"
                    onChange={this.searchProducts} value={this.state.searchProducts} onKeyUp={this.keyUpFindProducts}/>
                  </div>
                  <div className="d-flex flex-column w-100 bg-white" 
                    style={{position : "absolute", top : "100%", left : "0", paddingLeft : "12px", paddingRight : "12px"}}>
                    {this.renderSuggestedProducts()}
                  </div>
              </div>
              <div className="col-12 col-lg-4">
                <div className="d-flex flex-row w-100 justify-content-end">
                  {
                    this.state.idStatus===0
                    ?
                    <button className="btn btn-primary mb-3 me-3" onClick={(e)=>{this.openCreateBill()}}>
                      Crear
                    </button>
                    :
                    <>
                      <button className="btn btn-dark mb-3 me-3" onClick={(e)=>{this.cancelBillChangesClicked()}}>
                        Cancelar
                      </button>
                      <button className="btn btn-success mb-3 me-3" onClick={(e)=>{this.saveBillChangesClicked()}}>
                        Guardar
                      </button>
                      <button className="btn btn-primary mb-3 me-3" onClick={(e)=>{this.closeBill()}}>
                        Finalizar cuenta
                      </button>
                    </>
                  }
                </div>
              </div>
              {
                this.state.customerName!==""
                ?
                <div className="col-12">
                  Cuenta de: {this.state.customerName}
                </div>
                :
                <></>
              }
              <div className="col-12 col-lg-2 d-none d-block-lg">
                <div className="row">
                  <div className="col-12 mt-3">
                    <a className="btn btn-dark mb-3" href={"/bills/"+this.state.idStore+"/1"}>
                      Todas las facturas
                    </a>
                  </div>
                  <div className="col-12">
                    Cuentas abiertas
                  </div>
                  <div className="col-12 mb-3">
                    <input type="text" className="form-control" placeholder="Buscar cuenta"/>
                  </div>
                  <div className="col-12">
                    {this.renderOpenedBills()}
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-10">
                <div className="row">
                  {this.state.products.length===0
                    ?
                    <>
                    </>
                    :
                    <>
                      <div className="col-12">
                        <div className="d-flex flex-column w-100">
                          {this.renderBillProducts()}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-flex flex-row justify-content-end">
                          Total:<span className="product-total ms-3 fw-bold">${Products.toCurrency(Math.round(this.state.ammount))}</span>
                        </div>
                      </div>
                    </>
                  }
                </div>
              </div>
              <div className="col-12 col-lg-2 d-block d-none-lg mt-3">
                <div className="row">
                  <div className="col-12 mt-3">
                    <div className="d-flex flex-row w-100 justify-content-end">
                      <a className="btn btn-dark mb-3" href={"/bills/"+this.state.idStore+"/1"}>
                        Todas las facturas
                      </a>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex flex-row w-100 justify-content-end">
                      Cuentas abiertas
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <input type="text" className="form-control" placeholder="Buscar cuenta"/>
                  </div>
                  <div className="col-12">
                    {this.renderOpenedBills()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  closeBill(){
    Bills.updateBillStatus(this.state.authToken, this.state.idBill, 4).then((resp) => {
      console.log(this.state.idBill, 4);
      this.cancelBillChangesClicked();
    }).catch((err) => {
      console.log(err);
    });
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
            console.log("Se actualiza", isDifferent);
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
        console.log("Se agrega", p);
        Bills.addProductToBill(this.state.authToken, this.state.idBill, p).then((resp) => {
          this.cancelBillChangesClicked();
        }).catch((err)=> {
          console.log(err);
        });
      }
    }
  }

  checkDifference(p, p2){
    var flag = false;
    if(p.idProduct === p2.ID_PRODUCT){
      if(p.units !== p2.UNITS || p.off !== p2.OFF){
        console.log("checkDifference", p, p2);
        return true;
      }
    } else{
      return false;
    }
  }

  cancelBillChangesClicked(){
    this.setState({
      idStatus : 0,
      products : [],
      oldProducts : [],
      ammount : 0,
      customerName : "",
      idBill : undefined,
      idBillDetail : undefined
    });
  }

  renderOpenedBills(){
    const items = [];
    const {openedBills} = this.state;

    for(let i=0; i<openedBills.length; i++){
      let b = openedBills[i];
      items.push(
        <div className="card mb-1" key={"opened-bill-"+i}
          onClick={()=>{this.openedBillClicked(b)}}>
          <div className="card-body">
            {b.CUSTOMER_NAME}
          </div>
        </div>
      )
    }

    return items;
  }

  openedBillClicked(bill){
    let idBill = bill.ID_BILL;
    let idStatus = bill.ID_STATUS;
    let products = [];
    Bills.getBillDetail(this.state.authToken, this.state.idStore, idBill).then((resp) => {
      let data = resp.data;
      let oldProducts = data;
      for(let i = 0; i<data.length; i++){
        products.push(this.parseProduct(data[i]));
      }
      this.setState({
        customerName : bill.CUSTOMER_NAME,
        products,
        oldProducts,
        idStatus,
        idBill : bill.ID_BILL,
        idBillDetail : data[0].ID_BILL_DETAIL
      }, ()=>{this.calcTotalAmmound()});
    }).catch((err) => {
      console.log(err);
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

  openCreateBill(){
    const {products} = this.state;
    if(this.state.products.length > 0){
      this.setState({
        showCreateBill : true,
        products : [...products]
      });
    } else{
      this.setState({
        showNotProducts : true
      });
    }
  }

  onCreateBillClose(param){
    if(param==="DEL-PRODUCTS"){
      this.setState({
        showCreateBill : false,
        products : [],
        ammount : 0
      });
    } else{
      this.setState({
        showCreateBill : false
      });
    }
  }

  delProductFromBill(idProduct){
    const {products, oldProducts, idStatus} = this.state;
    if(idStatus===0 || (idStatus===9 && products.length>1)){
      for(let i=0; i<products.length; i++){
        let p = products[i];
        if(p.idProduct === idProduct){
          if(idStatus===9 && p.idBillDetail){
            Bills.delProductFromBill(this.state.authToken, this.state.idBill, p.idBillDetail).then((resp) => {
              console.log(resp);
            }).catch((err) => {
              console.log(err);
            });
          }
          products.splice(i, 1);
          oldProducts.splice(i, 1);
          this.setState({
            products,
            oldProducts,
            ammount : this.state.ammount - (p.price*(1-p.off/100)*p.units)
          });
          break;
        }
      }
    }
  }

  addProductToBill(product){
    const {products} = this.state;
    let flag = true;

    for(let i=0; i<products.length; i++){
      let p = products[i];
      
      if(p.idProduct === product.ID_PRODUCT){
        p.units++;
        p.ammount+=p.price*(1-p.off/100);
        flag = false;
        products[i] = p;
        break;
      }
    }
    if(flag){
      products.push({
        idProduct : product.ID_PRODUCT,
        productName : product.PRODUCT_NAME,
        units : 1,
        price : product.PRODUCT_PRICE,
        description : "",
        ammount : product.PRODUCT_PRICE,
        off : product.PRODUCT_OFF,
        idBill : this.state.idBill,
        idBillDetail : null
      })
    }
    this.setState({
      products,
      searchProducts : "",
      productsSuggested : [],
      ammount : this.state.ammount + product.PRODUCT_PRICE
    });
  }

  updateBillProduct(idProduct, field, value){
    var {products} = this.state;
    products = [...products];
    for(let i=0; i<products.length; i++){
      let p = products[i];
      if(p.idProduct == idProduct){
        p[field] = value;
        p.ammount = p.units * (p.price*(1-p.off/100));
        products[i] = p;
        this.setState({
          products
        });
      }
    }
    this.calcTotalAmmound();
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
            <input className="form-control" type="number" value={p.units} min="1"
            onChange={(e)=>{this.updateBillProduct(p.idProduct, "units", e.target.value)}}/>
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
          <input className="form-control" type="number" value={p.off} onChange={(e)=>{this.updateBillProduct(p.idProduct, "off", parseInt(e.target.value))}}/>
          </td>
          <td>$<span className="product-price mb-3">{Products.toCurrency(p.ammount)}</span></td>
          <td style={{cursor : "pointer"}} onClick={(e)=>{this.delProductFromBill(p.idProduct)}}><i className="fa-solid fa-trash-can"></i></td>
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

  renderSuggestedProducts(){
    const {productsSuggested} = this.state;
    const items = [];
    for(let i=0; i<productsSuggested.length; i++){
      let p = productsSuggested[i];
      items.push(
        <div className="d-flex flex-row justify-content-between p-3"
          style={{cursor : "pointer"}} onClick={(e)=>{this.addProductToBill(p)}} key={"suggested-product-"+i}>
          <span>{p.PRODUCT_NAME}</span>
          <span className="product-price">${Products.toCurrency(p.PRODUCT_PRICE)}</span>
        </div>
      )
    }
    return items;
  }

  keyUpFindProducts(e){
    const {productsSuggested} = this.state;
    if ((e.key === 'Enter' || e.keyCode === 13) && productsSuggested.length > 0){
      this.addProductToBill(productsSuggested[0]);
    }
  }

  searchProducts(e){
    this.setState({searchProducts : e.target.value});
    if(e.target.value.length > 4){
      let idCategory = undefined;
      Products.findProducts(this.state.idStore, idCategory, e.target.value).then((resp)=>{
        this.setState({
          productsSuggested : this.updatePrices(resp.data)
        });
      }).catch((err)=>{
        console.log("Error while searching products", err);
      })
    } else{
      this.setState({
        productsSuggested : []
      });
    }
  }
  updatePrices(products){
    for(let i=0; i<products.length; i++){
      //products[i].PRODUCT_PRICE = products[i].PRODUCT_PRICE * (1-(products[i].PRODUCT_OFF/100));
    }
    return products;
  }
  userUpdatePrice(idProduct){

  }
}

export default function RolesFunc(props) {
  const navigation = useNavigate();
  const params = useParams();
  return <POS navigation={navigation} params = {params}/>;
}