const axios = require("axios");
const routes = require("./routes.json");

redirect = (req, res, next) => {
  var url = findRoute(req.path);
  if(!url){
    return next();
  }
  var data = req.body;
  var headers = {
    'Authorization' : req.headers.authorization || 'null',
    'Content-Type' : req.headers['content-type'] || 'application/json'
  }
  var config;

  if(req.method=='POST' || req.method=='post'){
    config = {
      method: req.method,
      url,
      headers: headers,
      data : data
    };
  } else{
    config = {
      method: req.method,
      url,
      headers: headers,
      params : req.query
    }
  }

  let configSecurity = {
    method : req.method,
    url : "http://security-back:5123/check",
    headers,
    data : {
      path : req.path
    }
  }

  axios(configSecurity).then((resp) => {
    if(resp.data.idUserVerified){
      if(!config.data) {
        config.data = {}
      }
      config.data.idUserVerified = resp.data.idUserVerified;
      axios(config)
      .then(function (response) {
        res.send(response.data);
      }).catch((err) => {
        console.log(err);
        res.status(500);
        res.send(err);
      })
    } else{
      res.status(500);
      res.send({
        message : "Opps something was wrong",
        result : "ERROR"
      });
    }
  }).catch((err) => {
    if(err.response){
      console.log("Error", err.response.data);
      res.status(401);
      res.send(err.response.data);
    } else{
      console.log(err);
      next();
    }
  })

  /*


  */

}

findRoute = (path) => {
  for(let i=0; i<routes.length; i++){
    let r = routes[i];
    if(path.startsWith(r.path)){
      return "http://"+r.dom+":"+r.port+path
    }
  }
}

module.exports = {
  redirect
}
