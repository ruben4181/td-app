import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Select from 'react-select'
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;

class CreateProductDialog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authToken : localStorage.getItem("authToken"),
      idStore : this.props.idStore,
      isOpen : this.props.isOpen,
      page : 1,
      productName : "",
      productDescription : "",
      productCode : "",
      productPrice : 0,
      productCost : 0,
      productStock : 0,
      stockAlert : 0,
      img : "/vectors/image-solid.svg",
      file : undefined,
      parentsOptions : [],
      idCategory : undefined,
      message : ""
    }
    this.handleClose = this.handleClose.bind(this);
    this.createProduct = this.createProduct.bind(this);
    this.okButtonClicked = this.okButtonClicked.bind(this);
    this.switchStep = this.switchStep.bind(this);
    this.imgChange = this.imgChange.bind(this);
    this.cancelProduct = this.cancelProduct.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.onCloseFunc = this.onCloseFunc.bind(this);
  }

  componentDidMount(){
    this.fetchCategories();
  }

  fetchCategories(){
    let config = {
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/category/get/store",
      params : {
        idStore : this.state.idStore
      }
    }

    axios(config).then((resp)=>{
      if(resp.data.result==="OK"){
        let data = resp.data.data;
        let opt = [];
        for(let i=0; i<data.length; i++){
          let item = {
            value : data[i].ID_CATEGORY,
            label : data[i].CATEGORY_NAME
          }
          opt.push(item);
        }
        this.setState({
          parentsOptions : opt
        });
      } else{
        console.log("Not categories found");
      }
    }).catch((err)=>{
      console.log("Error fetching categories");
    })
  }

  onCloseFunc(){
    this.props.onClose("I'm a looser");
  }

  render(){
    return(
     <Dialog
      open = {this.props.isOpen}
      onClose = {this.onCloseFunc}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
     >
       <DialogTitle id="alert-dialog-title">
        {this.props.config.title}
       </DialogTitle>
       <DialogContent>
         {
           this.state.page===1?
           <div className="row mt-3">
            <div className="col-12">
              <div className="form-floating mb-3">
                <input type="text" placeholder="Nombre del producto" className="form-control" value={this.state.productName}
                onChange={(e)=>{this.updateField("productName", e.target.value)}}/>
                <label>Nombre del producto</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" placeholder="Nombre del producto" className="form-control" value={this.state.productDescription}
                onChange={(e)=>{this.updateField("productDescription", e.target.value)}}/>
                <label>Descripción (opcional)</label>
              </div>
              <div className="mb-3">
                <Select options={this.state.parentsOptions} placeholder="Categoría"
                onChange={(e)=>{this.setState({idCategory : e.value})}}/>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating mb-3">
                <input type="text" placeholder="Codigo de barras" className="form-control" value={this.state.productCode}
                onChange={(e)=>{this.updateField("productCode", e.target.value)}}/>
                <label>Codigo</label>
                <span className="form-text">Escanea o escribe el codigo de barras del producto</span>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating mb-3">
                <input type="number" placeholder="Precio de venta del producto" value={this.state.productPrice}
                className="form-control"
                onChange={(e)=>{this.updateField("productPrice", e.target.value)}}/>
                <label>Precio</label>
                <span className="form-text">El precio que cobras a tus clientes</span>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating mb-3">
                <input type="number" placeholder="Costo del producto" min="0" value={this.state.productCost}
                className="form-control"
                onChange={(e)=>{this.updateField("productCost", e.target.value)}}/>
                <label>Costo</label>
                <span className="form-text">Lo que pagas a tu proveedor</span>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating mb-3">
                <input type="number" placeholder="Unidades disponibles" value={this.state.productStock}
                className="form-control"
                onChange={(e)=>{this.updateField("productStock", e.target.value)}}/>
                <label>Stock</label>
                <span className="form-text">Las unidades que tienes disponibles</span>
              </div>
            </div>
            <div className="col-12">
              <div className="form-floating mb-3">
                <input type="number" placeholder="Unidades disponibles" value={this.state.stockAlert}
                className="form-control"
                onChange={(e)=>{this.updateField("stockAlert", e.target.value)}}/>
                <label>Alerta de Stock</label>
                <span className="form-text">Cantidad de productos, con la que consideras se te están
                acabando y debes solicitar más a tu proveedor</span>
              </div>
            </div>
          </div>
          :
          <>
          {
            this.state.page===2
            ?
            <div className="row mt-3">
              <div className="col-12 text-center">
                <img src={this.state.img} className="preview-img" alt="preview"/>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label for="formFileMultiple" className="form-label">Agrega imágenes del producto</label>
                  <input className="form-control" type="file" id="formFileMultiple"
                  onChange={this.imgChange}/>
                </div>
              </div>
            </div>
            :
            <div className="row mt-3">
              <div className="col-12">
                <span>{this.state.message}</span>
              </div>
            </div>
          }
          </>
         }
          
       </DialogContent>
       <DialogActions>
         {
           this.state.page===1 || this.state.page===2?
           <Button onClick={this.cancelProduct}>Cancelar</Button>
           :
           <Button onClick={this.cancelProduct}>Ok</Button>
         }
         {
           this.state.page===2?
           <Button onClick={this.switchStep}>Volver</Button>
           :
           <>
           {
             this.state.page===1?
             <Button onClick={this.switchStep}>Continuar</Button>
             :
             <></>
           }
           </>
           
         }
         {
           this.state.page===2?
           <Button onClick={this.okButtonClicked}>Agregar</Button>
           :
           <></>
         }
        </DialogActions>
     </Dialog>
    )
  }

  updateField(target, value){
    let tmp = {};
    tmp[target] = value;
    this.setState(tmp);
  }

  cancelProduct(e){
    this.props.closeFunc(this.state.product);
    this.setState({
      product : undefined,
      page : 1,
      productName : "",
      productDescription : "",
      productCode : "",
      productPrice : 0,
      productCost : 0,
      productStock : 0,
      stockAlert : 0,
      img : "/vectors/image-solid.svg" 
    });
  }

  imgChange(event){
    if (event.target.files && event.target.files[0]) {
      this.setState({
        img: URL.createObjectURL(event.target.files[0]),
        file : event.target.files[0]
      });
    }
  }

  switchStep(e){
    var { page } = this.state;
    if(page===2){
      page--;
    } else{
      page++;
    }
    this.setState({page});
  }

  okButtonClicked(e){
    const formData = new FormData();
    formData.append("selectedFile", this.state.file);
    let config = {
      method : "post",
      url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/files/upload",
      data : formData,
      headers: { "Content-Type": "multipart/form-data", 'Authorization' : 'Bearer '+this.state.authToken }
    };

    axios(config).then((resp)=>{
      let imgSrc = resp.data.data;
      const {productName, productDescription, productBrand, idCategory, productCode, 
        productPrice, productCost, productStock, idStore, mongoId, stockAlert} = this.state;

      let tmp = undefined;
      console.log("Stock alert:", stockAlert);
      if(idCategory){
        tmp = parseInt(idCategory);
      }

      let body = {
        struct : "product",
        data : {
          productName,
          productDescription,
          productBrand,
          quantity : 1,
          productPrice : parseInt(productPrice),
          productCost : parseInt(productCost),
          productStock : parseInt(productStock),
          stockAlert : parseInt(stockAlert),
          off : 0,
          productCode,
          idStore : parseInt(idStore),
          idCategory : tmp,
          mongoId,
          imgSrc
        }
      }

      let config = {
        url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/product/create",
        method : "post",
        data : body,
        headers: { 'Authorization' : 'Bearer '+this.state.authToken }
      }

      console.log(config);

      this.createProduct(config);
    }).catch((err)=>{
      console.log(err);
    });
  }

  createProduct(config){
    axios(config).then((resp)=>{
      this.setState({
        page : 3,
        message : resp.data.message,
        product : resp.data.data
      });
    }).catch((err)=>{
      console.log(err);
    });
  }
  
  handleClose(e){
    
  }
}

export default CreateProductDialog;