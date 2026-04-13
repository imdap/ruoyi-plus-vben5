<script setup lang="ts">
import { computed, ref } from 'vue'
import { Circle } from '../src'

const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A', '#FF5959', '#BC3FFA']

const circleContainerStyle = {
  width: '200px',
  height: '200px',
}

const percent = ref(100)
const colorIndex = ref(0)
const subPathsCount = ref(3)

function changeState() {
  const value = Math.floor(Math.random() * 100)
  const newColorIndex = Math.floor(Math.random() * 3)
  percent.value = value
  colorIndex.value = newColorIndex
}

function changeCount() {
  subPathsCount.value = (subPathsCount.value % 6) + 1
}

const getColor = (index: number) => colorMap[(index + colorMap.length) % colorMap.length]

const multiPercentage = computed(() => Array.from({ length: subPathsCount.value }).fill(percent.value / subPathsCount.value))
const multiPercentageStrokeColors = multiPercentage.value.map((_, i) => getColor(i))

const circleStyles = computed(() => [
  { percent: percent.value, gapPosition: 'top', strokeColor: getColor(colorIndex.value) },
  { percent: multiPercentage.value, gapPosition: 'bottom', strokeColor: multiPercentageStrokeColors },
  { percent: percent.value, gapPosition: 'left', strokeColor: getColor(colorIndex.value) },
  { percent: percent.value, gapPosition: 'right', strokeColor: getColor(colorIndex.value) },
])
</script>

<template>
  <div>
    <p>
      <button @click="changeState">
        Change State [{{ percent }}]
      </button>
      <button @click="changeCount">
        Change Count [{{ subPathsCount }}]
      </button>
    </p>
    <div v-for="(color, index) in circleStyles" :key="index" :style="circleContainerStyle">
      <Circle
        :percent="color.percent as any"
        :gap-degree="70"
        :gap-position="color.gapPosition as any"
        :stroke-width="6"
        stroke-linecap="square"
        :stroke-color="color.strokeColor"
      />
    </div>
    <div :style="circleContainerStyle">
      <Circle
        :percent="percent"
        :gap-degree="70"
        :stroke-width="6"
        :stroke-color="{ '0%': 'red', '99%': 'blue', '100%': 'green' }"
      />
    </div>
  </div>
</template>

<style scoped>
button {
  margin-top: 10px;
}
</style>
