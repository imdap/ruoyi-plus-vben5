import type { Extensions, JSONContent } from '@tiptap/core';

export type TiptapContentOutput = 'html' | 'json' | 'text';

export type TiptapModelValue = JSONContent | string;

export interface TiptapImageUploadResult {
  alt?: string;
  ossId?: string;
  title?: string;
  url: string;
}

export type TiptapUploadImage = (
  file: File,
) => Promise<string | TiptapImageUploadResult>;

export interface TiptapProps {
  autofocus?: 'all' | 'end' | 'start' | boolean | number;
  contentClass?: string;
  disabled?: boolean;
  extensions?: Extensions;
  maxHeight?: number | string;
  minHeight?: number | string;
  output?: TiptapContentOutput;
  placeholder?: string;
  toolbar?: boolean;
  uploadImage?: TiptapUploadImage;
}
