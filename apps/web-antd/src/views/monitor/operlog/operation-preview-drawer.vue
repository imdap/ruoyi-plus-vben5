<script setup lang="tsx">
import type { DescriptionsProps } from 'antdv-next';

import type { OperationLog } from '#/api/monitor/operlog/model';

import { computed, shallowRef } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';

import { Descriptions, Tag } from 'antdv-next';

import {
  renderDict,
  renderHttpMethodTag,
  renderJsonPreview,
} from '#/utils/render';

const [BasicDrawer, drawerApi] = useVbenDrawer({
  onOpenChange: handleOpenChange,
  onClosed() {
    currentLog.value = null;
  },
});

const currentLog = shallowRef<null | OperationLog>(null);
function handleOpenChange(open: boolean) {
  if (!open) {
    return null;
  }
  const { record } = drawerApi.getData() as { record: OperationLog };
  currentLog.value = record;
}

const actionInfo = computed(() => {
  if (!currentLog.value) {
    return '-';
  }
  const data = currentLog.value;
  return `账号: ${data.operName} / ${data.deptName} / ${data.operIp} / ${data.operLocation}`;
});

const items = computed<DescriptionsProps['items']>(() => {
  if (!currentLog.value) {
    return [];
  }
  const data = currentLog.value;
  return [
    {
      label: '日志编号',
      content: data.operId,
    },
    {
      label: '操作结果',
      content: renderDict(data.status, DictEnum.SYS_COMMON_STATUS),
    },
    {
      label: '操作模块',
      content: (
        <div class="flex items-center gap-2">
          <Tag>{data.title}</Tag>
          {renderDict(data.businessType, DictEnum.SYS_OPER_TYPE)}
        </div>
      ),
    },
    {
      label: '操作信息',
      content: actionInfo.value,
    },
    {
      label: '请求信息',
      content: (
        <div class="flex items-center gap-2">
          {renderHttpMethodTag(data.requestMethod)}
          {data.operUrl}
        </div>
      ),
    },
    data.errorMsg
      ? {
          label: '异常信息',
          content: (
            <span class="font-semibold text-red-600">{data.errorMsg}</span>
          ),
        }
      : undefined,
    {
      label: '方法',
      content: data.method,
    },
    {
      label: '请求参数',
      content: (
        <div class="max-h-[300px] overflow-y-auto">
          {renderJsonPreview(data.operParam)}
        </div>
      ),
    },
    data.jsonResult
      ? {
          label: '响应参数',
          content: (
            <div class="max-h-[300px] overflow-y-auto">
              {renderJsonPreview(data.jsonResult)}
            </div>
          ),
        }
      : undefined,
    {
      label: '请求耗时',
      content: `${data.costTime} ms`,
    },
    {
      label: '操作时间',
      content: `${data.operTime}`,
    },
  ].filter(Boolean) as DescriptionsProps['items'];
});
</script>

<template>
  <BasicDrawer :footer="false" class="w-[600px]" title="查看日志">
    <Descriptions
      :classes="{ label: 'min-w-[120px]' }"
      :column="1"
      :items="items"
      bordered
      size="small"
    />
  </BasicDrawer>
</template>
