<script setup lang="ts">
import { ref } from 'vue';

import { Page } from '@vben/common-ui';
import { cn } from '@vben/utils';

import { Button, RadioGroup, Switch } from 'antdv-next';

import { Tiptap } from '#/components/tiptap';

const disabled = ref(false);
const showToolbar = ref(true);
const previewMode = ref<'html' | 'preview'>('preview');
const previewModeOptions = [
  {
    label: '预览',
    value: 'preview',
  },
  {
    label: 'HTML',
    value: 'html',
  },
];

const content = ref(`
<h2>产品发布记录</h2><p>本次发布整理了通知编辑、图片上传和内容预览相关流程。</p><ul><li><p>运营公告模板已完成初稿。</p></li><li><p>帮助中心内容已同步更新。</p></li></ul><blockquote><p>上线窗口：本周五 20:00 - 22:00。`);

const controlBarClass = cn(
  'flex flex-wrap items-center justify-between gap-3',
  'bg-card border-border rounded-md border px-4 py-3',
);

const outputPanelClass = cn('bg-card border-border rounded-md border');

const previewClass = cn(
  'text-foreground max-w-none text-sm/7',
  '[&_blockquote]:border-border [&_blockquote]:border-l-4',
  '[&_blockquote]:text-muted-foreground [&_blockquote]:pl-4',
  '[&_h1]:text-2xl [&_h1]:font-semibold',
  '[&_h2]:text-xl [&_h2]:font-semibold',
  '[&_h3]:text-lg [&_h3]:font-semibold',
  '[&_li]:my-1 [&_ol]:list-decimal [&_ol]:pl-6',
  '[&_p]:my-2 [&_ul]:list-disc [&_ul]:pl-6',
);

const sourceClass = cn(
  'thin-scrollbar max-h-[360px] overflow-auto whitespace-pre-wrap',
  'bg-muted rounded-md p-3 text-sm/6',
);

function resetContent() {
  content.value = '';
}
</script>

<template>
  <Page title="Tiptap富文本">
    <div class="flex flex-col gap-4">
      <div :class="controlBarClass">
        <div class="flex flex-wrap items-center gap-4">
          <label class="inline-flex items-center gap-2 text-sm">
            <Switch v-model:checked="disabled" size="small" />
            <span>禁用</span>
          </label>
          <label class="inline-flex items-center gap-2 text-sm">
            <Switch v-model:checked="showToolbar" size="small" />
            <span>工具栏</span>
          </label>
        </div>

        <Button html-type="button" @click="resetContent"> 清空 </Button>
      </div>

      <Tiptap
        v-model="content"
        :disabled="disabled"
        :toolbar="showToolbar"
        :min-height="420"
        :max-height="720"
        placeholder="请输入富文本内容"
      />

      <div :class="outputPanelClass">
        <div
          class="flex items-center justify-between gap-3 border-b border-border px-4 py-3"
        >
          <span class="text-sm font-medium">内容输出</span>
          <RadioGroup
            v-model:value="previewMode"
            button-style="solid"
            :options="previewModeOptions"
            option-type="button"
            size="small"
          />
        </div>

        <div class="min-h-[180px] p-4">
          <div
            v-if="previewMode === 'preview'"
            :class="previewClass"
            v-html="content"
          ></div>
          <pre v-else :class="sourceClass">{{ content }}</pre>
        </div>
      </div>
    </div>
  </Page>
</template>
