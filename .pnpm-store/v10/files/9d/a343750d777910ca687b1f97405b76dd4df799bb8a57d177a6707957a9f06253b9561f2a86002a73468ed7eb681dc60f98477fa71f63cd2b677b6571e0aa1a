# stylelint-config-html

[![NPM license](https://img.shields.io/npm/l/stylelint-config-html.svg)](https://www.npmjs.com/package/stylelint-config-html)
[![NPM version](https://img.shields.io/npm/v/stylelint-config-html.svg)](https://www.npmjs.com/package/stylelint-config-html)
[![NPM downloads](https://img.shields.io/npm/dw/stylelint-config-html.svg)](http://www.npmtrends.com/stylelint-config-html)
[![NPM downloads](https://img.shields.io/npm/dm/stylelint-config-html.svg)](http://www.npmtrends.com/stylelint-config-html)
[![Build Status](https://github.com/ota-meshi/stylelint-config-html/workflows/CI/badge.svg?branch=main)](https://github.com/ota-meshi/stylelint-config-html/actions?query=workflow%3ACI)

> The shareable HTML (and HTML-like) config for [Stylelint].

This config bundles the [`postcss-html` custom syntax](https://github.com/ota-meshi/postcss-html) and configures it.  
If you use this config in your Stylelint config, HTML, XML, [Vue], [Svelte], [Astro], and [PHP] files will be parsable. The Stylelint rules you have configured will be able to check these files.

> **Requirements**
>
> - [Stylelint] v14.0.0 and above  
>   This config cannot be used with Stylelint v13 and below. Also, if you are using Stylelint v13, you do not need to use this config.

Stylelint v14 and above has been changed to not bundle non-CSS parsing such as HTML. The goal of this config is to make Stylelint v14 work with HTML (and HTML-like) files, like Stylelint v13.

To see this config, please read the [config itself](/index.js).

## :couple: Related Packages

### [stylelint-config-recommended-vue](https://github.com/ota-meshi/stylelint-config-recommended-vue) / [stylelint-config-standard-vue](https://github.com/ota-meshi/stylelint-config-standard-vue)

The shareable config for [Vue](https://v3.vuejs.org/).  
If you want to check [Vue] files, consider using this as well. It is useful because it contains the config for [Vue](https://v3.vuejs.org/).

### [postcss-html](https://github.com/ota-meshi/postcss-html)

[PostCSS] syntax for parsing HTML (and HTML-like).  
If you have problems with parses using this config, please open the new issue in that repository.

## :cd: Installation

```shell
npm install --save-dev postcss-html stylelint-config-html
```

## :book: Usage

Set your `stylelint` config to:

```json
{
  "extends": "stylelint-config-html"
}
```

Note: This config enables HTML (and HTML-like) syntax parsing.

If you want to enable parsing for only specific language, use each language config as follows:

```json
{
  "extends": [
    "stylelint-config-html/html",
    "stylelint-config-html/xml",
    "stylelint-config-html/vue",
    "stylelint-config-html/svelte",
    "stylelint-config-html/astro",
    "stylelint-config-html/php"
  ]
}
```

## :computer: Editor integrations

### Visual Studio Code

Use the [stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) extension that [Stylelint] provides officially.

You have to configure the `stylelint.validate` option of the extension to check `.html`,  `.vue`,  `.svelte`, and HTML-like files, because the extension does not check the `*.html` and HTML-like file by default.

Example **.vscode/settings.json**:

```jsonc
{
  "stylelint.validate": [
      ...,
      // ↓ Add "html" language.
      "html",
      // ↓ Add "vue" language.
      "vue",
      // ↓ Add "svelte" language.
      "svelte",
      // ↓ Add "astro" language.
      "astro",
  ]
```

## :lock: License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).

[Stylelint]: https://stylelint.io/
[Vue]: https://v3.vuejs.org/guide/single-file-component.html
[Svelte]: https://svelte.dev/docs#Component_format
[Astro]: https://docs.astro.build/core-concepts/astro-components/
[PHP]: https://www.php.net/manual/en/intro-whatis.php
[PostCss]: https://github.com/postcss/postcss
