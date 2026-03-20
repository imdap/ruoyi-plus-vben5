import type { AxiosRequestConfig } from 'axios';

import { message, Modal, notification } from 'antdv-next';

import { $t } from '#/locales';

interface ShowMessageOptions {
  meta?: AxiosRequestConfig;
  message: string;
  type: 'error' | 'success';
}

/**
 * 统一的Antd提示函数，修复全局对象未定义的问题，增加兜底和参数校验
 * @param options 提示配置
 */
export function showAntdMessage(options: ShowMessageOptions) {
  // 1. 解构参数并兜底，避免undefined
  const { 
    meta = {}, 
    message: msg = '', 
    type 
  } = options;

  // 2. 空消息直接返回，避免无效提示
  if (!msg) return;

  // 3. 根据类型获取对应的提示模式（成功用successMessageMode，错误用errorMessageMode）
  const mode = type === 'success' 
    ? meta.successMessageMode || 'message' 
    : meta.errorMessageMode || 'message';

  // 4. 兜底Antd组件实例，避免访问undefined
  const messageApi = window.message || message;
  const modalApi = window.modal || Modal;
  const notificationApi = window.notification || notification;

  // 5. 按模式显示提示，简化逻辑
  switch (mode) {
    case 'message': {
      messageApi[type](msg);
      break;
    }
    case 'modal': {
      modalApi[type]({
        content: msg,
        title: $t(`http.${type}Tip`),
        centered: true,
        ...(type === 'error' ? { okButtonProps: { danger: true } } : {}),
      });
      break;
    }
    case 'notification': {
      notificationApi[type]({
        description: msg,
        title: $t(`http.${type}Tip`),
      });
      break;
    }
    case 'none': // 不显示提示，直接返回
    default: {
      break;
    }
  }
}
