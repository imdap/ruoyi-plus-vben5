import type { NodeViewRendererProps } from '@tiptap/core';

import Image from '@tiptap/extension-image';

const minImageWidth = 80;

function getSizeValue(value: unknown) {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  if (typeof value === 'string' && value.trim()) {
    return value;
  }

  return undefined;
}

function parseSizeValue(value: string | null) {
  if (!value) {
    return null;
  }

  return value.trim() || null;
}

function getElementWidth(element: HTMLElement) {
  return (
    parseSizeValue(element.getAttribute('width')) ??
    parseSizeValue(element.style.width)
  );
}

function createResizableImageView({
  editor,
  getPos,
  node,
}: NodeViewRendererProps) {
  const wrapper = document.createElement('span');
  const image = document.createElement('img');
  const handle = document.createElement('span');

  wrapper.className = 'tiptap-resizable-image';
  wrapper.contentEditable = 'false';
  image.className = 'tiptap-resizable-image-img';
  image.draggable = false;
  handle.className = 'tiptap-resizable-image-handle';

  Object.assign(wrapper.style, {
    display: 'inline-block',
    maxWidth: '100%',
    position: 'relative',
    verticalAlign: 'bottom',
  });
  Object.assign(image.style, {
    display: 'block',
    height: 'auto',
    maxWidth: '100%',
  });
  Object.assign(handle.style, {
    backgroundColor: 'hsl(var(--primary, 221 83% 53%))',
    border: '2px solid hsl(var(--background, 0 0% 100%))',
    borderRadius: '9999px',
    bottom: '0',
    cursor: 'nwse-resize',
    height: '12px',
    opacity: '0',
    position: 'absolute',
    right: '0',
    touchAction: 'none',
    transform: 'translate(50%, 50%)',
    transition: 'opacity 120ms ease',
    width: '12px',
    zIndex: '10',
  });

  wrapper.append(image, handle);

  const showHandle = () => {
    handle.style.opacity = '1';
  };

  const hideHandle = () => {
    if (wrapper.classList.contains('is-resizing')) {
      return;
    }

    handle.style.opacity = '0';
  };

  const applyAttributes = () => {
    const attrs = node.attrs;
    image.setAttribute('src', attrs.src);

    for (const name of ['alt', 'title']) {
      const value = attrs[name];
      if (value) {
        image.setAttribute(name, value);
      } else {
        image.removeAttribute(name);
      }
    }

    if (attrs.ossId) {
      image.dataset.ossId = attrs.ossId;
    } else {
      delete image.dataset.ossId;
    }

    const width = getSizeValue(attrs.width);
    if (width) {
      image.style.width = width;
    } else {
      image.style.removeProperty('width');
    }
  };

  const updateWidth = (width: number) => {
    const position = typeof getPos === 'function' ? getPos() : null;
    if (position === null || position === undefined) {
      return;
    }

    const nextWidth = Math.max(minImageWidth, Math.round(width));
    editor
      .chain()
      .focus()
      .command(({ tr }) => {
        tr.setNodeMarkup(position, undefined, {
          ...node.attrs,
          width: `${nextWidth}px`,
        });
        return true;
      })
      .run();
  };

  const handlePointerDown = (event: PointerEvent) => {
    if (!editor.isEditable) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    const startX = event.clientX;
    const startWidth = image.getBoundingClientRect().width;
    wrapper.classList.add('is-resizing');
    showHandle();

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      image.style.width = `${Math.max(minImageWidth, startWidth + deltaX)}px`;
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      upEvent.preventDefault();
      wrapper.classList.remove('is-resizing');
      hideHandle();
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointercancel', handlePointerUp);
      updateWidth(image.getBoundingClientRect().width);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('pointercancel', handlePointerUp);
  };

  handle.addEventListener('pointerdown', handlePointerDown);
  wrapper.addEventListener('mouseenter', showHandle);
  wrapper.addEventListener('mouseleave', hideHandle);
  applyAttributes();

  return {
    destroy() {
      handle.removeEventListener('pointerdown', handlePointerDown);
      wrapper.removeEventListener('mouseenter', showHandle);
      wrapper.removeEventListener('mouseleave', hideHandle);
    },
    dom: wrapper,
    ignoreMutation() {
      return true;
    },
    stopEvent(event: Event) {
      return event.target instanceof Node && handle.contains(event.target);
    },
    update(nextNode: typeof node) {
      if (nextNode.type !== node.type) {
        return false;
      }

      node = nextNode;
      applyAttributes();
      return true;
    },
  };
}

export const ResizableImage = Image.extend({
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
      width: {
        default: null,
        parseHTML: getElementWidth,
        renderHTML: (attributes) => {
          const width = getSizeValue(attributes.width);
          if (!width) {
            return {};
          }

          return {
            style: `width: ${width};`,
            width,
          };
        },
      },
    };
  },
  addNodeView() {
    return createResizableImageView;
  },
});
