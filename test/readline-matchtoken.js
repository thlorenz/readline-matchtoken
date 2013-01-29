'use strict';
/*jshint asi: true */

var readlineMatchToken = require('..') 
  , test = require('trap').test
  , harness = require('readline-testharness')
  , createHarness = harness.create
  , hns

function createrli() {
  var rli = harness.rli()
  rli.line = ''
  rli._ttyWrite = function (code, key) { 
    this.line += key.name 

    // move cursor behind entered char
    this.cursor = this.line.length;

  }
  return rli;
}

function setup() {
  readlineMatchToken.interval = 10
  hns = createHarness(readlineMatchToken, createrli)
  hns.reset()
}

test('given rli line "(.." and I enter ")" and wait', function (t) {
  setup()

  hns.rli.line = '(..'
  hns.key(')')

  t.equal(hns.rli.moveCursor.pop(), -4, 'moves cursor onto matching paren')
  setTimeout(t.cb(
      function () { 
        t.equal(hns.rli.moveCursor.pop(), undefined, 'keeps cursor there for given interval')
      })
    , readlineMatchToken.interval - 1
  )
  setTimeout(t.cb(
      function () { 
        t.equal(hns.rli.moveCursor.pop(), 4, 'moves cursor back after interval passed')
      })
    , readlineMatchToken.interval
  )
})

test('given rli line "(.." and I enter ")" and enter a [space] right after', function (t) {
  setup()

  hns.rli.line = '(..'
  hns.key(')')
  t.equal(hns.rli.moveCursor.pop(), -4, 'moves cursor onto matching paren')

  hns.key('space')
  t.equal(hns.rli.moveCursor.pop(), 4, 'moves cursor back as [space] is entered')
});

