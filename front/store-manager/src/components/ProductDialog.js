import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Select from 'react-select'
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Products from "../par/Products";
import BasicDialog from "./BasicDialog";
import Categories from "../par/Categories";
import "../css/commons.css";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;

class ProductDialog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      idProduct : props.idProduct,
      product : {},
      disabled : true,
      categoryOptions : [],
      saving : false,
      selectedCategory : undefined,
      authToken : localStorage.getItem("authToken"),
      idStore : props.idStore,
      message : "",
      showResult : false
    }
    this.close = this.close.bind(this);
    this.modifyProductClicked = this.modifyProductClicked.bind(this);
    this.confirmProductModification = this.confirmProductModification.bind(this);
    this.modifyProduct = this.modifyProduct.bind(this);
    this.updateField = this.updateField.bind(this);
  }
  componentDidMount(){
    Products.fetchProduct(this.props.idProduct).then((resp)=>{
      this.setState({
        product : resp.data || {}
      }, ()=>{
        console.log("Fetching");
        Categories.fetchCategories(this.props.idStore).then((resp)=>{
          this.setState({
            categoryOptions : resp
          }, ()=>{
            if(this.state.product.ID_CATEGORY){
              for(let i=0; i<resp.length; i++){
                if(this.state.product.ID_CATEGORY===resp[i].value){
                  this.setState({selectedCategory : resp[i]});
                  break;
                }
              }
            }
          });
        }).catch((err)=>{
          console.log("Error while fetching categories", err);
        });
      })
    }).catch((err)=>{
      console.log("Error while fetching product", err);
    });
  }
  render(){
    return(
      <>
        <BasicDialog isOpen={this.state.saving} config={{
            title : "Guardar producto",
            body : "¿Seguro que deseas guardar los cambios?",
            actions : [
              {
                label : "Cancelar",
                func : ()=>{this.setState({saving : false})}
              },
              {
                label : "Ok",
                func : ()=>{this.modifyProduct()}
              }
            ]
          }}/>
        <BasicDialog isOpen={this.state.showResult} config={{
            title : "Actualización",
            body : this.state.message,
            actions : [
              {
                label : "Ok",
                func : ()=>{this.setState({showResult : false})}
              }
            ]
          }}/>
        <Dialog
        open = {this.props.isOpen}
        onClose = {this.props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          {this.props.config.title}
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="col-12">
              <div className="form-floating mb-3">
                <div className="col-12 text-center">
                  {
                    this.state.product.IMG_SRC
                    ?
                    <img src={PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/files/download?fileName="+this.state.product.IMG_SRC} className="preview-img" alt="preview"/>
                    :
                    <img src="/vectors/image-solid.svg" className="preview-img" alt="preview"/>
                  }
                </div>
              </div>
              <div className="form-floating mb-3 w-100">
                <textarea className="form-control" value={this.state.product.PRODUCT_NAME} 
                  onChange={
                    (e)=>{
                      const {product} = this.state;
                      product.PRODUCT_NAME = e.target.value;
                      this.setState({product});
                    }
                  } disabled={this.state.disabled}></textarea>
                <label>Nombre</label>
              </div>
              {
                this.state.product.PRODUCT_DESCRIPTION?
                <div className="form-floating mb-3">
                <textarea className="form-control" value={this.state.product.PRODUCT_DESCRIPTION} 
                onChange={
                  (e)=>{
                    const {product} = this.state;
                    product.PRODUCT_DESCRIPTION = e.target.value;
                    this.setState({product});
                  }
                } disabled={this.state.disabled}></textarea>
                <label>Descripción</label>
              </div>
              :
              <></>
              }
              <div className="form-floating mb-3">
                <Select options={this.state.categoryOptions} placeholder="Categoría" 
                isDisabled={this.state.disabled} value={this.state.selectedCategory}
                onChange={(e)=>{this.setState({selectedCategory : e})}}/>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control" value={this.state.product.PRODUCT_CODE} 
                onChange={
                  (e)=>{
                    const {product} = this.state;
                    product.PRODUCT_CODE = e.target.value;
                    this.setState({product});
                  }
                }
                disabled={this.state.disabled}/>
                <label>Codigo</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control" value={this.state.product.PRODUCT_PRICE} 
                onChange={
                  (e)=>{
                    const {product} = this.state;
                    product.PRODUCT_PRICE = parseInt(e.target.value);
                    this.setState({product});
                  }
                }
                disabled={this.state.disabled}/>
                <label>Precio</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control" value={this.state.product.PRODUCT_COST} 
                onChange={
                  (e)=>{
                    const {product} = this.state;
                    product.PRODUCT_COST = parseInt(e.target.value);
                    this.setState({product});
                  }
                }
                disabled={this.state.disabled}/>
                <label>Costo</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control" value={this.state.product.PRODUCT_STOCK}
                onChange={
                  (e)=>{
                    const {product} = this.state;
                    product.PRODUCT_STOCK = parseInt(e.target.value);
                    this.setState({product});
                  }
                }
                  disabled={this.state.disabled}/>
                <label>Stock</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" className="form-control" value={this.state.product.PRODUCT_OFF}
                onChange={
                  (e)=>{
                    const {product} = this.state;
                    product.PRODUCT_OFF = parseInt(e.target.value);
                    this.setState({product});
                  }
                }
                  disabled={this.state.disabled}/>
                <label>Descuento %</label>
                <div className="form-text">Precio con descuento: 
                  <span className="product-price">${Math.floor((this.state.product.PRODUCT_PRICE*(1-this.state.product.PRODUCT_OFF/100)))}</span></div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          {
            this.state.disabled?
            <>
              <Button onClick={this.close}><span className="btn btn-danger">Eliminar</span></Button>
              <Button onClick={this.modifyProductClicked}>Modificar</Button>
            </>
            :
            <Button onClick={this.confirmProductModification}>Guardar</Button>
          }
          <Button onClick={this.close}>Cerrar</Button>
        </DialogActions>
       </Dialog>
      </>
    )
  }
  updateField(target, value){
    let tmp = {};
    tmp[target] = value;
    this.setState(tmp);
  }

  confirmProductModification(e){
    this.setState({
      saving : true
    });
  }
  modifyProductClicked(e){
    this.setState({
      disabled : false
    });
  }
  modifyProduct(){
    const { product } = this.state;
    let payload = {
      idProduct : product.ID_PRODUCT,
      productDescription : product.PRODUCT_DESCRIPTION,
      idCategory : this.state.selectedCategory?this.state.selectedCategory.value:undefined,
      productCode : product.PRODUCT_CODE,
      productPrice : product.PRODUCT_PRICE,
      productStock : product.PRODUCT_STOCK,
      off : product.PRODUCT_OFF,
      idStore : parseInt(this.state.idStore),
      imgSrc : product.IMG_SRC
    }
    Products.updateProduct(this.state.authToken, payload).then((resp)=>{
      console.log(resp);
      this.setState({
        saving : false,
        disabled : true,
        message : resp.message,
        showResult : true
      });
    }).catch((err)=>{
      console.log("Error while updating product", err.data);
    });
  }
  close(e){
    this.props.closeFunc(e);
    this.setState({
      product : {},
      disabled : true
    });
  }
}

export default ProductDialog;
