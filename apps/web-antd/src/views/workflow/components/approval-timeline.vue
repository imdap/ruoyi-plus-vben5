<script setup lang="tsx">
import type { TimelineItemProps, TimelineProps } from 'antdv-next';

import type { Flow } from '#/api/workflow/instance/model';

import { computed } from 'vue';

import { VbenAvatar } from '@vben/common-ui';
import { cn } from '@vben/utils';

import { UsergroupAddOutlined } from '@antdv-next/icons';
import { Avatar, Empty, Timeline } from 'antdv-next';

import ApprovalTimelineItem from './approval-timeline-item.vue';

interface Props {
  list: Flow[];
}

const props = defineProps<Props>();

const items = computed<TimelineProps['items']>(() => {
  const { list } = props;
  return list.map((item) => {
    const isMultiplePerson = item.approver?.split(',').length > 1;

    const result: TimelineItemProps = {
      key: item.id,
      dot: (
        <div class="relative rounded-full border">
          {isMultiplePerson && (
            <Avatar
              class="bg-primary-400"
              icon={<UsergroupAddOutlined />}
              size={36}
            />
          )}

          {!isMultiplePerson && (
            <VbenAvatar
              alt={item?.approveName ?? 'unknown'}
              class="size-[36px] rounded-full bg-primary text-white"
              src=""
            />
          )}
          <div
            class={cn(
              'absolute bottom-0 right-[-2px]',
              'size-[12px] rounded-full bg-green-500',
              'border-[2px] border-white',
            )}
          ></div>
        </div>
      ),
      children: <ApprovalTimelineItem item={item} />,
    };
    return result;
  });
});
</script>

<template>
  <Timeline
    v-if="list.length > 0"
    :items="items"
    :styles="{
      item: {
        /**
         * 非finish状态hover会有加上primary色 不需要
         */
        '--ant-cmp-steps-item-text-hover-color': 'initial',
        /**
         * 时间线之间的间距 默认12px
         */
        '--ant-padding-sm': '16px',
      },
    }"
  />
  <Empty v-else />
</template>
