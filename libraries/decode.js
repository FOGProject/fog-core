var forge  = require('node-forge');
var async  = require('async');
var decode = {};

decode.hexSync = function(encoded) {
  return forge.util.hexToBytes(encoded);
};
decode.hex = async.asyncify(decode.hexSync);

decode.base64Sync = function(encoded) {
  return forge.util.decode64(encoded);
};
decode.base64 = async.asyncify(decode.base64Sync);

decode.utf8Sync = function(encoded) {
  return forge.util.decodeUtf8(encoded);
};
decode.utf8 = async.asyncify(decode.utf8Sync);

module.exports = decode;
