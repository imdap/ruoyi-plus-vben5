<script setup lang="ts">
import { useNotification } from '../src'
import motion from './motion.ts'
import './index.less'

const [{ open }, contextHolder] = useNotification({ motion, stack: true })

function getConfig() {
  return {
    content: `${Array.from({ length: Math.round(Math.random() * 5) + 1 })
      .fill(1)
      .map(() => new Date().toISOString())
      .join('\n')}`,
    duration: null,
  }
}
</script>

<template>
  <button
    @click="() => {
      open(getConfig());
    }"
  >
    Top Right
  </button>
  <button
    @click="() => {
      open({ ...getConfig(), placement: 'bottomRight' });
    }"
  >
    Bottom Right
  </button>
  <contextHolder />
</template>

<style scoped>

</style>
