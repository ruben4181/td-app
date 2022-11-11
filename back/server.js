require('dotenv').config({path:'.env'});

const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const jwt = require("jsonwebtoken");

let server = http.createServer(app);

app.use(cors({origin:true, credentials:true}));
app.use(express.json());

//Indexing the routes
app.use(require("./routes/index"));


const PORT = 5117;

server.listen(PORT, ()=>{
  console.log("Running server at port "+PORT);
});
