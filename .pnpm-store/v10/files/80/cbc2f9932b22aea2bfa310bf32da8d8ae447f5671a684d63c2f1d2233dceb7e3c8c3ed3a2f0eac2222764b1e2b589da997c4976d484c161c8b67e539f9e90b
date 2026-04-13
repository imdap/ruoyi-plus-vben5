# [**commitlint**][commitlint] plugin function rules <!-- omit in toc -->

[**commitlint**][commitlint] plugin to use functions as rule value.

- Create custom function, `sync` or `async`, as rule value.
- Create rules that are based on the commit message.
- Write rules with regular expressions.
- Use the same rules that are [available in **commitlint**][commitlint].

---

[![npm version](https://img.shields.io/npm/v/commitlint-plugin-function-rules?logo=npm&style=flat-square)](https://www.npmjs.com/package/commitlint-plugin-function-rules)
[![npm downloads](https://img.shields.io/npm/dm/commitlint-plugin-function-rules?logo=npm&style=flat-square)](https://www.npmjs.com/package/commitlint-plugin-function-rules)
[![Node.js version support](https://img.shields.io/node/v/commitlint-plugin-function-rules?logo=node.js&style=flat-square)](https://nodejs.org/en/about/releases/)
[![Renovate enabled](https://img.shields.io/badge/Renovate-enabled-brightgreen?logo=renovatebot&logoColor&style=flat-square)](https://renovatebot.com)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Code coverage](https://img.shields.io/codecov/c/github/vidavidorra/commitlint-plugin-function-rules?logo=codecov&style=flat-square)](https://codecov.io/gh/vidavidorra/commitlint-plugin-function-rules)
[![License](https://img.shields.io/github/license/vidavidorra/commitlint-plugin-function-rules?style=flat-square)](LICENSE.md)

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [Security policy](#security-policy)
- [License](#license)

## Install

```shell
npm install --save-dev commitlint-plugin-function-rules @commitlint/cli @commitlint/config-conventional
```

## Usage

Use this plugin in your project's [**commitlint**][commitlint] configuration by specifying it as item in the `plugins` array. All rules have same name as rules that are [available in **commitlint**][rules], but with the `function-rules` prefix. The example `commitlint.config.js`, or `commitlint.config.cjs` if the package is an ES module, shows the usage of a function rule.

> **Note** The available rules are the same as in [**commitlint**][commitlint], so it is recommended to disable the [**commitlint**][commitlint] rule when specifying a function rule to avoid undefined behaviour.

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'header-max-length': [0], // level: disabled
    'function-rules/header-max-length': [
      2, // level: error
      'always',
      (parsed) => {
        // Allow longer headers for commits with "deps" scope.
        if (parsed.scope === 'deps' && parsed.header.length <= 200) {
          return [true];
        }
        return [false, 'deps header must not be longer than 200 characters'];
      },
    ],
  },
};
```

## Contributing

Please [create an issue](https://github.com/vidavidorra/commitlint-plugin-function-rules/issues/new/choose) if you have a bug report or feature proposal, or [create a discussion](https://github.com/vidavidorra/commitlint-plugin-function-rules/discussions) if you have a question. If you like this project, please consider giving it a star ⭐

Refer to the [contributing guide](https://github.com/vidavidorra/.github/blob/main/CONTRIBUTING.md) for detailed information about other contributions, like pull requests.

[![Conventional Commits: 1.0.0](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow?style=flat-square)](https://conventionalcommits.org)
[![Linter](https://img.shields.io/badge/Linter-ESLint-4B32C3?logo=eslint&style=flat-square)](https://eslint.org/)
[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray&style=flat-square)](https://github.com/xojs/xo)
[![Code style](https://img.shields.io/badge/code_style-Prettier-ff69b4?logo=prettier&style=flat-square)](https://github.com/prettier/prettier)

## Security policy

Please refer to the [Security Policy on GitHub](https://github.com/vidavidorra/commitlint-plugin-function-rules/security/) for the security policy.

## License

This project is licensed under the [GPLv3 license](https://www.gnu.org/licenses/gpl.html).

Copyright © 2020-2026 Jeroen de Bruijn

<details><summary>License notice</summary>
<p>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

The full text of the license is available in the [LICENSE](LICENSE.md) file in this repository and [online](https://www.gnu.org/licenses/gpl.html).

</details>

<!-- References -->

[commitlint]: https://commitlint.js.org/
[rules]: https://commitlint.js.org/#/reference-rules
