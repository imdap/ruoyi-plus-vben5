// oxlint-disable no-unused-expressions
import type { NotificationItem } from '@vben/layouts';

import type { NoticeList, SystemList, WorkflowList } from '#/api';
import type { SSEMessage } from '#/api/common';

import { computed, ref, watch } from 'vue';

import { SvgMessageUrl } from '@vben/icons';
import { $t } from '@vben/locales';
import { useUserStore } from '@vben/stores';

import dayjs from 'dayjs';
import { flattenDeep } from 'lodash-es';
import { defineStore } from 'pinia';

import { getNotificationList } from '#/api';
import { useSseMessage } from '#/utils/message';

function backNotificationToVbenNotification(
  m: NoticeList | SystemList | WorkflowList,
  userId: number | string,
) {
  const item: NotificationItem = {
    // avatar: `https://api.multiavatar.com/${random(0, 10_000)}.png`, 随机头像
    avatar: SvgMessageUrl,
    date: m.createTime,
    isRead: false,
    message: m.message,
    title: $t('component.notice.title'),
    userId,
    type: m.category,
    id: m.messageId,
    link: m.path,
    // 拓展 存储消息公告
    extra: m?.data,
  };
  return item;
}

export const useNotifyStore = defineStore('app-notify', () => {
  /**
   * return才会被持久化 存储全部消息
   */
  const notificationList = ref<NotificationItem[]>([]);

  const userStore = useUserStore();
  const userId = computed(() => {
    return userStore.userInfo?.userId || '0';
  });

  const notifications = computed(() => {
    return notificationList.value.filter(
      (item) => item.userId === userId.value,
    );
  });

  /**
   * 开始监听sse消息 & 从后端获取持久化消息
   */
  async function startListeningMessage() {
    // 默认sse 使用 websocket自行开启注释
    // const websocketReturnData = useWebSocketMessage();
    // if (!websocketReturnData) {
    //   return;
    // }
    // const { data } = websocketReturnData;

    const sseReturnData = useSseMessage();
    if (!sseReturnData) {
      return;
    }
    // 获取后端持久化消息
    const notifications = await getNotificationList();
    flattenDeep(Object.values(notifications)).forEach((m) => {
      const item = backNotificationToVbenNotification(m, userId.value);
      notificationList.value.unshift(item);
    });

    const { data } = sseReturnData;

    watch(data, (strMessage) => {
      if (!strMessage) {
        return;
      }
      console.log(`接收到消息: ${strMessage}`);

      const m = JSON.parse(strMessage) as SSEMessage;

      window.notification.success({
        description: m.message,
        duration: 3,
        title: $t('component.notice.received'),
      });

      notificationList.value.unshift({
        // avatar: `https://api.multiavatar.com/${random(0, 10_000)}.png`, 随机头像
        avatar: SvgMessageUrl,
        date: dayjs(m.timestamp).format('YYYY-MM-DD HH:mm:ss'),
        isRead: false,
        message: m.message,
        title: $t('component.notice.title'),
        userId: userId.value,
        type: m.type,
        id: m.messageId,
        link: m.path,
      });

      // 需要手动置空 vue3在值相同时不会触发watch
      data.value = null;
    });
  }

  /**
   * 设置全部已读
   */
  function setAllRead() {
    notificationList.value
      .filter((item) => item.userId === userId.value)
      .forEach((item) => {
        item.isRead = true;
      });
  }

  /**
   * 设置单条消息已读
   * @param item 通知
   */
  function setRead(item: NotificationItem) {
    !item.isRead && (item.isRead = true);
  }

  /**
   * 清空全部消息
   */
  function clearAllMessage() {
    notificationList.value = notificationList.value.filter(
      (item) => item.userId !== userId.value,
    );
  }

  function removeMessage(item: NotificationItem) {
    notificationList.value = notificationList.value.filter(
      (i) => i.id !== item.id,
    );
  }

  /**
   * 只需要空实现即可
   * 否则会在退出登录清空所有
   */
  function $reset() {
    // notificationList.value = [];
  }
  /**
   * 显示小圆点
   */
  const showDot = computed(() =>
    notificationList.value
      .filter((item) => item.userId === userId.value)
      .some((item) => !item.isRead),
  );

  return {
    $reset,
    clearAllMessage,
    notificationList,
    notifications,
    setAllRead,
    setRead,
    showDot,
    startListeningMessage,
    removeMessage,
  };
});
