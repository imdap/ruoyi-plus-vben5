<script setup lang="tsx">
import type { DescriptionsProps } from 'antdv-next';

import { computed, h, ref } from 'vue';

import { CodeMirror, Page } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';

import {
  Alert,
  Card,
  Descriptions,
  RadioGroup,
  Select,
  Space,
} from 'antdv-next';
import { repeat } from 'lodash-es';

import { DictTag } from '#/components/dict';
import { getDictOptions } from '#/utils/dict';

const options = getDictOptions(DictEnum.SYS_COMMON_STATUS);

const value = ref('1');

const getOptionsCode = `
const options = getDictOptions(DictEnum.SYS_COMMON_STATUS);
`;
const mountCode = `
const options = reactive([]);
onMounted(async () => {
  const resp = await dictDataInfo(DictEnum.SYS_COMMON_STATUS);
  options.push(...resp);
})
`;

const computedOptions = computed(() => {
  return options.filter((item) => item.dictValue !== '1');
});

const filterCode = `
{
  component: 'Select',
  componentProps: {
    // 不生效的写法
    // options: getDictOptions(DictEnum.SYS_COMMON_STATUS).filter((item) => item.value !== '0'),
    // 正确写法
    options: computed(() => {
      const options = getDictOptions(DictEnum.SYS_COMMON_STATUS);
      return options.filter((item) => item.value !== '0');
    }),
  },
  fieldName: 'status',
  label: '状态',
},
`;

const items: DescriptionsProps['items'] = [
  {
    content: <DictTag dicts={options} value="error" />,
    label: '默认为unknown',
  },
  {
    content: (
      <DictTag dicts={options} fallback="自定义的fallback" value="error" />
    ),
    label: '直接返回string',
  },
  {
    content: (
      <DictTag
        dicts={options}
        fallback={(v: any) => repeat(String(v), 5)}
        value="error"
      />
    ),
    label: '函数返回string',
  },
  {
    content: (
      <DictTag
        dicts={options}
        fallback={(v: any) =>
          h('span', { class: 'text-red-500' }, `${v} 没有匹配到值`)
        }
        value="error"
      />
    ),
    label: '函数返回VNode',
  },
  {
    content: (
      <DictTag dicts={options} value="error">
        {{
          fallback: (v: any) => (
            <span class="text-red-500"> {v} 跟上面相同的写法 </span>
          ),
        }}
      </DictTag>
    ),
    label: '使用fallback插槽',
  },
];
</script>

<template>
  <Page content-class="flex flex-col gap-4">
    <Card size="small" title="核心逻辑">
      <p class="mb-2">
        你可以简单理解为getDictOptions是以下代码的快捷方式(还包括对并发和缓存的处理)
      </p>
      <div class="grid grid-cols-2 gap-4">
        <CodeMirror readonly :model-value="getOptionsCode" language="js" />
        <CodeMirror readonly :model-value="mountCode" language="js" />
      </div>
    </Card>

    <Card size="small">
      <template #title>
        选择器组件使用
        <a
          href="https://dapdap.top/function/dict.html"
          class="text-primary"
          target="_blank"
        >
          文档参考
        </a>
      </template>
      <Space>
        <Select v-model:value="value" :options="options" />
        <RadioGroup v-model:value="value" :options="options" />
        渲染: <DictTag :value="value" :dicts="options" />
      </Space>
      <Alert
        class="mt-2"
        show-icon
        type="success"
        message="getDictOptions返回值为reactive 可直接绑定使用!"
      />
      <Alert
        class="mt-2"
        show-icon
        type="error"
        message="getDictOptions内部为异步实现 不要使用它参与业务运算!"
      />
    </Card>

    <Card size="small" title="字典标签 - 未匹配到值的fallback">
      <Descriptions :column="1" :items="items" />
    </Card>

    <Card size="small" title="给 Form 组件赋值前 需要处理字典后展示的情况">
      <p class="mb-2 text-black/55">
        <Select class="w-[200px]" :options="computedOptions" />

        这里使用computed过滤了部分选项
        <a
          class="font-semibold text-primary"
          target="_blank"
          href="https://dapdap.top/function/dict.html#%E7%BB%99-form-%E7%BB%84%E4%BB%B6%E8%B5%8B%E5%80%BC%E5%89%8D-%E9%9C%80%E8%A6%81%E5%81%9A%E5%A4%84%E7%90%86%E5%AD%97%E5%85%B8%E5%90%8E%E5%B1%95%E7%A4%BA%E7%9A%84%E6%83%85%E5%86%B5"
        >
          相关文档
        </a>
      </p>
      <p class="mb-2 text-red-500">简单描述就是套一层computed就行</p>
      <CodeMirror readonly :model-value="filterCode" language="js" />
    </Card>
  </Page>
</template>
