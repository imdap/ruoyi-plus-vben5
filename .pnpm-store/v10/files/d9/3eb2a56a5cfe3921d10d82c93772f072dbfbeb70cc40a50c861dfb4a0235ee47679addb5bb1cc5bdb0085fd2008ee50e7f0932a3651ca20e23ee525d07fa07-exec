# deps-regex

> Regular expression for matching javascript require/import statements.

This is pretty fragile and created for perf reasons where using a real parser would be overkill.

## Install

Install with [npm](https://www.npmjs.com/)

```sh
npm install --save deps-regex
```

## Usage

```js
var DepsRegex = require("deps-regex");
var re = new DepsRegex({
  matchInternal: true,
  matchES6: true,
  matchCoffeescript: true,
});

re.getDependencies("var foo = require('bar');");
// => [ 'bar']
```

## Known false positives

```js
module.exports = 'require("false-positive");';
```

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/mathieudutour/deps-regex/issues/new).

### Running tests

Install dev dependencies:

```sh
npm install && npm test
```

## License

Released under the MIT license.
