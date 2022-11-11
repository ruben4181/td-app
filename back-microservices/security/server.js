require('dotenv').config({path:'.env'});

const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");

let server = http.createServer(app);

app.use(cors({origin:true, credentials:true}));
app.use(express.json());

//Indexing the routes
app.use(require("./index"));


const PORT = process.env.PORT || 5118;

server.listen(PORT, ()=>{
  console.log("Running server at port "+PORT);
});