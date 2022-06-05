import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

class CustomDialog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen : this.props.isOpen,
      testProp : "Prop text"
    }
    this.handleClose = this.handleClose.bind(this);
    this.renderDialog = this.renderDialog.bind(this);
    console.log("Contruyó", this.props.isOpen);
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
          <div className="row">
            <div className="col-6">
              Probando
            </div>
            <div className="col-6">
              Esta monda
            </div>
          </div>
       </DialogContent>
       <DialogActions>
         {
           this.props.config.actions.map((act, index)=>{
            return <Button onClick={act.func} key={index+"-id-2"}>{act.label}</Button>
           })
         }
        </DialogActions>
     </Dialog> 
    )
  }
  renderDialog(){

  }
  handleClose(){
    this.props.state = false;
  }
}

export default CustomDialog;