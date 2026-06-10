import type { AnyExtension } from '@tiptap/core';

import type { TiptapProps } from './type';

import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';

import { ResizableImage } from './resizable-image';
import { TextStyle } from './text-style';

export function createExtensions(props: TiptapProps): AnyExtension[] {
  return [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
    Underline,
    Highlight.configure({
      multicolor: false,
    }),
    TextStyle,
    Link.configure({
      HTMLAttributes: {
        rel: 'noopener noreferrer nofollow',
        target: '_blank',
      },
      autolink: true,
      defaultProtocol: 'https',
      openOnClick: false,
    }),
    ResizableImage.configure({
      allowBase64: false,
      HTMLAttributes: {
        class: 'tiptap-image',
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Placeholder.configure({
      placeholder: props.placeholder,
    }),
    ...(props.extensions ?? []),
  ];
}
