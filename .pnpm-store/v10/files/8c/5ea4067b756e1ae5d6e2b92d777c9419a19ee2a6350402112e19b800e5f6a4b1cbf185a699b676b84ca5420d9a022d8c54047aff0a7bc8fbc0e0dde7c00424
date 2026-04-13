# circular-dependency-scanner

## 3.0.1

### Patch Changes

- fix: the relative path argument caused a globbing failure.

## 3.0.0

### Major Changes

## ⚠️ Breaking

Since v3, this tool only support **Node.js v20+**.

The **graph detection core algorithm** is implemented in **`rust`** instead, to _save runtime memory and make it much faster_, that is compiled to **`wasm`** and integrated.

Prefer to check CHANGELOG history for more information.

## 3.0.0-beta.0

### Major Changes

- perf: implement graph detect algorithm with `rust`, save runtime memory and make it much faster
- feat: re-export the `analyzeGraph` method and `Edge` type
- chore: update eco-dependencies and refactor infrastructure

## 2.3.0

### Minor Changes

- feat: exclude pure type-references when calculating circles. closed [#4](https://github.com/emosheeep/circular-dependency-scanner/issues/4)

## 2.2.2

### Patch Changes

- fix: `@vue/compiler-sfc` loaded error at some situations.
- chore: update dependencies

## 2.2.1

### Patch Changes

- chore: update dependencies

## 2.2.0

### Minor Changes

- 7426bc6: feat: use @ast-grep/napi to simplify imports extraction logic
- fix: progress is gone

# 2.1.0

- feat(cli): parse tsconfig/jsconfig to get alias.
- revert(cli): remove `alias` support, use feature listed above instead.
- chore(deps): upgrade dependencies.

# 2.0.0

- feat(cli): add `--throw` option, to make command exit with code 1 when cycles're found, closed [#7](https://github.com/emosheeep/fe-tools/issues/7)
- chore(deps): update big version of major dependencies

## Breaking Change

- refactor(export): adjust exported fields

# 1.1.3

- fix(circular): trailing slash removing error

# 1.1.2

- docs: migrate to monorepo, replace relevant url

# 1.1.1

## docs

- docs: Use remote image instead.
- fix: JavaScript API didn't ignore node_modules by default.

# 1.1.0

## Feats

- feat: More friendly output.

# 1.0.2

## Fixes

- fix: ignores about `node_modules` doesn't effect.

# 1.0.1

## Fixes

- fix: can't run ds command with npm global install.

# 1.0.0

## Features

- feat: Supply JavaScript API and Command Line Tool.
