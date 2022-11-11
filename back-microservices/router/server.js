require('dotenv').config({path:'.env'});

const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const jwt = require("jsonwebtoken");

let server = http.createServer(app);

app.use(cors({origin:true, credentials:true}));
app.use(express.json());

let routes = require("./routes.json");

const router = require("./router");

const PORT = 5116;

app.use(router);

server.listen(PORT, ()=>{
  console.log("Running server at port "+PORT);
});
