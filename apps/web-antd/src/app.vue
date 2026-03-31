<script lang="ts" setup>
import type { ConfigProviderProps } from 'antdv-next';

import { computed } from 'vue';

import { useAntdDesignTokens } from '@vben/hooks';
import { preferences, usePreferences } from '@vben/preferences';

import { App, ConfigProvider, theme } from 'antdv-next';

import { antdLocale } from '#/locales';

import { waveConfigs } from './components/global/button-wave';
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
    </App>
  </ConfigProvider>
</template>
