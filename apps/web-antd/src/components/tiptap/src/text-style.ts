import { Mark, mergeAttributes } from '@tiptap/core';

function parseColor(element: HTMLElement) {
  return element.style.color || null;
}

export const TextStyle = Mark.create({
  name: 'textStyle',

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: parseColor,
        renderHTML: (attributes) => {
          if (!attributes.color) {
            return {};
          }

          return {
            style: `color: ${attributes.color};`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        getAttrs: (element) => {
          if (!(element instanceof HTMLElement)) {
            return false;
          }

          if (!parseColor(element)) {
            return false;
          }

          return null;
        },
        tag: 'span',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },
});
