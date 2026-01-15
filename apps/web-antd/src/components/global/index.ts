import type { App } from 'vue';

import { Button as AButton } from 'antdv-next';

import { GhostButton } from './button';

/**
 * 全局组件注册
 */
export function setupGlobalComponent(app: App) {
  app.component('AButton', AButton);
  // 表格操作列专用按钮
  app.component('GhostButton', GhostButton);
}

export { default as ApiSwitch } from './api-switch.vue';
