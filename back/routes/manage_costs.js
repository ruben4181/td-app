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

app.get('/get', (req, res) => {
  let q = req.query;
  let payload = {
    idStore : parseInt(q.idStore),
    query : q.query,
    page : q.page?parseInt(q.page):undefined,
    from : q.from,
    to : q.to
  }


  costs.getCosts(payload).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  });
});

app.get('/get/cost', (req, res) => {
  let q = req.query;
  let idStore = q.idStore;
  let idCost = q.idCost;

  console.log(idStore, idCost);

  costs.getCost(idStore, idCost).then((resp) => {
    res.status(200);
    res.send(resp);
  }).catch((err) => {
    console.log(err);
    res.status(500);
    res.send(err);
  })
});

module.exports = app;