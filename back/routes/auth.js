require('dotenv').config({path:'.env'});
const jwt = require("jsonwebtoken");
const JWT_MASTER_KEY = process.env.JWT_MASTER_KEY;

const express = require("express");
const app = express();
const constants = require(process.env.DIR_PATH+"/utils/constants");
const auth = require(process.env.DIR_PATH+"/controllers/auth");

app.post("/login", (req, res)=>{
  res.status(constants.STATUS_OK);

  auth.authUser(req.body.username, req.body.password).then((resp)=>{
    if(resp.result==constants.RESULT_OK){
      let user = resp.data[0];

      jwt.sign({user}, JWT_MASTER_KEY, (err, token)=>{
        res.send({
          result : constants.RESULT_OK,
          message : 'Login done',
          token
        });
      });
    } else{
      res.status(200);
      res.send({
        result : constants.RESULT_FAIL,
        message : constants.INVALID_USER_PASSWORD_MSG
      });
    }
  }).catch((err)=>{
  	console.log(err);
    res.status(constants.INTERNAL_ERROR);
    res.send({
      message : constants.INTERNAL_ERROR_MSG
    })
  });
});

app.post("/user/create", (req, res) => {
  let body = req.body;
  auth.createUser(body.data).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.post("/user/update", (req, res) => {
  let body = req.body;
  let idUser = body.data.idUser;
  auth.updateUser(idUser, body.data).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.get("/user/roles", (req, res)=>{
  idStore = req.query.idStore;
  auth.getUserRoles(req.idUser, idStore).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    console.log(err);
    res.status(500);
    res.send(err);
  })
});

module.exports = app;
