require('dotenv').config({path:'.env'});

const express = require("express");
const app = express();
const suppliers = require('../controllers/suppliers');

app.post('/create', (req, res) => {
  let payload = req.body.data;

  suppliers.createSupplier(payload).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.post('/update', (req, res)=> {
  let payload = req.body.data;

  suppliers.updateSupplier(payload).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.post('/delete', (req, res) => {
  let body = req.body.data;
  let idStore = body.idStore;
  let idSupplier = body.idSupplier;

  suppliers.deleteSupplier(idStore, idSupplier).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  })
});

app.post('/bill/create', (req, res) => {
  let payload = req.body.data;

  suppliers.createSupplierBill(payload).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.post('/bill/product/add', (req, res) => {
  let payload = req.body.data;

  suppliers.addProductToBill(payload).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.post('/bill/product/update', (req, res) => {
  let payload = req.body.data;

  suppliers.updateProductFromBill(payload).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.post('/bill/product/delete', (req, res) => {
  let payload = req.body.data;

  suppliers.deleteProductFromBill(payload).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  })
});


module.exports = app;