var forge    = require('node-forge');
var async    = require('async');
var pwGen    = require('password-generator');
var uuidGen  = require('uuid');
var encode   = require('./encode.js');
var generate = {};

// Create uuid and verify against the collection to make sure is unique
generate.uuid = function(coll, cb) {
  var newUUID = uuidGen.v1();
  coll.find({uid: newUUID}).exec(function doCB(err, found) {
    if (found.name === null) {
      cb(newUUID);
    } else {
      generate.uuid(coll,cb);
    }
  });
};

generate.bytes = function(size, cb) {
  forge.random.getBytes(size, function(err, bytes) {
    cb(err, bytes);
  });
};

generate.hexBytes = function(size, cb) {
  generate.bytes(size, function(err, bytes) {
    if (err) { return cb(err); }
    encode.hex(bytes, function(err, hexBytes) {
      cb(err, hexBytes);
    });
  });
};

var genPasswordSync = function(length) {
  pwGen.generatePassword(length, false);
};
generate.password = async.asyncify(genPasswordSync);

module.exports = generate;
