require('dotenv').config({path:'.env'});
const jwt = require("jsonwebtoken");
const JWT_MASTER_KEY = process.env.JWT_MASTER_KEY;

const express = require("express");
const app = express();
const constants = require(process.env.DIR_PATH+"/utils/constants");

const stores = require(process.env.DIR_PATH+"/controllers/stores");

app.post('/create', (req, res)=>{
  let body = req.body.data;
  let idUser = req.idUser;
  body["userId"] = idUser;
  stores.createStore(body).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.post('/update', (req, res)=>{
  let body = req.body;
  let idStore = body.idStore;
  let payload = body.data;
  
  let idUser = req.idUser;
  payload["userId"] = idUser;
  stores.updateStore(idStore, payload).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    res.status(500);
    res.send(err);
  })
});

app.post('/delete', (req, res)=>{
  let body = req.body;
  let idStore = body.idStore;
  stores.deleteStore(idStore).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    res.status(500);
    res.send(err);
  });
});

app.get("/get/user", (req, res)=>{
  let idUser = req.idUser;
  stores.getStoresByUser(idUser).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    res.status(500);
    res.send(err);
  });
});

module.exports = app;