<script setup lang="tsx">
import type { DescriptionsProps } from 'antdv-next';

import type { Notice } from '#/api/system/notice/model';

import { computed, shallowRef } from 'vue';

import { useAccess } from '@vben/access';
import { useVbenModal } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';

import { Descriptions } from 'antdv-next';

import { contentWithOssIdTransform } from '#/components/tinymce/src/helper';
import { renderDict } from '#/utils/render';

const currentNotice = shallowRef<Notice | null>(null);
  const {hasAccessByCodes}= useAccess();

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
    if (record.noticeContent?.includes('data-oss-id=')
          && hasAccessByCodes(['system:notice:query'])) {
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

const items = computed<DescriptionsProps['items']>(() => {
  if (!currentNotice.value) {
    return [];
  }
  const data = currentNotice.value;
  return [
    {
      label: '公告标题',
      span: 2,
      content: <div class='flex items-center gap-1'>
        <span class="font-medium">{data.noticeTitle}</span>
        {renderDict(data.noticeType, DictEnum.SYS_NOTICE_TYPE)}
      </div>,
    },
    {
      label: '创建人',
      content: data.createByName,
    },
    {
      label: '创建时间',
      content: data.createTime,
    },
  ];
});
</script>

<template>
  <BasicModal title="预览公告">
    <Descriptions
      :classes="{ label: 'min-w-[100px]' }"
      :column="2"
      :items="items"
      bordered
      size="small"
    />
    <div class="mt-4" v-if="currentNotice">
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
