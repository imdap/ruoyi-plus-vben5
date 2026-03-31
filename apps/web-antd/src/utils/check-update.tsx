import { onMounted } from 'vue';

import { preferences } from '@vben/preferences';

import { Button, Space } from 'antdv-next';
import { createVersionPolling } from 'version-polling';

import { $t } from '#/locales';

export function useVersionUpdate() {
  onMounted(() => {
    // 可能会有用dev打包的需求 所以这里不判断环境变量
    if (
      location.hostname === 'localhost' ||
      location.hostname === '127.0.0.1'
    ) {
      return null;
    }

    createVersionPolling({
      // 默认一分钟
      pollingInterval: preferences.app.checkUpdatesInterval * 60 * 1000,
      silent: !preferences.app.enableCheckUpdates,
      htmlFileUrl: location.origin + import.meta.env.VITE_BASE,
      onUpdate: (self) => {
        window.notification.info({
          title: $t('ui.widgets.checkUpdatesTitle'),
          closable: false,
          // placement: 'bottomRight',
          description: (
            <div
              class="mt-3 flex justify-between text-sm"
              style={{ color: 'var(--ant-color-text-2)' }}
            >
              <span class="mr-2 font-semibold">
                {$t('ui.widgets.checkUpdatesDescription')}
              </span>
              <Space>
                <Button
                  onClick={() => {
                    window.notification.destroy();
                  }}
                  size="small"
                >
                  {$t('common.cancel')}
                </Button>
                <Button
                  onClick={() => {
                    self.onRefresh();
                  }}
                  size="small"
                  type="primary"
                >
                  {$t('common.refresh')}
                </Button>
              </Space>
            </div>
          ),
          duration: 0,
        });
      },
    });
  });
}
