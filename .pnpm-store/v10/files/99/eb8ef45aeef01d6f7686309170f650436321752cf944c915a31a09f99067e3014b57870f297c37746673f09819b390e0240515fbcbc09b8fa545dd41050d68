# vite-plugin-lazy-import

Used for vite Lazy import js and style.

## Installation

```shell
npm install vite-plugin-lazy-import -D
```

## Usage

```javascript
// vite.config.js
import { lazyImport } from 'vite-plugin-lazy-import'

export default defineConfig({
  // ...
  plugins: [
    lazyImport({
      resolvers: [
        {
          lib: 'vxe-pc-ui',
          importStyle: 'css', // import style '*.css'
          esm: true // import directory '/es/*' | '/lib/*'
        }
      ]
    })
  ]
  // ...
})
```

## Lazy import js

```javascript
// vite.config.js
import { lazyImport } from 'vite-plugin-lazy-import'

lazyImport({
  resolvers: [
    {
      lib: 'vxe-pc-ui',
      resolve ({ name, dirName }) {
        return {
          from: `vxe-pc-ui/es/${dirName}/index.js`
        }
      }
    }
  ]
})
```

```javascript
// main.js
// ...
import { VxeUI, VxeButton } from 'vxe-pc-ui'
//...
```

into this

```javascript
// ...
import { VxeUI } from 'vxe-pc-ui/es/vxe-ui/index.js'
import { VxeButton } from 'vxe-pc-ui/es/vxe-button/index.js'
//...
```

## Lazy import js and css

```javascript
// vite.config.js
import { lazyImport } from 'vite-plugin-lazy-import'

lazyImport({
  resolvers: [
    {
      lib: 'vxe-pc-ui',
      importStyle: true,
      resolve ({ name, dirName }) {
        return {
          from: {
            jsPath: `vxe-pc-ui/es/${dirName}/index.js`,
            stylePath: `vxe-pc-ui/es/${dirName}/style.css`
          }
        }
      }
    }
  ]
})
```

```javascript
// main.js
// ...
import {
  VxeUI,
  VxeButton,
  Button as VxeButton
} from 'vxe-pc-ui'
//...
```

into this

```javascript
// ...
import { VxeUI } from 'vxe-pc-ui/es/vxe-ui/index.js'
import 'vxe-pc-ui/es/vxe-ui/style.css'
import { Button as VxeButton } from 'vxe-pc-ui/es/vxe-button/index.js'
import 'vxe-pc-ui/es/vxe-button/style.css'
//...
```

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
