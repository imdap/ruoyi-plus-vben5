<script setup lang="ts">
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { LoginLog } from '#/api/monitor/logininfo/model';

import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { Popconfirm, Space } from 'antdv-next';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  loginInfoClean,
  loginInfoExport,
  loginInfoList,
  loginInfoRemove,
  userUnlock,
} from '#/api/monitor/logininfo';
import { useBlobExport } from '#/utils/file/export';
import { confirmDeleteModal } from '#/utils/modal';

import { columns, querySchema } from './data';
import loginInfoModal from './login-info-modal.vue';

const formOptions: VbenFormProps = {
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  schema: querySchema(),
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  // 日期选择格式化
  fieldMappingTime: [
    [
      'dateTime',
      ['params[beginTime]', 'params[endTime]'],
      ['YYYY-MM-DD 00:00:00', 'YYYY-MM-DD 23:59:59'],
    ],
  ],
};

const gridOptions: VxeGridProps = {
  checkboxConfig: {
    // 高亮
    highlight: true,
    // 翻页时保留选中状态
    reserve: true,
    // 点击行选中
    trigger: 'row',
  },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        return await loginInfoList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  rowConfig: {
    keyField: 'infoId',
  },
  id: 'monitor-logininfo-index',
};

const canUnlock = ref(false);
const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
  gridEvents: {
    checkboxChange: (e) => {
      const records = e.$grid?.getCheckboxRecords?.() ?? [];
      canUnlock.value = records.length === 1 && records[0]!.status === '1';
    },
  },
});

const [LoginInfoModal, modalApi] = useVbenModal({
  connectedComponent: loginInfoModal,
});

function handlePreview(record: LoginLog) {
  modalApi.setData(record);
  modalApi.open();
}

function handleClear() {
  confirmDeleteModal({
    onValidated: async () => {
      await loginInfoClean();
      await tableApi.reload();
    },
  });
}

async function handleDelete(row: LoginLog) {
  await loginInfoRemove([row.infoId]);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: LoginLog) => row.infoId);
  window.modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await loginInfoRemove(ids);
      await tableApi.query();
    },
  });
}

async function handleUnlock() {
  const records = tableApi.grid.getCheckboxRecords();
  if (records.length !== 1) {
    return;
  }
  const { userName } = records[0];
  await userUnlock(userName);
  await tableApi.query();
  canUnlock.value = false;
  tableApi.grid.clearCheckboxRow();
}

const { exportBlob, exportLoading, buildExportFileName } =
  useBlobExport(loginInfoExport);
async function handleExport() {
  // 构建表单请求参数
  const formValues = await tableApi.formApi.getValues();
  // 文件名
  const fileName = buildExportFileName('登录日志');
  exportBlob({ data: formValues, fileName });
}
</script>

<template>
  <Page auto-content-height>
    <BasicTable table-title="登录日志列表">
      <template #toolbar-tools>
        <Space>
          <a-button
            v-access:code="['monitor:logininfor:remove']"
            @click="handleClear"
          >
            {{ $t('pages.common.clear') }}
          </a-button>
          <a-button
            v-access:code="['monitor:logininfor:export']"
            :loading="exportLoading"
            :disabled="exportLoading"
            @click="handleExport"
          >
            {{ $t('pages.common.export') }}
          </a-button>
          <a-button
            :disabled="!vxeCheckboxChecked(tableApi)"
            danger
            type="primary"
            v-access:code="['monitor:logininfor:remove']"
            @click="handleMultiDelete"
          >
            {{ $t('pages.common.delete') }}
          </a-button>
          <a-button
            :disabled="!canUnlock"
            type="primary"
            v-access:code="['monitor:logininfor:unlock']"
            @click="handleUnlock"
          >
            {{ $t('pages.common.unlock') }}
          </a-button>
        </Space>
      </template>
      <template #action="{ row }">
        <Space>
          <action-button @click.stop="handlePreview(row)">
            {{ $t('pages.common.info') }}
          </action-button>
          <Popconfirm
            placement="left"
            title="确认删除?"
            @confirm="() => handleDelete(row)"
          >
            <action-button
              danger
              v-access:code="['monitor:logininfor:remove']"
              @click.stop=""
            >
              {{ $t('pages.common.delete') }}
            </action-button>
          </Popconfirm>
        </Space>
      </template>
    </BasicTable>
    <LoginInfoModal />
  </Page>
</template>
