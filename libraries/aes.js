var forge  = require('node-forge');
var encode = require('./encode.js');
var decode = require('./decode.js');
var async  = require('async');
var aes    = {};

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
  forge.random.getBytes(32, function(err, key) {
    if (err) { return cb(err); }
    encode.hex(key, function(err, hexKey) {
      cb(err, hexKey);
    });
  });
};

aes.generateIV = function(cb) {
  forge.random.getBytes(16, function(err, iv) {
    if (err) { return cb(err); }
    encode.hex(iv, function(err, hexIV) {
      cb(err, hexIV);
    });
  });
};

module.exports = aes;
