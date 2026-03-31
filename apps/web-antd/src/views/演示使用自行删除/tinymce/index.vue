<script setup lang="ts">
import { ref } from 'vue';

import { Page } from '@vben/common-ui';

import { Switch } from 'antdv-next';

import { Tinymce } from '#/components/tinymce';

const readonly = ref(false);
const content = ref('');
</script>

<template>
  <Page title="Tinymce富文本">
    <div class="flex flex-col gap-[16px]">
      <div class="flex items-center gap-[16px]">
        <span>禁用</span>
        <Switch v-model:checked="readonly" />
      </div>
      <Tinymce v-model="content" :height="800" :disabled="readonly" />
    </div>
  </Page>
</template>
