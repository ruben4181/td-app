require('dotenv').config({path:'.env'});

const express = require("express");
const app = express();

const stores = require("./controllers/stores");

app.post('/create', (req, res)=>{
  let body = req.body.data;
  body["userId"] = req.body.idUserVerified;
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
  
  let idUser = req.body.idUserVerified;
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
  let idUser = req.body.idUserVerified;
  stores.getStoresByUser(idUser).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    res.status(500);
    res.send(err);
  });
});

module.exports = app;