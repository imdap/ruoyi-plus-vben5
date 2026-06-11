const createChunkMatcher = (patterns: string[]) => {
  return (id: string) => {
    const normalizedId = id.replaceAll('\\', '/');
    return patterns.some((pattern) => normalizedId.includes(pattern));
  };
};

const matchAntdvNextIconsChunk = createChunkMatcher([
  '/node_modules/.pnpm/@ant-design+icons-svg@',
  '/node_modules/.pnpm/@antdv-next+icons@',
  '/node_modules/@ant-design/icons-svg/',
  '/node_modules/@antdv-next/icons/',
]);
const matchAntdvNextChunk = createChunkMatcher(['antdv-next']);
const matchFrameworkChunk = createChunkMatcher([
  '/node_modules/.pnpm/@vue+',
  '/node_modules/.pnpm/@vueuse+',
  '/node_modules/.pnpm/pinia@',
  '/node_modules/.pnpm/vue-router@',
  '/node_modules/.pnpm/vue@',
  '/node_modules/@vue/',
  '/node_modules/@vueuse/',
  '/node_modules/pinia/',
  '/node_modules/vue-router/',
  '/node_modules/vue/',
]);
const matchVbenCoreChunk = createChunkMatcher([
  '/packages/@core/base/',
  '/packages/@core/composables/',
  '/packages/constants/',
  '/packages/types/',
  '/packages/utils/',
  '/node_modules/@vben-core/composables/',
  '/node_modules/@vben-core/icons/',
  '/node_modules/@vben-core/shared/',
  '/node_modules/@vben-core/typings/',
  '/node_modules/@vben/constants/',
  '/node_modules/@vben/types/',
  '/node_modules/@vben/utils/',
]);
const matchVbenUiCoreChunk = createChunkMatcher([
  '/packages/@core/ui-kit/',
  '/node_modules/@vben-core/form-ui/',
  '/node_modules/@vben-core/layout-ui/',
  '/node_modules/@vben-core/menu-ui/',
  '/node_modules/@vben-core/popup-ui/',
  '/node_modules/@vben-core/shadcn-ui/',
  '/node_modules/@vben-core/tabs-ui/',
]);
const matchVbenCommonUiAuthChunk = createChunkMatcher([
  '/packages/effects/common-ui/src/ui/authentication/',
  '/packages/effects/common-ui/src/ui/fallback/',
  '/node_modules/@vben/common-ui/src/ui/authentication/',
  '/node_modules/@vben/common-ui/src/ui/fallback/',
]);
const matchVbenCommonUiDashboardChunk = createChunkMatcher([
  '/packages/effects/common-ui/src/ui/about/',
  '/packages/effects/common-ui/src/ui/dashboard/',
  '/packages/effects/common-ui/src/ui/profile/',
  '/node_modules/@vben/common-ui/src/ui/about/',
  '/node_modules/@vben/common-ui/src/ui/dashboard/',
  '/node_modules/@vben/common-ui/src/ui/profile/',
]);
const matchVbenCommonUiCaptchaChunk = createChunkMatcher([
  '/packages/effects/common-ui/src/components/captcha/',
  '/node_modules/@vben/common-ui/src/components/captcha/',
]);
const matchVbenCommonUiEditorChunk = createChunkMatcher([
  '/packages/effects/common-ui/src/components/code-mirror/',
  '/packages/effects/common-ui/src/components/json-preview/',
  '/packages/effects/common-ui/src/components/json-viewer/',
  '/packages/effects/common-ui/src/components/markdown/',
  '/packages/effects/common-ui/src/components/tippy/',
  '/node_modules/@vben/common-ui/es/tippy',
  '/node_modules/@vben/common-ui/src/components/code-mirror/',
  '/node_modules/@vben/common-ui/src/components/json-preview/',
  '/node_modules/@vben/common-ui/src/components/json-viewer/',
  '/node_modules/@vben/common-ui/src/components/markdown/',
  '/node_modules/@vben/common-ui/src/components/tippy/',
]);
const matchVbenCommonUiWidgetsChunk = createChunkMatcher([
  '/packages/effects/common-ui/src/components/',
  '/packages/effects/common-ui/src/index.ts',
  '/packages/effects/common-ui/src/ui/index.ts',
  '/node_modules/@vben/common-ui/es/loading',
  '/node_modules/@vben/common-ui/src/components/',
  '/node_modules/@vben/common-ui/src/index.ts',
  '/node_modules/@vben/common-ui/src/ui/index.ts',
]);
const matchVbenIconsChunk = createChunkMatcher([
  '/packages/icons/',
  '/node_modules/@vben/icons/',
]);
const matchVbenStylesChunk = createChunkMatcher([
  '/packages/styles/',
  '/node_modules/@vben/styles/',
]);
const matchVbenLayoutChunk = createChunkMatcher([
  '/packages/effects/access/',
  '/packages/effects/hooks/',
  '/packages/effects/layouts/',
  '/node_modules/@vben/access/',
  '/node_modules/@vben/hooks/',
  '/node_modules/@vben/layouts/',
]);
const matchVbenStateChunk = createChunkMatcher([
  '/packages/@core/preferences/',
  '/packages/locales/',
  '/packages/preferences/',
  '/packages/stores/',
  '/node_modules/@vben-core/preferences/',
  '/node_modules/@vben/locales/',
  '/node_modules/@vben/preferences/',
  '/node_modules/@vben/stores/',
]);
const matchVbenRequestChunk = createChunkMatcher([
  '/packages/effects/request/',
  '/node_modules/@vben/request/',
]);
const matchUiVendorChunk = createChunkMatcher([
  '/node_modules/.pnpm/@floating-ui+',
  '/node_modules/.pnpm/@iconify+',
  '/node_modules/.pnpm/@vueuse+motion',
  '/node_modules/.pnpm/lucide-vue-next@',
  '/node_modules/.pnpm/radix-vue@',
  '/node_modules/.pnpm/tippy.js@',
  '/node_modules/@floating-ui/',
  '/node_modules/@iconify/',
  '/node_modules/@vueuse/motion/',
  '/node_modules/lucide-vue-next/',
  '/node_modules/radix-vue/',
  '/node_modules/tippy.js/',
]);
const matchUtilsVendorChunk = createChunkMatcher([
  '/node_modules/.pnpm/@intlify+',
  '/node_modules/.pnpm/async-validator@',
  '/node_modules/.pnpm/axios@',
  '/node_modules/.pnpm/dayjs@',
  '/node_modules/.pnpm/lodash-es@',
  '/node_modules/.pnpm/mitt@',
  '/node_modules/.pnpm/nprogress@',
  '/node_modules/.pnpm/qs@',
  '/node_modules/.pnpm/uuid@',
  '/node_modules/.pnpm/zod@',
  '/node_modules/@intlify/',
  '/node_modules/async-validator/',
  '/node_modules/axios/',
  '/node_modules/dayjs/',
  '/node_modules/lodash-es/',
  '/node_modules/mitt/',
  '/node_modules/nprogress/',
  '/node_modules/qs/',
  '/node_modules/uuid/',
  '/node_modules/zod/',
]);
const matchAppAuthChunk = createChunkMatcher([
  '/apps/web-antd/src/api/core/auth',
  '/apps/web-antd/src/api/core/captcha',
  '/apps/web-antd/src/views/_core/authentication/',
  '/apps/web-antd/src/views/_core/social-callback/',
]);
const matchAppLocaleChunk = createChunkMatcher(['/apps/web-antd/src/locales/']);
const matchAppCoreChunk = createChunkMatcher([
  '/apps/web-antd/src/adapter/',
  '/apps/web-antd/src/api/core/',
  '/apps/web-antd/src/bootstrap.ts',
  '/apps/web-antd/src/components/global/',
  '/apps/web-antd/src/layouts/',
  '/apps/web-antd/src/router/',
  '/apps/web-antd/src/store/',
  '/apps/web-antd/src/utils/',
  '/apps/web-antd/src/views/_core/',
]);
const matchAppViewsChunk = createChunkMatcher(['/apps/web-antd/src/views/']);

