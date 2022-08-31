require('dotenv').config({path:'.env'});
const constants = require(process.env.DIR_PATH+"/utils/constants");
const JWT_MASTER_KEY = process.env.JWT_MASTER_KEY;
const jwt = require("jsonwebtoken");
//const services

const noTokenNeeded = ['/api/v1/login', '/api/v1/user/create', 
  '/api/v1/files/download', '/api/v1/category/get/store', '/api/v1/product/get/store',
  '/api/v1/files/download/',
  '/api/v1/product/get/category',
  '/api/v1/product/get',
  '/api/v1/product/search'];

const security_controller = require(process.env.DIR_PATH+"/controllers/security");

verifyToken = (req, res, next)=>{
  if(noTokenNeeded.indexOf(req.path)>=0){
    next();
  } else{
    const bearer = req.headers['authorization'];
    if(typeof bearer !== 'undefined'){
      bearerToken = bearer.split(" ")[1];
      req.token = bearerToken;
      next();
    } else{
      res.status(constants.FORBIDDEN);
      res.send({
        message : "Not found token"
      });
    }
  }
};

verifyPathAccess = (req, res, next)=>{
  if(noTokenNeeded.indexOf(req.path)>=0){
    next();
  } else{
    jwt.verify(req.token, JWT_MASTER_KEY, (err, payload)=>{
      if(err){
        res.status(constants.FORBIDDEN);
        res.send({
          "message" : "Token invalido",
          err
        });
      } else{
        idUser = payload.user.ID_USER;
        req.idUser = idUser;
        path = req.path;
        security_controller.checkPathAccess(idUser, path).then((resp)=>{
          if(resp.result == constants.RESULT_OK){
            next();
          } else{
            res.status(constants.UNAUTHORIZED);
            res.send({
              message : constants.ACCESS_DENIED_MSG
            })
          }
        }).catch((err)=>{
          res.status(constants.FORBIDDEN);
          res.send({
            result : constants.RESULT_FAIL,
            message : constants.BAD_REQUEST_MSG
          });
        });
      }
    });
  }
}

module.exports = {
  verifyToken,
  verifyPathAccess
}