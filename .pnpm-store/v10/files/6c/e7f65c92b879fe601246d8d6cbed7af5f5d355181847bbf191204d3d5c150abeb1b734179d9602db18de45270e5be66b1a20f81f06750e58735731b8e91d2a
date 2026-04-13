<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { Circle } from '../src'

const circleContainerStyle: CSSProperties = {
  width: '250px',
  height: '250px',
  display: 'inline-block',
}
</script>

<template>
  <div>
    <h3>Circle Progress 90%</h3>
    <div :style="circleContainerStyle">
      <Circle
        :percent="90"
        :stroke-width="6"
        stroke-linecap="round"
        :stroke-color="{ '0%': '#108ee9', '100%': '#87d068' }"
      />
    </div>

    <h3>Circle Progress 100%</h3>
    <div :style="circleContainerStyle">
      <Circle
        :percent="100"
        :stroke-width="6"
        stroke-linecap="round"
        :stroke-color="{ '100%': '#108ee9', '0%': '#87d068' }"
      />
    </div>

    <h3>Circle colors</h3>
    <div :style="circleContainerStyle">
      <Circle
        :percent="90"
        :stroke-width="6"
        :stroke-color="{ '0%': 'green', '99%': 'red', '100%': 'blue' }"
      />
    </div>
  </div>
</template>
