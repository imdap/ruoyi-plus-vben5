import type { Editor } from '@tiptap/core';

import type { TiptapContentOutput, TiptapModelValue } from './type';

export function getEditorValue(
  target: Editor,
  output: TiptapContentOutput,
): TiptapModelValue {
  if (output === 'json') {
    return target.getJSON();
  }

  if (output === 'text') {
    return target.getText();
  }

  return target.getHTML();
}

export function getComparableValue(value: TiptapModelValue) {
  if (typeof value === 'string') {
    return value;
  }

  return JSON.stringify(value);
}

export function normalizeSize(value: number | string) {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  return value;
}
