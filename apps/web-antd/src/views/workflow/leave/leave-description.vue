<script setup lang="tsx">
import type { DescriptionsProps } from 'antdv-next';

import { computed, onBeforeUnmount, ref } from 'vue';

import { useTimeout } from '@vueuse/core';
import { useRequest } from 'alova/client';
import { Descriptions, Skeleton } from 'antdv-next';
import dayjs from 'dayjs';
import { motion } from 'motion-v';

import { leaveInfo } from './api';
import { leaveTypeOptions } from './data';

defineOptions({
  name: 'LeaveDescription',
  inheritAttrs: false,
});

const props = defineProps<{ businessId: number | string }>();

// const data = shallowRef<LeaveVO>();

const { data, abort } = useRequest(() => leaveInfo(props.businessId));
onBeforeUnmount(abort);
// onMounted(async () => {
//   const resp = await leaveInfo(props.businessId);
//   data.value = resp;
// });

const leaveType = computed(() => {
  return (
    leaveTypeOptions.find((item) => item.value === data.value?.leaveType)
      ?.label ?? '未知'
  );
});

function formatDate(date: string) {
  return dayjs(date).format('YYYY-MM-DD');
}

const items = computed<DescriptionsProps['items']>(() => {
  if (!data.value) {
    return [];
  }
  const info = data.value;
  return [
    {
      content: leaveType.value,
      label: '请假类型',
    },
    {
      content: `${formatDate(info.startDate)} - ${formatDate(info.endDate)}`,
      label: '请假时间',
    },
    {
      content: `${info.leaveDays}天`,
      label: '请假时长',
    },
    {
      content: info.remark || '无',
      label: '请假原因',
    },
  ];
});

// 延时的骨架屏 防止接口请求过快 导致闪烁
const showSkeleton = ref(false);
useTimeout(300, {
  callback: () => {
    showSkeleton.value = true;
  },
});
</script>

<template>
  <div class="min-h-[150px] rounded-[6px]">
    <motion.div
      v-if="data"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ duration: 0.3 }"
    >
      <Descriptions
        :classes="{ label: 'w-[150px]' }"
        :column="1"
        :items="items"
        size="small"
        bordered
      />
    </motion.div>

    <Skeleton v-else-if="showSkeleton && !data" active />
  </div>
</template>
