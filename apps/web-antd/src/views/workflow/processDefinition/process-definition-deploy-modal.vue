<script setup lang="ts">
import type { UploadFile } from 'antdv-next';

import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { InboxOutlined } from '@antdv-next/icons';
import { Upload } from 'antdv-next';

import { workflowDefinitionImport } from '#/api/workflow/definition';

const emit = defineEmits<{ reload: [] }>();

const UploadDragger = Upload.Dragger;

const [BasicModal, modalApi] = useVbenModal({
  onCancel: handleCancel,
  onConfirm: handleSubmit,
});

const fileList = ref<UploadFile[]>([]);

async function handleSubmit() {
  try {
    modalApi.modalLoading(true);
    if (fileList.value.length !== 1) {
      handleCancel();
      return;
    }
    const data = {
      file: fileList.value[0]!.originFileObj as Blob,
      category: modalApi.getData().category,
    };
    await workflowDefinitionImport(data);
    emit('reload');
    handleCancel();
  } catch (error) {
    console.warn(error);
    modalApi.close();
  } finally {
    modalApi.modalLoading(false);
  }
}

function handleCancel() {
  modalApi.close();
  fileList.value = [];
}
</script>

<template>
  <BasicModal
    :close-on-click-modal="false"
    :fullscreen-button="false"
    title="流程部署"
  >
    <!-- z-index不设置会遮挡模板下载loading -->
    <!-- 手动处理 而不是放入文件就上传 -->
    <UploadDragger
      v-model:file-list="fileList"
      :before-upload="() => false"
      :max-count="1"
      :show-upload-list="true"
      accept="application/json"
    >
      <p class="ant-upload-drag-icon flex items-center justify-center">
        <InboxOutlined class="size-[48px] text-primary" />
      </p>
      <p class="ant-upload-text">点击或者拖拽到此处上传[json]文件</p>
    </UploadDragger>
  </BasicModal>
</template>
