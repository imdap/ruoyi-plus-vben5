## 变化(跟ant-design-vue对比)

从ant design (react) v6移植过来 详细也可以看[antd的文档](https://ant.design/changelog-cn#600)

- 支持css变量 不用再写**deep**或者加权重来覆盖样式
- 支持`组件语义化结构` [组件语义化结构](https://ant.design/docs/blog/semantic-beauty-cn)
- notification的新样式 (这个从antd5都已经有了 vue一直没有)
- RadioGroup支持波纹效果
- modal/drawer支持blur效果
- 支持颜色与变体 需要绿色按钮？不用再写css了[Button 组件](https://ant.design/components/button-cn#button-demo-color-variant)
- 支持颜色选择器[ColorPicker 组件](https://ant.design/components/color-picker-cn) 这个也是从antd5就开始有了 vue一直没有
- 一些xxxItem组件 如`DescriotionsItem` `MenuItem` `TimeLineItem` 已经移除 使用对应父组件的`items`属性代替
- DatePicker等必须绑定为`Dayjs`类型 不再支持`string`格式的绑定 相应需要提交自己转为string提交

## 框架级别的变化

- v1版本的`requestClient`已经被`alovaInstance`替代 已经做了兼容(99%) 可直接替换
- 表格的操作列`ghost-button`替换名称为`action-button` 现在你可以修改来默认样式
- message/modal/notification直接导入使用(静态方法)无法获取context 即主题/国际化无效 需要通过`window.xxx`进行调用
- 使用`version-polling`替代自带的版本检测更新 样式更新 在worker执行 不会阻塞主线程
- 字典常量enum从`packages/@core/base/shared/src/constants`移动到`@vben/constants`下 需要移动文件位置(导入不需要更改)
- Switch的value只能是boolean值 之前可以为 string/number/boolean (antd组件变化)
- Popconfirm不再需要 `:get-popup-container="getVxePopupContainer"` antd已经支持滚动跟随 故`getVxePopupContainer`已经移除
- 离线(菜单)图标方案重构 在`scripts/generate-offline-icons.js`添加图标名称 在根目录执行`pnpm generate-offline-icons`即可生成离线图标

## 已知问题

- message的duration无效
- 图片上传(Uplaod) > 图片预览无效
