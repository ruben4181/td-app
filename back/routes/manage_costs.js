require('dotenv').config({path:'.env'});

const express = require("express");
const app = express();
const costs = require('../controllers/costs');

app.post('/add', (req, res) => {
  let payload = req.body.data;

  costs.addCost(payload).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.get('/categories/get', (req, res) => {
  costs.getCategories().then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.get('/status/get', (req, res) => {
  costs.getStatus().then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  })
});

module.exports = app;