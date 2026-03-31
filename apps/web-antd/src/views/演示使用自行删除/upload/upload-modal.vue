<script setup lang="ts">
import { h } from 'vue';

import { JsonPreview, useVbenModal } from '@vben/common-ui';

import { Space } from 'antdv-next';

import { useVbenForm } from '#/adapter/form';

const [BasicForm, formApi] = useVbenForm({
  layout: 'vertical',
  schema: [
    {
      label: '图片上传多图',
      component: 'ImageUpload',
      fieldName: 'ossIds',
      componentProps: {
        maxCount: 3,
      },
    },
    {
      label: '图片上传单图',
      component: 'ImageUpload',
      fieldName: 'ossId',
      componentProps: {
        maxCount: 1,
      },
    },
  ],
  showDefaultActions: false,
});

async function getValues() {
  try {
    const v = await formApi.getValues();
    console.log(v);

    window.modal.info({
      content: () => h(JsonPreview, { data: v }),
    });
  } catch (error) {
    console.error(error);
  }
}

async function handleAssign() {
  const ids = ['1908761290673315841', '1907738568539332610'];
  await formApi.setValues({
    ossIds: ids,
    ossId: ids[0],
  });
}

const [BasicModal] = useVbenModal({
  title: '上传',
  footer: false,
});
</script>

<template>
  <BasicModal>
    <div class="flex flex-col">
      <Space>
        <a-button @click="handleAssign">赋值</a-button>
        <a-button @click="getValues">获取值</a-button>
      </Space>
      <BasicForm />
    </div>
  </BasicModal>
</template>
