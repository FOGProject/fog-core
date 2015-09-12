var forge  = require('node-forge');
var fs     = require('fs');
var async  = require('async');
var hash   = {};
hash.file  = {};

var md5Sync = function(data) {
  var md = forge.md.md5.create();
  md.update(data);
  return md.digest().toHex();
}
hash.md5 = async.asyncify(md5Sync);
hash.file.md5 = function(file) {
  var md = forge.md.md5.create();
  var stream = fs.ReadStream(file);

  stream.on('data', function(data) { md.update(data); });
  stream.on('end', function() {
    return md.digest().toHex();
  });
}

var sha1Sync = function(data) {
  var md = forge.md.sha1.create();
  md.update(data);
  return md.digest().toHex();
}
hash.sha1 = async.asyncify(sha1Sync);
hash.file.sha1 = function(file) {
  var md = forge.md.sha1.create();
  var stream = fs.ReadStream(file);

  stream.on('data', function(data) { md.update(data); });
  stream.on('end', function() {
    return md.digest().toHex();
  });
}

var sha256Sync = function(data) {
  var md = forge.md.sha256.create();
  md.update(data);
  return md.digest().toHex();
}
hash.sha256 = async.asyncify(sha256Sync);
hash.file.sha256 = function(file) {
  var md = forge.md.sha256.create();
  var stream = fs.ReadStream(file);

  stream.on('data', function(data) { md.update(data); });
  stream.on('end', function() {
    return md.digest().toHex();
  });
}

var sha384Sync = function(data) {
  var md = forge.md.sha384.create();
  md.update(data);
  return md.digest().toHex();
}
hash.sha384 = async.asyncify(sha384Sync);
hash.file.sha384 = function(file) {
  var md = forge.md.sha384.create();
  var stream = fs.ReadStream(file);

  stream.on('data', function(data) { md.update(data); });
  stream.on('end', function() {
    return md.digest().toHex();
  });
}

var sha512Sync = function(data) {
  var md = forge.md.sha512.create();
  md.update(data);
  return md.digest().toHex();
}
hash.sha512 = async.asyncify(sha512Sync);
hash.file.sha512 = function(file) {
  var md = forge.md.sha512.create();
  var stream = fs.ReadStream(file);

  stream.on('data', function(data) { md.update(data); });
  stream.on('end', function() {
    return md.digest().toHex();
  });
}

var hmacSync = function(type, key, data) {
  var hmac = forge.hmac.create();
  hmac.start(type, key);
  hmac.update(data);
  return hmac.digest().toHex();
}
hash.hmac = async.asyncify(hmacSync);

module.exports = hash;
