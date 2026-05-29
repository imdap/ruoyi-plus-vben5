import type { Notice } from '#/api/system/notice/model';

import { onMounted, onUnmounted, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { mitt } from '@vben/utils';

import noticePreviewModal from '#/views/system/notice/notice-preview-modal.vue';

type NotificationEvent = {
  openModal: Notice;
};

export const notificationMitt = mitt<NotificationEvent>();

/**
 * 消息通知(右上角)和通知公告菜单需要公用预览 没必要使用两次预览Modal
 * 通过mitt公用
 * @returns
 */
export function useNotificationMitt() {
  // 预览 Modal 的打开状态, 用于让消息通知 Popover 在 Modal 打开期间保持显示
  const isPreviewOpen = ref(false);

  const [NoticePreviewModal, previewModalApi] = useVbenModal({
    connectedComponent: noticePreviewModal,
    onOpenChange(isOpen) {
      isPreviewOpen.value = isOpen;
    },
  });

  onMounted(() => {
    notificationMitt.on('openModal', (record) => {
      previewModalApi.setData({ record }).open();
    });
  });

  onUnmounted(() => {
    notificationMitt.off('openModal');
  });

  return {
    isPreviewOpen,
    NoticePreviewModal,
  };
}
