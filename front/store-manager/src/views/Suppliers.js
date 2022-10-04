import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CreateSupplier from "../components/CreateSupplier";
import SuppliersServices from "../par/Suppliers";
import "../css/commons.css";
import SupplierDialog from "../components/SupplierDialog";
import Products from "../par/Products";
import Bills from "../par/Bills";
import CreateSupplierBillDialog from "../components/CreateSupplierBillDialog";
import BasicDialog from "../components/BasicDialog";
import '../css/links.css';
import CreateCostDialog from "../components/CreateCostDialog";
import Costs from "../par/Costs";

class Suppliers extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authToken : localStorage.getItem("authToken"),
      idStore : props.params.idStore,
      suppliersQuery : "",
      query : "",
      suppliers : [],
      suppliersPage : 1,
      suppliersLast : 1,
      addSuplierShow : false,
      supplierShow : false,
      currentSupplier : -1,
      productsSuggested : [],
      products : [],
      oldProducts : [],
      ammount : 0,
      idStatus : 0,
      showCreateBill : false,
      showNotProducts : false,
      recentSupplierBills : [],
      showCreateCost : false,
      recentCosts : []
    }
    this.addSupplierClicked = this.addSupplierClicked.bind(this);
    this.onCloseAddSupplier = this.onCloseAddSupplier.bind(this);
    this.fetchSuppliers = this.fetchSuppliers.bind(this);
    this.renderSuppliers = this.renderSuppliers.bind(this);
    this.suppliersQueryOnChange = this.suppliersQueryOnChange.bind(this);
    this.supplierClicked = this.supplierClicked.bind(this);
    this.onCloseSuppler = this.onCloseSuppler.bind(this);
    this.seeMoreSuppliersClicked = this.seeMoreSuppliersClicked.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.renderSuggestedProducts = this.renderSuggestedProducts.bind(this);
    this.addProductToBill = this.addProductToBill.bind(this);
    this.keyUpFindProducts = this.keyUpFindProducts.bind(this);
    this.updatePrices = this.updatePrices.bind(this);
    this.renderBillProducts = this.renderBillProducts.bind(this);
    this.delProductFromBill = this.delProductFromBill.bind(this);
    this.updateBillProduct = this.updateBillProduct.bind(this);
    this.createSupplierBillClicked = this.createSupplierBillClicked.bind(this);
    this.onCreateBillClose = this.onCreateBillClose.bind(this);
    this.fetchRecentBills = this.fetchRecentBills.bind(this);
    this.renderRecentSuppliersBills = this.renderRecentSuppliersBills.bind(this);
    this.onCreateCostClose = this.onCreateCostClose.bind(this);
    this.addCostClicked = this.addCostClicked.bind(this);
    this.fetchRecentCosts = this.fetchRecentCosts.bind(this);
    this.renderRecentCosts = this.renderRecentCosts.bind(this);
  }

  componentDidMount(){
    this.fetchSuppliers();
    this.fetchRecentBills();
    this.fetchRecentCosts();
  }

  fetchRecentBills(){
    SuppliersServices.getBills(this.state.authToken, {
      idStore : this.state.idStore,
      page : 1
    }).then((resp) => {
      this.setState({
        recentSupplierBills : resp.data
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  fetchRecentCosts(){
    Costs.getCosts(this.state.authToken, {
      idStore : this.state.idStore, 
      page : 1}
      ).then((resp) => {
      this.setState({
        recentCosts : resp.data
      });
    });
  }

  render(){
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
          this.state.showCreateBill
          ?
          <CreateSupplierBillDialog idStore = {this.state.idStore} isOpen = {this.state.showCreateBill}
            config={{title : "Pedido de inventario"}} closeFunc = {this.onCreateBillClose}
            products={this.state.products}
          />
          :
          <>
          </>
        }
        {
          this.state.showCreateCost
          ?
          <CreateCostDialog idStore = {this.state.idStore} isOpen = {this.state.showCreateCost}
          config={{title : "Agregar gasto"}} closeFunc = {this.onCreateCostClose}/>
          :
          <></>
        }
        <div className="container-fluid p-0 bg-light">
          <Navbar idStore={this.state.idStore}/>
          <div className="container body-container">
            <div className="row">
              <div className="col-12 col-lg-6">
                <h1 className="title-primary-text">Gastos y proveedores</h1>
              </div>
              <div className="col-12 col-lg-6">
                <div className="d-flex flex-row w-100 justify-content-end pt-2">
                  <button className="btn btn-danger" onClick={()=>{this.addCostClicked()}}>Agregar gasto</button>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 col-lg-4 mb-3">
                <h3>Pedido de productos</h3>
              </div>
              <div className="col-12 col-lg-8 mb-3 p-0" style={{position : "relative"}}>
                <input type="text" className="form-control" placeholder="Buscar producto" onChange={this.searchProducts} 
                  value={this.state.searchProducts} onKeyUp={this.keyUpFindProducts}/>
                <div className="d-flex flex-column w-100 bg-white" 
                  style={{position : "absolute", top : "100%", left : "0", paddingLeft : "12px", paddingRight : "12px"}}>
                  {this.renderSuggestedProducts()}
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="row mt-3">
                  <div className="col-12 col-lg-9">
                    {
                      this.state.products.length<1
                      ?
                      <div className="form-text">Aquí puedes agregar los gastos relacionados a prouctos,
                      registrados en el inventario, para gastos como pago de servicios públicos, 
                      mantenimiento, arriendo... presiona el botón "Agregar gasto" de la parte superior derecha</div>
                      :
                      <></>
                    }
                    
                    <div className="row">
                      <div className="col-12 mb-3">
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
                      <div className="col-12 mb-3">
                        <div className="d-flex flex-row w-100 justify-content-end">
                          <button className="btn btn-primary" 
                          onClick={this.createSupplierBillClicked}>Crear factura</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-3 bg-white">
                    <div className="row">
                      <div className="col-12 mb-2 mt-2">
                        <span>Facturas recientes</span>
                      </div>
                      <div className="col-12">
                        {this.renderRecentSuppliersBills()}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 mb-2 mt-2">
                        <span>Gastos recientes</span>
                      </div>
                      <div className="col-12">
                        {this.renderRecentCosts()}
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 col-lg-4 mb-3">
                <h3>Proveedores</h3>
              </div>
              <div className="col-12 col-lg-8 mb-3">
                <div className="row">
                  <div className="col-12 col-lg-3 mb-3">
                    <div className="d-flex flex-row w-100 justify-content-end">
                      <button className="btn btn-dark" onClick={()=>{this.addSupplierClicked()}}>Agregar</button>
                    </div>
                  </div>
                  <div className="col-12 col-lg-9 mb-3">
                    <input type="text" className="form-control" placeholder="Buscar proveedor" value={this.state.suppliersQuery}
                    onChange={this.suppliersQueryOnChange}/>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  {this.renderSuppliers()}
                </div>
                <div className="row">
                  <div className="col-12 m-3">
                    <div className="d-flex flex-row justify-content-center align-items-center w-100">
                      <button className="btn btn-primary" onClick={this.seeMoreSuppliersClicked}>
                        {
                          this.state.suppliersPage<this.state.suppliersLast
                          ?
                          <span>Ver más proveedores</span>
                          :
                          <span>Ir al inicio</span>
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer/>
          {
            this.state.addSuplierShow
            ?
            <CreateSupplier idStore={this.state.idStore} isOpen={this.state.addSuplierShow}
            onClose={this.onCloseAddSupplier}/>
            :
            <>
            </> 
          }
          {
            this.state.supplierShow
            ?
            <SupplierDialog idStore={this.state.idStore} isOpen={this.state.supplierShow}
            onClose={this.onCloseSuppler} idSupplier={this.state.currentSupplier}/>
            :
            <></>
          }
        </div>
      </>
      
    )
  }

  addCostClicked(){
    this.setState({
      showCreateCost : true
    });
  }

  onCreateCostClose(e){
    if(e==="RELOAD"){
      this.fetchRecentCosts();
    }
    this.setState({
      showCreateCost : false
    });
  }

  renderRecentSuppliersBills(){
    const {recentSupplierBills, idStore} = this.state;
    const items = [];
    let limit = 1;
    let flag = false;

    for(let i=0; i<recentSupplierBills.length; i++){
      flag = true;
      if(i>=limit){
        break;
      }
      let b = recentSupplierBills[i];

      if(!b.DESCRIPTION || b.DESCRIPTION === ''){
        continue;
      }

      items.push(
        <a className="link-unstyled p-0" key={"supplier-bill-"+i} href={"/suppliers/costs/bills/"+b.ID_BILL}>
          <div className="card mb-2">
            <div className="col-12 p-2" style={{cursor : "pointer"}}>
              <div className="form-text">{b.DESCRIPTION}</div>
              <div className="form-text">{b.REF_PAGO}</div>
              <div className="">${Products.toCurrency(b.PARTIAL_AMMOUNT)}</div>
            </div>
          </div>
        </a>
      );
    }

    if(flag){
      items.push(
        <a className="nav-link p-0" key={"view-more-bills-1"} href={"/suppliers/costs/bills/"+idStore}>Ver más facturas</a>
      )
    }
    return items;
  }

  renderRecentCosts(){
    const {recentCosts, idStore} = this.state;
    const items = [];
    let limit = 1;
    let flag = false;

    for(let i=0; i<recentCosts.length; i++){
      flag = true;
      if(i>=limit){
        break;
      }
      let b = recentCosts[i];

      if(!b.DESCRIPTION || b.DESCRIPTION === ''){
        continue;
      }

      items.push(
        <a className="link-unstyled p-0" key={"supplier-bill-"+i} href={"/costs/"
          +this.state.idStore+"/"+b.ID_COST}>
          <div className="card mb-2">
            <div className="col-12 p-2" style={{cursor : "pointer"}}>
              <div className="form-text">{b.DESCRIPTION}</div>
              <div className="form-text">{b.REF_PAGO}</div>
              <div className="">${Products.toCurrency(b.AMMOUNT)}</div>
            </div>
          </div>
        </a>
      );
    }

    if(flag){
      items.push(
        <a className="nav-link p-0" key={"view-more-bills-1"} href={"/suppliers/costs/"+idStore}>Ver más gastos</a>
      )
    }
    return items;
  }

  onCreateBillClose(e){
    if(e==="DEL-PRODUCTS") {
      this.fetchRecentBills();
      this.setState({
        products : [],
        showCreateBill : false
      });
    } else{
      this.setState({
        showCreateBill : false
      })
    }
  }

  createSupplierBillClicked(e){
    if(this.state.products.length>=1){
      this.setState({
        showCreateBill : true
      });
    } else{
      this.setState({
        showNotProducts : true
      });
    }
  }

  calcTotalAmmound(){
    const {products} = this.state;
    let ammount = 0;
    for(let i=0; i<products.length; i++){
      let p = products[i];
      ammount += p.units * (p.cost);
    }
    this.setState({
      ammount
    });
  }

  updateBillProduct(idProduct, field, value){
    var {products} = this.state;
    products = [...products];
    for(let i=0; i<products.length; i++){
      let p = products[i];
      if(p.idProduct === idProduct){
        p[field] = value;
        p.ammount = p.units * (p.cost);
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
      p.ammount = Math.round(p.cost) * p.units;
      items.push(
        <tr key={"bill-products_"+i}>
          <td>{p.productName}</td>
          <td style={{maxWidth : "30px"}}>
            <input className="form-control" type="number" value={p.units} min="1"
            onChange={(e)=>{this.updateBillProduct(p.idProduct, "units", e.target.value)}}/>
          </td>
          <td>
            <div className="d-flex flex-column h-100 align-items-center justify-content-center">
              <span className="product-price mb-3">${Products.toCurrency(p.cost)}</span>
            </div>
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
              <th scope="col">Costo Unitario</th>
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

  delProductFromBill(idProduct){
    const {products, oldProducts, idStatus} = this.state;
    if(idStatus===0 || (idStatus===9 && products.length>1)){
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
            ammount : this.state.ammount - (p.cost)
          });
          break;
        }
      }
    }
  }

  updatePrices(products){
    for(let i=0; i<products.length; i++){
      //Pass
    }
    return products;
  }

  addProductToBill(product){
    const {products} = this.state;
    let flag = true;

    for(let i=0; i<products.length; i++){
      let p = products[i];
      
      if(p.idProduct === product.ID_PRODUCT){
        p.units++;
        p.ammount+=p.cost;
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
        ammount : product.PRODUCT_COST,
        off : product.PRODUCT_OFF,
        idBill : this.state.idBill,
        idBillDetail : null,
        cost : product.PRODUCT_COST
      })
    }
    this.setState({
      products,
      searchProducts : "",
      productsSuggested : [],
      ammount : this.state.ammount + product.PRODUCT_COST
    });
  }

  keyUpFindProducts(e){
    const {productsSuggested} = this.state;
    if ((e.key === 'Enter' || e.keyCode === 13) && productsSuggested.length > 0){
      this.addProductToBill(productsSuggested[0]);
    } else{
      if((e.key === 'Enter' || e.keyCode === 13) && this.state.searchProducts.length>4){
        let idCategory = undefined;
        Products.findProducts(this.state.idStore, idCategory, this.state.searchProducts).then((resp) => {
          this.setState({
            productsSuggested : this.updatePrices(resp.data)
          }, ()=>{
            if(this.state.productsSuggested.length>0)
            this.addProductToBill(this.state.productsSuggested[0]);
          });
        });
      }
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

  seeMoreSuppliersClicked(e){
    const {authToken, idStore, query, suppliersPage, suppliersLast, suppliers} = this.state;
    if(suppliersPage < suppliersLast){
      let page = suppliersPage + 1;
      SuppliersServices.getSuppliers(authToken, idStore, query, page).then((resp) => {
        let newSuppliers = [...suppliers];
        newSuppliers = newSuppliers.concat(resp.data);
        this.setState({
          suppliersPage : page,
          suppliers : newSuppliers
        });
      }).catch((err) => {
        console.log(err);
      });
    } else{
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
  }

  suppliersQueryOnChange(e){
    let value = e.target.value;
    this.setState({
      suppliersQuery : value
    }, ()=>{
      if(value.length > 4){
        this.setState({
          query : value
        }, ()=> {
          this.fetchSuppliers();
        });
      } else{
        this.setState({
          query : "",
          suppliersPage : 1
        }, ()=>{
          this.fetchSuppliers();
        });
      }
    });
  }
  
  renderSuppliers(){
    const {suppliers} = this.state;
    const items = [];

    for(let i=0; i<suppliers.length; i++){
      let supplier = suppliers[i];
      items.push(
        <div className="col-12 col-md-6 col-xxl-3 mb-3" key={"supplier-"+i}>
          <div className="card m-1 h-100" onClick={(e)=>{this.supplierClicked(supplier.ID_SUPPLIER)}}>
            <div className="card-body">
              <div className="d-flex flex-row h-100 align-items-center">
                <div className="card-text">
                  <div className="d-flex flex-row w-100 align-items-center">
                    <div className="contact-circle me-3">
                      {this.getContactLetters(supplier.SUPPLIER_NAME)}
                    </div>
                    <div className="d-flex flex-column">
                      <span className="">{supplier.SUPPLIER_NAME}</span>
                      <span className="fw-light text-secondary">{supplier.SUPPLIER_PHONE}</span>
                      <span className="fw-light text-secondary">{supplier.SUPPLIER_EMAIL}</span>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )
    }
    return items;
  }

  supplierClicked(idSupplier){
    this.setState({
      currentSupplier : idSupplier
    }, ()=> {
      this.setState({
        supplierShow : true
      })
    });
  }

  onCloseSuppler(someChanged){
    this.setState({
      supplierShow : false,
      suppliersPage : someChanged?1:this.state.suppliersPage
    }, ()=>{
      if(someChanged){
        this.fetchSuppliers();
      }
    })
  }

  getContactLetters(text){
    let letters = "";
    let splitted = text.split(" ");
    if(splitted.length>1){
      letters = splitted[0][0] + splitted[splitted.length-1][0];
    } else{
      if(splitted.length>1){
        letters = splitted[0][0]+splitted[1][0];
      } else{
        letters = splitted[0][0]+splitted[0][0];
      }
    }
    return letters.toLocaleUpperCase();
  }

  fetchSuppliers(){
    let {idStore, query, suppliersPage, authToken} = this.state;

    if(query && query === ""){
      query = undefined;
    }

    SuppliersServices.getSuppliers(authToken, idStore, query, suppliersPage).then((resp) => {
      this.setState({
        suppliersPage : 1,
        suppliers : resp.data,
        suppliersLast : resp.lastPage
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  addSupplierClicked(){
    this.setState({
      addSuplierShow : true
    });
  }
  onCloseAddSupplier(){
    this.setState({
      addSuplierShow : false
    }, ()=> {
      this.fetchSuppliers();
    });
  }
}

export default function ViewFunc(props) {
  const navigation = useNavigate();
  const params = useParams();
  return <Suppliers navigation={navigation} params = {params}/>;
}