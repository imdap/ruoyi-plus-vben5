import { defineComponent } from 'vue';

import { App, message, Modal, notification } from 'antdv-next';

/**
 * 初始化全局弹窗方法(静态API作为fallback)
 * 在app.mount之前调用, 防止路由守卫等早期逻辑访问window.message时报错
 * app.mount之后PopupContext会用带上下文的实例覆盖
 */
export function initPopupContext() {
  if (!window.message) {
    window.message = message;
  }
  if (!window.modal) {
    window.modal = Modal;
  }
  if (!window.notification) {
    window.notification = notification;
  }
}

/**
 * 弹窗上下文
 * 提供 message, modal, notification 方法
 * @see https://ant.design/components/app-cn#global-scene-redux
 */
export const PopupContext = defineComponent({
  name: 'PopupContext',
  render() {
    const staticFunction = App.useApp();
    window.message = staticFunction.message;
    window.modal = staticFunction.modal;
    window.notification = staticFunction.notification;

    return null;
  },
});
