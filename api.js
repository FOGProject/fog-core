var fs       = require('fs');
var path     = require('path');
var api      = [];
var corePath = path.join(__dirname, 'libraries/');

var files = fs.readdirSync(corePath);

for (var i = 0; i < files.length; i++) {
  api[files[i].replace('.js', '')] = require(corePath + files[i]);
}

module.exports = api;
