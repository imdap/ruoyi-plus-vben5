[npm]: https://img.shields.io/npm/v/zod-defaults

[npm-url]: https://www.npmjs.com/package/zod-defaults

[size]: https://packagephobia.now.sh/badge?p=zod-defaults

[size-url]: https://packagephobia.now.sh/result?p=zod-defaults

[![npm][npm]][npm-url]
[![size][size]][size-url]
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

# Zod Defaults

A Zod utility library to generate default values for Zod schemas.

## Preface

This is not an official Zod library. This is a personal project which is mainly meant
to be used by my other projects. However, you are free to use it if you find it useful.

This library is currently in development and not all functionality from zod is
supported yet.

## Requirements

This package expects Zod to be installed.

## Install

Using npm (or yarn/pnpm/bun):

```shell
npm install zod-defaults
```

## Usage

Create a schema and call the `generateDefaultsForSchema` function to generate an object
filled with the default or empty values matching your schema.

```typescript
import {z} from 'zod';
import {generateDefaultsForSchema} from 'zod-defaults';

const schema = z.object({
    name: z.string().default('John Doe'),
    age: z.number(),
    isStudent: z.boolean(),
});

const person = generateDefaultsForSchema(schema);

console.log(person);
// { name: 'John Doe', age: 0, isStudent: false }
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.