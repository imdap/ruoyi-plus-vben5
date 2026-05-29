import type { NotificationItem } from '@vben/layouts';

import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useNotifyStore } from '#/store/notify';
import {
  notificationMitt,
  useNotificationMitt,
} from '#/utils/mitt/notification';

export function useNotification() {
  const notifyStore = useNotifyStore();
  onMounted(() => notifyStore.startListeningMessage());

  const tabConfig = [
    { label: '消息', value: 'system' },
    { label: '通知', value: 'notice' },
    { label: '工作', value: 'workflow' },
  ];

  const notificationTabList = computed(() => {
    return tabConfig.map((tab) => {
      const count = notifyStore.notificationList.filter(
        (item) => item.type === tab.value,
      ).length;
      return {
        label: count > 0 ? `${tab.label}(${count})` : tab.label,
        value: tab.value,
      };
    });
  });
  const currentTab = ref('system');

  function handleViewAll() {
    window.message.warning('暂未开放');
  }

  const router = useRouter();
  function navigateTo(
    link: string,
    query?: Record<string, any>,
    state?: Record<string, any>,
  ) {
    if (link.startsWith('http://') || link.startsWith('https://')) {
      // 外部链接，在新标签页打开
      window.open(link, '_blank');
    } else {
      // 内部路由链接，支持 query 参数和 state
      router.push({
        path: link,
        query: query || {},
        state,
      });
    }
  }

  const { isPreviewOpen, NoticePreviewModal } = useNotificationMitt();

  function handleNotificationClick(item: NotificationItem) {
    // 设置为已读
    notifyStore.setRead(item);
    // 预览通知公告
    if (item.type === 'notice' && item.extra) {
      // 改为发送消息
      notificationMitt.emit('openModal', item.extra);
      return;
    }
    // 如果通知项有链接，点击时跳转
    if (item.link) {
      // 解析路径和参数 支持带参跳转
      const { path, params } = extractPathAndParams(item.link);
      navigateTo(path, params);
    }
  }

  return {
    notifyStore,
    notificationTabList,
    currentTab,
    handleViewAll,
    handleNotificationClick,
    isPreviewOpen,
    NoticePreviewModal,
  };
}

function extractPathAndParams(urlString: string) {
  // 给相对路径加上虚拟 base，使其成为绝对 URL
  const fakeBase = 'http://example.com';
  const url = new URL(urlString, fakeBase);

  // 提取路径部分
  const path = url.pathname;

  // 提取查询参数：URLSearchParams 对象，可以转换为普通对象
  const params: Record<string, string> = {};
  for (const [key, value] of url.searchParams.entries()) {
    params[key] = value;
  }

  return { path, params };
}
