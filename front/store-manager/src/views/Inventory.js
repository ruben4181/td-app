import React, {useRef} from "react";
import Roles from "../par/Roles";
import BasicDialog from "../components/BasicDialog";
import CreateCategoryDialog from "../components/CreateCategoryDialog";
import CreateProductDialog from "../components/CreateProductDialog";
import { useNavigate, useParams } from "react-router-dom";
import '../css/commons.css';
import Categories from "../par/Categories";
import Products from "../par/Products";
import Select from 'react-select';

import "../css/commons.css";
import Navbar from "../components/Navbar";
import ProductDialog from "../components/ProductDialog";
import Footer from "../components/Footer";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;

class Inventory extends React.Component{
  constructor(props){
    super(props);

    const query = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    
    this.state = {
      authToken : localStorage.getItem("authToken"),
      idStore : this.props.params.id,
      params : props.params,
      page : props.params.page || 1,
      roles : [],
      showNewCategory : false,
      showNewProduct : false,
      categories : [],
      products : [],
      selectedCategory : {value : "no-filter", label : "Ver todas las categorias"},
      selectedOrder : "alphabetic",
      orderBy : [{value : "alphabetic", label : "Ordén alfabetico"}, {value : "price", label : "Precio"}],
      query,
      search : "",
      showProduct : false,
      idProduct : 1,
      searchProducts : "",
      showStockAlert : 0,
      allowedRole : -1,
      listInnerRef : this.props.listInnerRef,
      lastPage : false
    }
    this.createCategoryClicked = this.createCategoryClicked.bind(this);
    this.createProductClicked = this.createProductClicked.bind(this);
    this.onCreateCategoryClose = this.onCreateCategoryClose.bind(this);
    this.onCreateProductClose = this.onCreateProductClose.bind(this);
    this.renderProducts = this.renderProducts.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
    this.showProduct = this.showProduct.bind(this);
    this.fetchProducts = this.fetchProducts.bind(this);
    this.showStockAlertClicked = this.showStockAlertClicked.bind(this);
    this.renderView = this.renderView.bind(this);
  }
  componentDidMount(){
    Roles.fetchRoles(this.state.authToken, this.state.params.id).then((resp)=>{
      let tmp = Roles.checkRoles(resp, Roles.inventoryAllowed);
      let allowedRole = 0;
      if(tmp){
        allowedRole = 1
      }
      this.setState({roles : resp, allowedRole});
    }).catch((err)=>{
      console.log("Error while fetching roles", err);
    });
    Categories.fetchCategories(this.state.idStore).then((resp)=>{
      resp.splice(0, 0, {value : "no-filter", label : 'Ver todas las categorias'});
      let def = this.state.selectedCategory;

      if(this.state.query.category){
        for(let i=0; i<resp.length; i++){
          if(resp[i].value===parseInt(this.state.query.category)){
            def = resp[i];
            this.setState({selectedCategory : def});
          }
        }
      }
      this.setState({categories : resp});
    }).catch((err)=>{
      console.log("Error while fetching categories", err);
    });
    this.fetchProducts();
    
  }
  fetchProducts(){
    return new Promise((resolve, reject) => {
      let category = this.state.query.category;
      if(category && category !== "no-filter"){
        console.log("By Category");
        category = parseInt(category);
        Products.fetchProductsByCategory(this.state.idStore, category, this.state.page, 
            this.state.showStockAlert).then((resp)=>{
              console.log('lastPage:', resp.lastPage, this.state.page >= resp.lastPage);
          this.setState({
            products : resp.data,
            lastPage : this.state.page >= resp.lastPage
          }, ()=>{resolve(resp.data)});
        }).catch((err)=>{
          console.log("Error while fetching products", err);
        });
      } else{
        console.log("By None");
        Products.fetchProducts(this.state.idStore, this.state.page, this.state.showStockAlert).then((resp)=>{
          this.setState({
            products : resp.data,
            lastPage : this.state.page >= resp.lastPage
          }, ()=>{resolve(resp.data)});
        }).catch((err)=>{
          console.log("Error while fetching products", err);
        });
      }
    });
  }

