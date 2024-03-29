require('dotenv').config({path:'.env'});

const express = require("express");
const app = express();
const suppliers = require('./controllers/suppliers');

app.get('/get/store', (req, res) => {
  let q = req.query;
  let idStore = q.idStore;
  let query = q.query;
  let page = q.page;

  suppliers.getSuppliers(idStore, query, page).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.get('/get/all', (req, res) => {
  let q = req.query;
  let idStore = q.idStore;
  let query = q.query;

  suppliers.getSuppliersAll(idStore, query).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.get('/get', (req, res) => {
  let q = req.query;
  let idStore = q.idStore;
  let idSupplier = q.idSupplier;

  suppliers.getSupplier(idStore, idSupplier).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

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

app.get('/bill/costs/get', (req, res) => {
  let q = req.query;
  let payload = {
    idStore : q.idStore,
    query : q.query,
    page : q.page,
    from : q.from,
    to : q.to
  };

  suppliers.getBills(payload).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

module.exports = app;