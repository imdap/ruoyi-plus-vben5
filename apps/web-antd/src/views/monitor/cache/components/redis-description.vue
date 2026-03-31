<script setup lang="tsx">
import type { DescriptionsProps } from 'antdv-next';

import type { RedisInfo } from '#/api/monitor/cache';

import { computed } from 'vue';

import { Descriptions } from 'antdv-next';

interface IRedisInfo extends RedisInfo {
  dbSize: string;
}

const props = defineProps<{ data: IRedisInfo }>();

const items = computed<DescriptionsProps['items']>(() => {
  const { data } = props;
  return [
    {
      content: data.redis_version,
      label: 'redis版本',
    },
    {
      content: data.redis_mode === 'standalone' ? '单机模式' : '集群模式',
      label: 'redis模式',
    },
    {
      content: data.tcp_port,
      label: 'tcp端口',
    },
    {
      content: data.connected_clients,
      label: '客户端数',
    },
    {
      content: `${data.uptime_in_days} 天`,
      label: '运行时间',
    },
    {
      content: data.used_memory_human,
      label: '使用内存',
    },
    {
      content: Number.parseFloat(data?.used_cpu_user_children ?? '0').toFixed(
        2,
      ),
      label: '使用CPU',
    },
    {
      content: data.maxmemory_human,
      label: '内存配置',
    },
    {
      content: data.aof_enabled === '0' ? '否' : '是',
      label: 'AOF是否开启',
    },
    {
      content: data.rdb_last_bgsave_status,
      label: 'RDB是否成功',
    },
    {
      content: data.dbSize,
      label: 'key数量',
    },
    {
      content: `${data.instantaneous_input_kbps}kps/${data.instantaneous_output_kbps}kps`,
      label: '网络入口/出口',
    },
  ];
});
</script>

<template>
  <Descriptions
    :column="{ lg: 4, md: 3, sm: 1, xl: 4, xs: 1 }"
    :items="items"
    bordered
    size="small"
  />
</template>
