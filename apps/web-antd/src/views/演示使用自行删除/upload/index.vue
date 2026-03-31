<script setup lang="ts">
import type { UploadFile } from 'antdv-next/es/upload/interface';

import type { CustomGetter } from '#/components/upload/src/props';

import { h, ref } from 'vue';

import { CodeMirror, Page, useVbenModal } from '@vben/common-ui';

import { useClipboard } from '@vueuse/core';
import { Alert, Card, RadioGroup, Switch } from 'antdv-next';

import { FileUpload, ImageUpload } from '#/components/upload';

import { useFileType, useImageType } from './hook';
import sql from './insert.sql?raw';
import uploadModal from './upload-modal.vue';

const singleImageId = ref('1905537674682916865');
const singleFileId = ref('1905191167882518529');
const multipleImageId = ref<string[]>(['1905537674682916865']);
const multipleFileId = ref<string[]>(['1905191167882518529']);

function handlePreview(file: UploadFile) {
  window.modal.info({
    content: h('div', { class: 'break-all' }, JSON.stringify(file, null, 2)),
    maskClosable: true,
  });
}

function customAccept(accept: string) {
  return accept
    .split(',')
    .map((str) => str.toUpperCase())
    .join(',');
}

const showComponent = ref(true);

const { imageListOptions, currentImageListType } = useImageType();
const { fileListOptions, currentFileListType } = useFileType();

const customName: CustomGetter<string> = (cb) => {
  if (cb.type === 'info') {
    return `加上自定义前缀显示 - ${cb.response.originalName.toUpperCase()}`;
  }
  return `加上自定义前缀显示 - ${cb.response.fileName.toUpperCase()}`;
};

const customThumbnailUrl: CustomGetter<undefined> = () => {
  return 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/logo-v1.webp';
};

const { copy } = useClipboard({ legacy: true });

const animationEnable = ref(false);

const [UploadModal, uploadModalApi] = useVbenModal({
  connectedComponent: uploadModal,
});
</script>

<template>
  <Page>
    <Card class="mb-2" title="提示" size="small">
      本地想体验可以导入这个sql(mysql的 其他的自行处理或者手动从菜单添加)
      <a-button size="small" @click="copy(sql)">复制</a-button>
      <CodeMirror class="mt-2" v-model="sql" language="sql" readonly />
    </Card>
    <div class="grid grid-cols-2 gap-4">
      <Card title="表单上传">
        <a-button @click="uploadModalApi.open()">打开</a-button>
        <UploadModal />
      </Card>
      <Card title="单上传, 会绑定为string" size="small">
        <ImageUpload v-model:value="singleImageId" />
        当前绑定值: {{ singleImageId }}

        <FileUpload class="mt-6" v-model:value="singleFileId" />
        当前绑定值: {{ singleFileId }}
      </Card>

      <Card title="多上传, maxCount参数控制(开启深度监听)" size="small">
        <ImageUpload
          v-model:value="multipleImageId"
          :max-count="3"
          :deep-watch="true"
        />
        当前绑定值: {{ multipleImageId }}

        <FileUpload
          class="mt-6"
          v-model:value="multipleFileId"
          :max-count="3"
          :deep-watch="true"
        />
        当前绑定值: {{ multipleFileId }}
      </Card>

      <Card title="文件自定义预览逻辑" size="small">
        <Alert
          message="你可以自定义预览逻辑, 比如改为下载, 回调参数为文件信息"
          class="my-2"
        />
        <FileUpload
          v-model:value="multipleFileId"
          :max-count="3"
          :preview="handlePreview"
          :help-message="false"
        />
        <ImageUpload
          class="mt-6"
          v-model:value="multipleImageId"
          :max-count="3"
          :preview="handlePreview"
          :help-message="false"
        />
      </Card>

      <Card title="文件/图片拖拽上传" size="small">
        <FileUpload
          v-model:value="multipleFileId"
          :max-count="3"
          :enable-drag-upload="true"
        />
        <ImageUpload
          class="mt-6"
          v-model:value="multipleImageId"
          :enable-drag-upload="true"
          :max-count="6"
        />
      </Card>

      <Card title="禁用上传" size="small">
        <ImageUpload :disabled="true" :max-count="3" :help-message="false" />
        <FileUpload
          class="mt-6"
          :disabled="true"
          :max-count="3"
          :help-message="false"
        />
      </Card>

      <Card title="文件夹上传/自定义helpMessage" size="small">
        <FileUpload
          v-model:value="multipleFileId"
          :max-count="3"
          :directory="true"
          accept="*"
        >
          <template #helpMessage="slotProps">
            <div class="mt-2 font-semibold text-green-500">
              自定义helpMessage: {{ JSON.stringify(slotProps) }}
            </div>
          </template>
        </FileUpload>
      </Card>

      <Card title="自定义accept显示" size="small">
        <ImageUpload
          v-model:value="singleImageId"
          :accept-format="customAccept"
        />
        <ImageUpload
          class="mt-6"
          v-model:value="singleImageId"
          accept-format="自定义显示允许的文件类型"
        />
      </Card>

      <Card title="默认在unMounted会取消上传" size="small">
        <div>将开发者工具调整网络为3G 切换挂载/卸载 可见请求在卸载被取消</div>
        挂载/卸载组件: <Switch v-model:checked="showComponent" />
        <FileUpload v-if="showComponent" v-model:value="singleFileId" />
      </Card>

      <Card title="图片: listType控制上传样式" size="small">
        <RadioGroup
          v-model:value="currentImageListType"
          :options="imageListOptions"
          button-style="solid"
          option-type="button"
        />
        <ImageUpload
          class="mt-2"
          v-model:value="singleImageId"
          :list-type="currentImageListType"
        />
      </Card>

      <Card title="文件: listType控制上传样式" size="small">
        <div class="mb-2 text-red-500">
          注意文件上传不支持`picture-card`类型
        </div>
        <div class="mb-2 text-red-500">
          注意不要中途切换list-type(应该仅作为初始化属性使用) 会导致样式计算问题
          helpMessage和文件会重叠
        </div>
        <RadioGroup
          v-model:value="currentFileListType"
          :options="fileListOptions"
          button-style="solid"
          option-type="button"
        />
        <FileUpload
          class="mt-2"
          v-model:value="singleFileId"
          :list-type="currentFileListType"
        />
      </Card>

      <Card title="自定义缩略图和文件名" size="small">
        <FileUpload
          v-model:value="multipleFileId"
          :max-count="5"
          list-type="picture"
          :custom-filename="customName"
          :custom-thumb-url="customThumbnailUrl"
        />
      </Card>

      <Card title="图片上传的动画效果" size="small">
        <div class="my-2">
          是否启用
          <span class="font-semibold">list-type: picture-card</span> 的动画效果:
          <Switch v-model:checked="animationEnable" />
        </div>
        <ImageUpload
          v-model:value="singleImageId"
          :with-animation="animationEnable"
        />
        当前绑定值: {{ singleImageId }}
      </Card>
    </div>
  </Page>
</template>
