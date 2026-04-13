<script lang="ts" setup>
import { ref } from 'vue'
import { Circle, Line } from '../src'

const percent = ref<number>(9)
const color = ref<string>('#3FC7FA')

function changeState() {
  const colorMap: string[] = ['#3FC7FA', '#85D262', '#FE8C6A']
  const value = Math.floor(Math.random() * 100)
  color.value = colorMap[Math.floor(Math.random() * 3)]
  percent.value = value
}

function changeIncrease() {
  if (percent.value < 100) {
    percent.value += 1
  }
}

function changeReduce() {
  if (percent.value > 0) {
    percent.value -= 1
  }
}

const containerStyle = {
  width: '250px',
}
const circleContainerStyle = {
  width: '250px',
  height: '250px',
  display: 'inline-block',
}
</script>

<template>
  <div>
    <h3>Line Progress {{ percent }}%</h3>
    <div :style="containerStyle">
      <Line :percent="percent" :stroke-width="4" :stroke-color="color" />
      <Line :percent="[percent / 2, percent / 2]" :stroke-width="4" :stroke-color="[color, '#CCC']" />
    </div>
    <h3>Circle Progress {{ percent }}%</h3>
    <div :style="circleContainerStyle">
      <Circle :percent="percent" :stroke-width="6" stroke-linecap="round" :stroke-color="color" />
    </div>
    <div :style="circleContainerStyle">
      <Circle :percent="percent" :stroke-width="6" stroke-linecap="butt" :stroke-color="color" />
    </div>
    <div :style="circleContainerStyle">
      <Circle :percent="percent" :stroke-width="6" stroke-linecap="square" :stroke-color="color" />
    </div>
    <p>
      <button @click="changeState">
        Change State
      </button>
      <button @click="changeIncrease">
        Increase
      </button>
      <button @click="changeReduce">
        Reduce
      </button>
    </p>
  </div>
</template>
