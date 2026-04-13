<script setup lang="ts">
import { ref } from 'vue'
import MutateObserver from '../src/index'

const internalRef = ref()

function onMutate(mutations: MutationRecord[], observer: MutationObserver) {
  console.log(mutations)
  console.log(observer)
  console.log(internalRef)
}

const flag = ref(true)
</script>

<template>
  <Story title="MutateObserver">
    <Variant title="Basic">
      <MutateObserver @mutate="onMutate">
        <button ref="internalRef" :class="[flag ? 'aaa' : 'bbb']" @click="flag = !flag">
          click
        </button>
      </MutateObserver>
    </Variant>
  </Story>
</template>
