module.exports = {
  SQL_SP_INSERT : "CALL SP_STORES_INSERT(?, ?, ?, ?, @nError, @vMessage)",
  SQL_SP_UPDATE : "CALL SP_STORES_UPDATE(?, ?, ?, @nError, @vMessage)",
  SQL_SP_DELETE : "CALL SP_STORES_DELETE(?, @nError, @vMessage)",
  SQL_SP_GET_STORES_BY_USER : "CALL SP_GET_STORES_BY_USER(?, @nerror, @vmessage)"
}