<script setup lang="ts">
import { useNotification } from '../src'
import motion from './motion.ts'
import './index.less'

const [notice, contextHolder] = useNotification({ maxCount: 3, motion })
</script>

<template>
  <button
    @click="() => {
      notice.open({
        content: `${new Date().toISOString()}`,
      });
    }"
  >
    Max Count
  </button>
  <contextHolder />
</template>

<style scoped>

</style>
