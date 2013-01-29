'use strict';
/*jshint asi: true */

var readlineMatchToken = require('..') 
  , test = require('trap').test
  , harness = require('readline-testharness')
  , createHarness = harness.create
  , hns
  , cursorAfter
  , cursorBefore

function createrli() {
  var rli = harness.rli()
  rli.line = ''
  rli._ttyWrite = function (code, key) { 
    if (!cursorBefore) this.line += key.name 
    else this.line = this.line.slice(0, cursorBefore) + key.name + this.line.slice(cursorBefore)

    // move cursor behind entered char
    this.cursor = cursorAfter || this.line.length;
  }
  return rli;
}

function setup() {
  cursorAfter = cursorBefore = undefined
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
    , readlineMatchToken.interval / 2
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

test('given rli line "function foo () { console.log("hello world"); " and I enter "}"', function (t) {
  setup()

  hns.rli.line = 'function foo () { console.log("hello world"); '
  hns.key('}')
  t.equal(hns.rli.moveCursor.pop(), -31, 'moves cursor onto matching brace')
});

test('given rli line "function foo () console.log("hello world"); }", the cursor is before "console" and I enter "{"', function (t) {
  setup()
  
  //              0123456789012345
  hns.rli.line = 'function foo () console.log("hello world"); }'

  cursorBefore = 15
  cursorAfter = 16
  hns.key('{')
  t.equal(hns.rli.moveCursor.pop(), 29, 'moves cursor onto matching close brace')
});
