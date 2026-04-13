# z-index 管理器

[English](README.md) | 简体中文  

[![npm version](https://img.shields.io/npm/v/dom-zindex.svg?style=flat-square)](https://www.npmjs.com/package/dom-zindex)
[![npm downloads](https://img.shields.io/npm/dt/dom-zindex.svg?style=flat-square)](https://npm-stat.com/charts.html?package=dom-zindex)
[![issues](https://img.shields.io/github/issues/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/issues)
[![issues closed](https://img.shields.io/github/issues-closed/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/x-extends/dom-zindex.svg)](https://github.com/x-extends/dom-zindex/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

Web 通用的 z-index style 管理器  

## Browser Support

![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_7-8/internet-explorer_7-8_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- | --- |
7+ ✔ | 80+ ✔ | 44+ ✔ | 40+ ✔ | 60+ ✔ | 6+ ✔ |

## 安装

```shell
npm install dom-zindex
```

### CDN

```HTML
<script src="https://unpkg.com/dom-zindex"></script>
```

## 示例 1

```javascript
import domZIndex from 'dom-zindex'

// 获取页面中最大的 z-index
domZIndex.getMax()

// 设置当前 z-index
domZIndex.setCurrent(1000)

// 获取当前 z-index
domZIndex.getCurrent() // 1000

// 获取下一级 z-index
domZIndex.getNext() // 1001

// 获取次要的当前 z-index，次要的 z-index 始终会大于主要的 z-index
domZIndex.getSubCurrent() // 2001

// 获取次要的下一级 z-index
domZIndex.getSubNext() // 2002
```

## 示例 2

```javascript
import domZIndex from 'dom-zindex'

// 如果传入 z-index 小于全局，则自动获取下一个
let currZIndex1 = 999
currZIndex1 = domZIndex.getCurrent(currZIndex1) // 1000

// 如果传入 z-index 大于全局，则返回传入值
let currZIndex2 = 1500
currZIndex2 = domZIndex.getCurrent(currZIndex2) // 1500
```

## 使用 CSS 变量

* 内置以下变量
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

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
