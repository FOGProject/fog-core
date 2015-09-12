var forge  = require('node-forge');
var fs     = require('fs');
var async  = require('async');
var hash   = {};
hash.file  = {};

// =============================================================================
// Base hashing methods
// =============================================================================
var hashDataSync = function(md, data) {
  md.update(data);
  return md.digest().toHex();
};
var hashData = async.asyncify(hashDataSync);

var hashFileSync = function(md, file) {
  var stream = fs.ReadStream(file);

  stream.on('data', function(data) { md.update(data); });
  stream.on('end', function() {
    return md.digest().toHex();
  });
};
var hashFile = async.asyncify(hashFileSync);

// =============================================================================
// Hash specific methods
// =============================================================================
hash.md5 = function(data, cb) {
  hashData(forge.md.md5.create(), data, cb);
};
hash.file.md5 = function(file, cb) {
  hashFile(forge.md.md5.create(), file, cb);
};

hash.sha1 = function(data, cb) {
  hashData(forge.md.sha1.create(), data, cb);
};
hash.file.sha1 = function(file, cb) {
  hashFile(forge.md.sha1.create(), file, cb);
};

hash.sha256 = function(data, cb) {
  hashData(forge.md.sha256.create(), data, cb);
};
hash.file.sha256 = function(file, cb) {
  hashFile(forge.md.sha256.create(), file, cb);
};

hash.sha384 = function(data, cb) {
  hashData(forge.md.sha384.create(), data, cb);
};
hash.file.sha384 = function(file, cb) {
  hashFile(forge.md.sha384.create(), file, cb);
};

hash.sha512 = function(data, cb) {
  hashData(forge.md.sha512.create(), data, cb);
};
hash.file.sha512 = function(file, cb) {
  hashFile(forge.md.sha512.create(), file, cb);
};

hash.hmac = function(type, key, data, cb) {
  var hmac = forge.hmac.create();
  hmac.start(type, key);
  hashData(hmac, data, cb);
};
hash.file.hmac = function(type, key, file, cb) {
  var hmac = forge.hmac.create();
  hmac.start(type, key);
  hashFile(hmac, file, cb);
};


module.exports = hash;
