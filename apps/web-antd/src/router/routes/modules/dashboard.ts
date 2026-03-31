import type { RouteRecordRaw } from 'vue-router';

import { IFrameView } from '@vben/layouts';

import { $t } from '#/locales';

const {
  version,
  // vite inject-metadata 插件注入的全局变量
} = __VBEN_ADMIN_METADATA__ || {};

const routes: RouteRecordRaw[] = [
  {
    meta: {
      order: -1,
      title: $t('page.dashboard.title'),
    },
    name: 'Dashboard',
    path: '/dashboard',
    redirect: '/analytics',
    children: [
      {
        name: 'Analytics',
        path: '/analytics',
        component: () => import('#/views/dashboard/analytics/index.vue'),
        meta: {
          affixTab: true,
          title: $t('page.dashboard.analytics'),
        },
      },
      {
        name: 'Workspace',
        path: '/workspace',
        component: () => import('#/views/dashboard/workspace/index.vue'),
        meta: {
          title: $t('page.dashboard.workspace'),
        },
      },
      {
        name: 'VbenDocument',
        path: '/vben-admin/document',
        component: IFrameView,
        meta: {
          icon: 'lucide:book-open-text',
          iframeSrc: 'https://dapdap.top',
          keepAlive: true,
          title: $t('demos.vben.document'),
        },
      },
      {
        name: 'V5UpdateLog',
        path: '/changelog',
        component: () => import('#/views/演示使用自行删除/changelog/index.vue'),
        meta: {
          icon: 'lucide:book-open-text',
          keepAlive: true,
          title: '更新记录',
          badge: `当前: ${version}`,
          badgeVariants: 'bg-primary',
        },
      },
    ],
  },
  {
    component: () => import('#/views/_core/about/index.vue'),
    meta: {
      icon: 'lucide:copyright',
      order: 9999,
      title: $t('demos.vben.about'),
    },
    name: 'About',
    path: '/vben-admin/about',
  },
];

export default routes;
