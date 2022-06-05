module.exports = {
  //SQL_AUTH_USER : "SELECT U.ID_USER FROM USERS U WHERE U.USERNAME = ? AND U.PASSWORD = SHA2(?, 256) LIMIT 1"
  SQL_AUTH_USER : "CALL SP_USERS_AUTH(?, ?, @nError, @vMessage)",
  SQL_SP_INSERT : "CALL SP_USERS_INSERT(?, ?, ?, ?, @nError, @vMessage)",
  SQL_SP_UPDATE : "CALL SP_USERS_UPDATE(?, ?, ?, ?, ?, ?, @nError, @vMessage)",
  SQL_SP_GET_ROLES : "CALL SP_USER_GET_ROLES(?, ?, @nError, @vMessages)"
  //SQL_AUTH_USER : "CALL TEST_P(@vMessx)"
}
