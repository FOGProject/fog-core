var forge  = require('node-forge');
var async  = require('async');
var hash   = {};

var md5Sync = function(data) {
  var md = forge.md.md5.create();
  md.update(data);
  return md.digest().toHex();
}
hash.md5 = async.asyncify(md5Sync);

var sha1Sync = function(data) {
  var md = forge.md.sha1.create();
  md.update(data);
  return md.digest().toHex();
}
hash.sha1 = async.asyncify(sha1Sync);

var sha256Sync = function(data) {
  var md = forge.md.sha256.create();
  md.update(data);
  return md.digest().toHex();
}
hash.sha256 = async.asyncify(sha256Sync);

var sha384Sync = function(data) {
  var md = forge.md.sha384.create();
  md.update(data);
  return md.digest().toHex();
}
hash.sha384 = async.asyncify(sha384Sync);

var sha512Sync = function(data) {
  var md = forge.md.sha512.create();
  md.update(data);
  return md.digest().toHex();
}
hash.sha512 = async.asyncify(sha512Sync);

module.exports = hash;
