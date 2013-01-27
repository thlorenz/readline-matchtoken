'use strict';

var logln = require('./lib/utl').logln;

var override = module.exports = function override_ttyWrite(rli) {
  var original_ttyWrite =  rli._ttyWrite;
  rli._ttyWrite = function () {
    original_ttyWrite.apply(rli, arguments);

    logln(rli.line);
  };
};
