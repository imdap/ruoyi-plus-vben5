<script setup lang="ts">
import { useNotification } from '../src'
import motion from './motion'

const [notice, contextHolder] = useNotification({ motion, closable: true })
</script>

<template>
  <div>
    <!-- Default     -->
    <button
      @click="() => {
        notice.open({
          content: `${new Date().toISOString()}`,
        })
      }"
    >
      Basic
    </button>
    <button
      @click="() => {
        notice.open({
          content: `${Array(Math.round(Math.random() * 5) + 1)
            .fill(1)
            .map(() => new Date().toISOString())
            .join('\n')}`,
          duration: null,
        })
      }"
    >
      Not Auto Close
    </button>

    <button
      @click="() => {
        notice.open({
          content: `${Array(5)
            .fill(1)
            .map(() => new Date().toISOString())
            .join('\n')}`,
          duration: null,
        });
      }"
    >
      Not Auto Close
    </button>
  </div>

  <div>
    <button
      @click="() => {
        notice.open({
          content: `No Close! ${new Date().toISOString()}`,
          duration: null,
          closable: false,
          key: 'No Close',
          onClose: () => {
            console.log('Close!!!');
          },
        });
      }"
    >
      No Closable
    </button>

    <button
      @click="() => {
        notice.close('No Close');
      }"
    >
      Force Close No Closable
    </button>
  </div>

  <div>
    <button
      @click="() => {
        notice.destroy();
      }"
    >
      Destroy All
    </button>
  </div>
  <contextHolder />
</template>

<style scoped>

</style>
