var forge  = require('node-forge');
var async  = require('async');
var encode = {};

var encodeHexSync  = function (bytes) {
  return forge.util.bytesToHex(bytes);
}
encode.hex = async.asyncify(encodeHexSync);

var encodeBase64Sync = function (bytes) {
  return forge.util.encode64(data);
}
encode.base64 = async.asyncify(encodeBase64Sync);

var encodeUTF8Sync = function (bytes) {
  return forge.util.encodeUtf8(data);
}
encode.utf8 = async.asyncify(encodeUTF8Sync);

module.exports = encode;
