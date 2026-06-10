<script setup lang="ts">
import type { Notice } from '#/api/system/notice/model';

import { shallowRef } from 'vue';

import { useAccess } from '@vben/access';
import { useVbenModal } from '@vben/common-ui';

import { contentWithOssIdTransform } from '#/components/tiptap';

const currentNotice = shallowRef<Notice | null>(null);
const { hasAccessByCodes } = useAccess();

const [BasicModal, modalApi] = useVbenModal({
  class: 'w-[800px]',
  fullscreenButton: true,
  footer: false,
  onOpenChange: async (isOpen) => {
    if (!isOpen) {
      return null;
    }
    modalApi.modalLoading(true);

    const { record } = modalApi.getData() as { record: Notice };
    if (
      record.noticeContent?.includes('data-oss-id=') &&
      hasAccessByCodes(['system:notice:query'])
    ) {
      record.noticeContent =
        (await contentWithOssIdTransform(record.noticeContent)) ?? '';
    }
    currentNotice.value = record;

    modalApi.modalLoading(false);
  },
  onClosed() {
    currentNotice.value = null;
  },
});
</script>

<template>
  <BasicModal :title="currentNotice?.noticeTitle ?? '预览公告'">
    <div v-if="currentNotice">
      <div
        class="notice-content max-h-[400px] overflow-y-auto"
        v-html="currentNotice.noticeContent"
      ></div>
    </div>
  </BasicModal>
</template>

<style scoped>
.notice-content :deep(img) {
  max-width: 100%;
}
</style>
