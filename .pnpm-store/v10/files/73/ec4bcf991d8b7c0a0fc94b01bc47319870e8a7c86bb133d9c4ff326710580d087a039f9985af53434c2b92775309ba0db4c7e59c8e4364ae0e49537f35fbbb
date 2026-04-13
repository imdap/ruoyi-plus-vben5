# circular dependencies scanner ⚡

![Node Current](https://img.shields.io/node/v/circular-dependency-scanner?style=flat)
[![npm version](https://img.shields.io/npm/v/circular-dependency-scanner)](https://npmjs.com/package/circular-dependency-scanner)
![weekly downloads](https://img.shields.io/npm/dw/circular-dependency-scanner)
![license](https://img.shields.io/npm/l/circular-dependency-scanner)

Out-of-box circular dependencies detector, with both JavaScript API and Command Line Tool built in, support all file types we used in common like `.js,.jsx,.ts,.tsx,.mjs,.cjs,.vue`.

Pull out `import/require/export` path from files and revert it into to real path (if aliased) with path alias configurations, then calculate the circles among and print which with colors.

English | [中文](./README.zh_CN.md)

# Features

- 📦 All file types support.
- 🗑 Optional removal of pure TypeScript type references.
- 💡 Friendly Command Line Tool.
- 🛠️ Fully Typed JavaScript APIs and Prompts.
- 🌩 Tiny, Pretty, Fast and Reliable.

# Example

Here the running example for the `ds -o circles.json` execution:

![cli.gif](https://raw.githubusercontent.com/emosheeep/circular-dependency-scanner/HEAD/snapshots/cli.gif)

The `ts,js,vue` files will be printed directly into console as `blue,yellow,green` as follows if you didn't pass an output filename param:

![output-snapshot](https://raw.githubusercontent.com/emosheeep/circular-dependency-scanner/HEAD/snapshots/output.png)

# Command Line Tool (Prefer)

The `ds` command which means `depscan` will be available after you installed this package globally.

```sh
pnpm i -g circular-dependency-scanner # or npm/yarn
cd path/to/execute # change directory
ds # run `ds` command
```

There are detailed documentations built in, you can use `-h` option to print help information anytime.

```sh
ds [options] [path] # Automatically detect circular dependencies under the current directory and print the circles.
```

## Options

```sh
ds -h # print help info
ds -V/--version # print cli version

ds # current dir by default
ds src # detect src directory...and so on.
ds --filter 'src/router/*.ts' # only print the circles matched the pattern.
ds --absolute # print absolute path.
ds --ignore output dist node_modules # path to ignore.
ds --output circles.json # output analysis into specified file.
ds --throw # exit with code 1 when cycles're found.
ds --exclude-type # exclude pure type-references when calculating circles.
```

# JavaScript API

Sometime you may want to manually write script and make an analysis, just use JavaScript API as follows:

```ts
import { circularDepsDetect } from 'circular-dependency-scanner';

const results = circularDepsDetect({
  /**
   * Base path to execute command.
   * @default process.cwd()
   */
  cwd?: string;
  /**
   * Whether to use absolute path.
   * @default false
   */
  absolute?: boolean;
  /**
   * Glob patterns to exclude from matches.
   * @default ['node_modules']
   */
  ignore?: string[];
  /**
   * Glob pattern to filter output circles.
   * @default ['node_modules']
   */
  filter?: string;
  /**
   * Exclude pure type-references when calculating circles.
   * @default false
   */
  excludeTypes?: boolean;
});

```

# Motivation

On one hand there are few tools, on the other hand there are too many annoyed problems among the exist tools on the market:

1. Not reliable, **usually missed lots of dep-circles**. This is because in common they can't pull out the import/require sources correctly from source files
2. Not a standalone tool, they often appears as a webpack/rollup/vite plugin, and analyze the relations with help of the module graph created by the plugin's host, which usually under limitations, slow and hard to use.

But now, you just run `ds`, all of the **(.js,.jsx,.ts,.tsx,.mjs,.cjs,.vue)** files under current directory will be parsed directly and fast, which almost include all file types we used. And then the circles among these files will be printed.

# QA

## How does this tool handle alias paths?

We use `get-tsconfig` to transform ts alias imports, which means you should manually configure `compilerOptions.paths` in the nearest `tsconfig/jsconfig` so that the tool can recognize it correctly, unknown aliases will be dropped.

## Which reference will be pull out from the files

In a short, it find references like:

```ts
import test from './test'; // got './test'
import './test'; // got './test'
import('./test'); // got './test'
require('./test'); // got './test'
export * from './test'; // got './test'
export { test }; // got no export source
```

Pure type-references will be dropped if `excludeTypes` is set `true`:

```ts
// import statement
import * as a from './import * as a'; // ✅
import type * as a from './import type * as a';

import a from './import a'; // ✅
import type a from './import type a';
import type { a } from './import type { a }';
import { type a } from './import { type a }';

import { type a, b } from './import { type a, b }'; // ✅

// export statement
export * from './export *'; // ✅
export * as a from './export * as a' // ✅
export type * from './export type *';
export type * as a from './export type * as a';

export type { a } from './export type { a }';
export { type a } from './export { type a }';
export { type a, b } from './export { type a, b }'; // ✅
```

Screen out circles that make sense by `--filter` option.

## Running at monorepo

The analysis of file reference depend on the `alias` configurations you supplied. So if you run this command at your monorepo root directory, you may find that some of the different projects may include same `alias` but redirect to a different path, which cause the results unreliable.

**If you want to analyze multiple projects, please execute one by one**.

# Reference

- The Command Line Tool is based on [commander](https://github.com/tj/commander.js).
- The circular dependencies analysis algorithm is based on [graph-cycles](https://crates.io/crates/graph-cycles).
- The typescript paths are transformed by [get-tsconfig](https://github.com/privatenumber/get-tsconfig).

# Issues

No tool is perfect, and if you run into problems with it, welcome to file an issue, I’ll respond as soon as possible.
