<script setup lang="ts">
import { useNotification } from '../src'
import motion from './motion.ts'
import './index.less'

const [notice, contextHolder] = useNotification({ showProgress: true, motion })
</script>

<template>
  <button
    @click="() => {
      notice.open({
        content: `${new Date().toISOString()}`,
      });
    }"
  >
    Show With Progress
  </button>
  <button
    @click="() => {
      notice.open({
        content: `${new Date().toISOString()}`,
        pauseOnHover: false,
      });
    }"
  >
    Not Pause On Hover
  </button>
  <contextHolder />
</template>

<style scoped>

</style>
