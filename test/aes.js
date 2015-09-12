var assert = require('assert');
var async  = require('async');
var aes    = require('../api/core/aes.js')

describe('aes#roundTrip', function() {
  it('should aes encrypt and then decrypt data', function(done) {
    var data     = 'Foobar123!@';
    var hexData  = '466f6f6261723132332140';
    var padding  = 'AES-CBC';
    var iv;
    var key;
    setTimeout(async.waterfall([
      aes.generateIV,
      function(newIV, callback) {
        iv = newIV;
        aes.generateKey(callback);
      },
      function(newKey, callback) {
        key = newKey;
        aes.encrypt(iv, key, data, padding, callback);
      },
      function(encrypted, callback) {
        aes.decrypt(iv, key, encrypted, padding, callback);
      },
    ], function(err, decryptedData) {
      assert(decryptedData === hexData);
      done();
    }), 5000);
  });
});

describe('aes#encrypt', function() {
  it('should aes encrypt data', function(done) {
    var data     = 'Foobar123!@';
    var key      = '093309B3A31107311510C072BFBDA13DB367440DC276DA9570FAB701B69C6039';
    var iv       = '93ff823b2af310135922392e4599ab18';
    var expected = '647f0053b6adf1d1a210f4884d1381d7';
    var padding  = 'AES-CBC';
    setTimeout(aes.encrypt(iv, key, data, padding, function(err, encrypted) {
      assert(!err);
      assert(encrypted === expected);
      done();
    }), 5000);
  });
});

describe('aes#decrypt', function() {
  it('should aes decrypt data', function(done) {
    var data     = '647f0053b6adf1d1a210f4884d1381d7';
    var key      = '093309B3A31107311510C072BFBDA13DB367440DC276DA9570FAB701B69C6039';
    var iv       = '93ff823b2af310135922392e4599ab18';
    var expected = '466f6f6261723132332140';
    var padding  = 'AES-CBC';
    setTimeout(aes.decrypt(iv, key, data, padding, function(err, decrypted) {
      assert(!err);
      assert(decrypted === expected);
      done();
    }), 5000);
  });
});

describe('aes#generateKey', function() {
  it('should generate 32 random bytes', function(done) {
    setTimeout(aes.generateKey(function(err, key) {
      assert(!err);
      assert(typeof (key) === 'string');
      // Will be in hex form so double the length
      assert(key.length === 64);
      done();
    }), 5000);
  });
});

describe('aes#doubleGenerateKey', function() {
  it('should generate 2 unique Keys', function(done) {
    setTimeout(aes.generateKey(function(err, key) {
      aes.generateKey(function(err2, key2) {
        assert(key !== key2);
        done();
      });
    }), 5000);
  });
});

describe('aes#generateIV', function() {
  it('should generate 16 random bytes', function(done) {
    setTimeout(aes.generateIV(function(err, iv) {
      assert(!err);
      assert(typeof (iv) === 'string');
      // Will be in hex form so double the length
      assert(iv.length === 32);
      done();
    }), 5000);
  });
});

describe('aes#doubleGenerateIV', function() {
  it('should generate 2 unique IVs', function(done) {
    setTimeout(aes.generateIV(function(err, iv) {
      aes.generateIV(function(err2, iv2) {
        assert(iv !== iv2);
        done();
      });
    }), 5000);
  });
});
