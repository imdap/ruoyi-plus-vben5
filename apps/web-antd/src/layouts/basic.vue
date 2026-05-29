<script lang="ts" setup>
import { computed, h, watch } from 'vue';
import { useRouter } from 'vue-router';

import { AuthenticationLoginExpiredModal } from '@vben/common-ui';
import { VBEN_DOC_URL, VBEN_GITHUB_URL } from '@vben/constants';
import { useWatermark } from '@vben/hooks';
import { BookOpenText, CircleHelp, GiteeIcon } from '@vben/icons';
import {
  BasicLayout,
  LockScreen,
  Notification,
  UserDropdown,
} from '@vben/layouts';
import { preferences, usePreferences } from '@vben/preferences';
import { useAccessStore, useUserStore } from '@vben/stores';
import { openWindow } from '@vben/utils';

import { GithubOutlined, UserOutlined } from '@antdv-next/icons';
import { Badge } from 'antdv-next';

import { $t } from '#/locales';
import { resetRoutes } from '#/router';
import { useAuthStore } from '#/store';
import { useVersionUpdate } from '#/utils/check-update';
import LoginForm from '#/views/_core/authentication/login.vue';

import { useNotification } from './hooks/notification';

const userStore = useUserStore();
const authStore = useAuthStore();
const accessStore = useAccessStore();
const router = useRouter();
const { destroyWatermark, updateWatermark } = useWatermark();
const { isDark } = usePreferences();

const menus = computed(() => {
  const defaultMenus = [
    {
      handler: () => {
        openWindow(VBEN_DOC_URL, {
          target: '_blank',
        });
      },
      icon: BookOpenText,
      text: $t('ui.widgets.document'),
    },
    {
      handler: () => {
        router.push('/profile');
      },
      icon: UserOutlined,
      text: $t('ui.widgets.profile'),
    },
    {
      handler: () => {
        openWindow('https://gitee.com/dapppp/ruoyi-plus-vben5', {
          target: '_blank',
        });
      },
      icon: () => h(GiteeIcon, { class: 'text-red-800' }),
      text: 'Gitee项目地址',
    },
    {
      handler: () => {
        openWindow(VBEN_GITHUB_URL, {
          target: '_blank',
        });
      },
      icon: GithubOutlined,
      text: 'Vben官方地址',
    },
    {
      handler: () => {
        openWindow(`${VBEN_GITHUB_URL}/issues`, {
          target: '_blank',
        });
      },
      icon: CircleHelp,
      text: $t('ui.widgets.qa'),
    },
  ];
  return defaultMenus;
});

const avatar = computed(() => {
  return userStore.userInfo?.avatar || preferences.app.defaultAvatar;
});

async function handleLogout() {
  /**
   * 主动登出不需要带跳转地址
   */
  await authStore.logout(false);
  resetRoutes();
}

const {
  notifyStore,
  notificationTabList,
  currentTab,
  handleViewAll,
  handleNotificationClick,
  isPreviewOpen,
  NoticePreviewModal,
} = useNotification();

watch(
  () => ({
    enable: preferences.app.watermark,
    content: preferences.app.watermarkContent,
    isDark: isDark.value,
  }),
  async ({ enable, content, isDark: isDarkValue }) => {
    if (enable) {
      const watermarkColor = isDarkValue
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(0, 0, 0, 0.12)';

      await updateWatermark({
        advancedStyle: {
          colorStops: [
            {
              color: watermarkColor,
              offset: 0,
            },
            {
              color: watermarkColor,
              offset: 1,
            },
          ],
          type: 'linear',
        },
        content:
          content ||
          `${userStore.userInfo?.username} - ${userStore.userInfo?.realName}`,
      });
    } else {
      destroyWatermark();
    }
  },
  {
    immediate: true,
  },
);
// 检测版本更新
useVersionUpdate();
</script>

<template>
  <BasicLayout @clear-preferences-and-logout="handleLogout">
    <template #user-dropdown>
      <UserDropdown
        :avatar
        :menus
        :text="userStore.userInfo?.realName"
        :description="userStore.userInfo?.email || '未设置邮箱'"
        :tag-text="userStore.userInfo?.username"
        @logout="handleLogout"
        @clear-preferences-and-logout="handleLogout"
      />
    </template>
    <template #notification>
      <Badge
        :count="notifyStore.unreadNotifications.length"
        :offset="[-5, 6]"
        size="small"
      >
        <Notification
          :dot="false"
          :keep-open="isPreviewOpen"
          :notifications="notifyStore.notificationList"
          :tab-list="notificationTabList"
          v-model:current-tab="currentTab"
          @click="handleNotificationClick"
          @clear="notifyStore.clearAllMessage"
          @make-all="notifyStore.setAllRead"
          @read="notifyStore.setRead"
          @view-all="handleViewAll"
          @remove="notifyStore.removeMessage"
        />
      </Badge>

      <NoticePreviewModal />
    </template>
    <template #extra>
      <AuthenticationLoginExpiredModal
        v-model:open="accessStore.loginExpired"
        :avatar
      >
        <LoginForm />
      </AuthenticationLoginExpiredModal>
    </template>
    <template #lock-screen>
      <LockScreen :avatar @to-login="handleLogout" />
    </template>
  </BasicLayout>
</template>
