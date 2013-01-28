'use strict';

var matchToken = require('match-token')
  , logln = require('./lib/utl').logln;


var override = module.exports = function override_ttyWrite(rli) {
  var original_ttyWrite =  rli._ttyWrite
    , pendingMoveBack;

  function moveCursorBack() {
    if (pendingMoveBack) rli._moveCursor(pendingMoveBack);
    pendingMoveBack = 0;
  } 

  rli._ttyWrite = function () {
    var matchAt, move;

    moveCursorBack();

    var linelen = rli.line.length;
    original_ttyWrite.apply(rli, arguments);

    // only visualize match if we just typed it
    if (rli.line.length <= linelen) return;

    matchAt = matchToken(rli.line, Math.max(rli.cursor -1, 0));

    if (matchAt === -1) return;

    move = matchAt - rli.cursor;
    pendingMoveBack = -move;
    rli._moveCursor(move);

    setTimeout(moveCursorBack, override.interval);
  };
};
override.interval = 200;
