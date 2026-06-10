import type { Editor } from '@tiptap/core';
import type { UploadProps } from 'antdv-next';

import type { Ref } from 'vue';

import type { TiptapImageUploadResult, TiptapUploadImage } from './type';

import { uploadApi } from '#/api';

interface UseTiptapUploadOptions {
  getEditor: () => Editor | null;
  getUploadImage: () => TiptapUploadImage;
  isDisabled: () => boolean | undefined;
  isUploading: Ref<boolean>;
  onUploaded: (editor: Editor) => void;
}

interface UploadAndInsertImagesOptions {
  files: File[];
  getUploadImage: () => TiptapUploadImage;
  isUploading: Ref<boolean>;
  onUploaded: (editor: Editor) => void;
  target: Editor;
}

type HandlePaste = (view: unknown, event: ClipboardEvent) => boolean;

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

function insertImageByUploadResult(
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

  if (typeof result !== 'string' && result.ossId) {
    attachOssIdToImagesBySrc(target, result.url, result.ossId);
  }
}

function attachOssIdToImagesBySrc(target: Editor, src: string, ossId: string) {
  target
    .chain()
    .command(({ state, tr }) => {
      let changed = false;

      state.doc.descendants((node, position) => {
        if (
          node.type.name !== 'image' ||
          node.attrs.src !== src ||
          node.attrs.ossId
        ) {
          return;
        }

        tr.setNodeMarkup(
          position,
          undefined,
          {
            ...node.attrs,
            ossId,
          },
          node.marks,
        );
        changed = true;
      });

      return changed;
    })
    .run();
}

function getClipboardImageFiles(event: ClipboardEvent): File[] {
  const items = [...(event.clipboardData?.items ?? [])];

  // eslint-disable-next-line unicorn/no-array-reduce
  return items.reduce<File[]>((files, item) => {
    if (item.kind !== 'file' || !item.type.startsWith('image/')) {
      return files;
    }

    const file = item.getAsFile();
    if (!file) {
      return files;
    }

    files.push(normalizeClipboardImageFile(file));
    return files;
  }, []);
}

async function uploadAndInsertImages({
  files,
  getUploadImage,
  isUploading,
  onUploaded,
  target,
}: UploadAndInsertImagesOptions) {
  if (files.length === 0) {
    return [];
  }

  const uploadImage = getUploadImage();
  isUploading.value = true;
  const results: Array<string | TiptapImageUploadResult> = [];

  try {
    for (const file of files) {
      const result = await uploadImage(file);
      insertImageByUploadResult(target, result);
      results.push(result);
    }

    onUploaded(target);
    return results;
  } finally {
    isUploading.value = false;
  }
}

export function useTiptapUpload({
  getEditor,
  getUploadImage,
  isDisabled,
  isUploading,
  onUploaded,
}: UseTiptapUploadOptions) {
  const handleImageUploadRequest: UploadProps['customRequest'] = async (
    info,
  ) => {
    const target = getEditor();
    if (!target) {
      return;
    }

    try {
      const results = await uploadAndInsertImages({
        files: [info.file as File],
        getUploadImage,
        isUploading,
        onUploaded,
        target,
      });
      info.onSuccess?.(results[0]);
    } catch (error) {
      console.error('tiptap上传图片失败:', error);
      window.message?.error?.('图片上传失败');
      info.onError?.(error as Error);
    }
  };

  const handlePaste: HandlePaste = (_view, event) => {
    const target = getEditor();
    if (!target || isDisabled() || isUploading.value) {
      return false;
    }

    const files = getClipboardImageFiles(event);
    if (files.length === 0) {
      return false;
    }

    event.preventDefault();

    void uploadAndInsertImages({
      files,
      getUploadImage,
      isUploading,
      onUploaded,
      target,
    }).catch((error) => {
      console.error('tiptap粘贴上传图片失败:', error);
      window.message?.error?.('图片上传失败');
    });

    return true;
  };

  return {
    handleImageUploadRequest,
    handlePaste,
  };
}

function normalizeClipboardImageFile(file: File): File {
  if (file.name) {
    return file;
  }

  const extension = getImageExtension(file.type);
  return new File([file], `clipboard-image.${extension}`, {
    type: file.type || 'image/png',
  });
}

function getImageExtension(type: string) {
  const extension = type.split('/')[1] || 'png';

  if (extension === 'jpeg') {
    return 'jpg';
  }

  if (extension === 'svg+xml') {
    return 'svg';
  }

  return extension;
}
