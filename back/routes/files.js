require('dotenv').config({path:'.env'});
const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();
fs = require('fs');

const dir_path = process.env.DIR_PATH;

app.use(fileUpload());

app.post("/upload", function(req, res)
{
    var file;

    if(!req.files)
    {
        res.send("File was not found");
        return;
    }

    file = req.files.selectedFile;  // here is the field name of the form

    let now = new Date();
    now = now.getTime().toString();
    let fileName = now+"_"+file.name;
    fs.appendFile(dir_path+"/public/files/"+fileName, file.data, ()=>{
      res.send({
        result : "OK",
        message : "File uploaded succesfuly",
        data : fileName
      });
    });

    console.log("File", dir_path);

    //res.send("File Uploaded " + dir_path);
});

app.get("/download", (req, res)=>{
  res.sendFile(dir_path+"/public/files/"+req.query.fileName);
});

module.exports = app;