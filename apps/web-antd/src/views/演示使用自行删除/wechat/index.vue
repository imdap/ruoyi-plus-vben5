<script setup lang="ts">
import { Page } from '@vben/common-ui';

import { Alert, Image } from 'antdv-next';

import wechatGroupImg from './img-base64.txt?raw';
</script>

<template>
  <Page>
    <div class="flex w-[360px] flex-col gap-2">
      <!-- <Alert :show-icon="true" message="人数已满，需要手动拉人" type="info" /> -->
      <Alert
        :show-icon="true"
        type="warning"
        message="群内禁止at@指定人回答问题 该行为极不礼貌! 该行为极不礼貌! 该行为极不礼貌!"
      />
      <Alert
        :show-icon="true"
        type="success"
        message="正确做法: 抛出足够的上下文(图片/文字/步骤) 自然会有人看"
      />
      <div>
        <Image
          :preview="false"
          :src="wechatGroupImg"
          :width="240"
          class="pointer-events-none select-none"
        />
      </div>
    </div>
  </Page>
</template>
