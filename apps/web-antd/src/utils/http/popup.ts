import type { AlovaMeta } from '#/../types/alova';

import { $t } from '#/locales';

interface ShowMessageOptions {
  meta?: AlovaMeta;
  message: string;
  type: 'error' | 'success';
}

export function showAntdMessage(options: ShowMessageOptions) {
  const { meta = {}, message, type } = options;

  if (meta.showErrorMessage === 'message' && type === 'error') {
    window.message[type](message);
  }
  if (meta.showSuccessMessage === 'message' && type === 'success') {
    window.message[type](message);
  }

  if (meta.showErrorMessage === 'modal' && type === 'error') {
    window.modal.error({
      content: message,
      title: $t('http.errorTip'),
      centered: true,
      okButtonProps: { danger: true },
    });
  }
  if (meta.showSuccessMessage === 'modal' && type === 'success') {
    window.modal.success({
      content: message,
      title: $t('http.successTip'),
      centered: true,
    });
  }

  if (meta.showErrorMessage === 'notification' && type === 'error') {
    window.notification.error({
      description: message,
      title: $t('http.errorTip'),
    });
  }
  if (meta.showSuccessMessage === 'notification' && type === 'success') {
    window.notification.success({
      description: message,
      title: $t('http.successTip'),
    });
  }
}
