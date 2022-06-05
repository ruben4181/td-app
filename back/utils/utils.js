const crypto = require("crypto");

function sha256(string) {
  const hash = crypto.createHash('sha256').update(string).digest('base64');
  return hash;
}

module.exports = {
  sha256
}