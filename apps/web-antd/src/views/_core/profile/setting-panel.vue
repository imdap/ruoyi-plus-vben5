<script setup lang="ts">
import { TabPane, Tabs } from 'antdv-next';

import AccountBind from './components/account-bind.vue';
import BaseSetting from './components/base-setting.vue';
import OnlineDevice from './components/online-device.vue';
import SecureSetting from './components/secure-setting.vue';

const settingList = [
  {
    component: BaseSetting,
    key: '1',
    name: '基本设置',
  },
  {
    component: SecureSetting,
    key: '2',
    name: '安全设置',
  },
  {
    component: AccountBind,
    key: '3',
    name: '账号绑定',
  },
  {
    component: OnlineDevice,
    key: '4',
    name: '在线设备',
  },
];
</script>

<template>
  <Tabs
    class="rounded-[var(--radius)] bg-background lg:flex-1"
    :classes="{ header: 'px-4' }"
  >
    <TabPane v-for="item in settingList" :key="item.key" :tab="item.name">
      <component :is="item.component" v-bind="$attrs" />
    </TabPane>
  </Tabs>
</template>
