<script setup lang="ts">
import type { RedisInfo } from '#/api/monitor/cache';

import { onMounted, reactive, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Button, Card } from 'antdv-next';

import { redisCacheInfo } from '#/api/monitor/cache';

import { CommandChart, MemoryChart, RedisDescription } from './components';

const chartData = reactive<{
  command: { name: string; value: string }[];
  memory: string;
}>({
  command: [],
  memory: '0',
});

interface IRedisInfo extends RedisInfo {
  dbSize: string;
}
const redisInfo = ref<IRedisInfo>();

onMounted(async () => {
  await loadInfo();
});

async function loadInfo() {
  try {
    const ret = await redisCacheInfo();

    // 单位MB 保留两位小数
    const usedMemory = (
      Number.parseInt(ret.info.used_memory!) /
      1024 /
      1024
    ).toFixed(2);
    chartData.memory = usedMemory;
    // 命令统计
    chartData.command = ret.commandStats;
    console.log(chartData.command);
    // redis信息
    redisInfo.value = { ...ret.info, dbSize: String(ret.dbSize) };
  } catch (error) {
    console.warn(error);
  }
}
</script>

<template>
  <Page>
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card class="lg:col-span-2" size="small">
        <template #title>
          <div class="flex items-center justify-start gap-[6px]">
            <span class="icon-[skill-icons--redis-light] size-[16px]"></span>
            <span>redis信息</span>
          </div>
        </template>
        <template #extra>
          <Button size="small" @click="loadInfo">
            <div class="flex">
              <span class="icon-[charm--refresh]"></span>
            </div>
          </Button>
        </template>
        <RedisDescription v-if="redisInfo" :data="redisInfo" />
      </Card>

      <Card size="small">
        <template #title>
          <div class="flex items-center gap-[6px]">
            <span
              class="icon-[flat-color-icons--command-line] size-[16px]"
            ></span>
            <span>命令统计</span>
          </div>
        </template>
        <CommandChart
          v-if="chartData.command.length > 0"
          :data="chartData.command"
        />
      </Card>

      <Card size="small">
        <template #title>
          <div class="flex items-center justify-start gap-[6px]">
            <span class="icon-[la--memory] size-[16px]"></span>
            <span>内存占用</span>
          </div>
        </template>
        <MemoryChart v-if="chartData.memory !== '0'" :data="chartData.memory" />
      </Card>
    </div>
  </Page>
</template>
