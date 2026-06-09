import type { AnyExtension } from '@tiptap/core';

import type { TiptapProps } from './type';

import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';

const TiptapImage = Image.extend({
  addAttributes() {
    const parentAttributes = this.parent?.() ?? {};

    return {
      ...parentAttributes,
      ossId: {
        default: null,
        parseHTML: (element) => element.dataset.ossId,
        renderHTML: (attributes) => {
          if (!attributes.ossId) {
            return {};
          }

          return {
            'data-oss-id': attributes.ossId,
          };
        },
      },
    };
  },
});

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
    Link.configure({
      HTMLAttributes: {
        rel: 'noopener noreferrer nofollow',
        target: '_blank',
      },
      autolink: true,
      defaultProtocol: 'https',
      openOnClick: false,
    }),
    TiptapImage.configure({
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
