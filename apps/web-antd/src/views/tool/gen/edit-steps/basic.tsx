import type { FormSchemaGetter } from '#/adapter/form';

import { getPopupContainer } from '@vben/utils';

import { z } from '#/adapter/form';

export const formSchema: FormSchemaGetter = () => [
  {
    component: 'Divider',
    componentProps: {
      orientation: 'left',
    },
    fieldName: 'divider1',
    formItemClass: 'col-span-2',
    label: '基本信息',
  },
  {
    component: 'Input',
    fieldName: 'tableName',
    label: '表名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'tableComment',
    label: '表描述',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'className',
    label: '实体类名称',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'functionAuthor',
    label: '作者',
    rules: 'required',
  },
  {
    component: 'Divider',
    componentProps: {
      orientation: 'left',
    },
    fieldName: 'divider2',
    formItemClass: 'col-span-2',
    label: '生成信息',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: false,
      getPopupContainer,
      options: [
        { label: '单表(增删改查)', value: 'crud' },
        { label: '树表(增删改查)', value: 'tree' },
      ],
    },
    defaultValue: 'crud',
    fieldName: 'tplCategory',
    label: '模板类型',
    rules: 'selectRequired',
  },
  {
    component: 'Select',
    componentProps: {
      getPopupContainer,
    },
    dependencies: {
      show: (values) => values.tplCategory === 'tree',
      triggerFields: ['tplCategory'],
    },
    fieldName: 'treeCode',
    helpMessage: '树节点显示的编码字段名， 如: dept_id (相当于id)',
    label: '树编码字段',
    rules: 'selectRequired',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: false,
    },
    dependencies: {
      show: (values) => values.tplCategory === 'tree',
      triggerFields: ['tplCategory'],
    },
    fieldName: 'treeParentCode',
    help: '树节点显示的父编码字段名， 如: parent_Id (相当于parentId)',
    label: '树父编码字段',
    rules: 'selectRequired',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: false,
    },
    dependencies: {
      show: (values) => values.tplCategory === 'tree',
      triggerFields: ['tplCategory'],
    },
    fieldName: 'treeName',
    help: '树节点的显示名称字段名， 如: dept_name (相当于label)',
    label: '树名称字段',
    rules: 'selectRequired',
  },
  {
    component: 'Input',
    fieldName: 'packageName',
    help: '生成在哪个java包下, 例如 com.ruoyi.system',
    label: '生成包路径',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'moduleName',
    help: '可理解为子系统名，例如 system',
    label: '生成模块名',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'businessName',
    help: '可理解为功能英文名，例如 user',
    label: '生成业务名',
    rules: 'required',
  },
  {
    component: 'Input',
    fieldName: 'functionName',
    help: '用作类描述，例如 用户',
    label: '生成功能名',
    rules: 'required',
  },
  {
    component: 'TreeSelect',
    componentProps: {
      allowClear: false,
      getPopupContainer,
    },
    defaultValue: 0,
    fieldName: 'parentMenuId',
    label: '上级菜单',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      options: [
        { label: 'Vue', value: 'vue' },
        { label: 'React', value: 'react' },
      ],
      optionType: 'button',
    },
    defaultValue: 'vue',
    fieldName: 'frontendType',
    help: '对应后端 resources/vm 下的模板目录，例如 vue、react',
    label: '前端模板',
    rules: z
      .string()
      .min(1, '请选择前端模板')
      .regex(/^[\w-]+$/, '仅支持字母、数字、下划线和中划线'),
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      options: [
        { label: 'modal弹窗', value: 'modal' },
        { label: 'drawer抽屉', value: 'drawer' },
      ],
      optionType: 'button',
    },
    help: '自定义功能, 需要后端支持',
    defaultValue: 'modal',
    fieldName: 'popupComponent',
    label: '弹窗组件类型',
  },
  {
    component: 'RadioGroup',
    componentProps: {
      buttonStyle: 'solid',
      options: [
        { label: 'useVbenForm', value: 'useForm' },
        { label: 'antd原生表单', value: 'native' },
      ],
      optionType: 'button',
    },
    help: '自定义功能, 需要后端支持\n复杂(布局, 联动等)表单建议用antd原生表单',
    defaultValue: 'useForm',
    fieldName: 'formComponent',
    label: '生成表单类型',
  },
  {
    component: 'Divider',
    componentProps: {
      orientation: 'left',
    },
    fieldName: 'divider3',
    formItemClass: 'col-span-2',
    label: '增强选项',
  },
  {
    component: 'Switch',
    componentProps: {
      class: 'w-fit',
    },
    defaultValue: true,
    fieldName: 'enableExport',
    help: '关闭后将不生成 export 接口与前端导出按钮',
    label: '导出能力',
  },
  {
    component: 'Switch',
    componentProps: {
      class: 'w-fit',
    },
    defaultValue: false,
    fieldName: 'enableStatus',
    help: '开启后生成 changeStatus 接口与列表状态开关列',
    label: '状态切换',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      getPopupContainer,
      optionFilterProp: 'label',
      showSearch: true,
    },
    dependencies: {
      show: (values) => values.enableStatus,
      triggerFields: ['enableStatus'],
    },
    fieldName: 'statusField',
    label: '状态字段',
    rules: 'selectRequired',
  },
  {
    component: 'Switch',
    defaultValue: false,
    componentProps: {
      class: 'w-fit',
    },
    fieldName: 'enableUnique',
    help: '开启后按选中的字段生成组合唯一校验，新增和修改都会校验',
    label: '组合唯一校验',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      getPopupContainer,
      mode: 'multiple',
      optionFilterProp: 'label',
      showSearch: true,
    },
    dependencies: {
      show: (values) => values.enableUnique,
      triggerFields: ['enableUnique'],
    },
    fieldName: 'uniqueFields',
    label: '唯一字段',
    rules: 'selectRequired',
  },
  {
    component: 'Switch',
    componentProps: {
      class: 'w-fit',
    },
    defaultValue: false,
    fieldName: 'enableSort',
    help: '开启后生成 updateSort 接口，并在列表中以输入框形式快速调整排序字段',
    label: '排序调整',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      getPopupContainer,
      optionFilterProp: 'label',
      showSearch: true,
    },
    dependencies: {
      show: (values) => values.enableSort,
      triggerFields: ['enableSort'],
    },
    fieldName: 'sortField',
    label: '排序字段',
    rules: 'selectRequired',
  },
  {
    component: 'Input',
    defaultValue: '0',
    dependencies: {
      show: (values) => values.tplCategory === 'tree',
      triggerFields: ['tplCategory'],
    },
    fieldName: 'treeRootValue',
    help: '默认是 0，用于根节点 parentId 的默认值',
    label: '根节点值',
    rules: 'required',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      getPopupContainer,
      optionFilterProp: 'label',
      showSearch: true,
    },
    dependencies: {
      show: (values) => values.tplCategory === 'tree',
      triggerFields: ['tplCategory'],
    },
    fieldName: 'treeAncestorsField',
    help: '选择 ancestors 一类字段后，生成器会自动维护祖级链',
    label: '祖级字段',
  },
  {
    component: 'Select',
    componentProps: {
      allowClear: true,
      getPopupContainer,
      optionFilterProp: 'label',
      showSearch: true,
    },
    dependencies: {
      show: (values) => values.tplCategory === 'tree',
      triggerFields: ['tplCategory'],
    },
    fieldName: 'treeOrderField',
    help: '树列表默认按祖级、父节点、树排序字段、主键升序排列',
    label: '树排序字段',
  },
  {
    component: 'Textarea',
    fieldName: 'remark',
    formItemClass: 'col-span-2 items-baseline',
    label: '备注',
  },
];
