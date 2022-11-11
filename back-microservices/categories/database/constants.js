module.exports = {
  SQL_SP_INSERT : "CALL SP_CATEGORIES_INSERT(?, ?, ?, ?, ?, ?, @nError, @vMessage)",
  SQL_SP_UPDATE : "CALL SP_CATEGORIES_UPDATE(?, ?, ?, ?, ?, @nError, @vMessage)",
  SQL_SP_DELETE : "CALL SP_CATEGORIES_DELETE(?, ?, @nError, @vMessage)",
  SQL_SP_CATEGORIES_GET_BY_STORE : "CALL SP_CATEGORIES_GET_BY_STORE(?, @nError, @vMessage)",
  SQL_SP_CATEGORIES_GET_BY_STORE_ALL : "CALL SP_CATEGORIES_GET_BY_STORE_ALL(?, @nError, @vMessage)"
}