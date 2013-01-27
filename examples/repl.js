'use strict';

var rmb = require('..')
  , repl = require('repl');

var r = repl.start({
    prompt: " > ",
    input: process.stdin,
    output: process.stdout
  });

rmb(r.rli);

r.displayPrompt();
