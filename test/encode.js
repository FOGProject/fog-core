var assert = require('assert');
var async  = require('async');
var encode = require('../libraries/encode.js');

describe('encode#hex', function() {
  it('should hex encode test vectors', function(done) {
    var vectors = {
      '': '',
      'The quick brown fox jumps over the lazy dog':
          '54686520717569636b2062726f776e20666f78206a756d7073206f76657220746865206c617a7920646f67',
      'foobar': '666f6f626172'
    }

    Object.keys(vectors).forEach(function(key) {
      var encoded = encode.hexSync(key);
      assert(encoded === vectors[key]);
    });
    done();
  });
});

describe('encode#base64', function() {
  it('should base64 encode test vectors', function(done) {
    var vectors = {
      '': '',
      'f': 'Zg==',
      'fo': 'Zm8=',
      'foo': 'Zm9v',
      'foob': 'Zm9vYg==',
      'fooba': 'Zm9vYmE=',
      'foobar': 'Zm9vYmFy'
    }

    Object.keys(vectors).forEach(function(key) {
      var encoded = encode.base64Sync(key);
      assert(encoded === vectors[key]);
    });
    done();
  });
});