  loadMoreProducts(){
    const { page, products } = this.state;
    let newPage = parseInt(page)+1;
    let newProducts = [...products];
    this.setState({
      page : newPage
    }, (e)=>{
      this.fetchProducts().then((resp)=>{
        newProducts = newProducts.concat(resp);
        this.setState({
          products : newProducts
        });
      });
    });
  }

  render(){
    return(
      <>
      {
        !this.state.authToken
        ?
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
        <div className="container-fluid bg-light p-0">
        {
          this.state.allowedRole===1
          ?
          <>
            {this.renderView()}
          </>
          :
          <>
          {
            this.state.allowedRole===-1
            ?
            <>
            </>
            :
            <>
              <BasicDialog isOpen={true} config={{
                title : "Usuario no valido",
                body : "Lo sentimos, pero tu usuario no tiene permiso para ver esta pagina",
                actions : [
                  {
                    label : "Ok",
                    func : ()=>{this.props.navigation("/login")}
                  }
                ]
              }}/>
            </>
          }
          </>
        }
      </div>
      }
      </>
    )
  }

  renderView(){
    return(
      <>
          <Navbar/>
          <div className="container body-container">
            <div className="row">
              <div className="col-12">
                <h1 className="title-primary-text">Inventario</h1>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-12 col-lg-6">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text h-100"><i className="fa-solid fa-magnifying-glass"></i></span>
                    </div>
                    <input type="text" className="form-control" placeholder="Buscar productos"
                    onChange={this.searchProducts} value={this.state.searchProducts}/>
                  </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="d-flex flex-row justify-content-end mb-3">
                      <button className="btn btn-dark me-3" onClick={this.createCategoryClicked}>Crear categoria</button>
                      <button className="btn btn-primary me-3" onClick={this.createProductClicked}>Agregar producto</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 mb-3">
                <div className="d-flex flex-row justify-content-start mb-3 w-100">
                  <div className="container-fluid p-0">
                    <div className="row">
                      <div className="col-12 col-lg-3 mb-3">
                        <Select options={this.state.categories} 
                        onChange={(e)=>{this.onChangeCategory(e); this.setState({searchProducts : ""})}} placeholder="Ver todas las categorías"
                        value={this.state.selectedCategory}/>
                      </div>
                      <div className="col-12 col-lg-3 mb-3">
                        <Select options={this.state.orderBy} 
                        onChange={(e)=>{this.setState({selectedOrder : e.value})}} placeholder="Ordernar por"
                        value={{value : "alphabetic", label : 'Ordén alfabetico'}}/>
                      </div>
                      <div className="col-12 col-lg-6 mb-3">
                        <div className="d-flex flex-row w-100 justify-content-end">
                          <a className="nav-link" href="#stock" onClick={(e)=>{this.showStockAlertClicked()}}>
                            {
                              this.state.showStockAlert
                              ?
                              <span>Ver todos los productos</span>
                              :
                              <span>Ver productos agotandose</span>
                            }
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  {
                    this.renderProducts()
                  }
                </div>
              </div>
              <div className="col-12">
                <div className="d-flex flex-row w-100 justify-content-center align-items-center">
                  {
                    this.state.lastPage?
                    <button className="btn btn-primary mt-3 mb-3"
                    onClick={(e)=>{window.scrollTo(0, 0)}}>
                        Ir al inicio
                    </button>
                    :
                    <button className="btn btn-primary mt-3 mb-3"
                      onClick={(e)=>{this.loadMoreProducts()}}>
                        Ver más productos
                    </button>
                  }
                </div>
              </div>
            </div>
          </div>
          <Footer/>
          {/*Dialog places*/}
          <CreateCategoryDialog isOpen={this.state.showNewCategory} config={{title : "Nueva categoria"}} 
            closeFunc = {()=>{this.onCreateCategoryClose()}} idStore={this.state.params.id}/>
          {
            this.state.showNewProduct
            ?
            <CreateProductDialog isOpen={this.state.showNewProduct} config={{title : "Nuevo producto"}} 
            closeFunc = {()=>{this.onCreateProductClose()}} idStore={this.state.params.id}/>
            :
            <>
            </>
          }
          {
            this.state.showProduct
            ?
            <ProductDialog isOpen={this.state.showProduct} closeFunc = {()=>{this.onCloseProduct()}} 
            idProduct={this.state.idProduct} config={{title : "Producto"}} idStore={this.state.idStore}/>
            :
            <></>
          }
      </>
    )
  }

