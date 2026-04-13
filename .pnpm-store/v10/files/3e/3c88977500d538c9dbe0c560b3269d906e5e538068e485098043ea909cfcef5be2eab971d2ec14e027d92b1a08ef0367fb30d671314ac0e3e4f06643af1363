<script setup lang="ts">
import { h } from 'vue'
import { useNotification } from '../src'
import motion from './motion'

const [{ open }, holder] = useNotification({ motion })
const NOTICE = {
  content: h('span', ['simple show']),
  onclose() {
    console.log('simple close')
  },
}
function handleClick() {
  open({
    ...NOTICE,
    props: {
      'data-testid': 'my-data-testid',
    },
  })
}
</script>

<template>
  <div>
    <button @click="handleClick">
      simple show
    </button>
    <holder />
  </div>
</template>

<style lang="less">
@import "./index.less";
</style>
