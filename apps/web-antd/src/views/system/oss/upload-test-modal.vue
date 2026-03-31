<script setup lang="ts">
import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';

const [Modal, modalApi] = useVbenModal({
  title: '测试上传',
  onConfirm: handleConfirm,
});

const [Form, formApi] = useVbenForm({
  showDefaultActions: false,
  layout: 'vertical',
  schema: [
    {
      fieldName: 'images',
      component: 'ImageUpload',
      label: '图片上传',
      componentProps: {
        maxCount: 3,
      },
    },
    {
      fieldName: 'files',
      component: 'FileUpload',
      label: '文件上传',
    },
  ],
});

async function handleConfirm() {
  try {
    modalApi.lock(true);
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    const data = await formApi.getValues();
    console.log(data);
  } catch (error) {
    console.error(error);
  } finally {
    modalApi.lock(false);
  }
}
</script>

<template>
  <Modal>
    <Form />
  </Modal>
</template>
