<script lang="ts" setup>
import { h, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { useDebounceFn } from '@vueuse/core';
import { Button, Card } from 'antdv-next';

import { useVbenForm, z } from '#/adapter/form';
import { getAllMenusApi } from '#/api';

/**
 * 该页面用于「校验边框样式」验证：
 * schema 覆盖 adapter/component/index.ts 中 StrictComponentType 的全部组件，
 * 其中所有 outlined 输入类组件均加上校验规则，
 * 点击顶部「校验全部」即可让未填写的字段统一飘红，直观比对边框/聚焦阴影效果。
 */

const keyword = ref('');
const fetching = ref(false);
// 模拟远程获取数据
function fetchRemoteOptions({ keyword = '选项' }: Record<string, any>) {
  fetching.value = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      const options = Array.from({ length: 10 }).map((_, index) => ({
        label: `${keyword}-${index}`,
        value: `${keyword}-${index}`,
      }));
      resolve(options);
      fetching.value = false;
    }, 1000);
  });
}

// Cascader / TreeSelect 静态数据
const treeData = [
  {
    label: '浙江',
    value: 'zhejiang',
    children: [
      {
        label: '杭州',
        value: 'hangzhou',
        children: [
          { label: '西湖', value: 'xihu' },
          { label: '余杭', value: 'yuhang' },
        ],
      },
    ],
  },
  {
    label: '江苏',
    value: 'jiangsu',
    children: [
      {
        label: '南京',
        value: 'nanjing',
        children: [{ label: '中华门', value: 'zhonghuamen' }],
      },
    ],
  },
];

const simpleOptions = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
];

