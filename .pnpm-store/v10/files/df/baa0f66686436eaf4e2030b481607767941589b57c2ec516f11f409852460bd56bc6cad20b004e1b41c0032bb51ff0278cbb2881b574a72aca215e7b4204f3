<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Circle, Line } from '../src'

// State
const percent = ref(0)

// Timeout reference
let tm: ReturnType<typeof setTimeout>

// Increase progress
function increase() {
  if (percent.value >= 100) {
    clearTimeout(tm)
    return
  }
  percent.value += 1
  tm = setTimeout(increase, 10)
}

// Restart progress
function restart() {
  clearTimeout(tm)
  percent.value = 0
  increase()
}

// Start increasing when mounted
onMounted(() => {
  increase()
})
</script>

<template>
  <div style="margin: 10px; width: 200px;">
    <Circle :stroke-width="6" :percent="percent" />
    <Line :stroke-width="4" :percent="percent" />
    <button @click="restart">
      Restart
    </button>
  </div>
</template>

<style scoped>
button {
  margin-top: 10px;
}
</style>
