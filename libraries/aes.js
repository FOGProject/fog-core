var forge    = require('node-forge');
var encode   = require('./encode.js');
var decode   = require('./decode.js');
var generate = require('./generate.js');
var async    = require('async');
var aes      = {};

var encryptSync = function(hexIV, hexKey, data, padding) {
  var iv  = decode.hexSync(hexIV);
  var key = decode.hexSync(hexKey);

  var cipher = forge.cipher.createCipher(padding, key);
  cipher.start({iv: iv});
  cipher.update(forge.util.createBuffer(data));
  cipher.finish();
  return cipher.output.toHex();
};
aes.encrypt = async.asyncify(encryptSync);

var decryptSync = function(hexIV, hexKey, data, padding) {
  var iv  = decode.hexSync(hexIV);
  var key = decode.hexSync(hexKey);

  var decipher   = forge.cipher.createDecipher(padding, key);
  var byteBuffer = forge.util.createBuffer(data);

  decipher.start({iv: iv });
  decipher.update(byteBuffer);
  decipher.finish();

  return decipher.output.toHex();
};
aes.decrypt = async.asyncify(decryptSync);

aes.generateKey = function(cb) {
  generate.hexBytes(32, cb);
};

aes.generateIV = function(cb) {
  generate.hexBytes(16, cb);
};

module.exports = aes;
