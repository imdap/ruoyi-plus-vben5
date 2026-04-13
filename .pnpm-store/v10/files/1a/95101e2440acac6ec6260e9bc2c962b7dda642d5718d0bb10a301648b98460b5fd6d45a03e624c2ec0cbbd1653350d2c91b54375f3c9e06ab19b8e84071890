# @vxe-ui/plugin-render-antd

[Vxe UI](https://vxeui.com/) plug-in for compatibility with the [ant-design-vue](https://www.npmjs.com/package/ant-design-vue) component.

## Compatibility

It corresponds to [vxe-table v4](https://www.npmjs.com/package/vxe-table) or [vxe-pc-ui v4](https://www.npmjs.com/package/vxe-pc-ui)  

## Installing

```shell
npm install @vxe-ui/plugin-render-antd
```

```javascript
// ...
// Use vxe-pc-ui
import { VxeUI } from 'vxe-pc-ui'
// Use vxe-table
// import { VxeUI } from 'vxe-table'
import VxeUIPluginRenderAntd from '@vxe-ui/plugin-render-antd'
import '@vxe-ui/plugin-render-antd/dist/style.css'
// ...

VxeUI.use(VxeUIPluginRenderAntd)
// VxeUI.use(VxeUIPluginRenderAntd, {
//   // Antd,
//   // prefixCls: 'ant'
// })
```

## Import on-demand

```javascript
// ...
import VxeUIPluginRenderAntd from '@vxe-ui/plugin-render-antd'
// ...

// If it is not a global installation, then a single import is required.
import { AInput, AInputNumber, ASelect } from 'ant-design-vue'
// ...
VxeUIPluginRenderAntd.component(AInput)
VxeUIPluginRenderAntd.component(AInputNumber)
VxeUIPluginRenderAntd.component(ASelect)
// ...
```


## API

### cell-render 默认的渲染器配置项说明

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
|------|------|-----|-----|-----|
| name | 支持的渲染组件 | String | AInput, AAutocomplete, AInputNumber, ASwitch, ARate, AButton, AButtons | — |
| props | 渲染组件附加属性，参数请查看被渲染的 Component props | Object | — | {} |
| options | 只对 name=ASelect 有效，下拉组件选项列表 | Array | — | [] |
| optionProps | 只对 name=ASelect 有效，下拉组件选项属性参数配置 | Object | — | { value: 'value', label: 'label' } |
| optionGroups | 只对 name=ASelect 有效，下拉组件分组选项列表 | Array | — | [] |
| optionGroupProps | 只对 name=ASelect 有效，下拉组件分组选项属性参数配置 | Object | — | { options: 'options', label: 'label' } |
| events | 渲染组件附加事件，参数为 ( {row,rowIndex,column,columnIndex}, ...Component arguments ) | Object | — | — |

### edit-render 可编辑渲染器配置项说明

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
|------|------|-----|-----|-----|
| name | 支持的渲染组件 | String | AInput, AAutocomplete, AInputNumber, ASelect, ACascader, ADatePicker, AMonthPicker, ARangePicker, AWeekPicker, ATimePicker, ATreeSelect, ASwitch, ARate, AButton, AButtons | — |
| props | 渲染组件附加属性，参数请查看被渲染的 Component props | Object | — | {} |
| options | 只对 name=ASelect 有效，下拉组件选项列表 | Array | — | [] |
| optionProps | 只对 name=ASelect 有效，下拉组件选项属性参数配置 | Object | — | { value: 'value', label: 'label' } |
| optionGroups | 只对 name=ASelect 有效，下拉组件分组选项列表 | Array | — | [] |
| optionGroupProps | 只对 name=ASelect 有效，下拉组件分组选项属性参数配置 | Object | — | { options: 'options', label: 'label' } |
| events | 渲染组件附加事件，参数为 ( {row,rowIndex,column,columnIndex}, ...Component arguments ) | Object | — | — |

### filter-render 筛选渲染器配置项说明

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
|------|------|-----|-----|-----|
| name | 支持的渲染组件 | String | AInput, AAutocomplete, AInputNumber, ASelect, ASwitch, ARate | — |
| props | 渲染组件附加属性，参数请查看被渲染的 Component props | Object | — | {} |
| options | 只对 name=ASelect 有效，下拉组件选项列表 | Array | — | [] |
| optionProps | 只对 name=ASelect 有效，下拉组件选项属性参数配置 | Object | — | { value: 'value', label: 'label' } |
| optionGroups | 只对 name=ASelect 有效，下拉组件分组选项列表 | Array | — | [] |
| optionGroupProps | 只对 name=ASelect 有效，下拉组件分组选项属性参数配置 | Object | — | { options: 'options', label: 'label' } |
| events | 渲染组件附加事件，参数为 ( {}, ...Component arguments ) | Object | — | — |

### item-render 表单-项选渲染器配置项说明

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
|------|------|-----|-----|-----|
| name | 支持的渲染组件 | String | AInput, AAutocomplete, AInputNumber, ASelect, ASwitch, ARate, ARadio, ACheckbox, AButton, AButtons | — |
| props | 渲染组件附加属性，参数请查看被渲染的 Component props | Object | — | {} |
| options | 只对 name=ASelect 有效，下拉组件选项列表 | Array | — | [] |
| optionProps | 只对 name=ASelect 有效，下拉组件选项属性参数配置 | Object | — | { value: 'value', label: 'label' } |
| optionGroups | 只对 name=ASelect 有效，下拉组件分组选项列表 | Array | — | [] |
| optionGroupProps | 只对 name=ASelect 有效，下拉组件分组选项属性参数配置 | Object | — | { options: 'options', label: 'label' } |
| events | 渲染组件附加事件，参数为 ( {}, ...Component arguments ) | Object | — | — |

### 表单设计器配置项

| 描述 |
|------|
| 'AInputWidget', 'ATextareaWidget', 'ANumberInputWidget', 'ADatePickerWidget', 'ASelectWidget',  'ARadioWidget', 'ACheckboxWidget', 'ASwitchWidget' |

## Table Cell demo

```html
<vxe-table
  height="600"
  :data="tableData"
  :edit-config="{trigger: 'click', mode: 'cell'}">
  <vxe-column field="name" title="Name" :edit-render="{name: 'AInput'}"></vxe-column>
  <vxe-column field="age" title="Age" :edit-render="{name: 'AInputNumber'}"></vxe-column>
  <vxe-column field="date" title="Date" width="200" :edit-render="{name: 'ADatePicker'}"></vxe-column>
</vxe-table>
```

```javascript
export default {
  data () {
    return {
      tableData: [
        { id: 100, name: 'test0', age: 28, sex: '1', date: '' },
        { id: 101, name: 'test1', age: 32, sex: '0', date: '' },
        { id: 102, name: 'test2', age: 36, sex: '1', date: '' }
      ]
    }
  }
}
```

## Table Filter demo

```html
<template>
  <vxe-table
    height="600"
    :data="tableData">
    <vxe-column field="name" title="Name":filters="nameOptions" :filter-render="{name: 'AInput'}"></vxe-column>
    <vxe-column field="age" title="Age"></vxe-column>
    <vxe-column field="date" title="Date" ></vxe-column>
  </vxe-table>
</template>
```

```javascript
export default {
  data () {
    return {
      nameOptions: [
        { data: '' }
      ],
      tableData: [
        { id: 100, name: 'test0', age: 28, date: '' },
        { id: 101, name: 'test1', age: 32, date: '' },
        { id: 102, name: 'test2', age: 36, date: '' }
      ]
    }
  }
}
```

## Contributors

Thank you to everyone who contributed to this project.

[![vxe-ui-plugins](https://contrib.rocks/image?repo=x-extends/vxe-ui-plugins)](https://github.com/x-extends/vxe-ui-plugins/graphs/contributors)

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
