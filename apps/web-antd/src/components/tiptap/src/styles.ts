import type { TiptapProps } from './type';

import { computed } from 'vue';

import { cn } from '@vben/utils';

import { normalizeSize } from './helpers';

export function useTiptapStyles(props: TiptapProps) {
  const rootClass = computed(() => {
    return cn(
      'tiptap-root',
      'bg-card border-border text-card-foreground overflow-hidden rounded-md border',
      props.disabled && 'opacity-80',
    );
  });

  const editorContentClass = computed(() => {
    return cn(
      'bg-background text-foreground',
      '[&_.ProseMirror]:min-h-(--tiptap-min-height)',
      '[&_.ProseMirror]:max-h-(--tiptap-max-height)',
      '[&_.ProseMirror]:overflow-auto',
      '[&_.ProseMirror]:px-4 [&_.ProseMirror]:py-3',
      '[&_.ProseMirror]:text-sm/7',
      '[&_.ProseMirror]:outline-none',
      '[&_.ProseMirror>*+*]:mt-3',
      '[&_.ProseMirror_h1]:text-2xl [&_.ProseMirror_h1]:font-semibold',
      '[&_.ProseMirror_h2]:text-xl [&_.ProseMirror_h2]:font-semibold',
      '[&_.ProseMirror_h3]:text-lg [&_.ProseMirror_h3]:font-semibold',
      '[&_.ProseMirror_ul]:list-disc [&_.ProseMirror_ul]:pl-6',
      '[&_.ProseMirror_ol]:list-decimal [&_.ProseMirror_ol]:pl-6',
      '[&_.ProseMirror_blockquote]:border-border [&_.ProseMirror_blockquote]:border-l-4',
      '[&_.ProseMirror_blockquote]:text-muted-foreground [&_.ProseMirror_blockquote]:pl-4',
      '[&_.ProseMirror_code]:bg-muted [&_.ProseMirror_code]:rounded-sm',
      '[&_.ProseMirror_code]:px-1 [&_.ProseMirror_code]:py-0.5',
      '[&_.ProseMirror_pre]:overflow-auto [&_.ProseMirror_pre]:rounded-md',
      '[&_.ProseMirror_pre]:bg-muted [&_.ProseMirror_pre]:p-3',
      '[&_.ProseMirror_pre_code]:bg-transparent [&_.ProseMirror_pre_code]:p-0',
      '[&_.ProseMirror_a]:text-primary [&_.ProseMirror_a]:underline',
      '[&_.ProseMirror_img]:max-w-full [&_.ProseMirror_img]:rounded-md',
      '[&_.tiptap-resizable-image]:relative [&_.tiptap-resizable-image]:inline-block',
      '[&_.tiptap-resizable-image]:max-w-full [&_.tiptap-resizable-image]:align-bottom',
      '[&_.tiptap-resizable-image-img]:block [&_.tiptap-resizable-image-img]:h-auto',
      '[&_.tiptap-resizable-image-img]:max-w-full [&_.tiptap-resizable-image-img]:rounded-md',
      '[&_.tiptap-resizable-image-handle]:bg-primary',
      '[&_.tiptap-resizable-image-handle]:absolute [&_.tiptap-resizable-image-handle]:bottom-0',
      '[&_.tiptap-resizable-image-handle]:right-0 [&_.tiptap-resizable-image-handle]:z-10',
      '[&_.tiptap-resizable-image-handle]:size-3 [&_.tiptap-resizable-image-handle]:translate-x-1/2',
      '[&_.tiptap-resizable-image-handle]:translate-y-1/2 [&_.tiptap-resizable-image-handle]:touch-none',
      '[&_.tiptap-resizable-image-handle]:cursor-nwse-resize [&_.tiptap-resizable-image-handle]:rounded-full',
      '[&_.tiptap-resizable-image-handle]:border-background [&_.tiptap-resizable-image-handle]:border-2',
      '[&_.tiptap-resizable-image-handle]:opacity-0 [&_.tiptap-resizable-image-handle]:transition-opacity',
      '[&_.tiptap-resizable-image:hover_.tiptap-resizable-image-handle]:opacity-100',
      '[&_.tiptap-resizable-image.is-resizing_.tiptap-resizable-image-handle]:opacity-100',
      '[&_.tiptap-resizable-image.ProseMirror-selectednode_.tiptap-resizable-image-handle]:opacity-100',
      '[&_.is-editor-empty:first-child::before]:pointer-events-none',
      '[&_.is-editor-empty:first-child::before]:float-left',
      '[&_.is-editor-empty:first-child::before]:h-0',
      '[&_.is-editor-empty:first-child::before]:text-muted-foreground',
      '[&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]',
      props.disabled && '[&_.ProseMirror]:cursor-not-allowed',
      props.contentClass,
    );
  });

  const editorStyle = computed(() => {
    return {
      '--tiptap-max-height': normalizeSize(props.maxHeight ?? 640),
      '--tiptap-min-height': normalizeSize(props.minHeight ?? 260),
    };
  });

  return {
    editorContentClass,
    editorStyle,
    rootClass,
  };
}
