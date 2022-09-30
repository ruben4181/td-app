let toCurrency = (price) => {
  if(price){
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  } 
  return '';
}

let toExport = {
  toCurrency
}

export default toExport;
