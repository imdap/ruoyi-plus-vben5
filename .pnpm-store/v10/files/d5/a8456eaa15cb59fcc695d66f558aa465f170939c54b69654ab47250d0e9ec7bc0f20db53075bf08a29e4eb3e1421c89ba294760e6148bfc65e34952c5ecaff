<script setup lang="ts">
import { ref } from 'vue'
import { Circle } from '../src'

const percent = ref<number>(30)
const strokeWidth = ref<number>(20)
const steps = ref<number>(5)
const gap = ref<number>(4)
</script>

<template>
  <div>
    <div>
      percent:
      <input
        v-model.number="percent"
        type="range"
        min="0"
        max="100"
        style="width: 300px"
      >
    </div>
    <div>
      strokeWidth:
      <input
        v-model.number="strokeWidth"
        type="range"
        min="0"
        max="30"
        style="width: 300px"
      >
    </div>
    <div>
      steps:
      <input
        v-model.number="steps"
        type="range"
        min="0"
        max="15"
        style="width: 300px"
      >
    </div>
    <div>
      space:
      <input
        v-model.number="gap"
        type="range"
        min="0"
        max="15"
        style="width: 300px"
      >
    </div>
    <h3>Circle Progress:</h3>
    <div>percent: {{ percent }}%</div>
    <div>strokeWidth: {{ strokeWidth }}px</div>
    <div>steps: {{ steps }}</div>
    <div>gap: {{ gap }}px</div>
    <div style="width: 100px">
      <Circle
        :percent="percent"
        :stroke-width="strokeWidth"
        :steps="{ count: steps, gap }"
        stroke-color="red"
      />
    </div>
  </div>
</template>
