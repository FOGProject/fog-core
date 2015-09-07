var forge = require('node-forge');
var async = require('async');
var rsa   = {};

// Encrypt a message using RSA with the given padding
var encryptSync = function (key, bytes, padding) {
  return key.encrypt(bytes, padding);
}
rsa.encrypt = async.asyncify(encryptSync);

// Decrypt an RSA message with the given padding
var decryptSync = function (key, bytes, padding) {
  return key.decrypt(bytes, padding);
}
rsa.decrypt = async.asyncify(decryptSync);

rsa.generateKeyPair = function(bits, cb) {
  forge.rsa.generateKeyPair({bits: bits, workers: -1}, cb);
}

module.exports = rsa;