function createApplicationCodeSplitting() {
  return {
    groups: [
      {
        name: 'antdv-icons',
        priority: 41,
        test: matchAntdvNextIconsChunk,
      },
      {
        name: 'antdv-next',
        priority: 40,
        test: matchAntdvNextChunk,
      },
      {
        name: 'framework',
        priority: 30,
        test: matchFrameworkChunk,
      },
      {
        name: 'vben-core',
        priority: 24,
        test: matchVbenCoreChunk,
      },
      {
        name: 'vben-ui-core',
        priority: 23,
        test: matchVbenUiCoreChunk,
      },
      {
        name: 'vben-common-ui-auth',
        priority: 22,
        test: matchVbenCommonUiAuthChunk,
      },
      {
        name: 'vben-common-ui-dashboard',
        priority: 21,
        test: matchVbenCommonUiDashboardChunk,
      },
      {
        name: 'vben-common-ui-captcha',
        priority: 20,
        test: matchVbenCommonUiCaptchaChunk,
      },
      {
        name: 'vben-common-ui-editor',
        priority: 19,
        test: matchVbenCommonUiEditorChunk,
      },
      {
        name: 'vben-common-ui-widgets',
        priority: 18,
        test: matchVbenCommonUiWidgetsChunk,
      },
      {
        name: 'vben-icons',
        priority: 17,
        test: matchVbenIconsChunk,
      },
      {
        name: 'vben-styles',
        priority: 16,
        test: matchVbenStylesChunk,
      },
      {
        name: 'vben-layout',
        priority: 15,
        test: matchVbenLayoutChunk,
      },
      {
        name: 'vben-state',
        priority: 14,
        test: matchVbenStateChunk,
      },
      {
        name: 'vben-request',
        priority: 13,
        test: matchVbenRequestChunk,
      },
      {
        name: 'ui-vendor',
        priority: 10,
        test: matchUiVendorChunk,
      },
      {
        name: 'utils-vendor',
        priority: 5,
        test: matchUtilsVendorChunk,
      },
      {
        name: 'app-auth',
        priority: 4,
        test: matchAppAuthChunk,
      },
      {
        name: 'app-locales',
        priority: 3,
        test: matchAppLocaleChunk,
      },
      {
        name: 'app-core',
        priority: 2,
        test: matchAppCoreChunk,
      },
      {
        name: 'app-views',
        priority: 1,
        test: matchAppViewsChunk,
      },
    ],
  };
}

export { createApplicationCodeSplitting };
