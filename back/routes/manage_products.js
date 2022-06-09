require('dotenv').config({path:'.env'});
const jwt = require("jsonwebtoken");
const JWT_MASTER_KEY = process.env.JWT_MASTER_KEY;

const express = require("express");
const app = express();
const constants = require(process.env.DIR_PATH+"/utils/constants");

const products = require(process.env.DIR_PATH+"/controllers/products");

app.post("/create", (req, res) => {
  let body = req.body;
  products.createProduct(body.data).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    res.status(500);
    res.send(err);
  });
});

app.post('/update', (req, res)=>{
  let body = req.body;
  let idStore = body.data.idStore;
  let idProduct = body.data.idProduct;
  let payload = body.data;
  products.updateProduct(idStore, idProduct, payload).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    res.status(500);
    res.send(err);
  })
});

app.post("/delete", (req, res)=>{
  let body = req.body;
  let idStore = body.data.idStore;
  let idProduct = body.data.idProduct;

  products.deleteProduct(idStore, idProduct).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    res.status(500);
    res.send(err);
  })
});

app.get("/get/store", (req, res)=>{
  let idStore = req.query.idStore;
  let idProduct = req.query.idProduct;
  let page = req.query.page;
  let stockAlert = parseInt(req.query.stockAlert) || 0;
  if(idProduct){

  } else{
    products.getProducts(idStore, page, stockAlert).then((resp)=>{
      res.status(200);
      res.send(resp);
    }).catch((err)=>{
      console.log(err);
      res.status(500);
      res.send(err);
    })
  }
});

app.get("/get/category", (req, res)=>{
  let idStore = req.query.idStore;
  let idCategory = req.query.idCategory;
  let page = req.query.page;
  let stockAlert = req.query.stockAlert || 0;
  products.getProductsByCategory(idStore, idCategory, page, stockAlert).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    console.log(err);
    res.status(500);
    res.send(err);
  })
});

app.get('/search', (req, res)=>{
  let idStore = req.query.idStore;
  let idCategory = req.query.idCategory;
  let query = req.query.q;
  let stockAlert = req.query.stockAlert || 0;
  if(idCategory){
    products.findProductsByCategory(idStore, idCategory, query, stockAlert).then((resp)=>{
      res.status(200);
      res.send(resp);
    }).catch((err)=>{
      console.log(err);
      res.status(500);
      res.send(err);
    });
  } else{
    products.findProducts(idStore, query, stockAlert).then((resp)=>{
      res.status(200);
      res.send(resp);
    }).catch((err)=>{
      console.log(err);
      res.status(500);
      res.send(err);
    });
  }
});

app.get('/get', (req, res) => {
  let idProduct = req.query.idProduct;
  products.getProduct(idProduct).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

module.exports = app;