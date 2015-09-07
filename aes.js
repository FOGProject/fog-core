var forge = require('node-forge');
var aes   = {};

// Encrypt a message using AES with the given padding
aes.encrypt = function (key, message, padding, cb) {
  aes.generateIV(function(err, iv) {
    if(err) {
      cb(err);
      return;
    }
    var cipher = forge.cipher.createDecipher(padding, key);

    cipher.start({iv: iv});
    cipher.update(forge.util.createBuffer(message));
    cipher.finish(function(err) {
      if(err) {
        cb(err);
        return;
      }

      var results = {};
      results.data = cipher.output.toHex();
      results.iv = iv;

      cb(null, results);
    });
  });
}

// Decrypt an AES message with the given padding
// blob contains .iv and .data
// Returns the decrypted message
aes.decrypt = function (key, blob, padding, cb) {
  var decipher   = forge.cipher.createDecipher(padding, key);
  var byteBuffer = forge.util.createBuffer(blob.data);

  decipher.start({iv: blob.iv });
  decipher.update(byteBuffer);
  decipher.finish(function(err) {
    if(err) {
      cb(err, null);
      return;
    }
    cb(null, decipher.output.toString());
  });
}

aes.generateKey = function(cb) {
  forge.random.getBytes(32, function(err, bytes) {
    cb(err, bytes);
  });
}

aes.generateIV = function(cb) {
  forge.random.getBytes(16, function(err, bytes) {
    cb(err, bytes);
  });
}

module.exports = aes;
