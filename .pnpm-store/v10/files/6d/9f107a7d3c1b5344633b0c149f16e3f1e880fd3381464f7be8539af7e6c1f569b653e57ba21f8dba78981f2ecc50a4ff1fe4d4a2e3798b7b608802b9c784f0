# @intlify/unplugin-vue-i18n

[![Lint](https://github.com/intlify/bundle-tools/actions/workflows/lint.yml/badge.svg)](https://github.com/intlify/bundle-tools/actions/workflows/lint.yml)
[![Test](https://github.com/intlify/bundle-tools/actions/workflows/test.yml/badge.svg)](https://github.com/intlify/bundle-tools/actions/workflows/test.yml)
[![npm](https://img.shields.io/npm/v/@intlify/unplugin-vue-i18n.svg?color=yellow)](https://www.npmjs.com/package/@intlify/unplugin-vue-i18n)

unplugin for Vue I18n

<!-- eslint-disable markdown/no-missing-label-refs -->

## 🌟 Features

- i18n resource pre-compilation
- i18n custom block
  - i18n resource definition
  - i18n resource importing
  - Locale of i18n resource definition
  - Locale of i18n resource definition for global scope
  - i18n resource formatting

## 💿 Installation

```sh
npm i @intlify/unplugin-vue-i18n
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineConfig({
  plugins: [
    VueI18nPlugin({
      /* options */
    })
  ]
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
const VueI18nPlugin = require('@intlify/unplugin-vue-i18n/webpack')

// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    VueI18nPlugin({
      /* options */
    })
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n'

export default defineNuxtConfig({
  vite: {
    plugins: [
      VueI18nPlugin.vite({
        /* options */
      })
    ]
  },
  // When using Webpack
  // builder: '@nuxt/webpack-builder',
  webpack: {
    plugins: [
      VueI18nPlugin.webpack({
        /* options */
      })
    ]
  }
})
```

<br></details>

## 🚀 Usage

### locale messages pre-compilation

Since `vue-i18n@v9.x`, the locale messages are handled with message compiler, which transform them to javascript functions or AST objects after compiling, so these can improve the performance of the application.

If you want to maximize the performance of vue-i18n, we recommend using unplugin-vue-i18n for locale messages.

### i18n custom block

The below example that `examples/vite/src/App.vue` have `i18n` custom block:

```vue
<template>
  <form>
    <label>{{ t('language') }}</label>
    <select v-model="locale">
      <option value="en">en</option>
      <option value="ja">ja</option>
    </select>
  </form>
  <p>{{ t('hello') }}</p>
  <Banana />
</template>

<script>
import { useI18n } from 'vue-i18n'
import Banana from './Banana.vue'

export default {
  name: 'App',
  components: {
    Banana
  },
  setup() {
    const { t, locale } = useI18n({
      inheritLocale: true,
      useScope: 'local'
    })
    return { t, locale }
  }
}
</script>

<i18n>
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "ja": {
    "language": "言語",
    "hello": "こんにちは、世界！"
  }
}
</i18n>
```

### Locale Messages formatting

You can be used by specifying the following format in the `lang` attribute:

- json (default)
- yaml
- yml
- json5

example `yaml` format:

```vue
<i18n lang="yaml">
en:
  hello: 'Hello World!'
ja:
  hello: 'こんにちは、世界！'
</i18n>
```

### Static bundle importing

unplugin-vue-i18n allows you to statically bundle i18n resources such as `json` or `yaml` specified by the [`include` option](#include) of the plugin described below as locale messages with the `import` syntax.

In this case, only one i18n resource can be statically bundled at a time with `import` syntax, so the these code will be redundant for multiple locales.

```js
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
/*
 * The i18n resources in the path specified in the plugin `include` option can be read
 * as vue-i18n optimized locale messages using the import syntax
 */
import en from './src/locales/en.json'
import ja from './src/locales/ja.yaml'
import fr from './src/locales/fr.json5'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en,
    ja,
    fr
  }
})

const app = createApp()
app.use(i18n).mount('#app')
```

unplugin-vue-i18n can use the bundler virtual mechanism to import all locales at once, using the special identifier `@intlify/unplugin-vue-i18n/messages`, as the bellow:

```js
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
/*
 * All i18n resources specified in the plugin `include` option can be loaded
 * at once using the import syntax
 */
import messages from '@intlify/unplugin-vue-i18n/messages'

const i18n = createI18n({
  locale: 'en',
  messages
})

const app = createApp()
app.use(i18n).mount('#app')
```

Change your vite.config.ts file accordingly to import all the files from locales folder on the root. Change `'./src/locales/**'` to path of your locales.

```ts
// vite.config.ts
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'

export default defineConfig({
  plugins: [
    VueI18nPlugin({
      include: [path.resolve(__dirname, './src/locales/**')]
    })
  ]
})
```

unplugin-vue-i18n will automatically merge locale files into `@intlify/unplugin-vue-i18n/messages`. This allows locales to be split across multiple files, for example `src/locales/fruits/en.json` and `src/locales/vegetables/en.json`.

### Types

If you want type definition of `@intlify/unplugin-vue-i18n/messages`, add `unplugin-vue-i18n/messages` to `compilerOptions.types` of your tsconfig:

```json
{
  "compilerOptions": {
    "types": ["@intlify/unplugin-vue-i18n/messages"]
  }
}
```

## 📦 Automatic bundling

### For Vue I18n

As noted [here](https://vue-i18n.intlify.dev/guide/installation.html#explanation-of-different-builds), NPM provides many different builds of Vue I18n.

This plugin will automatically select and bundle Vue I18n build according to the following behavior:

- development: `vue-i18n.esm-bundler.js`
- production: `vue-i18n.runtime.esm-bundler.js`

About details, See the [here](https://vue-i18n.intlify.dev/guide/advanced/optimization.html#improve-performance-and-reduce-bundle-size-with-runtime-build-only)

## 🔧 Options

### `include`

- **Type:** `string | string[] | undefined`
- **Default:** `undefined`

  A [picomatch](https://github.com/micromatch/picomatch) pattern, or array of patterns, you can specify a path to pre-compile i18n resources files. The extensions of i18n resources to be precompiled are as follows:

  ```md
  - json
  - json5
  - yaml
  - yml
  - js
  - ts
  ```

  If nothing is specified for this option, i.e. `undefined`, nothing is done to the resource in the above format.

> [!WARNING] > `json` resources matches this option, it will be handled **before the internal json plugin of bundler, and will not be processed afterwards**, else the option doesn't match, the bundler side will handle.

> [!WARNING] > `yaml` resources don't support multi documentation with `|`, alias with `&` and `*`, tags with `! `, `@`, etc. Only simple data structures.

> [!WARNING] > `js` and `ts` resources are set **simple export (`export default`) as locale messages object, as default**.

```js
export default {
  hello: 'Hello, {name}!'
  // ...
}
```

If you need to use programmatically dynamic resource construction, you would be enable `allowDynamic` option. about details, see the section.

> [!WARNING]
> If you use the `js` and `ts` resources formats, set the paths, so your application code is not targeted. We recommend that resources be isolated from the application code.

### `module`

- **Type:** `string`
- **Default:** `'vue-i18n'`

  > [!NOTE]
  > This options is supported from v5.1.0, and works with vue-i18n v10 and later.

  Bundle target vue-i18n module. You can specify either `‘vue-i18n’` or `‘petite-vue-i18n’`.

  The default is `'vue-i18n'`, and the following installed in node_modules will be bundled.
  - development: `vue-i18n.esm-bundler.js`
  - production: `vue-i18n.runtime.esm-bundler.js`

  In the case of `‘petite-vue-i18n’`, the following installed in node_modules will be bundled.
  - development: `petite-vue-i18n.esm-bundler.js`
  - production: `petite-vue-i18n.runtime.esm-bundler.js`

  If you are using petite-vue-i18n, you will need to set this value.

### `strictMessage`

- **Type:** `boolean`
- **Default:** `true`

  Strictly checks that the locale message does not contain html tags.

  If html tags are included, an error is thrown.

  If you would not the error to be thrown, you can work around it by setting it to `false`, but **it means that the locale message might cause security problems with XSS**.

  In that case, we recommend setting the `escapeHtml` option to `true`.

### `escapeHtml`

- **Type:** `boolean`
- **Default:** `false`

  Whether to escape html tags if they are included in the locale message.

  If `strictMessage` is disabled by `false`, we recommend this option be enabled.

### `allowDynamic`

- **Type:** `boolean`
- **Default:** `false`

  Whether or not programmatically dynamic resource construction for `js` or `ts` resource format.

  In this case, you need to export the function with `export default` and construct the resource with the function:

  ```js
  import resources from './locales/all.json'

  export default async function loadResource(url) {
    const res = await import(url).then(r => r.default || r)
    return { ...resources, ...res }
  }
  ```

  If you fetch some resources from the backend, the data **must be pre-compiled** for production. exmaple is [here](https://github.com/intlify/vue-i18n-next/tree/master/examples/backend).

### `jitCompilation`

- **Type:** `boolean`
- **Default:** `true`

> [!IMPORTANT]
> 'jitCompilation' option is deprected in v5.
> This option will be supported with vue-i18n until v9 latest version.

Whether locale mesages should be compiled by JIT (Just in Time) compilation with vue-i18n's message compiler.

JIT compilation has been supported since vue-i18n v9.3. This means that since v9 was released until now, the message compiler compiles to executable JavaScript code, however it did not work in the CSP environment. Also, since this was an AOT (Ahead of Time) compilation, it was not possible to dynamically retrieve locale messages from the back-end Database and compose locale mesages with programatic.

> [!WARNING]
> Enabling JIT compilation causes the message compiler to generate AST objects for locale mesages instead of JavaScript code. If you pre-compile locale messages with a tool such as the [Intlify CLI](https://github.com/intlify/cli) and import them dynamically, you need to rebuild that resource.

About JIT compilation, See [here](https://vue-i18n.intlify.dev/guide/advanced/optimization.html#jit-compilation)

### `dropMessageCompiler`

- **Type:** `boolean`
- **Default:** `false`

Whether to tree-shake message compiler when we will be bundling.

If do you will use this option, you need to enable `jitCompilation` option.

> [!NOTE]
> After v5 or later, this option can be set with or without `jitCompilation`.

> [!NOTE]
> This option works with vue-i18n v9.3 and later.

> [!WARNING]
> If you enable this option, **you should check resources in your application are pre-compiled with this plugin.** If you will be loading resources dynamically from the back-end via the API, enabling this option do not work because there is not message compiler.

### `ssr`

- **Type:** `boolean`
- **Default:** `false`

  Whether to bundle vue-i18n module for SSR at build time

> [!NOTE]
> This option works with vue-i18n v9.4 and later.

### `runtimeOnly`

- **Type:** `boolean`
- **Default:** `true`

  Whether or not to automatically use Vue I18n **runtime-only** in production build, set `vue-i18n.runtime.esm-bundler.js` in the `vue-i18n` field of bundler config, the below:

  ```md
  - vite config: `resolve.alias`
  - webpack config: `resolve.alias`
  ```

  If `false` is specified, Vue I18n (vue-i18n) package.json `module` field will be used.

  For more details, See [here](#-automatic-bundling)

### `compositionOnly`

- **Type:** `boolean`
- **Default:** `true`

  Whether to make vue-i18n API only composition API. **By default the legacy API is tree-shaken.**

  For more details, See [here](https://vue-i18n.intlify.dev/guide/advanced/optimization.html#reduce-bundle-size-with-feature-build-flags)

### `fullInstall`

- **Type:** `boolean`
- **Default:** `true`

  Whether to install the full set of APIs, components, etc. provided by Vue I18n. By default, all of them will be installed.

  If `false` is specified, **buld-in components and directive will not be installed in vue and will be tree-shaken.**

  For more details, See [here](https://vue-i18n.intlify.dev/guide/advanced/optimization.html#reduce-bundle-size-with-feature-build-flags)

### `forceStringify`

- **Type:** `boolean`
- **Default:** `false`

  Whether pre-compile number and boolean values as message functions that return the string value.

  For example, the following json resources:

  ```json
  {
    "trueValue": true,
    "falseValue": false,
    "nullValue": null,
    "numberValue": 1
  }
  ```

  after pre-compiled (development):

  ```js
  export default {
    trueValue: (() => {
      const fn = ctx => {
        const { normalize: _normalize } = ctx
        return _normalize(['true'])
      }
      fn.source = 'true'
      return fn
    })(),
    falseValue: (() => {
      const fn = ctx => {
        const { normalize: _normalize } = ctx
        return _normalize(['false'])
      }
      fn.source = 'false'
      return fn
    })(),
    nullValue: (() => {
      const fn = ctx => {
        const { normalize: _normalize } = ctx
        return _normalize(['null'])
      }
      fn.source = 'null'
      return fn
    })(),
    numberValue: (() => {
      const fn = ctx => {
        const { normalize: _normalize } = ctx
        return _normalize(['1'])
      }
      fn.source = '1'
      return fn
    })()
  }
  ```

### `defaultSFCLang`

- **Type:** `string`
- **Default:** `'json'`

  Specify the content for all your inlined `i18n` custom blocks on your `SFC`.

  `defaultSFCLang` must have one of the following values:

  ```md
  - json
  - json5
  - yaml
  - yml
  ```

  On inlined `i18n` custom blocks that have specified the `lang` attribute, the `defaultSFCLang` is not applied.

  For example, with `defaultSFCLang: "yaml"` or `defaultSFCLang: "yml"`, this custom block:

  <!-- prettier-ignore -->
  ```html
  <i18n lang="yaml">
  en:
    hello: Hello
  es:
    hello: Hola
  </i18n>
  ```

  and this another one, are equivalent:

  <!-- prettier-ignore -->
  ```html
  <i18n>
  en:
    hello: Hello
  es:
    hello: Hola
  </i18n>
  ```

### `globalSFCScope`

- **Type:** `boolean`
- **Default:** `undefined`

  Whether to include all `i18n` custom blocks on your `SFC` on `global` scope.

  If `true`, it will be applied to all inlined `i18n` or `imported` custom blocks.

  **Warning**: beware enabling `globalSFCScope: true`, all `i18n` custom blocks in all your `SFC` will be on `global` scope.

  For example, with `globalSFCScope: true`, this custom block:

  <!-- prettier-ignore -->
  ```html
  <i18n lang="yaml" global>
  en:
    hello: Hello
  es:
    hello: Hola
  </i18n>
  ```

  and this another one, are equivalent:

  <!-- prettier-ignore -->
  ```html
  <i18n lang="yaml">
  en:
    hello: Hello
  es:
    hello: Hola
  </i18n>
  ```

  You can also use `defaultSFCLang: "yaml"`, following with previous example, this another is also equivalent to previous ones:

  <!-- prettier-ignore -->
  ```html
   <i18n>
  en:
    hello: Hello
  es:
    hello: Hola
  </i18n>
  ```

### `useClassComponent`

- **Type:** `boolean`
- **Default:** `false`

  This option that to use i18n custom blocks in `vue-class-component`.

  > [!IMPORTANT] > `useClassComponent` option is deprecated in v5.
  > This option will be supported with vue-i18n until v9 latest version.

### `onlyLocales`

- **Type:** `string | string[]`
- **Default:** `[]`

  By using it you can exclude from the bundle those localizations that are not specified in this option.

### `useVueI18nImportName` (Experimental)

- **Type:** `boolean`
- **Default:** `false`

  Whether to use the import name of `petite-vue-i18n` with the same import name as vue-i18n (`import { xxx } from 'vue-i18n'`).

  This option allows a smooth migration from `petite-vue-i18n` to `vue-i18n` and allows progressive enhacement.

  > [!IMPORTANT] > `useVueI18nImportName` option is deprecated in v5.
  > This option will be supported with vue-i18n until v9 latest version.

### `optimizeTranslationDirective`

- **Type**: `boolean` | `string` | `string[]`
- **Default:** `false`

  Whether to optimize `v-t` directive. If set to `true`, this plugin's transform will automatically translate to vue-i18n's translation function. If you need SSR, you must activate this option.

  If you want to put it manually, you can specify the signature of the translation function as a string or a string array.

  > [!WARNING]
  > About for manually signature, see the details [vue-i18n-extensions API docs](https://github.com/intlify/vue-i18n-extensions/blob/next/docs/%40intlify/vue-i18n-extensions-api.md#translationsignatures) and [usecase from vue-i18n-extensions PR](https://github.com/intlify/vue-i18n-extensions/pull/217/files#diff-3fb9543f91e011d4b0dc9beff44082fe1a99c9eab70c1afab23c3c34352b7c38R121-R200)

### `transformI18nBlock`

- **Type**: `function`
- **Default:** `undefined`

  This hook allows a user to modify the `<i18n>` block before the plugin generates the translations. The hook is passed the source of the `<ii8n>` block as a `string` after the SFC is read from disk.

  **Plugin**

  ```javascript
  function transformI18nBlock(source) {
    // transformation logic
  }

  // Plugin
  vueI18n({
    transformI18nBlock
  })
  ```

  **Before**

  <!-- prettier-ignore -->
  ```html
  <i18n>
  [
    'slug-one',
    'slug-two'
  ]
  </i18n>
  ```

  **After**

  <!-- prettier-ignore -->
  ```html
  <i18n>
  {
    'en': {
      'slug-one': 'foo',
      'slug-two': 'bar'
    },
    ja: {
      'slug-one': 'foo',
      'slug-two': 'bar'
    }
  }
  </i18n>
  ```

  > [!IMPORTANT]
  > The function **must** return a string or the build will fail.

## 📜 Changelog

Details changes for each release are documented in the [CHANGELOG.md](https://github.com/intlify/bundle-tools/blob/main/packages/unplugin-vue-i18n/CHANGELOG.md)

## ©️ License

[MIT](http://opensource.org/licenses/MIT)

<!-- eslint-enable markdown/no-missing-label-refs -->
