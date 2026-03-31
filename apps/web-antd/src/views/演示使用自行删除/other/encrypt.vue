<script setup lang="ts">
import { ref } from 'vue';

import { JsonPreview, Page } from '@vben/common-ui';

import { Alert, Card } from 'antdv-next';
import dayjs from 'dayjs';

import { alovaInstance } from '#/utils/http';

const requestData = ref<any>({});
const requestData2 = ref<any>({});
async function apiRequest(name: string) {
  const resp = await alovaInstance.post('/test/api/encrypt/request', name, {
    encrypt: true,
    isReturnNativeResponse: true,
  });
  console.log(resp);
  requestData.value = resp.config.data;
  requestData2.value = resp.data;
}

const encryptData = ref<any>({});
const response = ref<any>({});
async function apiResponse() {
  const resp = await alovaInstance.get('/test/api/encrypt/response', {
    isTransformResponse: false,
    transformResponse: (data) => {
      encryptData.value = data;
      return data;
    },
  });
  response.value = resp;
}
</script>

<template>
  <Page
    title="API加解密"
    description="请求加密和响应解密示例, 支持RSA/SM2 AES/SM4算法"
    content-class="flex flex-col gap-4"
  >
    <Card title="请求加密">
      <a-button @click="apiRequest(dayjs().valueOf().toString())">
        请求加密
      </a-button>
      <div class="flex flex-col gap-4">
        <Alert class="mt-4" show-icon message="可在开发者工具查看原始响应" />
        <span class="font-semibold">加密后的请求数据</span>
        <JsonPreview :data="requestData" />
        <span class="font-semibold">后端解密</span>
        <JsonPreview :data="requestData2" />
      </div>
    </Card>

    <Card title="响应解密">
      <a-button @click="apiResponse()">响应解密</a-button>
      <div class="flex flex-col gap-4">
        <Alert class="mt-4" show-icon message="可在开发者工具查看原始响应" />
        <span class="font-semibold">加密的响应(原始data)</span>
        <JsonPreview :data="encryptData" />
        <span class="font-semibold">解密后数据</span>
        <JsonPreview :data="response" />
      </div>
    </Card>
  </Page>
</template>
