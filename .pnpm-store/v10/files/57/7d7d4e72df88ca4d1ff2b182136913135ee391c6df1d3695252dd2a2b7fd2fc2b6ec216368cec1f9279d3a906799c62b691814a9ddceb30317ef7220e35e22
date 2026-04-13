# z-index Manager

English | [简体中文](README.zh-CN.md)  

[![npm version](https://img.shields.io/npm/v/dom-zindex.svg?style=flat-square)](https://www.npmjs.com/package/dom-zindex)
[![npm downloads](https://img.shields.io/npm/dt/dom-zindex.svg?style=flat-square)](https://npm-stat.com/charts.html?package=dom-zindex)
[![issues](https://img.shields.io/github/issues/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/issues)
[![issues closed](https://img.shields.io/github/issues-closed/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

Web common z-index style management.

## Browser Support

![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_7-8/internet-explorer_7-8_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- | --- |
7+ ✔ | 80+ ✔ | 44+ ✔ | 40+ ✔ | 60+ ✔ | 6+ ✔ |

## Installing

```shell
npm install dom-zindex
```

## CDN

```HTML
<script src="https://unpkg.com/dom-zindex"></script>
```

## Example 1

```javascript
import domZIndex from 'dom-zindex'

// Gets the largest z-index on the page.
domZIndex.getMax()

// Set main current z-index.
domZIndex.setCurrent(1000)

// Get main current z-index.
domZIndex.getCurrent() // 1000

// Get main next z-index.
domZIndex.getNext() // 1001

// Get subordinate current z-index, the secondary z-index will always be greater than the primary z-index.
domZIndex.getSubCurrent() // 2001

// Get subordinate next z-index.
domZIndex.getSubNext() // 2002
```

## Example 2

```javascript
import domZIndex from 'dom-zindex'

// If the incoming z-index is less than global, the next one is automatically fetched.
let currZIndex1 = 888
currZIndex1 = domZIndex.getCurrent(currZIndex1) // 1000

// If the z-index is greater than the global value, the value is returned.
let currZIndex2 = 2000
currZIndex2 = domZIndex.getCurrent(currZIndex2) // 1500
```

## Css var

* Built-in following variables
  * ```--dom-main-z-index``` 等于 ```getCurrent```()
  * ```--dom-sub-z-index``` 等于 ```getSubCurrent```()

```css
.my-popup {
  z-index: var(--dom-main-z-index);
}
.my-msg {
  z-index: var(--dom-sub-z-index);
}
```

## Contributors

Thank you to everyone who contributed to this project.

[![dom-zindex](https://contrib.rocks/image?repo=x-extends/dom-zindex)](https://github.com/x-extends/dom-zindex/graphs/contributors)

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
