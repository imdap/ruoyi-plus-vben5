<script lang="ts" setup>
import type { ConfigProviderProps } from 'antdv-next';

import { computed } from 'vue';

import { useAntdDesignTokens } from '@vben/hooks';
import { preferences, usePreferences } from '@vben/preferences';

import { App, ConfigProvider, Spin, theme } from 'antdv-next';
import { storeToRefs } from 'pinia';

import { antdLocale } from '#/locales';

import { waveConfigs } from './components/global/button-wave';
import { useGlobalLoadingStore } from './store/loading';
import { PopupContext } from './utils/context';

defineOptions({ name: 'App' });

const { isDark } = usePreferences();
const { tokens } = useAntdDesignTokens();

const tokenTheme = computed(() => {
  const algorithm = isDark.value
    ? [theme.darkAlgorithm]
    : [theme.defaultAlgorithm];

  // antd 紧凑模式算法
  if (preferences.app.compact) {
    algorithm.push(theme.compactAlgorithm);
  }

  return {
    algorithm,
    token: tokens,
  };
});

// 按钮水波纹样式配置
const waveConfig = computed(() => {
  const { buttonWaveMode } = preferences.theme;
  const found = waveConfigs.find((item) => item.name === buttonWaveMode);
  return found ? found.wave : {};
});

const otherProps = computed<
  Omit<ConfigProviderProps, 'locale' | 'theme' | 'wave'>
>(() => {
  // 目前不生效?
  return {
    modal: { mask: { blur: false } },
    drawer: { mask: { blur: false } },
  };
});

const loadingStore = useGlobalLoadingStore();
const { globalLoading } = storeToRefs(loadingStore);
</script>

<template>
  <ConfigProvider
    :locale="antdLocale"
    :theme="tokenTheme"
    :wave="waveConfig"
    v-bind="otherProps"
  >
    <App :message="{ maxCount: 1 }">
      <RouterView />
      <PopupContext />
      <!-- 全局loading遮罩 -->
      <Spin
        :fullscreen="true"
        :spinning="globalLoading"
        :delay="300"
        size="large"
      />
    </App>
  </ConfigProvider>
</template>
