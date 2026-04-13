# jsonc-eslint-parser

[![NPM license](https://img.shields.io/npm/l/jsonc-eslint-parser.svg)](https://www.npmjs.com/package/jsonc-eslint-parser)
[![NPM version](https://img.shields.io/npm/v/jsonc-eslint-parser.svg)](https://www.npmjs.com/package/jsonc-eslint-parser)
[![NPM downloads](https://img.shields.io/npm/dw/jsonc-eslint-parser.svg)](http://www.npmtrends.com/jsonc-eslint-parser)
[![NPM downloads](https://img.shields.io/npm/dm/jsonc-eslint-parser.svg)](http://www.npmtrends.com/jsonc-eslint-parser)
[![Build Status](https://github.com/ota-meshi/jsonc-eslint-parser/workflows/CI/badge.svg?branch=master)](https://github.com/ota-meshi/jsonc-eslint-parser/actions?query=workflow%3ACI)
[![Coverage Status](https://coveralls.io/repos/github/ota-meshi/jsonc-eslint-parser/badge.svg?branch=master)](https://coveralls.io/github/ota-meshi/jsonc-eslint-parser?branch=master)

## :name_badge: Introduction

[JSON], [JSONC] and [JSON5] parser for use with [ESLint] plugins.

This parser allows us to lint [JSON], [JSONC] and [JSON5] files.
This parser and the rules of [eslint-plugin-jsonc] would catch some of the mistakes and code style violations.

See [eslint-plugin-jsonc] for details.

## :cd: Installation

```bash
npm i --save-dev jsonc-eslint-parser
```

## :book: Usage (Flat Config)

In your ESLint configuration file, set the `parser` property:

```js
import * as jsoncParser from "jsonc-eslint-parser";

export default [
  {
    // ...
    // Add the following settings.
    files: ["**/*.json", "**/*.json5"], // Specify the extension or pattern you want to parse as JSON.
    languageOptions: {
      parser: jsoncParser, // Set this parser.
    }
  },
];
```

## :book: Usage (Legacy Config)

In your ESLint configuration file, set the `overrides` > `parser` property:

```json5
{
  // ...
  // Add the following settings.
  "overrides": [
    {
      "files": ["*.json", "*.json5"], // Specify the extension or pattern you want to parse as JSON.
      "parser": "jsonc-eslint-parser", // Set this parser.
    },
  ],
}
```

## :gear: Configuration

The following additional configuration options are available by specifying them in [parserOptions](https://eslint.org/docs/latest/use/configure/parser#configure-parser-options) in your ESLint configuration file.

```json5
{
  // Additional configuration options
  "parserOptions": {
    "jsonSyntax": "JSON5"
  }
}
```

### `parserOptions.jsonSyntax`

Set to `"JSON"`, `"JSONC"` or `"JSON5"`. Select the JSON syntax you are using.  
If not specified, all syntaxes that express static values ​​are accepted. For example, template literals without interpolation.  

**Note** : Recommended to loosen the syntax checking by the parser and use check rules of [eslint-plugin-jsonc] to automatically fix it.

## :gear: API

### `parseJSON(code, options?)`

Parses the given JSON source code and returns the AST.

```js
import { parseJSON } from "jsonc-eslint-parser";

const ast = parseJSON('{"key": "value"}', { jsonSyntax: "JSON" });
console.log(ast);
```

**Parameters:**

- `code` (string): The JSON source code to parse.
- `options` (object, optional): Parser options.
  - `jsonSyntax` (`"JSON"` | `"JSONC"` | `"JSON5"`): The JSON syntax to use.

**Returns:** `JSONProgram` - The root AST node.

### `parseForESLint(code, options?)`

Parses the given JSON source code for ESLint. This is the main parser function used by ESLint.

```js
import { parseForESLint } from "jsonc-eslint-parser";

const result = parseForESLint('{"key": "value"}', { jsonSyntax: "JSON" });
console.log(result.ast);
console.log(result.services);
console.log(result.visitorKeys);
```

**Parameters:**

- `code` (string): The JSON source code to parse.
- `options` (object, optional): Parser options (same as `parseJSON`).

**Returns:** An object containing:

- `ast`: The root AST node.
- `services`: An object with helper methods like `getStaticJSONValue()`.
- `visitorKeys`: Visitor keys for traversing the AST.

### `tokenize(code, options?)`

Tokenizes the given JSON source code and returns an array of tokens.

```js
import { tokenize } from "jsonc-eslint-parser";

const tokens = tokenize('{"key": "value"}', { jsonSyntax: "JSON" });
console.log(tokens);
// [
//   { type: 'Punctuator', value: '{', range: [0, 1], loc: {...} },
//   { type: 'String', value: '"key"', range: [1, 6], loc: {...} },
//   { type: 'Punctuator', value: ':', range: [6, 7], loc: {...} },
//   { type: 'String', value: '"value"', range: [8, 15], loc: {...} },
//   { type: 'Punctuator', value: '}', range: [15, 16], loc: {...} }
// ]

// Include comments in the result
const tokensWithComments = tokenize('{"key": "value" /* comment */}', {
  jsonSyntax: "JSONC",
  includeComments: true
});
```

**Parameters:**

- `code` (string): The JSON source code to tokenize.
- `options` (object, optional): Parser options.
  - `jsonSyntax` (`"JSON"` | `"JSONC"` | `"JSON5"`): The JSON syntax to use.
  - `includeComments` (boolean): If `true`, comments are included in the result array.

**Returns:** `Token[]` or `(Token | Comment)[]` - An array of tokens, optionally including comments.

## Usage for Custom Rules / Plugins

- [AST.md](./docs/AST.md) is AST specification.
- [Plugins.md](./docs/Plugins.md) describes using this in an ESLint plugin.
- [no-template-literals.ts](https://github.com/ota-meshi/eslint-plugin-jsonc/blob/master/lib/rules/no-template-literals.ts) is an example.
- You can see the AST on the [Online DEMO](https://ota-meshi.github.io/jsonc-eslint-parser/).

## :traffic_light: Semantic Versioning Policy

**jsonc-eslint-parser** follows [Semantic Versioning](http://semver.org/).

## :couple: Related Packages

- [eslint-plugin-jsonc](https://github.com/ota-meshi/eslint-plugin-jsonc) ... ESLint plugin for JSON, JSON with comments (JSONC) and JSON5.
- [eslint-plugin-yml](https://github.com/ota-meshi/eslint-plugin-yml) ... ESLint plugin for YAML.
- [eslint-plugin-toml](https://github.com/ota-meshi/eslint-plugin-toml) ... ESLint plugin for TOML.
- [eslint-plugin-json-schema-validator](https://github.com/ota-meshi/eslint-plugin-json-schema-validator) ... ESLint plugin that validates data using JSON Schema Validator.
- [yaml-eslint-parser](https://github.com/ota-meshi/yaml-eslint-parser) ... YAML parser for use with ESLint plugins.
- [toml-eslint-parser](https://github.com/ota-meshi/toml-eslint-parser) ... TOML parser for use with ESLint plugins.

## :lock: License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).

[JSON]: https://json.org/
[JSONC]: https://github.com/microsoft/node-jsonc-parser
[JSON5]: https://json5.org/
[ESLint]: https://eslint.org/
[eslint-plugin-jsonc]: https://www.npmjs.com/package/eslint-plugin-jsonc
