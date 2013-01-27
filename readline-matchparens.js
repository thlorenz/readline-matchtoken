'use strict';

var logln = require('./lib/utl').logln;

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
    original_ttyWrite.apply(rli, arguments);

    matchAt = Math.max(0, rli.cursor - 3);
    move = matchAt - rli.cursor;
    pendingMoveBack = -move;
    rli._moveCursor(move);

    setTimeout(moveCursorBack, 200);


    logln({ line: rli.line, cursor: rli.cursor });
  };
};
