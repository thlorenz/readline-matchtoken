# readline-matchtoken [![build status](https://secure.travis-ci.org/thlorenz/readline-matchtoken.png)](http://next.travis-ci.org/thlorenz/readline-matchtoken)

Adds token matching to nodejs readline and visualizes it by jumping the cursor to it à la emacs.

## Installation
    
    npm i readline-matchtoken

## Demo

    npm explore readline-matchtoken && npm run demo

## Usage

```js
var rmt = require('')
  , repl = require('repl');

var r = repl.start({
    prompt: "> ",
    input: process.stdin,
    output: process.stdout
  });

rmt(r.rli);

r.displayPrompt();
```

Although this example starts a `repl`, a [readline
interface](http://nodejs.org/api/readline.html#readline_readline_createinterface_options) is all that is needed for
token matching to be applied.
