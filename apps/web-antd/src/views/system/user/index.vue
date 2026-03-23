<script setup lang="ts">
import type { MenuProps, SwitchProps } from 'antdv-next';

import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';
import type { User } from '#/api/system/user/model';

import { computed, ref } from 'vue';

import { useAccess } from '@vben/access';
import { Page, useVbenDrawer, useVbenModal } from '@vben/common-ui';
import { EnableStatus, SUPERADMIN_USER_ID } from '@vben/constants';
import { $t } from '@vben/locales';
import { preferences } from '@vben/preferences';

import { Avatar, Dropdown, Popconfirm, Space } from 'antdv-next';

import { useVbenVxeGrid, vxeCheckboxChecked } from '#/adapter/vxe-table';
import {
  userExport,
  userList,
  userRemove,
  userStatusChange,
} from '#/api/system/user';
import ApiSwitch from '#/components/global/api-switch.vue';
import { useBlobExport } from '#/utils/file/export';

import { columns, querySchema } from './data';
import DeptTree from './dept-tree.vue';
import userDrawer from './user-drawer.vue';
import userImportModal from './user-import-modal.vue';
import userInfoModal from './user-info-modal.vue';
import userResetPwdModal from './user-reset-pwd-modal.vue';

/**
 * 导入
 */
const [UserImpotModal, userImportModalApi] = useVbenModal({
  connectedComponent: userImportModal,
});

function handleImport() {
  userImportModalApi.open();
}

// 左边部门用
const selectDeptId = ref<string[]>([]);

