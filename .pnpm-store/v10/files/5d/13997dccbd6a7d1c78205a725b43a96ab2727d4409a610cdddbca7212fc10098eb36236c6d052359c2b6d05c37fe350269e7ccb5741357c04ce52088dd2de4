# mathml-tag-names

[![Build][badge-build-image]][badge-build-url]
[![Coverage][badge-coverage-image]][badge-coverage-url]
[![Downloads][badge-downloads-image]][badge-downloads-url]
[![Size][badge-size-image]][badge-size-url]

List of known MathML tag names.

## Contents

* [What is this?](#what-is-this)
* [When should I use this?](#when-should-i-use-this)
* [Install](#install)
* [Use](#use)
* [API](#api)
  * [`mathmlTagNames`](#mathmltagnames)
* [Types](#types)
* [Compatibility](#compatibility)
* [Security](#security)
* [Related](#related)
* [Contribute](#contribute)
* [License](#license)

## What is this?

This is a list of MathML tag names.
It includes all tag names from [MathML 1][w3-mathml1],
[MathML 2][w3-mathml2],
[MathML 3][w3-mathml3],
and
[MathML 4][w3-mathml4].
The repo includes scripts to regenerate the data from the specs.

## When should I use this?

You can use this package when you need to know what tag names are allowed in
any version of MathML.

## Install

This package is [ESM only][github-gist-esm].
In Node.js (version 16+),
install with [npm][npmjs-install]:

```sh
npm install mathml-tag-names
```

In Deno with [`esm.sh`][esmsh]:

```js
import {mathmlTagNames} from 'https://esm.sh/mathml-tag-names@4'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {mathmlTagNames} from 'https://esm.sh/mathml-tag-names@4?bundle'
</script>
```

## Use

```js
import {mathmlTagNames} from 'mathml-tag-names'

console.log(mathmlTagNames.length) // => 201

console.log(mathmlTagNames.slice(0, 10))
```

Yields:

```js
[
  'abs',
  'and',
  'annotation',
  'annotation-xml',
  'apply',
  'approx',
  'arccos',
  'arccosh',
  'arccot',
  'arccoth'
]
```

## API

This package exports the identifier `mathmlTagNames`.
There is no default export.

### `mathmlTagNames`

List of known (lowercase) MathML tag names (`ReadonlyArray<string>`).

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now,
that is Node.js 16+.
It also works in Deno and modern browsers.

## Security

This package is safe.

## Related

* [`wooorm/html-tag-names`](https://github.com/wooorm/html-tag-names)
  — list of HTML tag names
* [`wooorm/svg-tag-names`](https://github.com/wooorm/svg-tag-names)
  — list of SVG tag names
* [`wooorm/svg-element-attributes`](https://github.com/wooorm/svg-element-attributes)
  — map of SVG elements to attributes
* [`wooorm/html-element-attributes`](https://github.com/wooorm/html-element-attributes)
  — map of HTML elements to attributes
* [`wooorm/aria-attributes`](https://github.com/wooorm/aria-attributes)
  — list of ARIA attributes

## Contribute

Yes please!
See [*How to Contribute to Open Source*][opensource-guide].

## License

[MIT][file-license] © [Titus Wormer][wooorm]

<!-- Definition -->

[badge-build-image]: https://github.com/wooorm/mathml-tag-names/workflows/main/badge.svg

[badge-build-url]: https://github.com/wooorm/mathml-tag-names/actions

[badge-coverage-image]: https://img.shields.io/codecov/c/github/wooorm/mathml-tag-names.svg

[badge-coverage-url]: https://codecov.io/github/wooorm/mathml-tag-names

[badge-downloads-image]: https://img.shields.io/npm/dm/mathml-tag-names.svg

[badge-downloads-url]: https://www.npmjs.com/package/mathml-tag-names

[badge-size-image]: https://img.shields.io/bundlejs/size/mathml-tag-names

[badge-size-url]: https://bundlejs.com/?q=mathml-tag-names

[esmsh]: https://esm.sh

[file-license]: license

[github-gist-esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[npmjs-install]: https://docs.npmjs.com/cli/install

[opensource-guide]: https://opensource.guide/how-to-contribute/

[typescript]: https://www.typescriptlang.org

[w3-mathml1]: https://www.w3.org/TR/1998/REC-MathML-19980407/appendixF.html

[w3-mathml2]: https://www.w3.org/TR/MathML2/appendixl.html

[w3-mathml3]: https://www.w3.org/TR/MathML3/appendixi.html

[w3-mathml4]: https://www.w3.org/TR/mathml4/#mmlindex_elements

[wooorm]: https://wooorm.com