  showStockAlertClicked(){
    this.setState({
      showStockAlert : this.state.showStockAlert===0?1:0
    }, ()=>{
      this.fetchProducts();
      this.onChangeCategory({value : "no-filter", label : "Ver todas las categorias"});
    });
  }

  showProduct(idProduct){
    this.setState({showProduct : true, idProduct});
  }

  onCloseProduct(){
    this.setState({
      showProduct : false,
      idProduct : 1
    });
  }

  searchProducts(e){
    this.setState({searchProducts : e.target.value});
    if(e.target.value.length > 4){
      let idCategory = undefined;
      if(this.state.selectedCategory.value!=="no-filter"){
        idCategory = this.state.selectedCategory.value;
      }
      Products.findProducts(this.state.idStore, idCategory, e.target.value, this.state.showStockAlert).then((resp)=>{
        this.setState({
          products : resp.data
        });
      }).catch((err)=>{
        console.log("Error while searching products", err);
      })
    } else{
      this.onChangeCategory(this.state.selectedCategory);
    }
  }

  onChangeCategory(e){
    let q = {
      category : e.value
    }
    this.setState({selectedCategory : e, query : q});
    if(e.value==="no-filter"){
      this.setState({
        page : 1
      }, ()=>{
        Products.fetchProducts(this.state.idStore, this.state.page, this.state.showStockAlert).then((resp)=>{
          this.setState({
            products : resp.data
          });
          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
          window.history.pushState({path:newurl},'',newurl);
        });
      });
    } else{
      this.setState({
        page : 1
      }, ()=>{
        Products.fetchProductsByCategory(this.state.idStore, e.value, this.state.page, this.state.showStockAlert).then((resp)=>{
          console.log('Here i am', resp.lastPage);
          this.setState({
            products : resp.data,
            lastPage : this.state.page >= resp.lastPage
          });
          var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?category='+e.value;
          window.history.pushState({path:newurl},'',newurl);
        }).catch((err)=>{
          console.log("Error while fetching products", err);
        });
      });
    }
  }

  renderProducts(){
    const { products } = this.state;
    const items = [];

    for(let i=0; i<products.length; i++){
      let name = products[i].PRODUCT_NAME;
      if(name.length>30 ){
        name = name.substring(0, 27)+"...";
      }
      let img = products[i].IMG_SRC;
      if(img && img!=null){
        img = PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/files/download?fileName="+img;
      } else{
        img = "/vectors/image-solid.svg";
      }
      items.push(
        <div className="col-12 col-lg-3 mb-3" key={"product-"+i}>
          <div className="card h-100" onClick={(e)=>{this.showProduct(products[i].ID_PRODUCT)}}>
            <img src={img} className="card-img-top preview-img" alt="product-preview"/>
            <div className="card-body">
              <div className="d-flex flex-column w-100 text-center">
                <span>{name}</span>
                <span className="product-price">${products[i].PRODUCT_PRICE}</span>
                <span className="text-muted">{products[i].PRODUCT_STOCK} disponibles</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return items;
  }

  onCreateCategoryClose(){
    this.setState({showNewCategory : false});
  }
  onCreateProductClose(){
    this.fetchProducts();
    this.setState({showNewProduct : false});
  }
  createCategoryClicked(e){
    e.preventDefault();
    this.setState({showNewCategory : true});
  }
  createProductClicked(e){
    e.preventDefault();
    this.setState({showNewProduct : true});
  }
}

export default function RolesFunc(props) {
  const navigation = useNavigate();
  const params = useParams();
  const listInnerRef = useRef();
  return <Inventory navigation={navigation} params = {params} listInnerRef={listInnerRef}/>;
}