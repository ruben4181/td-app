module.exports = {
  SQL_SP_INSERT : "CALL SP_PRODUCTS_INSERT(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @nError, @vMessage)",
  SQL_SP_UPDATE : "CALL SP_PRODUCTS_UPDATE(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @nError, @vMessage)",
  SQL_SP_DELETE : "CALL SP_PRODUCTS_DELETE(?, ?, @nError, @vMessage)",
  SQL_SP_PRODUCTS_GET_BY_STORE : "CALL SP_PRODUCTS_GET_BY_STORE(?, ?, ?, @nError, @vMessage)",
  SQL_SP_PRODUCTS_GET_BY_CATEGORY : "CALL SP_PRODUCTS_GET_BY_CATEGORY(?, ?, ?, ?, @nError, @vMessage)",
  SQL_SP_PRODUCTS_FIND_PRODUCTS : "CALL SP_PRODUCTS_FIND_PRODUCTS(?, ?, ?, @nError, @vMessage)",
  SQL_SP_PRODUCTS_FIND_PRODUCTS_BY_CATEGORY : "CALL SP_PRODUCTS_FIND_PRODUCTS_BY_CATEGORY(?, ?, ?, ?, @nError, @vMessage)",
  SQL_SP_PRODUCTS_GET_PRODUCT : "CALL SP_PRODUCTS_GET_PRODUCT(?, @nError, @vMessage)",
  SQL_SP_PRODUCTS_GET_STOCK_ALERT : "CALL SP_PRODUCTS_GET_BY_STOCK_ALERT(?, ?)",
}