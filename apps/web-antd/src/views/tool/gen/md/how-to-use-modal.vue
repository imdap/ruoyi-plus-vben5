<script setup lang="ts">
import { useVbenModal } from '@vben/common-ui';

import image from './image.png';

const [Modal] = useVbenModal({
  title: '如何使用代码生成模板',
  footer: false,
});
</script>

<template>
  <Modal class="w-[600px]">
    <div class="p-4">
      <h2 class="mb-2 text-lg font-bold">Vben5 代码生成模板</h2>
      <p class="mb-4 text-red-500">注意antdv-next专用 跟ant-design-vue不兼容</p>
      <p class="mb-4 text-red-500">目前为beta版本</p>

      <h2 class="mb-2 text-lg font-bold">粘贴 vben5 模板文件</h2>
      <p class="mb-4">
        将
        <code class="rounded bg-gray-100 px-1">vben5</code>
        文件夹复制到
        <code class="rounded bg-gray-100 px-1">
          /ruoyi-modules/ruoyi-generator
        </code>
        的
        <code class="rounded bg-gray-100 px-1">/resources/vm</code>
        下
      </p>

      <h2 class="mb-2 text-lg font-bold">替换 java 文件</h2>
      <ul class="mb-4 list-inside list-disc">
        <li>
          将
          <code class="rounded bg-gray-100 px-1">VelocityUtils.java</code>
          替换
          <code class="rounded bg-gray-100 px-1">
            路径:
            /ruoyi-modules/ruoyi-generator/src/main/java/org/dromara/generator/util
          </code>
          (简单描述就是替换 utils 文件)
          <strong>此文件只是新增了 vben 代码支持, 不影响原版生成</strong>
        </li>
      </ul>
      <img :src="image" alt="示例图片" class="mb-4 max-w-full" />

      <h2 class="mb-2 text-lg font-bold">重启</h2>
      <p class="mb-4">重启后端</p>

      <h2 class="mb-2 text-lg font-bold">预览/下载</h2>
      <p class="mb-4">
        预览/下载
        <code class="rounded bg-gray-100 px-1">vben5</code>
        文件夹即为前端生成的代码
      </p>
    </div>
  </Modal>
</template>
