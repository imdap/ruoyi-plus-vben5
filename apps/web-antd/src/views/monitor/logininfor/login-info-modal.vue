<script setup lang="tsx">
import type { DescriptionsProps } from 'antdv-next';

import type { LoginLog } from '#/api/monitor/logininfo/model';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';

import { Descriptions } from 'antdv-next';

import { renderBrowserIcon, renderDict, renderOsIcon } from '#/utils/render';

const loginInfo = ref<LoginLog>();
const [BasicModal, modalApi] = useVbenModal({
  onOpenChange: (isOpen) => {
    if (!isOpen) {
      return null;
    }
    const record = modalApi.getData() as LoginLog;
    loginInfo.value = record;
  },
  onClosed() {
    loginInfo.value = undefined;
  },
});

const items = computed<DescriptionsProps['items']>(() => {
  if (!loginInfo.value) {
    return [];
  }
  const data = loginInfo.value;
  /**
   *  Windows 10 or Windows Server 2016 太长了 分割一下 详情依旧能看到详细的
   */
  let os = data.os;
  if (os) {
    const split = os.split(' or ');
    if (split.length === 2) {
      os = split[0]!;
    }
  }
  return [
    {
      label: '登录状态',
      content: renderDict(data.status, DictEnum.SYS_COMMON_STATUS),
    },
    {
      label: '登录平台',
      content: data.clientKey?.toLowerCase(),
    },
    {
      label: '账号信息',
      content: `账号: ${data.userName} / ${data.ipaddr} / ${data.loginLocation}`,
    },
    {
      label: '登录时间',
      content: data.loginTime,
    },
    {
      label: '登录信息',
      content: (
        <span
          class={{
            'font-semibold': true,
            'text-red-500': data.status !== '0',
          }}
        >
          {data.msg}
        </span>
      ),
    },
    {
      label: '登录设备',
      content: (
        <div class="flex items-center justify-center gap-[6px]">
          {renderOsIcon(data.os, 'shrink-0')}
          {os}
        </div>
      ),
    },
    {
      label: '浏览器',
      content: (
        <div class="flex items-center justify-center gap-[6px]">
          {renderBrowserIcon(data.browser, 'shrink-0')}
          {data.browser}
        </div>
      ),
    },
  ];
});
</script>

<template>
  <BasicModal
    :footer="false"
    :fullscreen-button="false"
    class="w-[550px]"
    title="登录日志"
  >
    <Descriptions
      v-if="loginInfo"
      :column="1"
      :items="items"
      bordered
      size="small"
    />
  </BasicModal>
</template>
