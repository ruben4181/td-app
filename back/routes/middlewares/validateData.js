require('dotenv').config({path:'.env'});
const validator = require('../../validators/validate_struct');
const constants = require(process.env.DIR_PATH+"/utils/constants");

module.exports = {
  validateData : (req, res, next)=>{
    if(req.method == "GET"){
      next();
    } else{
      let body = req.body;
      let struct = body.struct;
      if(struct){
        let flags = true;//validator.validateStruct(struct+".json", body.data);
        if(flags){
          next();
        } else{
          console.log("Error 7");
          res.send({
            result : constants.ERROR,
            message : constants.BAD_REQUEST_MSG 
          });
        }
      } else{
        if(req.path=="/files/upload"){
          next();
        } else{
          console.log("BAD REQUEST ERROR HERE", req.path);
          res.send({
            result : constants.ERROR,
            message : constants.BAD_REQUEST_MSG 
          });
        }
      }
      
    }
  }
}