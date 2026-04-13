# eslint-json-compat-utils

A utility that converts rules made for checking the AST of `jsonc-eslint-parser` into rules compatible with `@eslint/json`.

## Installation

```bash
npm install eslint-json-compat-utils
```

## Usage

```js
import { toCompatRule } from "eslint-json-compat-utils";

export default toCompatRule({
  meta: { /* ... */ },
  create(context) {
    return {
      JSONArrayExpression: check,
    };
  },
})
```

### API

#### `toCompatRule(rule)`

Converts a rule object for `jsonc-eslint-parser` into a rule object for `@eslint/json` compatible.

#### `toCompatPlugin(plugin)`

Converts a plugin object for `jsonc-eslint-parser` into a plugin object for `@eslint/json` compatible.

[Example]

#### `toCompatCreate(create)`

Converts a `create` function for `jsonc-eslint-parser` into a `create` function for `@eslint/json` compatible.

[Example]: https://eslint-online-playground.netlify.app/#eNqVVMtu2zAQ/BWCpzaIqKhJ0cK9FGhPObQFeixTgJVWDhOJFEgqqGHo37NL0or8SIL4IMuc2dnX0Fs+qPpercGXrbVl/iHuvDV8xbfSyCC5UT1IvmKSf+03ReYQX/LzxHgA57U1iXQhKnExQ752egieoC2LR3jYaYNPIoOndyaQP6MBfEbv4ltSIq2gXEaMbYB5cJgZq5WcKFOW4A08fIcBTAOm1pByz6lto/xtEvl7JapPoqoWKVI9Gf4oPj91MseKBv7Z0dR5Jscava1v1SzxYU/CbOqMVJfLOSE0OAhBg9vhoroSl7kzaSZ+nosTtTWtXmPbuCLdD9YFRgtjrbM9LSnRSjqT/Is0mZMXd72gJmYxdONam91mCwosUxJfOqht39Msm2fEfsXo1yWX4dtgv9l+UCEFTwfRRC8wLxKKMeguLdjA/xjcQKvGLrA/NJq42FZ34Fd4wM/O9kws+U2ebyoISTsnBMJ3w6fx75W6YvsVvjtq+H0KnaJEfOJ3WbLo5+vfP3+wWNVbauyUWY94HK1PS0hwRt0YBeb6M8fYohmHTtcqQHEPm2h3nKRzFq00NyiEWLQgothhBze4IGnQaMf/Awwlw2bInu9tg/FRnYDT943h59CNFNxhoflaJ8ryzj0DnnLES/ST9lsGED/equkRF9i8OQ==