const formOptions: VbenFormProps = {
  schema: querySchema(),
  commonConfig: {
    labelWidth: 80,
    componentProps: {
      allowClear: true,
    },
  },
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  handleReset: async () => {
    selectDeptId.value = [];

    const { formApi, reload } = tableApi;
    await formApi.resetForm();
    const formValues = formApi.form.values;
    formApi.setLatestSubmissionValues(formValues);
    await reload(formValues);
  },
  // 日期选择格式化
  fieldMappingTime: [
    [
      'createTime',
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
    trigger: 'default',
    checkMethod: ({ row }) => row?.userId !== 1,
  },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues = {}) => {
        // 部门树选择处理
        if (selectDeptId.value.length === 1) {
          formValues.deptId = selectDeptId.value[0];
        } else {
          Reflect.deleteProperty(formValues, 'deptId');
        }

        return await userList({
          pageNum: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  headerCellConfig: {
    height: 44,
  },
  cellConfig: {
    height: 48,
  },
  rowConfig: {
    keyField: 'userId',
  },
  id: 'system-user-index',
};
const [BasicTable, tableApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

const [UserDrawer, userDrawerApi] = useVbenDrawer({
  connectedComponent: userDrawer,
});

function handleAdd() {
  userDrawerApi.setData({});
  userDrawerApi.open();
}

function handleEdit(row: User) {
  userDrawerApi.setData({ id: row.userId });
  userDrawerApi.open();
}

async function handleDelete(row: User) {
  await userRemove([row.userId]);
  await tableApi.query();
}

function handleMultiDelete() {
  const rows = tableApi.grid.getCheckboxRecords();
  const ids = rows.map((row: User) => row.userId);
  window.modal.confirm({
    title: '提示',
    okType: 'danger',
    content: `确认删除选中的${ids.length}条记录吗？`,
    onOk: async () => {
      await userRemove(ids);
      await tableApi.query();
    },
  });
}

const { exportBlob, exportLoading, buildExportFileName } =
  useBlobExport(userExport);
async function handleExport() {
  // 构建表单请求参数
  const formValues = await tableApi.formApi.getValues();
  // 文件名
  const fileName = buildExportFileName('用户信息');
  exportBlob({ data: formValues, fileName });
}

const [UserInfoModal, userInfoModalApi] = useVbenModal({
  connectedComponent: userInfoModal,
});
function handleUserInfo(row: User) {
  userInfoModalApi.setData({ userId: row.userId });
  userInfoModalApi.open();
}

const [UserResetPwdModal, userResetPwdModalApi] = useVbenModal({
  connectedComponent: userResetPwdModal,
});

function handleResetPwd(record: User) {
  userResetPwdModalApi.setData({ record });
  userResetPwdModalApi.open();
}

const { hasAccessByCodes } = useAccess();
const menuItems = computed(() => {
  const items: MenuProps['items'] = [{ key: 'info', label: '用户信息' }];
  if (hasAccessByCodes(['system:user:resetPwd'])) {
    items.push({ key: 'resetPwd', label: '重置密码' });
  }
  return items;
});

function handleMenuClick(key: string, row: any) {
  switch (key) {
    case 'info': {
      handleUserInfo(row);
      break;
    }
    case 'resetPwd': {
      handleResetPwd(row);
      break;
    }
  }
}

async function handleChangeStatus(checked: SwitchProps['checked'], row: User) {
  await userStatusChange({
    userId: row.userId,
    status: checked ? EnableStatus.Enable : EnableStatus.Disable,
  });
}

function handleDeptSelect(keys: string[]) {
  selectDeptId.value = keys;
  tableApi.reload();
}
</script>

<template>
  <Page :auto-content-height="true">
    <div class="flex h-full gap-[8px]">
      <DeptTree
        v-model:select-dept-id="selectDeptId"
        class="w-[260px]"
        @reload="() => tableApi.reload()"
        @select="handleDeptSelect"
      />
      <BasicTable class="flex-1 overflow-hidden" table-title="用户列表">
        <template #toolbar-tools>
          <Space>
            <a-button
              v-access:code="['system:user:export']"
              :loading="exportLoading"
              :disabled="exportLoading"
              @click="handleExport"
            >
              {{ $t('pages.common.export') }}
            </a-button>
            <a-button
              v-access:code="['system:user:import']"
              @click="handleImport"
            >
              {{ $t('pages.common.import') }}
            </a-button>
            <a-button
              :disabled="!vxeCheckboxChecked(tableApi)"
              danger
              type="primary"
              v-access:code="['system:user:remove']"
              @click="handleMultiDelete"
            >
              {{ $t('pages.common.delete') }}
            </a-button>
            <a-button
              type="primary"
              v-access:code="['system:user:add']"
              @click="handleAdd"
            >
              {{ $t('pages.common.add') }}
            </a-button>
          </Space>
        </template>
        <template #avatar="{ row }">
          <!-- 可能要判断空字符串情况 所以没有使用?? -->
          <Avatar :src="row.avatar || preferences.app.defaultAvatar" />
        </template>
        <template #status="{ row }">
          <!-- value只能接收boolean值 -->
          <ApiSwitch
            :value="row.status === EnableStatus.Enable"
            :api="(checked) => handleChangeStatus(checked, row)"
            :disabled="
              row.userId === SUPERADMIN_USER_ID ||
              !hasAccessByCodes(['system:user:edit'])
            "
            @reload="() => tableApi.query()"
          />
        </template>
        <template #action="{ row }">
          <template v-if="row.userId !== SUPERADMIN_USER_ID">
            <Space>
              <action-button
                v-access:code="['system:user:edit']"
                @click.stop="handleEdit(row)"
              >
                {{ $t('pages.common.edit') }}
              </action-button>
              <Popconfirm
                placement="left"
                title="确认删除？"
                @confirm="handleDelete(row)"
              >
                <action-button
                  danger
                  v-access:code="['system:user:remove']"
                  @click.stop=""
                >
                  {{ $t('pages.common.delete') }}
                </action-button>
              </Popconfirm>
            </Space>
            <Dropdown
              placement="bottomRight"
              :menu="{
                items: menuItems,
                onClick: (info) => handleMenuClick(info.key, row),
              }"
            >
              <a-button size="small" type="link">
                {{ $t('pages.common.more') }}
              </a-button>
            </Dropdown>
          </template>
        </template>
      </BasicTable>
    </div>
    <UserImpotModal @reload="tableApi.query()" />
    <UserDrawer @reload="tableApi.query()" />
    <UserInfoModal />
    <UserResetPwdModal />
  </Page>
</template>
