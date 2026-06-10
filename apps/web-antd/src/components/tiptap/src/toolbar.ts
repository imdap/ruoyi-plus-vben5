import type { Editor } from '@tiptap/core';

import type { Ref } from 'vue';

import { computed, ref } from 'vue';

import { prompt } from '@vben/common-ui';
import { cn } from '@vben/utils';

export type ToolbarBlock =
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'paragraph';
export type ToolbarMark =
  | 'bold'
  | 'code'
  | 'highlight'
  | 'italic'
  | 'link'
  | 'strike'
  | 'underline';
export type ToolbarNode =
  | 'blockquote'
  | 'bulletList'
  | 'codeBlock'
  | 'orderedList';
export type ToolbarTextAlign = '' | 'center' | 'left' | 'right';

export interface ToolbarItem {
  action: () => Promise<void> | void;
  icon: string;
  isActive: () => boolean;
  isDisabled?: () => boolean;
  key: string;
  label: string;
}

interface ToolbarState {
  align: ToolbarTextAlign;
  block: ToolbarBlock;
  color: string;
  marks: Record<ToolbarMark, boolean>;
  nodes: Record<ToolbarNode, boolean>;
}

interface UseTiptapToolbarOptions {
  getEditor: () => Editor | null;
  isDisabled: () => boolean | undefined;
  isUploading: Ref<boolean>;
}

const defaultToolbarState: ToolbarState = {
  align: '' as ToolbarTextAlign,
  block: 'paragraph' as ToolbarBlock,
  color: '',
  marks: {
    bold: false,
    code: false,
    highlight: false,
    italic: false,
    link: false,
    strike: false,
    underline: false,
  },
  nodes: {
    blockquote: false,
    bulletList: false,
    codeBlock: false,
    orderedList: false,
  },
};

export const blockOptions: { label: string; value: ToolbarBlock }[] = [
  {
    label: '正文',
    value: 'paragraph',
  },
  {
    label: '标题 1',
    value: 'heading-1',
  },
  {
    label: '标题 2',
    value: 'heading-2',
  },
  {
    label: '标题 3',
    value: 'heading-3',
  },
];

