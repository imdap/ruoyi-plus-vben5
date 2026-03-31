import type { AxiosRequestConfig } from 'axios';

import { $t } from '@vben/locales';

import { showAntdMessage } from './popup';

export function checkStatus(
  status: number,
  msg: string,
  meta: AxiosRequestConfig,
): void {
  let errorMessage = msg;

  switch (status) {
    case 400: {
      errorMessage = $t('ui.fallback.http.badRequest');
      break;
    }
    case 401: {
      errorMessage = $t('ui.fallback.http.unauthorized');
      break;
    }
    case 403: {
      errorMessage = $t('ui.fallback.http.forbidden');
      break;
    }
    case 404: {
      errorMessage = $t('ui.fallback.http.notFound');
      break;
    }
    case 408: {
      errorMessage = $t('ui.fallback.http.requestTimeout');
      break;
    }
    default: {
      errorMessage = $t('ui.fallback.http.internalServerError');
    }
  }

  if (
    errorMessage &&
    meta &&
    !['none', undefined].includes(meta.errorMessageMode)
  ) {
    showAntdMessage({
      meta,
      message: errorMessage,
      type: 'error',
    });
  }
}
