var forge  = require('node-forge');
var async  = require('async');
var encode = {};

encode.hexSync = function(bytes) {
  return forge.util.bytesToHex(bytes);
}
encode.hex = async.asyncify(encode.hexSync);

encode.base64Sync = function(bytes) {
  return forge.util.encode64(data);
}
encode.base64 = async.asyncify(encode.base64Sync);

encode.utf8Sync = function(bytes) {
  return forge.util.encodeUtf8(data);
}
encode.utf8 = async.asyncify(encode.utf8Sync);

module.exports = encode;
