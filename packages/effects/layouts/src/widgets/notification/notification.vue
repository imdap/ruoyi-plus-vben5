<script lang="ts" setup>
import type { NotificationItem } from './types';

import { computed } from 'vue';

import { Bell, CircleCheckBig, CircleX, MailCheck } from '@vben/icons';
import { $t } from '@vben/locales';

import {
  VbenButton,
  VbenIconButton,
  VbenPopover,
  VbenScrollbar,
  VbenSegmented,
} from '@vben-core/shadcn-ui';

import { useToggle } from '@vueuse/core';

defineOptions({ name: 'NotificationPopup' });

const props = withDefaults(
  defineProps<{
    /** 显示圆点 */
    dot?: boolean;
    /**
     * 锁定打开状态: 为 true 时忽略 Popover 的自动关闭(失焦/点击外部),
     * 用于点击通知打开预览 Modal 时, 让消息列表保持显示在 Modal 下方
     */
    keepOpen?: boolean;
    /** 消息列表 */
    notifications?: NotificationItem[];
    /** 分段器 */
    tabList?: {
      label: string;
      value: string;
    }[];
  }>(),
  {
    dot: false,
    keepOpen: false,
    notifications: () => [],
    tabList: () => [],
  },
);

const emit = defineEmits<{
  clear: [];
  click: [NotificationItem];
  makeAll: [];
  read: [NotificationItem];
  remove: [NotificationItem];
  viewAll: [];
}>();

const [open, toggle] = useToggle();

const close = () => {
  open.value = false;
};

const handleOpenUpdate = (val: boolean) => {
  // keepOpen 为 true 时(例如从通知点开了预览 Modal), 忽略 Popover 的自动关闭请求,
  // 避免与 Modal 的焦点陷阱争抢导致消息列表消失; 铃铛按钮 toggle 仍可正常开关
  if (!val && props.keepOpen) {
    return;
  }
  open.value = val;
};

const handleViewAll = () => {
  emit('viewAll');
  close();
};

const handleMakeAll = () => {
  emit('makeAll');
};

const handleClear = () => {
  emit('clear');
};

const currentTab = defineModel<string>('currentTab', { default: '' });
const computedNotificationList = computed(() => {
  if (props.tabList.length === 0) {
    return props.notifications;
  }
  return props.notifications.filter((item) => item.type === currentTab.value);
});
</script>
<template>
  <VbenPopover
    :open="open"
    content-class="relative right-2 !z-[1998] w-90 p-0"
    @update:open="handleOpenUpdate"
  >
    <template #trigger>
      <div class="mr-2 flex-center h-full" @click.stop="toggle()">
        <VbenIconButton class="bell-button relative text-foreground">
          <span
            v-if="dot"
            class="absolute top-0.5 right-0.5 size-2 rounded-full bg-primary"
          ></span>
          <Bell class="size-4" />
        </VbenIconButton>
      </div>
    </template>

    <div class="relative">
      <div class="flex items-center justify-between p-4 py-3">
        <div class="text-foreground">{{ $t('ui.widgets.notifications') }}</div>
        <VbenIconButton
          :disabled="notifications.length <= 0"
          :tooltip="$t('ui.widgets.markAllAsRead')"
          @click="handleMakeAll"
        >
          <MailCheck class="size-4" />
        </VbenIconButton>
      </div>

      <div v-if="tabList">
        <VbenSegmented v-model="currentTab" :tabs="tabList" />
      </div>

      <!-- 加key解决切换分段器 滚动条没有重新加载 -->
      <VbenScrollbar
        v-if="computedNotificationList.length > 0"
        :key="currentTab"
      >
        <ul class="!flex max-h-[360px] w-full flex-col">
          <template v-for="item in computedNotificationList" :key="item.id">
            <li
              class="relative flex w-full cursor-pointer items-start gap-5 border-t border-border p-3 hover:bg-accent"
              @click="emit('click', item)"
            >
              <slot name="content" :item="item">
                <span
                  v-if="!item.isRead"
                  class="absolute top-2 right-2 size-2 rounded-full bg-primary"
                ></span>

                <span
                  class="relative flex size-10 shrink-0 overflow-hidden rounded-full"
                >
                  <img
                    :src="item.avatar"
                    class="aspect-square size-full object-cover"
                  />
                </span>
                <div class="flex flex-col gap-1 leading-none">
                  <p class="font-semibold">{{ item.title }}</p>
                  <p
                    class="my-1 line-clamp-2 text-xs text-muted-foreground pr-8"
                  >
                    {{ item.message }}
                  </p>
                  <p class="line-clamp-2 text-xs text-muted-foreground">
                    {{ item.date }}
                  </p>
                </div>
                <div
                  class="absolute top-1/2 right-3 flex -translate-y-1/2 flex-row gap-1"
                >
                  <slot name="action" :item="item">
                    <slot name="action-prepend" :item="item"></slot>
                    <!-- !item.isRead -->
                    <!-- 已读已经放到外部整体调用 不需要在右侧显示确认已读按钮 -->
                    <VbenIconButton
                      v-if="false"
                      size="xs"
                      variant="ghost"
                      class="h-6 px-2"
                      :tooltip="$t('common.confirm')"
                      @click.stop="emit('read', item)"
                    >
                      <CircleCheckBig class="size-4" />
                    </VbenIconButton>
                    <!-- 后端没有删除 只有已读 暂时关闭功能 -->
                    <!-- v-if="item.isRead" -->
                    <VbenIconButton
                      v-if="false"
                      size="xs"
                      variant="ghost"
                      class="h-6 px-2 text-destructive"
                      :tooltip="$t('common.delete')"
                      @click.stop="emit('remove', item)"
                    >
                      <CircleX class="size-4" />
                    </VbenIconButton>
                    <slot name="action-append" :item="item"></slot>
                  </slot>
                </div>
              </slot>
            </li>
          </template>
        </ul>
      </VbenScrollbar>

      <template v-else>
        <div class="flex-center min-h-37.5 w-full text-muted-foreground">
          {{ $t('common.noData') }}
        </div>
      </template>

      <!-- 后端没有清空功能 -->
      <div
        class="flex items-center justify-between border-t border-border px-4 py-3"
        v-if="false"
      >
        <VbenButton
          :disabled="notifications.length <= 0"
          size="sm"
          variant="ghost"
          @click="handleClear"
        >
          {{ $t('ui.widgets.clearNotifications') }}
        </VbenButton>
        <VbenButton size="sm" @click="handleViewAll">
          {{ $t('ui.widgets.viewAll') }}
        </VbenButton>
      </div>
    </div>
  </VbenPopover>
</template>

<style scoped>
:deep(.bell-button) {
  &:hover {
    svg {
      animation: bell-ring 1s both;
    }
  }
}

@keyframes bell-ring {
  0%,
  100% {
    transform-origin: top;
  }

  15% {
    transform: rotateZ(10deg);
  }

  30% {
    transform: rotateZ(-10deg);
  }

  45% {
    transform: rotateZ(5deg);
  }

  60% {
    transform: rotateZ(-5deg);
  }

  75% {
    transform: rotateZ(2deg);
  }
}
</style>
