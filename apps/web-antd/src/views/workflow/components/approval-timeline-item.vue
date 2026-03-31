<script setup lang="ts">
import type { Flow } from '#/api/workflow/instance/model';

import { computed, h, onMounted, ref } from 'vue';

import { DictEnum } from '@vben/constants';
import { cn } from '@vben/utils';

import { MessageOutlined, UserOutlined } from '@antdv-next/icons';
import { Avatar } from 'antdv-next';

import { ossInfo } from '#/api/system/oss';
import { DictTag } from '#/components/dict';
import { getDictOptions } from '#/utils/dict';

defineOptions({
  name: 'ApprovalTimelineItem',
});

const props = defineProps<{ item: Flow }>();

interface AttachmentInfo {
  ossId: string;
  url: string;
  name: string;
}

/**
 * 处理附件信息
 */
const attachmentInfo = ref<AttachmentInfo[]>([]);
onMounted(async () => {
  if (!props.item.ext) {
    return null;
  }
  const resp = await ossInfo(props.item.ext.split(','));
  attachmentInfo.value = resp.map((item) => ({
    ossId: item.ossId,
    url: item.url,
    name: item.originalName,
  }));
});

const isMultiplePerson = computed(
  () => props.item.approver?.split(',').length > 1,
);

const flowStatusOptions = getDictOptions(DictEnum.WF_TASK_STATUS);
</script>

<template>
  <div>
    <div :class="cn('mb-5 ml-2 flex flex-col gap-1', 'mt-[-8px]')">
      <div class="flex items-center gap-1">
        <div class="font-bold">{{ item.nodeName }}</div>
        <DictTag :value="item.flowStatus" :dicts="flowStatusOptions" />
      </div>

      <div :class="cn('mt-2 flex flex-wrap gap-2')" v-if="isMultiplePerson">
        <!-- 如果昵称中带, 这里的处理是不准确的 -->
        <div
          :class="cn('flex items-center rounded-full bg-foreground/5', 'p-1')"
          v-for="(name, index) in item.approveName.split(',')"
          :key="index"
        >
          <Avatar
            class="flex items-center justify-center bg-primary-400"
            :size="24"
            :icon="h(UserOutlined)"
          />
          <span class="px-1">{{ name }}</span>
        </div>
      </div>
      <div v-else>{{ item.approveName }}</div>

      <div>{{ item.updateTime }}</div>
      <div
        v-if="item.message"
        class="rounded-lg border px-3 py-1"
        :class="cn('flex gap-2')"
      >
        <MessageOutlined />
        <div class="break-all text-foreground/75">{{ item.message }}</div>
      </div>
      <div v-if="attachmentInfo.length > 0" class="flex flex-wrap gap-4">
        <!-- 这里下载的文件名不是原始文件名 -->
        <a
          v-for="attachment in attachmentInfo"
          :key="attachment.ossId"
          :href="attachment.url"
          class="text-primary"
          target="_blank"
        >
          <div class="flex items-center gap-1">
            <span class="icon-[mingcute--attachment-line] size-[18px]"></span>
            <span>{{ attachment.name }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
