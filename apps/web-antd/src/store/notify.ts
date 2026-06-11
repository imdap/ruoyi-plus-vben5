// oxlint-disable no-unused-expressions
import type { NotificationItem } from '@vben/layouts';

import type { NoticeList, SystemList, WorkflowList } from '#/api';
import type { SSEMessage } from '#/api/common';

import { computed, ref, watch } from 'vue';

import { SvgMessageUrl } from '@vben/icons';
import { $t } from '@vben/locales';

import dayjs from 'dayjs';
import { flattenDeep } from 'lodash-es';
import { defineStore } from 'pinia';

import { getNotificationList } from '#/api';
import { useSseMessage } from '#/utils/message';

function backNotificationToVbenNotification(
  m: NoticeList | SystemList | WorkflowList,
  readIds: (number | string)[],
) {
  const item: NotificationItem = {
    avatar: SvgMessageUrl,
    date: m.createTime,
    isRead: readIds.includes(m.messageId),
    message: m.message,
    title: $t('component.notice.title'),
    type: m.category,
    id: m.messageId,
    link: m.path,
    extra: m?.data,
  };
  return item;
}

function getSseNotificationCategory(m: SSEMessage) {
  if (m.source === 'workflow') {
    return 'workflow';
  }

  if (m.type === 'notice' || m.source === 'notice') {
    return 'notice';
  }

  return 'system';
}

function sseMessageToVbenNotification(m: SSEMessage): NotificationItem {
  const type = getSseNotificationCategory(m);

  return {
    avatar: SvgMessageUrl,
    date: dayjs(m.timestamp).format('YYYY-MM-DD HH:mm:ss'),
    extra: m.data,
    id: m.messageId,
    isRead: false,
    link: type === 'notice' ? undefined : m.path,
    message: m.message,
    title: $t('component.notice.title'),
    type,
  };
}

export const useNotifyStore = defineStore(
  'app-notify',
  () => {
    /**
     * 消息列表(非持久化 每次从接口获取)
     */
    const notificationList = ref<NotificationItem[]>([]);

    /**
     * 已读消息ID列表(持久化)
     */
    const readIds = ref<(number | string)[]>([]);

    function addReadId(messageId: number | string) {
      if (!readIds.value.includes(messageId)) {
        readIds.value.push(messageId);
      }
    }

    const unreadNotifications = computed(() => {
      return notificationList.value.filter((item) => !item.isRead);
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
      const notificationResp = await getNotificationList();
      flattenDeep(Object.values(notificationResp))
        .toSorted(
          (a, b) =>
            dayjs(b.createTime).valueOf() - dayjs(a.createTime).valueOf(),
        )
        .forEach((m) => {
          const item = backNotificationToVbenNotification(m, readIds.value);
          notificationList.value.push(item);
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

        notificationList.value = [
          sseMessageToVbenNotification(m),
          ...notificationList.value,
        ];

        // 需要手动置空 vue3在值相同时不会触发watch
        data.value = null;
      });
    }

    /**
     * 设置全部已读
     */
    function setAllRead() {
      notificationList.value.forEach((item) => {
        if (!item.isRead) {
          item.isRead = true;
          addReadId(item.id);
        }
      });
    }

    /**
     * 设置单条消息已读
     * @param item 通知
     */
    function setRead(item: NotificationItem) {
      if (!item.isRead) {
        item.isRead = true;
        addReadId(item.id);
      }
    }

    /**
     * 清空全部消息
     */
    function clearAllMessage() {
      notificationList.value = [];
    }

    function removeMessage(item: NotificationItem) {
      notificationList.value = notificationList.value.filter(
        (i) => i.id !== item.id,
      );
    }

    function $reset() {
      notificationList.value = [];
    }
    /**
     * 显示小圆点
     */
    const showDot = computed(() => unreadNotifications.value.length > 0);

    return {
      $reset,
      clearAllMessage,
      notificationList,
      readIds,
      setAllRead,
      setRead,
      showDot,
      startListeningMessage,
      removeMessage,
      unreadNotifications,
    };
  },
  {
    persist: {
      pick: ['readIds'],
    },
  },
);
