# circular dependencies scanner ⚡

![Node Current](https://img.shields.io/node/v/circular-dependency-scanner?style=flat)
[![npm version](https://img.shields.io/npm/v/circular-dependency-scanner)](https://npmjs.com/package/circular-dependency-scanner)
![weekly downloads](https://img.shields.io/npm/dw/circular-dependency-scanner)
![license](https://img.shields.io/npm/l/circular-dependency-scanner)

开箱即用循环依赖检测器，内置了 JavaScript API 和命令行工具两种使用方式，支持我们常用的所有文件类型，如 `.js，.jsx，.ts，.tsx，.mjs，.cjs，.vue`。

从文件中取出 `import/require/export` 路径，并使用路径别名配置（alias）将其还原为真实路径（如果有别名的话），然后计算其中的循环引用关系并输出。

[English](./README.md) | 中文

# 特性

- 📦 支持常用的所有类型文件类型。
- 🗑 支持剔除 TS 纯类型引用。
- 💡 提供命令行工具，同时具备友好的控制台输出。
- 🛠️ 提供 JavaScript API，同时具备良好的类型提示。
- 🌩 小巧、精致、快速、可靠。

# 截图

下图为运行 `ds -o circles.json` 的示例：

![cli.gif](https://raw.githubusercontent.com/emosheeep/circular-dependency-scanner/HEAD/snapshots/cli.gif)

如果你没有传递 `output` 选项，那么输出内容会直接打印到控制台，其中`ts,js,vue` 文件输出时对应 `蓝色,黄色,绿色`，如下所示：

![output-snapshot](https://raw.githubusercontent.com/emosheeep/circular-dependency-scanner/HEAD/snapshots/output.png)

# 命令行工具（推荐）

全局安装之后，会获得一个可执行命令 `ds`（`depscan` 缩写）:
```sh
pnpm i -g circular-dependency-scanner # or npm/yarn
cd path/to/execute # change directory
ds # run `ds` command
```

命令行工具内置详细的文档，任何情况下都可以通过 `-h` 选项，快速打印帮助信息。

```sh
ds [options] [path] # Automatically detect circular dependencies under the current directory and print the circles.
```

## 选项

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

有时候你可能想手动写脚本统计分析，这时候你可以引用内部提供的方法：

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

# 动机

一方面 NPM 上关于循环依赖检测的工具实在太少了，另一方面，他们或多或少都有一些令人恼火的问题，无法愉快的使用。

1. 不可靠。用过的工具，没有那个能扫全的，猜测主要还是因为它们无法从多种多样的文件中类型中提取出对应的 import/require 路径。
2. 并非是独立工具。他们通常以  webpack/rollup/vite 插件形式出现，依赖宿主提供的模块关系图分析循环引用，用起来有诸多限制，也很慢。

但现在，你只需要运行 `ds`，我们用到的所有类型的脚本文件 **(.js,.jsx,.ts,.tsx,.mjs,.cjs,.vue)** 都会被快速解析，并在控制台使用彩色打印友好地输出循环引用信息。

# QA

## 如何处理 alias 引用?

该工具使用 `get-tsconfig` 来转换代码中的别名路径，你需要在距离文件最近的 `tsconfig/jsconfig.json` 中配置 `compilerOptions.paths` 以便工具能正确识别 alias 别名，未识别出别名的引用路径将被丢弃。

## 哪些引用会被提取出来

简单来说，满足以下条件的引用路径会被摘取出来：

```ts
import test from './test'; // got './test'
import './test'; // got './test'
import('./test'); // got './test'
require('./test'); // got './test'
export * from './test'; // got './test'
export { test }; // got no export source
```

如果设置了 `excludeTypes: true`，那么纯类型引用将被丢弃，例如：

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

另外还可以通过设置 `--filter` 选项对已经提取出来的环进行筛选。

## Monorepo 下运行

对文件引用的分析依赖于您提供的别名（alias）配置。因此，如果您在 monorepo 根目录下运行此命令，您可能会发现**一些不同的项目可能包含相同的别名配置**，这将导致结果不可靠。

**如果你想分析多个项目，请逐个执行**。

# 引用

- 命令行工具基于 [commander](https://github.com/tj/commander.js).
- 循环依赖分析算法基于 [graph-cycles](https://crates.io/crates/graph-cycles).
- TS 别名转换基于 [get-tsconfig](https://github.com/privatenumber/get-tsconfig).