export function useTiptapToolbar(options: UseTiptapToolbarOptions) {
  const toolbarState = ref<ToolbarState>(defaultToolbarState);

  const currentBlock = computed(() => {
    return toolbarState.value.block;
  });

  const currentTextColor = computed(() => {
    return toolbarState.value.color;
  });

  function getCurrentBlock(target: Editor): ToolbarBlock {
    if (target.isActive('heading', { level: 1 })) {
      return 'heading-1';
    }

    if (target.isActive('heading', { level: 2 })) {
      return 'heading-2';
    }

    if (target.isActive('heading', { level: 3 })) {
      return 'heading-3';
    }

    return 'paragraph';
  }

  function getCurrentTextAlign(target: Editor): ToolbarTextAlign {
    if (target.isActive({ textAlign: 'left' })) {
      return 'left';
    }

    if (target.isActive({ textAlign: 'center' })) {
      return 'center';
    }

    if (target.isActive({ textAlign: 'right' })) {
      return 'right';
    }

    return '';
  }

  function syncToolbarState(editor?: Editor) {
    const target = editor ?? options.getEditor();
    if (!target) {
      return;
    }

    toolbarState.value = {
      align: getCurrentTextAlign(target),
      block: getCurrentBlock(target),
      color: (target.getAttributes('textStyle').color as string) || '',
      marks: {
        bold: target.isActive('bold'),
        code: target.isActive('code'),
        highlight: target.isActive('highlight'),
        italic: target.isActive('italic'),
        link: target.isActive('link'),
        strike: target.isActive('strike'),
        underline: target.isActive('underline'),
      },
      nodes: {
        blockquote: target.isActive('blockquote'),
        bulletList: target.isActive('bulletList'),
        codeBlock: target.isActive('codeBlock'),
        orderedList: target.isActive('orderedList'),
      },
    };
  }

  function buttonClass(active: boolean) {
    return cn(
      'inline-flex size-8 shrink-0 items-center justify-center p-0',
      !active && 'text-muted-foreground',
    );
  }

  function isToolbarItemDisabled(item: ToolbarItem) {
    return (
      !!options.isDisabled() ||
      options.isUploading.value ||
      !!item.isDisabled?.()
    );
  }

  function isMarkActive(mark: ToolbarMark) {
    return toolbarState.value.marks[mark];
  }

  function isNodeActive(node: ToolbarNode) {
    return toolbarState.value.nodes[node];
  }

  function isTextAlignActive(align: Exclude<ToolbarTextAlign, ''>) {
    return toolbarState.value.align === align;
  }

  function runCommand(command: (target: Editor) => void) {
    const target = options.getEditor();
    if (!target || options.isDisabled()) {
      return;
    }

    command(target);
    syncToolbarState(target);
  }

  function noop() {}

  function setBlock(value: ToolbarBlock) {
    runCommand((target) => {
      const chain = target.chain().focus();

      if (value === 'heading-1') {
        chain.setHeading({ level: 1 }).run();
        return;
      }

      if (value === 'heading-2') {
        chain.setHeading({ level: 2 }).run();
        return;
      }

      if (value === 'heading-3') {
        chain.setHeading({ level: 3 }).run();
        return;
      }

      chain.setParagraph().run();
    });
  }

  async function setLink() {
    const target = options.getEditor();
    if (!target || options.isDisabled()) {
      return;
    }

    const previousHref = target.getAttributes('link').href as
      | string
      | undefined;
    let href: string | undefined;

    try {
      href = await prompt<string>({
        content: '请输入链接地址',
        defaultValue: previousHref ?? 'https://',
        title: '链接地址',
      });
    } catch {
      return;
    }

    const nextHref = href?.trim() ?? '';
    if (!nextHref) {
      runCommand((target) => {
        target.chain().focus().extendMarkRange('link').unsetLink().run();
      });
      return;
    }

    runCommand((target) => {
      target
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: nextHref })
        .run();
    });
  }

  function getColorValue(value: unknown, css?: string) {
    if (css?.trim()) {
      return css.trim();
    }

    if (typeof value === 'string') {
      return value.trim();
    }

    if (typeof value === 'object' && value !== null) {
      const color = value as {
        toCssString?: () => string;
        toHexString?: () => string;
      };

      return color.toCssString?.() || color.toHexString?.() || '';
    }

    return '';
  }

  function setTextColor(value: unknown, css?: string) {
    const color = getColorValue(value, css);
    if (!color) {
      return;
    }

    runCommand((target) => {
      target.chain().focus().setMark('textStyle', { color }).run();
    });
  }

  function unsetTextColor() {
    runCommand((target) => {
      target.chain().focus().unsetMark('textStyle').run();
    });
  }

  async function insertImageByUrl() {
    let src: string | undefined;

    try {
      src = await prompt<string>({
        content: '请输入图片地址',
        defaultValue: 'https://',
        title: '图片地址',
      });
    } catch {
      return;
    }

    const nextSrc = src?.trim() ?? '';
    if (!nextSrc) {
      return;
    }

    runCommand((target) => {
      target.chain().focus().setImage({ src: nextSrc }).run();
    });
  }

  const toolbarGroups: ToolbarItem[][] = [
    [
      {
        action: () =>
          runCommand((target) => target.chain().focus().toggleBold().run()),
        icon: 'icon-[lucide--bold]',
        isActive: () => isMarkActive('bold'),
        key: 'bold',
        label: '加粗',
      },
      {
        action: () =>
          runCommand((target) => target.chain().focus().toggleItalic().run()),
        icon: 'icon-[lucide--italic]',
        isActive: () => isMarkActive('italic'),
        key: 'italic',
        label: '斜体',
      },
      {
        action: () =>
          runCommand((target) =>
            target.chain().focus().toggleUnderline().run(),
          ),
        icon: 'icon-[lucide--underline]',
        isActive: () => isMarkActive('underline'),
        key: 'underline',
        label: '下划线',
      },
      {
        action: () =>
          runCommand((target) => target.chain().focus().toggleStrike().run()),
        icon: 'icon-[lucide--strikethrough]',
        isActive: () => isMarkActive('strike'),
        key: 'strike',
        label: '删除线',
      },
      {
        action: () =>
          runCommand((target) => target.chain().focus().toggleCode().run()),
        icon: 'icon-[lucide--code]',
        isActive: () => isMarkActive('code'),
        key: 'code',
        label: '行内代码',
      },
      {
        action: () =>
          runCommand((target) =>
            target.chain().focus().toggleHighlight().run(),
          ),
        icon: 'icon-[lucide--highlighter]',
        isActive: () => isMarkActive('highlight'),
        key: 'highlight',
        label: '高亮',
      },
      {
        action: noop,
        icon: 'icon-[lucide--paintbrush]',
        isActive: () => !!currentTextColor.value,
        key: 'textColor',
        label: '文字颜色',
      },
    ],
    [
      {
        action: () =>
          runCommand((target) =>
            target.chain().focus().toggleBulletList().run(),
          ),
        icon: 'icon-[lucide--list]',
        isActive: () => isNodeActive('bulletList'),
        key: 'bulletList',
        label: '无序列表',
      },
      {
        action: () =>
          runCommand((target) =>
            target.chain().focus().toggleOrderedList().run(),
          ),
        icon: 'icon-[lucide--list-ordered]',
        isActive: () => isNodeActive('orderedList'),
        key: 'orderedList',
        label: '有序列表',
      },
      {
        action: () =>
          runCommand((target) =>
            target.chain().focus().toggleBlockquote().run(),
          ),
        icon: 'icon-[lucide--quote]',
        isActive: () => isNodeActive('blockquote'),
        key: 'blockquote',
        label: '引用',
      },
      {
        action: () =>
          runCommand((target) =>
            target.chain().focus().toggleCodeBlock().run(),
          ),
        icon: 'icon-[lucide--square-code]',
        isActive: () => isNodeActive('codeBlock'),
        key: 'codeBlock',
        label: '代码块',
      },
    ],
    [
      {
        action: () =>
          runCommand((target) =>
            target.chain().focus().setTextAlign('left').run(),
          ),
        icon: 'icon-[lucide--align-left]',
        isActive: () => isTextAlignActive('left'),
        key: 'alignLeft',
        label: '左对齐',
      },
      {
        action: () =>
          runCommand((target) =>
            target.chain().focus().setTextAlign('center').run(),
          ),
        icon: 'icon-[lucide--align-center]',
        isActive: () => isTextAlignActive('center'),
        key: 'alignCenter',
        label: '居中',
      },
      {
        action: () =>
          runCommand((target) =>
            target.chain().focus().setTextAlign('right').run(),
          ),
        icon: 'icon-[lucide--align-right]',
        isActive: () => isTextAlignActive('right'),
        key: 'alignRight',
        label: '右对齐',
      },
    ],
    [
      {
        action: setLink,
        icon: 'icon-[lucide--link]',
        isActive: () => isMarkActive('link'),
        key: 'link',
        label: '链接',
      },
      {
        action: () => {
          runCommand((target) => {
            target.chain().focus().extendMarkRange('link').unsetLink().run();
          });
        },
        icon: 'icon-[lucide--unlink]',
        isActive: () => false,
        key: 'unlink',
        label: '取消链接',
      },
      {
        action: insertImageByUrl,
        icon: 'icon-[lucide--image-plus]',
        isActive: () => false,
        key: 'imageUrl',
        label: '图片地址',
      },
      {
        action: noop,
        icon: 'icon-[lucide--upload]',
        isActive: () => false,
        key: 'imageUpload',
        label: '上传图片',
      },
    ],
    [
      {
        action: () =>
          runCommand((target) => target.chain().focus().undo().run()),
        icon: 'icon-[lucide--undo-2]',
        isActive: () => false,
        key: 'undo',
        label: '撤销',
      },
      {
        action: () =>
          runCommand((target) => target.chain().focus().redo().run()),
        icon: 'icon-[lucide--redo-2]',
        isActive: () => false,
        key: 'redo',
        label: '重做',
      },
      {
        action: () => {
          runCommand((target) => {
            target.chain().focus().unsetAllMarks().clearNodes().run();
          });
        },
        icon: 'icon-[lucide--eraser]',
        isActive: () => false,
        key: 'clear',
        label: '清除格式',
      },
    ],
  ];

  return {
    buttonClass,
    currentBlock,
    currentTextColor,
    isToolbarItemDisabled,
    runCommand,
    setBlock,
    setTextColor,
    syncToolbarState,
    toolbarGroups,
    unsetTextColor,
  };
}
