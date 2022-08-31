validateStruct = (structFilename, struct2Validate)=>{
  let struct = require('./structs/'+structFilename);
  let fields = Object.keys(struct2Validate);
  let flags = true;

  fields.forEach(field => {
    if(typeof struct[field] == "undefined"){
      flags = false;
      return;
    }
    let length = struct[field].len;
    let type = struct[field].type;
    let regex = struct[field].regex;
    
    //checking field length
    let data = struct2Validate[field];

    //checking type of data
    let typeFlag = false;
    if(data== null || typeof data == type){
      typeFlag = true;
    } else{
      console.log(field, "=> does not match type:", data, type, typeof data);
    }

    if(typeof data == "number"){
      if(struct[field].min && struct[field].min>data){
        flags = false;
        return;
      }
      if(struct[field].max && struct[field].max<data){
        flags = false;
        return;
      }
    }

    data = String(data);
    if(data==null || data == "null"){
      flags = true;
    }
    let lenFlag = false;
    if(data.length>= length[0] && data.length<=length[1]){
      lenFlag = true;
    } else{
      console.log(field, "=> not in boundaries:", data, length);
    }
    //checking regex of data
    let re = new RegExp(regex);
    let regexFlag = false;
    if(re.test(data)){
      regexFlag = true;
    } else{
      console.log(field, "=> regex no valid:", data, re);
    }
    if (!(lenFlag && typeFlag && regexFlag)){
      flags = false;
      return;
    }
  });
  return flags;
}

module.exports = {
  validateStruct
}