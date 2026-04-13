# version-polling

> 一个用于实时检测 web 应用更新的 JavaScript 库

## 前言

> 以下内容是通过 GitHub Copilot 生成的 😊

在现代 web 应用开发中，前端代码的更新频率较高，尤其是单页应用（SPA）。当应用发布新版本时，如何及时通知用户并引导其刷新页面以加载最新资源，成为了一个亟待解决的问题。`version-polling` 库应运而生，旨在提供一种简单高效的方式来检测前端应用的版本更新，并提示用户进行页面刷新。

## 适用场景

用户在浏览器中打开某 web 应用（通常是后台管理系统）很长时间且未刷新页面时，如果应用有新功能添加或问题修复，用户可能无法及时知道有新版发布。这样会导致用户继续使用旧版，影响用户体验和数据准确性，甚至出现程序报错。

## 功能特性

- 针对前端 web 单页应用（SPA）而设计
- 纯前端技术实现，使用简单无需后端支持
- 提供三种版本控制方式

  1.使用`HTTP ETag`作为版本标识符  
  2.使用`chunkHash`作为版本标识符 `v1.3.0`  
  3.使用`version.json` 文件管理版本号 `v1.3.0`

- 支持 TypeScript

## 实现原理

### 使用`HTTP ETag`作为版本标识符

> 使用`HTTP ETag`作为版本标识符来判断应用是否有更新。  
> `HTTP ETag`说明：每次请求`index.html`文件时，HTTP 响应头上会有一个 [ETag](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag) 字段，
> 格式类似`ETag: W/"0815"`该字段的值是服务器资源的唯一标识符，通过比较前后两次请求的 Etag 字段值，可以判断资源是否发生变化，以这个为依据判断是否有更新。  
> 缺点是`HTTP ETag`是由服务器生成的，前端不可控。

1. 使用`Web Worker`API 在浏览器后台**轮询**请求`index.html`文件，不会影响主线程运行。
2. 请求`index.html`文件，对比本地和请求响应头的 ETag 的字段值。
3. 如果 ETag 字段值不一致，说明有更新，则弹出更新提示，并引导用户手动**刷新页面**（例如弹窗提示），完成应用更新。
4. 当页面不可见时（例如切换标签页或最小化窗口），停止实时检测任务；再次可见时（例如切换回标签页或还原窗口），恢复实时检测任务。
5. 支持添加其他前端事件（例如页面导航或自定义事件）触发检测，由开发者自行决定检测时机。

### 使用`chunkHash`作为版本标识符

> 使用`chunkHash`作为版本标识符来判断应用是否有更新。  
> `chunkHash`说明：因为前端 spa 项目都是打包后再部署，这里以 vite 为例，打包产物 index.html 文件内容中会存在一个 script 标签，格式类似`<script type="module" crossorigin src="/assets/index.065a65a6.js"></script>`，其中`index`是 chunk 名称，后面的`065a65a6`是 chunk 哈希值，每次项目代码有改动再打包这里的`chunkHash`哈希值都会发生变化，以这个为依据判断是否有更新。

1. 使用`Web Worker`API 在浏览器后台**轮询**请求`index.html`文件，不会影响主线程运行。
2. 请求`index.html`文件，对比当前文件和最新文件中的`chunkHash`的哈希值。
3. 如果`chunkHash`哈希值不一致，说明有更新，则弹出更新提示，并引导用户手动**刷新页面**（例如弹窗提示），完成应用更新。
4. 其他逻辑和方式一保持一致。

### 使用`version.json` 文件管理版本号

> 使用 `version.json` 文件管理版本内容，由开发者手动控制应用版本更新。
> 缺点是需要开发者手动维护 `version.json` 文件

