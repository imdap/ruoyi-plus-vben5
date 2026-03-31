<script setup lang="ts">
import { ref } from 'vue';

import { MarkdownPreviewer, Page } from '@vben/common-ui';

import { Spin } from 'antdv-next';

import changelog from '../../../../../../CHANGELOG.md?raw';

const content = ref(changelog);

const loading = ref(true);
</script>

<template>
  <Page :auto-content-height="true">
    <Spin :spinning="loading" tip="加载markdown中...">
      <MarkdownPreviewer
        v-model:value="content"
        height="100%"
        class="min-h-[50vh]"
        @mounted="loading = false"
      />
    </Spin>
  </Page>
</template>
