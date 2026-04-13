# unplugin-vue

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![Unit Test][unit-test-src]][unit-test-href]

Transform Vue 3 SFC to JavaScript.

## Features

- ⚡️ Support Vite, Webpack, Vue CLI, Rollup, esbuild and more, powered by [unplugin](https://github.com/unjs/unplugin).
- ✨ Support `<script setup>` and macros.
- 🔥 Hot module replacement (HMR) support for Vite.
- 🔄 Sync code from [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue) periodically.
  Currently based on [@vitejs/plugin-vue@6.0.3](https://github.com/vitejs/vite-plugin-vue/tree/plugin-vue@6.0.3/packages/plugin-vue).

## Installation

```bash
npm i -D unplugin-vue
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Vue from 'unplugin-vue/vite'

export default defineConfig({
  plugins: [Vue()],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Vue from 'unplugin-vue/rollup'

export default {
  plugins: [Vue()],
}
```

<br></details>

<details>
<summary>Rolldown / tsdown</summary><br>

```ts
// rolldown.config.js / tsdown.config.ts
import Vue from 'unplugin-vue/rolldown'

export default {
  plugins: [Vue()],
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
import { build } from 'esbuild'
import Vue from 'unplugin-vue/esbuild'

build({
  plugins: [Vue()],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```js
// webpack.config.js
import Vue from 'unplugin-vue/webpack'

export default {
  /* ... */
  plugins: [Vue()],
}
```

<br></details>

<details>
<summary>Rspack</summary><br>

```ts
// rspack.config.js
import Vue from 'unplugin-vue/rspack'

export default {
  /* ... */
  plugins: [Vue()],
}
```

<br></details>

<details>
<summary>Farm</summary><br>

```ts
// farm.config.ts
import Vue from 'unplugin-vue/farm'

export default {
  /* ... */
  plugins: [Vue()],
}
```

<br></details>

### Limitations

⚠️ HMR is not supported for Webpack, Vue CLI, and Rspack.

## Who is using

- [Vue Macros](https://github.com/vue-macros/vue-macros) - Explore and extend more macros and syntax sugar to Vue.
- [Vue DevTools](https://github.com/vuejs/devtools) - ⚙️ Browser devtools extension for debugging Vue.js applications.
- [Element Plus icon](https://github.com/element-plus/element-plus-icons)
- [Onu UI](https://github.com/onu-ui/onu-ui) - Opinionated and lightweight UnoCSS ui library.
- [vue-components-lib-seed](https://github.com/zouhangwithsweet/vue-components-lib-seed) - A vue3.0 components library template.

## Alternatives

- [@vitejs/plugin-vue](https://github.com/vitejs/vite-plugin-vue/tree/main/packages/plugin-vue) - For Vite and Vue 3.
- [@vitejs/plugin-vue2](https://github.com/vitejs/vite-plugin-vue2) - For Vite and Vue 2.
- [unplugin-vue2](https://github.com/unplugin/unplugin-vue2) - For Vue 2.7+ and Vite, esbuild, Rollup, Webpack or more.
- [vue-loader](https://github.com/vuejs/vue-loader) - For Webpack.
- [esbuild-plugin-vue](https://github.com/egoist/esbuild-plugin-vue) - For esbuild and Vue 3.
- [esbuild-vue](https://github.com/apeschar/esbuild-vue) - For esbuild and Vue 2.
- ~~[vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2) - For Vite and Vue 2.~~
- ~~[rollup-plugin-vue](https://github.com/vuejs/rollup-plugin-vue)~~ - ⚠️ no longer maintained.

## Thanks

- [Vite](https://github.com/vitejs/vite) - Next generation frontend tooling. It's fast!
- [unplugin](https://github.com/unjs/unplugin) - Unified plugin system for Vite, Rollup, Webpack, and more
- [vite-plugin-vue](https://github.com/vitejs/vite-plugin-vue) - This project is inherited from it.

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2021-PRESENT [Kevin Deng](https://github.com/sxzz)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/unplugin-vue.svg
[npm-version-href]: https://npmjs.com/package/unplugin-vue
[npm-downloads-src]: https://img.shields.io/npm/dm/unplugin-vue
[npm-downloads-href]: https://www.npmcharts.com/compare/unplugin-vue?interval=30
[unit-test-src]: https://github.com/unplugin/unplugin-vue/actions/workflows/unit-test.yml/badge.svg
[unit-test-href]: https://github.com/unplugin/unplugin-vue/actions/workflows/unit-test.yml
