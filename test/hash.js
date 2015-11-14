var assert  = require('assert');
var fs      = require('fs');
var fsExtra = require('fs-extra');
var async   = require('async');
var hash    = require('../libraries/hash.js');
var forge   = require('node-forge');
var path    = require('path');



var vectors = require(path.join(__dirname, '/hash/', 'vectors.json'));
var hmacs = require(path.join(__dirname, '/hash/', 'hmacs.json'));

var vectorsDir = path.join(__dirname, '/vectors/');
var hmacsDir = path.join(__dirname, '/hmacs/');

before(function() {
  try {
    fs.mkdirSync(vectorsDir);
    fs.mkdirSync(hmacsDir);
  }
  catch(e) { }

  vectors.forEach(function(v, i) {
    var buf = new Buffer(v.input, 'base64');
    var file = path.join(vectorsDir, i + '.dat');
    fs.writeFileSync(file, buf);
  });

  hmacs.forEach(function(v, i) {
    var buf = new Buffer(v.data, 'hex');
    var file = path.join(hmacsDir, i + '.dat');
    fs.writeFileSync(file, buf);
  });
});

after(function() {
  fsExtra.removeSync(vectorsDir);
  fsExtra.removeSync(hmacsDir);
});

var testHash = function(vectorType, done) {
  var calls = [];

  vectors.forEach(function(v, i) {
    calls.push(function(callback) {
      var buf = forge.util.decode64(v.input);
      hash[vectorType](buf, function(err, result) {
        assert(!err);
        assert(result === v[vectorType]);
        callback();
      });
    });
  });
  async.parallel(calls, function(err) {
    done();
  });
}

var testFileHash = function(vectorType, done) {
  var calls = [];

  vectors.forEach(function(v, i) {
    calls.push(function(callback) {
      var file = path.join(vectorsDir, i + '.dat');
      hash.file[vectorType](file, function(err, result) {
        assert(!err);
        assert(result === v[vectorType]);
        callback();
      });
    });
  });
  async.parallel(calls, function(err) {
    done();
  });
}

var testHMAC = function(vectorType, done) {
  var calls = [];

  hmacs.forEach(function(v, i) {
    calls.push(function(callback) {
      var data = forge.util.hexToBytes(v.data);
      var key  = forge.util.hexToBytes(v.key);

      hash.hmac(vectorType, key, data, function(err, result) {
        assert(!err);
        assert(result === v[vectorType]);
        callback();
      });
    });
  });
  async.parallel(calls, function(err) {
    done();
  });
}

var testFileHMAC = function(vectorType, done) {
  var calls = [];

  hmacs.forEach(function(v, i) {
    calls.push(function(callback) {

      var data = forge.util.hexToBytes(v.data);
      var key  = forge.util.hexToBytes(v.key);
      var file = path.join(hmacsDir, i + '.dat');

      hash.file.hmac(vectorType, key, file, function(err, result) {
        assert(!err);
        assert(result === v[vectorType]);
        callback();
      });
    });
  });
  async.parallel(calls, function(err) {
    done();
  });
}

describe('hash#md5', function() {
  it('should md5 hash test vectors', function(done) {
    testHash('md5', done);
  });
});

describe('hash#md5-file', function() {
  it('should md5 hash test vector files', function(done) {
    testFileHash('md5', done);
  });
});

describe('hash#sha1', function() {
  it('should sha1 hash test vectors', function(done) {
    testHash('sha1', done);
  });
});

describe('hash#sha1-file', function() {
  it('should sha1 hash test vector files', function(done) {
    testFileHash('sha1', done);
  });
});

describe('hash#sha256', function() {
  it('should sha256 hash test vectors', function(done) {
    testHash('sha256', done);
  });
});

describe('hash#sha256-file', function() {
  it('should sha256 hash test vector files', function(done) {
    testFileHash('sha256', done);
  });
});

describe('hash#sha384', function() {
  it('should sha384 hash test vectors', function(done) {
    testHash('sha384', done);
  });
});

describe('hash#sha384-file', function() {
  it('should sha384 hash test vector files', function(done) {
    testFileHash('sha384', done);
  });
});

describe('hash#sha512', function() {
  it('should sha512 hash test vectors', function(done) {
    testHash('sha512', done);
  });
});

describe('hash#sha512-file', function() {
  it('should sha512 hash test vector files', function(done) {
    testFileHash('sha512', done);
  });
});


// HMACS

describe('hash#hmac-md5', function() {
  it('should hmac md5 hash test vectors', function(done) {
    testHMAC('md5', done);
  });
});

describe('hash#hmac-md5-file', function() {
  it('should hmac md5 hash test vector files', function(done) {
    testHMAC('md5', done);
  });
});

describe('hash#hmac-sha1', function() {
  it('should hmac sha1 hash test vectors', function(done) {
    testHMAC('sha1', done);
  });
});

describe('hash#hmac-sha1-file', function() {
  it('should hmac sha1 hash test vector files', function(done) {
    testHMAC('sha1', done);
  });
});

describe('hash#hmac-sha256', function() {
  it('should hmac sha256 hash test vectors', function(done) {
    testHMAC('sha256', done);
  });
});

describe('hash#hmac-sha256-file', function() {
  it('should hmac sha256 hash test vector files', function(done) {
    testHMAC('sha256', done);
  });
});
