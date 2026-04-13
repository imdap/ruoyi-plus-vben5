<script setup lang="ts">
import type { ImageSettings } from '../src'
import { QRCodeCanvas, QRCodeSVG } from '../src'

const settings: ImageSettings = {
  src: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  height: 40,
  width: 40,
  excavate: true,
  crossOrigin: 'anonymous',
}
</script>

<template>
  <QRCodeCanvas value="https://www.baidu.com" :image-settings="settings" />
  <br>
  <QRCodeSVG value="https://www.baidu.com" :image-settings="settings" />
</template>

<style scoped>

</style>
