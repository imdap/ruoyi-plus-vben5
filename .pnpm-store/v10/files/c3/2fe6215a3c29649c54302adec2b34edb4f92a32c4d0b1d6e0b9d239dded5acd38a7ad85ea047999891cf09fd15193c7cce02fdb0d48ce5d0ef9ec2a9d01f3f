# stylelint-config-recommended-vue

[![NPM license](https://img.shields.io/npm/l/stylelint-config-recommended-vue.svg)](https://www.npmjs.com/package/stylelint-config-recommended-vue)
[![NPM version](https://img.shields.io/npm/v/stylelint-config-recommended-vue.svg)](https://www.npmjs.com/package/stylelint-config-recommended-vue)
[![NPM downloads](https://img.shields.io/npm/dw/stylelint-config-recommended-vue.svg)](http://www.npmtrends.com/stylelint-config-recommended-vue)
[![NPM downloads](https://img.shields.io/npm/dm/stylelint-config-recommended-vue.svg)](http://www.npmtrends.com/stylelint-config-recommended-vue)
[![Build Status](https://github.com/ota-meshi/stylelint-config-recommended-vue/workflows/CI/badge.svg?branch=main)](https://github.com/ota-meshi/stylelint-config-recommended-vue/actions?query=workflow%3ACI)

> The recommended shareable Vue config for [Stylelint].

This config:

- extends the [`stylelint-config-recommended` shared config](https://github.com/stylelint/stylelint-config-recommended) and configures its rules for Vue
- bundles the [`postcss-html` custom syntax](https://github.com/ota-meshi/postcss-html) and configures it

> **Requirements**
>
> - [Stylelint] v14.0.0 and above  
>   It cannot be used with Stylelint v13 and below.

To see the rules that this config uses, please read the [config itself](/lib/index.js).

## :cd: Installation

```shell
npm install --save-dev postcss-html stylelint-config-recommended-vue
```

## :book: Usage

Set your `stylelint` config to:

```json
{
    "extends": "stylelint-config-recommended-vue"
}
```

Note: This config enables rules for only `.vue` files.

If you don't want the rules to be overridden (If you want to enable only the parser.), please use [stylelint-config-html](https://github.com/ota-meshi/stylelint-config-html).

```json
{
    "extends": "stylelint-config-html/vue"
}
```

Since this package configure `customSyntax` option to allow parsing Vue files, be sure it is the **LAST** item into the `extends` array, in case more than one configuration is applied.
Not complying to this rule may result in broken Vue files parsing, generating confusing errors like `Unknown word (CssSyntaxError)`.

### With SCSS

Install `postcss-scss` and `stylelint-config-recommended-scss`:

```shell
npm install --save-dev postcss-scss stylelint-config-recommended-scss
```

Set your `stylelint` config to:

```json
{
    "extends": "stylelint-config-recommended-vue/scss"
}
```

When used with `stylelint-config-standard-scss`:

```json
{
    "extends": [
        "stylelint-config-standard-scss",
        "stylelint-config-recommended-vue/scss"
    ]
}
```

However, some stylistic rules may not work well with Vue. We recommend that you install [stylelint-config-standard-vue](https://github.com/ota-meshi/stylelint-config-standard-vue) instead.

### Extending the config

Simply add a `"rules"` key to your config, then add your overrides and additions there.

For example, to add the `unit-allowed-list` rule:

```json
{
    "extends": "stylelint-config-recommended-vue",
    "overrides": [
        {
            "files": ["*.vue", "**/*.vue"],
            "rules": {
                "unit-allowed-list": ["em", "rem", "s"]
            }
        }
    ]
}
```

## :computer: Editor integrations

### Visual Studio Code

Use the [stylelint.vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) extension that [Stylelint] provides officially.

You have to configure the `stylelint.validate` option of the extension to check `.vue` files, because the extension does not check the `*.vue` file by default.

Example **.vscode/settings.json**:

```jsonc
{
  "stylelint.validate": [
      ...,
      // ↓ Add "vue" language.
      "vue"
  ]
```

## :lock: License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).

[Stylelint]: https://stylelint.io/
