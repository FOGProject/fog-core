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

module.exports = decode;
