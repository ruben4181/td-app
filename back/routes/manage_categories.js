require('dotenv').config({path:'.env'});
const jwt = require("jsonwebtoken");
const JWT_MASTER_KEY = process.env.JWT_MASTER_KEY;

const express = require("express");
const app = express();
const constants = require(process.env.DIR_PATH+"/utils/constants");

const categories = require(process.env.DIR_PATH+"/controllers/categories");

app.post("/create", (req, res) => {
  let body = req.body;
  categories.createCategory(body.data).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    console.log(err);
    res.status(500);
    res.send(err);
  })
});

app.post("/update", (req, res) => {
  let body = req.body;
  let idStore = body.data.idStore;
  let idCategory = body.data.idCategory;
  categories.updateCategory(idStore, idCategory, body.data).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    res.status(500);
    res.send(err);
  })
});

app.get("/get/store", (req, res) => {
  let idStore = req.query.idStore;
  categories.getCategoriesByStore(idStore).then((resp)=>{
    res.status(200);
    res.send(resp);
  }).catch((err)=>{
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

module.exports = app;