1. 使用`Web Worker`API 在浏览器后台**轮询**请求`version.json`文件，不会影响主线程运行。
2. 请求`version.json`文件，对比当前文件和最新文件中的 version 字段值。
3. 版本号比较遵循 [Semver](https://semver.org/lang/zh-CN/) 语义化版本规范，如果有高版本则弹出更新提示，并引导用户手动**刷新页面**（例如弹窗提示），完成应用更新。
4. 其他逻辑和方式一保持一致。

## 浏览器兼容性

适用于支持原生 ES Modules 的浏览器

```yaml title=".browserslistrc"
chrome >= 87
edge >= 88
firefox >= 78
safari >= 14
```

## 安装

- 通过 npm 引入，并通过构建工具进行打包

```bash
# 本地项目安装
npm install version-polling --save
```

- 通过 CDN 方式引入，直接插入到 HTML

> 无侵入用法，接入成本最低

```html
<script src="https://unpkg.com/version-polling/dist/version-polling.min.js"></script>
```

使用参考[前端静态 HTML 页面自动检测更新示例](https://github.com/JoeshuTT/version-polling/blob/main/examples/static-html-app/global.html)

## 使用示例

### 基础用法

当检测到有新版本时，会触发`onUpdate`回调函数，弹出提示用户有更新，点击确定刷新页面。

```js
// 在应用入口文件中使用: 如 main.js, app.jsx
import { createVersionPolling } from 'version-polling';

createVersionPolling({
  silent: process.env.NODE_ENV === 'development', // 开发环境下不检测
  onUpdate: (self) => {
    const result = confirm('页面有更新，点击确定刷新页面！');
    if (result) {
      self.onRefresh();
    } else {
      self.onCancel();
    }
  },
});
```

### 使用第三方组件提示更新

```js
import { createVersionPolling } from 'version-polling';
import { MessageBox } from 'element-ui';

createVersionPolling({
  silent: process.env.NODE_ENV === 'development', // 开发环境下不检测
  onUpdate: (self) => {
    MessageBox.confirm('检测到网页有更新, 是否刷新页面加载最新版本？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
      .then(() => {
        self.onRefresh();
      })
      .catch(() => {
        self.onCancel();
      });
  },
});
```

### 使用轮询，并且设置轮询间隔

如果觉得前端轮询请求太频繁，可以设置轮询间隔为半小时。

```js
import { createVersionPolling } from 'version-polling';

createVersionPolling({
  pollingInterval: 30 * 60 * 1000, // 每 30 分钟检测一次
  silent: process.env.NODE_ENV === 'development', // 开发环境下不检测
  onUpdate: (self) => {
    const result = confirm('页面有更新，点击确定刷新页面！');
    if (result) {
      self.onRefresh();
    } else {
      self.onCancel();
    }
  },
});
```

### 不使用轮询，仅通过前端事件触发检测

在浏览器页面导航跳转时、页面显示切换时，触发检测任务。

在[Window](https://developer.mozilla.org/zh-CN/docs/Web/API/Window#%E6%B8%85%E5%8D%95%E4%BA%8B%E4%BB%B6)上触发的事件。

```js
import { createVersionPolling } from 'version-polling';

createVersionPolling({
  eventTriggerList: ['popstate'],
  silent: process.env.NODE_ENV === 'development', // 开发环境下不检测
  silentPollingInterval: true,
  onUpdate: (self) => {
    const result = confirm('页面有更新，点击确定刷新页面！');
    if (result) {
      self.onRefresh();
    } else {
      self.onCancel();
    }
  },
});
```

### 通过前端自定义事件触发检测

由开发者自行决定触发检测的时机。

```js
import { createVersionPolling } from 'version-polling';

createVersionPolling({
  eventTriggerList: ['myEvent'],
  silent: process.env.NODE_ENV === 'development', // 开发环境下不检测
  onUpdate: (self) => {
    const result = confirm('页面有更新，点击确定刷新页面！');
    if (result) {
      self.onRefresh();
    } else {
      self.onCancel();
    }
  },
});
```

通过`dispatchEvent`触发版本检测。

```js
dispatchEvent(new CustomEvent('myEvent'));
```

还可以在路由跳转时触发，以`Vue Router`为例，借助导航守卫来触发版本检测。

```js
router.afterEach((to, from) => {
  dispatchEvent(new CustomEvent('myEvent'));
});
```

### 设置版本控制方式为`chunkHash`

使用`chunkHash`作为版本标识符，控制应用版本更新。以打包构建工具 vite 为例。

```js
import { createVersionPolling } from 'version-polling';

createVersionPolling({
  vcType: 'chunkHash',
  chunkName: 'index',
  silent: import.meta.env.MODE === 'development', // 开发环境下不检测
  onUpdate: (self) => {
    const result = confirm('页面有更新，点击确定刷新页面！');
    if (result) {
      self.onRefresh();
    } else {
      self.onCancel();
    }
  },
});
```

chunkName 也可能是其他值，例如 Vue CLI 是`app`，查看打包产物里`index.html`文件内容来确定。

### 设置版本控制方式为`versionJson`

使用`version.json` 文件管理版本号，控制应用版本更新。

```js
import { createVersionPolling } from 'version-polling';

createVersionPolling({
  vcType: 'versionJson',
  silent: import.meta.env.MODE === 'development', // 开发环境下不检测
  onUpdate: (self) => {
    const result = confirm('页面有更新，点击确定刷新页面！');
    if (result) {
      self.onRefresh();
    } else {
      self.onCancel();
    }
  },
});
```

修改`version.json`文件，配置`version`字段值

```json
{
  "version": "2.1.0",
  "versionContent": "更新内容: 修复已知存在的问题"
}
```

`version.json`文件跟`index.html`文件放在同一个服务器目录下。

## API

### options

| 参数                  | 说明                                                     | 类型             | 默认值                                               |
| --------------------- | -------------------------------------------------------- | ---------------- | ---------------------------------------------------- |
| vcType                | 版本控制方式，可选值有`etag`、`chunkHash`、`versionJson` | `string`         | `etag`                                               |
| htmlFileUrl           | `index.html`文件地址                                     | `string`         | `${location.origin}${location.pathname}`             |
| chunkName             | chunk 名称                                               | `string`         | `index`                                              |
| versionFileUrl        | `version.json`文件地址                                   | `string`         | `${location.origin}${location.pathname}version.json` |
| eventTriggerList      | 触发版本检测的事件名称列表                               | `string[]`       | `-`                                                  |
| pollingInterval       | 轮询间隔，单位为毫秒，默认为 5 分钟                      | `number`         | `5 * 60 * 1000`                                      |
| silent                | 为`true`时，不进行版本检测                               | `boolean`        | `false`                                              |
| silentPollingInterval | 为`true`时，不做轮询版本检测                             | `boolean`        | `false`                                              |
| silentPageVisibility  | 为`true`时，`visibilitychange`事件不会触发版本检测       | `boolean`        | `false`                                              |
| onUpdate              | 检测到版本更新触发的回调函数                             | `(self) => void` | `-`                                                  |

### deprecated

- `v1.3.0`移除`appETagKey`、`forceUpdate`配置项，移除原因使用鸡肋

## 开源协议

[MIT](LICENSE)
