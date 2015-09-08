var forge = require('node-forge');
var async = require('async');
var aes   = {};

// Encrypt a message using AES with the given padding
var encryptSync = function(iv, key, data, padding) {
  var cipher = forge.cipher.createCipher(padding, key);

  cipher.start({iv: iv});
  cipher.update(forge.util.createBuffer(data));
  cipher.finish();
  return cipher.output;
}
aes.encrypt = async.asyncify(encryptSync);

// Decrypt an AES message with the given padding
// blob contains .iv and .data
// Returns the decrypted message
var decryptSync = function(iv, key, data, padding) {
  var decipher   = forge.cipher.createDecipher(padding, key);
  var byteBuffer = forge.util.createBuffer(data);

  decipher.start({iv: iv });
  decipher.update(byteBuffer);
  decipher.finish();

  return decipher.output.toHex();
}
aes.decrypt = async.asyncify(decryptSync);

aes.generateKey = function(cb) {
  forge.random.getBytes(32, cb);
}

aes.generateIV = function(cb) {
  forge.random.getBytes(16, cb);
}

module.exports = aes;
