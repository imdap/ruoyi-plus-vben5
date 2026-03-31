import type { loginInfoExport } from '#/api/monitor/logininfo';

import { ref } from 'vue';

import { useRequest } from 'alova/client';
import { Button } from 'antdv-next';
import dayjs from 'dayjs';

import { $t } from '#/locales';

import { downloadByData } from './download';

// TODO: 这里的泛型实在难写 且基本都是统一按格式
export type ExportBlobApi = typeof loginInfoExport;

export interface ExportBlobFuncOptions {
  fileName: string;
  data?: any;
}

export function useBlobExport(api: ExportBlobApi) {
  const exportLoading = ref(false);

  const { send, abort } = useRequest(api, { immediate: false });

  async function exportBlob(options: ExportBlobFuncOptions) {
    const { fileName, data } = options;

    const hide = window.message.loading({
      content: (
        <div class="flex items-center gap-10">
          <span>{$t('common.export.loading')}</span>
          <Button
            color="default"
            onClick={() => {
              abort();
              hide();
              window.message.info($t('common.export.canceled'));
            }}
            size="small"
            variant="outlined"
          >
            {$t('pages.common.cancel')}
          </Button>
        </div>
      ),
      duration: 9999,
    });

    exportLoading.value = true;
    try {
      const blob = await send(data ?? {});
      downloadByData(blob, fileName);
    } catch (error) {
      console.error(error);
    } finally {
      hide();
      exportLoading.value = false;
    }
  }

  /**
   * 构建导出文件名  放在这里的好处是可以做国际化文案
   * @param module 模块名称
   * @returns 导出文件名
   */
  function buildExportFileName(module: string, extension = 'xlsx') {
    return `${module} ${$t('common.export.title')} - ${dayjs().valueOf()}.${extension}`;
  }

  return {
    exportBlob,
    exportLoading,
    buildExportFileName,
  };
}
