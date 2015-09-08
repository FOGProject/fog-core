var forge = require('node-forge');
var async = require('async');
var aes   = {};

var encryptSync = function(iv, key, data, padding) {
  var cipher = forge.cipher.createCipher(padding, key);

  cipher.start({iv: iv});
  cipher.update(forge.util.createBuffer(data));
  cipher.finish();
  return cipher.output.toHex();
}
aes.encrypt = async.asyncify(encryptSync);

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
  forge.random.getBytes(32, function(err, key) {
    if (err) {
      cb(err);
      return;
    }

    var hexKey = new Buffer(key, 'binary').toString('hex');
    cb(err, hexKey);
  });
}

aes.generateIV = function(cb) {
  forge.random.getBytes(16, function(err, iv) {
    if (err) {
      cb(err);
      return;
    }

    var hexIV = new Buffer(iv, 'binary').toString('hex');
    cb(err, hexIV);
  });
}

module.exports = aes;
