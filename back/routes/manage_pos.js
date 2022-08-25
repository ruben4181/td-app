require('dotenv').config({path:'.env'});

const express = require("express");
const app = express();

const pos = require(process.env.DIR_PATH+"/controllers/pos");

app.post("/create", (req, res) => {
  let body = req.body;
  pos.createBill(body.data).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.post("/product/add", (req, res) => {
  let body = req.body;
  let idBill = body.data.idBill;
  let idProduct = body.data.idProduct;
  let units = body.data.units;
  let off = body.data.off || 0;
  let description = body.data.description;


  pos.addProductToBill(idBill, idProduct, units, description, off).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.post("/product/delete", (req, res) => {
  let body = req.body;
  let idBill = body.data.idBill;
  let idBillDetail = body.data.idBillDetail;

  pos.delProductFromBill(idBill, idBillDetail).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    res.status(200);
    res.send(err);
  });
});

app.post("/product/update", (req, res) => {
  let body = req.body;
  let idBill = body.data.idBill;
  let idBillDetail = body.data.idBillDetail;
  let units = body.data.units;
  let description = body.data.description;
  let off = body.data.off;

  pos.updateProductFromBill(idBill, idBillDetail, units, description, off).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err)=> {
    console.log(err);
    res.status(500);
    res.send(err);
  })
});

app.post("/status/update", (req, res) => {
  let body = req.body;
  let idBill = body.data.idBill;
  let idStatus = body.data.idStatus;

  pos.changeBillStatus(idBill, idStatus).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.get("/search", (req, res) => {
  let idStore = parseInt(req.query.idStore);
  let query = req.query.q;

  pos.searchBill(idStore, query).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch( (err)=> {
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.get("/get", (req, res) => {
  let idStore = req.query.idStore;
  let idBill = req.query.idBill;

  pos.getBill(idStore, idBill).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  })
});

app.get("/par/tipo_pago", (req, res) => {
  pos.getParTipoPago().then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.get("/get/store", (req, res) => {
  let idStore = parseInt(req.query.idStore);
  let page = parseInt(req.query.page) || 1;
  let query = req.query.query;
  let starts = req.query.starts;
  let ends = req.query.ends;

  pos.getBillsByStore(idStore, page, query, starts, ends).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.get("/detail/get", (req, res) => {
  let idStore = parseInt(req.query.idStore);
  let idBill = parseInt(req.query.idBill);

  pos.getBillDetail(idStore, idBill).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  })
});

app.get("/get/open", (req, res) => {
  let idStore = req.query.idStore;
  let page = req.query.page;

  pos.getOpenBills(idStore, page).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    res.status(500);
    res.send(err);
  });
});

module.exports = app;