const [BaseForm, baseFormApi] = useVbenForm({
  commonConfig: {
    colon: true,
    componentProps: {
      class: 'w-full',
    },
  },
  layout: 'horizontal',
  // 全部字段默认 required，方便一键飘红验证边框
  schema: [
    {
      component: 'Input',
      componentProps: { placeholder: '请输入' },
      fieldName: 'input',
      label: 'Input',
    },
    {
      component: 'InputPassword',
      componentProps: { placeholder: '请输入密码' },
      fieldName: 'inputPassword',
      label: 'InputPassword',
    },
    {
      component: 'InputNumber',
      componentProps: { placeholder: '请输入', suffix: () => '¥' },
      fieldName: 'inputNumber',
      label: 'InputNumber',
    },
    {
      component: 'Textarea',
      componentProps: { placeholder: '请输入', rows: 2 },
      fieldName: 'textarea',
      label: 'Textarea',
    },
    {
      component: 'Mentions',
      componentProps: {
        options: [
          { label: 'afc163', value: 'afc163' },
          { label: 'zombieJ', value: 'zombieJ' },
        ],
        placeholder: '输入 @ 触发提及',
      },
      fieldName: 'mentions',
      label: 'Mentions',
    },
    {
      component: 'AutoComplete',
      componentProps: {
        options: simpleOptions,
        placeholder: '请输入',
      },
      fieldName: 'autoComplete',
      label: 'AutoComplete',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: simpleOptions,
        placeholder: '请选择',
        showSearch: true,
      },
      fieldName: 'select',
      label: 'Select',
      rules: 'selectRequired',
    },
    {
      component: 'ApiSelect',
      componentProps: {
        afterFetch: (data: { name: string; path: string }[]) =>
          data.map((item: any) => ({ label: item.name, value: item.path })),
        api: getAllMenusApi,
      },
      fieldName: 'apiSelect',
      label: 'ApiSelect',
      rules: 'selectRequired',
    },
    {
      component: 'ApiSelect',
      componentProps: () => ({
        api: fetchRemoteOptions,
        filterOption: false,
        notFoundContent: fetching.value ? undefined : null,
        onSearch: useDebounceFn((value: string) => {
          keyword.value = value;
        }, 300),
        params: { keyword: keyword.value || undefined },
        shouldFetch: (params: any) => !!params?.keyword,
        showSearch: true,
      }),
      fieldName: 'remoteSearch',
      label: '远程搜索',
      help: '远程查询，仅有输入时方进行查询',
      rules: 'selectRequired',
    },
    {
      component: 'Cascader',
      componentProps: {
        allowClear: true,
        options: treeData,
        placeholder: '请选择',
        showSearch: true,
      },
      fieldName: 'cascader',
      label: 'Cascader',
      rules: 'selectRequired',
    },
    {
      component: 'ApiCascader',
      componentProps: {
        api: getAllMenusApi,
        afterFetch: (data: { name: string; path: string }[]) =>
          data.map((item: any) => ({
            label: item.name,
            value: item.path,
            children: [],
          })),
      },
      fieldName: 'apiCascader',
      label: 'ApiCascader',
      rules: 'selectRequired',
    },
    {
      component: 'TreeSelect',
      componentProps: {
        allowClear: true,
        placeholder: '请选择',
        showSearch: true,
        treeData,
        treeNodeFilterProp: 'label',
      },
      fieldName: 'treeSelect',
      label: 'TreeSelect',
      rules: 'selectRequired',
    },
    {
      component: 'ApiTreeSelect',
      componentProps: {
        api: getAllMenusApi,
        labelField: 'name',
        valueField: 'path',
        childrenField: 'children',
      },
      fieldName: 'apiTreeSelect',
      label: 'ApiTreeSelect',
      rules: 'selectRequired',
    },
    {
      component: 'DatePicker',
      fieldName: 'datePicker',
      label: 'DatePicker',
      rules: 'selectRequired',
    },
    {
      component: 'RangePicker',
      fieldName: 'rangePicker',
      label: 'RangePicker',
      rules: 'selectRequired',
    },
    {
      component: 'TimePicker',
      fieldName: 'timePicker',
      label: 'TimePicker',
      rules: 'selectRequired',
    },
    {
      component: 'TimeRangePicker',
      fieldName: 'timeRangePicker',
      label: 'TimeRangePicker',
      rules: 'selectRequired',
    },
    {
      component: 'IconPicker',
      fieldName: 'iconPicker',
      label: 'IconPicker',
      rules: 'selectRequired',
    },
    {
      component: 'Rate',
      fieldName: 'rate',
      label: 'Rate',
    },
    {
      component: 'Switch',
      componentProps: { class: 'w-auto' },
      fieldName: 'switch',
      label: 'Switch',
    },
    {
      component: 'Radio',
      fieldName: 'radio',
      label: 'Radio',
      renderComponentContent: () => ({ default: () => ['单个 Radio'] }),
    },
    {
      component: 'RadioGroup',
      componentProps: { options: simpleOptions },
      fieldName: 'radioGroup',
      label: 'RadioGroup',
    },
    {
      component: 'Checkbox',
      fieldName: 'checkbox',
      label: 'Checkbox',
      renderComponentContent: () => ({ default: () => ['我已阅读并同意'] }),
      rules: z.boolean().refine((v) => v, { message: '请勾选' }),
    },
    {
      component: 'CheckboxGroup',
      componentProps: { options: simpleOptions },
      fieldName: 'checkboxGroup',
      label: 'CheckboxGroup',
    },
    {
      component: 'ImageUpload',
      fieldName: 'imageUpload',
      label: 'ImageUpload',
      rules: 'selectRequired',
    },
    {
      component: 'FileUpload',
      fieldName: 'fileUpload',
      label: 'FileUpload',
      rules: 'selectRequired',
    },
    {
      component: 'Upload',
      fieldName: 'upload',
      label: 'Upload',
      renderComponentContent: () => ({
        default: () => [h(Button, () => '点击上传')],
      }),
    },
    {
      component: 'RichTextarea',
      fieldName: 'richTextarea',
      label: 'RichTextarea',
      formItemClass: 'col-span-1 items-baseline md:col-span-2 lg:col-span-3',
    },
  ].map((item) => {
    // 纯展示型组件(无值)不参与校验
    const displayOnly = ['Divider', 'DefaultButton', 'PrimaryButton'];
    if (displayOnly.includes(item.component)) {
      return item;
    }
    // 其余统一补 required，已显式声明 rules 的不覆盖
    return { rules: 'required', ...item };
  }),
  showDefaultActions: false,
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
});

async function handleValidate() {
  await baseFormApi.validate();
}

function handleReset() {
  baseFormApi.resetForm();
}
</script>

<template>
  <Page
    content-class="flex flex-col gap-4"
    description="覆盖 StrictComponentType 全部组件，用于验证表单校验失败时的边框/聚焦阴影样式。测试使用"
    title="表单组件 - 边框校验验证"
  >
    <Card title="全部组件">
      <template #extra>
        <div class="flex gap-2">
          <Button type="primary" @click="handleValidate">校验全部</Button>
          <Button @click="handleReset">重置</Button>
        </div>
      </template>
      <BaseForm />
    </Card>
  </Page>
</template>
