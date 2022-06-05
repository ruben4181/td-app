import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import axios from "axios";
import Select from 'react-select';
import Categories from "../par/Categories";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const PORT = process.env.REACT_APP_SERVER_PORT;
const PROTOCOL = process.env.REACT_APP_PROTOCOL;

class CreateCategoryDialog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      authToken : localStorage.getItem("authToken"),
      isOpen : this.props.isOpen,
      idStore : this.props.idStore,
      page : 1,
      img : "/vectors/image-solid.svg",
      file : undefined,
      categoryName : "",
      categoryProduct : "",
      parentsOptions : [],
      parentCategory : undefined,
      resultMessage : ""
    }
    this.handleClose = this.handleClose.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.okButtonClicked = this.okButtonClicked.bind(this);
    this.switchStep = this.switchStep.bind(this);
    this.imgChange = this.imgChange.bind(this);
    this.cancelCategory = this.cancelCategory.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  componentDidMount(){
    Categories.fetchCategoriesParent(this.state.idStore).then((resp)=>{
      this.setState({
        parentsOptions : resp
      });
    }).catch((err)=>{
      console.log("Error while fetching categories", err);
    });
  }

  render(){
    return(
     <Dialog
      open = {this.props.isOpen}
      onClose = {this.props.onClose}
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
                onChange={(e)=>{this.updateField("categoryName", e.target.value)}}/>
                <label>Nombre de la categoría</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" placeholder="Nombre del producto" className="form-control" value={this.state.productDescription}
                onChange={(e)=>{this.updateField("categoryDescription", e.target.value)}}/>
                <label>Descripción (opcional)</label>
              </div>
              <div className="mb-3">
                <label>Categoría padre</label>
                <Select options={this.state.parentsOptions} onChange={(e)=>{this.setState({parentCategory : e.value})}}/>
                <span className="form-text">Selecciona si la categoria neuva es una subcategoría</span>
              </div>
            </div>
          </div>
          :
          <>
          {
            this.state.page===2?
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
            <div>
              <div className="row mt-3">
                <div className="col-12">
                  <span>{this.state.resultMessage}</span>
                </div>
              </div>
            </div>
          }
          </>
         }
          
       </DialogContent>
       <DialogActions>
         {
           this.state.page===1 || this.state.page===2?
           <Button onClick={this.cancelCategory}>Cancelar</Button>
           :
           <Button onClick={this.cancelCategory}>Ok</Button>
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

  cancelCategory(e){
    this.props.closeFunc(e);
    this.setState({
      page : 1,
      categoryName : "",
      categoryDescription : "",
      img : "/vectors/image-solid.svg",
      parentCategory : undefined
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
      const {categoryName, categoryDescription, parentCategory, idStore} = this.state;
      let body = {
        struct : "category",
        data : {
          categoryName,
          categoryDescription,
          idCategoryParent : parentCategory,
          idStore : parseInt(idStore),
          imgSrc
        }
      }
      config = {
        url : PROTOCOL+"://"+BASE_URL+":"+PORT+"/api/v1/category/create",
        method : "post",
        data : body,
        headers: { 'Authorization' : 'Bearer '+this.state.authToken }
      }
      this.createCategory(config);
      console.log(config);

    }).catch((err)=>{
      console.log(err);
    });
  }

  createCategory(config){
    axios(config).then((resp)=>{
      this.setState({page : 3, resultMessage : resp.data.message});
      Categories.fetchCategoriesParent(this.state.idStore).then((resp)=>{
        this.setState({
          parentsOptions : resp
        });
      }).catch((err)=>{
        console.log("Error while fetching categories", err);
      });
    })
  }
  
  handleClose(e){
    
  }
}

export default CreateCategoryDialog;