'use strict';

var rmt = require('..')
  , repl = require('repl');

var r = repl.start({
    prompt: "> ",
    input: process.stdin,
    output: process.stdout
  });

rmt(r.rli);

r.displayPrompt();
