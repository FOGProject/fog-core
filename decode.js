var forge  = require('node-forge');
var async  = require('async');
var decode = {};

var decodeHexSync = function (encoded) {
  return forge.util.hexToBytes(encoded);
}
decode.hex = async.asyncify(decodeHexSync);

var decodeBase64Sync = function (encoded) {
  return forge.util.decode64(encoded);
}
decode.base64 = async.asyncify(decodeBase64Sync);

var decodeUtf8Sync = function (encoded) {
  return forge.util.decodeUtf8(encoded);
}
decode.utf8 = async.asyncify(decodeUtf8Sync);

module.exports = decode;
