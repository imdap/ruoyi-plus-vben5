<script setup lang="ts">
import { QRCodeCanvas } from '@v-c/qrcode'
import { ref } from 'vue'

const data = ref('https://www.baidu.com')
</script>

<template>
  <input v-model="data" type="text" placeholder="the value of qrcode" style="width: 100%">
  <QRCodeCanvas :value="data" :size="200" title="qrcode" fg-color="green" bg-color="#fff" style="border: 5px solid #000; border-radius: 10px; padding: 10px" />
</template>

<style scoped>

</style>
