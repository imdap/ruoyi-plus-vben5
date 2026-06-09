import type { Editor } from '@tiptap/core';
import type { UploadProps } from 'antdv-next';
import type { Ref } from 'vue';

import type {
  TiptapImageUploadResult,
  TiptapUploadImage,
} from './type';

import { uploadApi } from '#/api';

interface CreateImageUploadRequestOptions {
  getEditor: () => Editor | null;
  getUploadImage: () => TiptapUploadImage;
  isUploading: Ref<boolean>;
  onUploaded: (editor: Editor) => void;
}

export async function defaultUploadImage(
  file: File,
): Promise<TiptapImageUploadResult> {
  const response = await uploadApi(file);

  return {
    ossId: response.ossId,
    title: response.fileName,
    url: response.url,
  };
}

export function insertImageByUploadResult(
  target: Editor,
  result: string | TiptapImageUploadResult,
) {
  const attrs =
    typeof result === 'string'
      ? {
          src: result,
        }
      : {
          alt: result.alt,
          ossId: result.ossId,
          src: result.url,
          title: result.title,
        };

  target
    .chain()
    .focus()
    .setImage(attrs as Parameters<Editor['commands']['setImage']>[0])
    .run();
}

export function createImageUploadRequest({
  getEditor,
  getUploadImage,
  isUploading,
  onUploaded,
}: CreateImageUploadRequestOptions): UploadProps['customRequest'] {
  return async (info) => {
    const target = getEditor();
    if (!target) {
      return;
    }

    const uploadImage = getUploadImage();
    isUploading.value = true;

    try {
      const result = await uploadImage(info.file as File);
      insertImageByUploadResult(target, result);
      onUploaded(target);
      info.onSuccess?.(result);
    } catch (error) {
      console.error('tiptap上传图片失败:', error);
      info.onError?.(error as Error);
    } finally {
      isUploading.value = false;
    }
  };
}
