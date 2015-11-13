var assert = require('assert');
var async  = require('async');
var aes    = require('../libraries/aes.js')

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
