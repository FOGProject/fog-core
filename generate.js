var forge    = require('node-forge');
var async    = require('async');
var chance   = require('chance').Chance();
var uuidGen  = require('uuid');
var generate = {};


// =============================================================================
// create uuid and verify against the collection to make sure is unique
// =============================================================================
generate.uuid = function (coll, cb) {
  var newUUID = uuidGen.v1();
  coll.find({uid:newUUID}).exec(function doCB(err, found) {
    if (found.name == null){
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
}

// TODO: Look into secure generation, possibly collecting entropy and then getting random bytes,
// and linking them to a string of alpha-numeric characters
var genPasswordSync = function(length) {
  return chance.string({length:length});
}
generate.password = async.asyncify(genPasswordSync);

module.exports = generate;
