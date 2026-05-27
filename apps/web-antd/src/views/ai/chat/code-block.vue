<script setup lang="ts">
import { h, nextTick, ref, useSlots, watch } from 'vue';

import { cn } from '@vben/utils';

import { CheckOutlined, CopyOutlined } from '@antdv-next/icons';
import { Button, message } from 'antdv-next';
import hljs from 'highlight.js/lib/common';

import 'highlight.js/styles/github.css';

const props = defineProps<{
  block?: boolean;
  lang?: string;
  streamStatus?: 'done' | 'loading';
}>();

const slots = useSlots();
const copied = ref(false);
const codeRef = ref<HTMLElement>();

function highlight() {
  if (!codeRef.value || !props.block) {
    return;
  }

  const el = codeRef.value;
  delete el.dataset.highlighted;

  if (props.lang) {
    el.className = `language-${props.lang}`;
  }

  hljs.highlightElement(el);
}

watch(
  () => [props.lang, props.streamStatus],
  async () => {
    if (props.streamStatus !== 'loading') {
      await nextTick();
      highlight();
    }
  },
  { immediate: true },
);

function getTextContent(): string {
  if (codeRef.value) {
    return codeRef.value.textContent || '';
  }

  const slot = slots.default?.();
  if (!slot) {
    return '';
  }

  return slot
    .map((vnode) => {
      if (typeof vnode.children === 'string') {
        return vnode.children;
      }

      return '';
    })
    .join('');
}

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(getTextContent());
    copied.value = true;
    message.success('已复制');
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch {
    message.error('复制失败');
  }
}
</script>

<template>
  <template v-if="block">
    <div
      :class="
        cn(
          'group relative my-2 rounded-lg',
          'bg-[var(--ant-color-fill-quaternary)]',
          'border-[var(--ant-color-border-secondary)] border-[2px]',
        )
      "
    >
      <div
        :class="
          cn(
            'flex items-center justify-between',
            'px-3 py-1.5',
            'border-b border-[var(--ant-color-border-secondary)]',
            'text-xs text-[var(--ant-color-text-tertiary)]',
          )
        "
      >
        <span>{{ lang || 'code' }}</span>
        <Button
          size="small"
          type="text"
          :icon="copied ? h(CheckOutlined) : h(CopyOutlined)"
          @click="handleCopy"
        />
      </div>
      <pre
        class="m-0 overflow-x-auto p-3"
      ><code ref="codeRef"><slot></slot></code></pre>
    </div>
  </template>
  <code
    v-else
    class="rounded bg-[var(--ant-color-fill-tertiary)] px-1.5 py-0.5 text-[0.9em]"
  >
    <slot></slot>
  </code>
</template>
