<script setup lang="ts">
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page, useVbenModal } from '@vben/common-ui';

import { Space } from 'antdv-next';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { sseList } from './api';
import sendMsgModal from './send-msg-modal.vue';

const gridOptions: VxeGridProps = {
  columns: [
    {
      title: '用户ID',
      field: 'userId',
    },
    {
      title: '用户账号',
      field: 'userName',
    },
    {
      title: '用户昵称',
      field: 'nickName',
    },
    {
      title: '用户部门',
      field: 'deptName',
    },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
      resizable: false,
      width: 'auto',
    },
  ],
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async () => {
        const list = await sseList();
        return {
          rows: list,
        };
      },
    },
  },
  rowConfig: {
    isHover: false,
    keyField: 'userId',
    height: 48,
  },
  id: 'sse-index',
};

const [BasicTable] = useVbenVxeGrid({
  gridOptions,
});

const [SendMsgModal, modalApi] = useVbenModal({
  connectedComponent: sendMsgModal,
});

function handleSendAll() {
  modalApi.setData({});
  modalApi.open();
}

function handleSendSingle(userId: string) {
  modalApi.setData({ userId });
  modalApi.open();
}
</script>

<template>
  <Page
    :auto-content-height="true"
    description="这这里可以进行[Server-sent events]测试 非官方功能"
    title="SSE测试"
  >
    <BasicTable>
      <template #toolbar-actions>
        <span class="pl-[7px] text-[16px]">在线用户列表</span>
      </template>
      <template #toolbar-tools>
        <Space>
          <a-button @click="handleSendAll">发送全体消息</a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <action-button @click="handleSendSingle(row.userId)">
          发送消息
        </action-button>
      </template>
    </BasicTable>
    <SendMsgModal />
  </Page>
</template>
