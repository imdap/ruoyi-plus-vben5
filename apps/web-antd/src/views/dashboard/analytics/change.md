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

## 框架级别的变化

- message/modal/notification直接导入使用(静态方法)无法获取context 即主题/国际化无效 需要通过`window.xxx`进行调用
- 使用`version-polling`替代自带的版本检测更新 样式更新 在worker执行 不会阻塞主线程

## 已知问题

- 夜间模式切换 antd组件不会跟随切换(dev是正常的 打包后会有问题) 等待antdv-next更新
- message的duration无效
