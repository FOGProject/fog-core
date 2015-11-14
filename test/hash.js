var assert  = require('assert');
var fs      = require('fs');
var fsExtra = require('fs-extra');
var async   = require('async');
var hash    = require('../libraries/hash.js');
var vectors = require('hash-test-vectors');
var forge   = require('node-forge');
var path    = require('path');

var testDir = path.join(__dirname, '/vectors/');

before(function() {
  try {
    fs.mkdirSync(testDir);
  }
  catch(e) { }

  vectors.forEach(function(v, i) {
    var buf = new Buffer(v.input, 'base64');
    var file = path.join(testDir, i + '.dat');
    fs.writeFileSync(file, buf);
  });
});

after(function() {
  fsExtra.removeSync(testDir);
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
      var file = path.join(testDir, i + '.dat');
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
