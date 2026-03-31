<script setup lang="tsx">
import type { DescriptionsProps } from 'antdv-next';

import type { TaskInfo } from '#/api/workflow/task/model';

import { computed } from 'vue';

import { VbenAvatar } from '@vben/common-ui';
import { DictEnum } from '@vben/constants';

import { Descriptions, Tooltip } from 'antdv-next';

import { renderDict } from '#/utils/render';

import { getDiffTimeString } from './helper';

interface Props extends TaskInfo {
  active: boolean;
}

const props = withDefaults(defineProps<{ info: Props; rowKey?: string }>(), {
  rowKey: 'id',
});

const emit = defineEmits<{ click: [string] }>();

/**
 * TODO: 这里要优化 事件没有用到
 */
function handleClick() {
  const idKey = props.rowKey as keyof TaskInfo;
  emit('click', props.info[idKey]);
}

const diffUpdateTimeString = computed(() => {
  return getDiffTimeString(props.info.updateTime);
});

const items = computed<DescriptionsProps['items']>(() => {
  const { info } = props;
  return [
    {
      content: <div class="font-bold">{info.nodeName}</div>,
      label: '当前任务',
    },
    {
      content: info.createTime,
      label: '提交时间',
    },
  ];
});
</script>

<template>
  <div
    :class="{
      'border-primary': info.active,
    }"
    class="cursor-pointer rounded-lg border-[1px] border-solid p-3 transition-shadow duration-300 ease-in-out hover:shadow-lg"
    @click.stop="handleClick"
  >
    <Descriptions
      :column="1"
      :items="items"
      :title="info.businessTitle ?? info.flowName"
      size="middle"
    >
      <template #extra>
        <component
          :is="renderDict(info.flowStatus, DictEnum.WF_BUSINESS_STATUS)"
        />
      </template>
    </Descriptions>
    <div class="flex w-full items-center justify-between text-[14px]">
      <div class="flex items-center gap-1 overflow-hidden whitespace-nowrap">
        <VbenAvatar
          :alt="info?.createByName"
          class="size-[24px] rounded-full bg-primary text-[10px] text-white"
          src=""
        />
        <span class="overflow-hidden text-ellipsis opacity-50">
          {{ info.createByName }}
        </span>
      </div>
      <div class="text-nowrap opacity-50">
        <Tooltip placement="top" :title="`更新时间: ${info.updateTime}`">
          <div class="flex items-center gap-1">
            <span class="icon-[mdi--clock-outline] size-[16px]"></span>
            <span>{{ diffUpdateTimeString }}前更新</span>
          </div>
        </Tooltip>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.ant-descriptions .ant-descriptions-header) {
  margin-bottom: 12px !important;
}

:deep(.ant-descriptions-item) {
  padding-bottom: 8px !important;
}
</style>
