/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Ref, SetupContext } from 'vue';
import { IPropTypes } from './components/EditorPropTypes';
import type { Editor as TinyMCEEditor, EditorEvent } from 'tinymce';
declare const isValidKey: (key: string) => boolean;
declare const bindHandlers: (initEvent: EditorEvent<any>, listeners: Record<string, any>, editor: TinyMCEEditor) => void;
declare const bindModelHandlers: (props: IPropTypes, ctx: SetupContext, editor: TinyMCEEditor, modelValue: Ref<any>) => void;
declare const initEditor: (initEvent: EditorEvent<any>, props: IPropTypes, ctx: SetupContext, editor: TinyMCEEditor, modelValue: Ref<any>, content: () => string) => void;
declare const uuid: (prefix: string) => string;
declare const isTextarea: (element: Element | null) => element is HTMLTextAreaElement;
declare const mergePlugins: (initPlugins: string | string[] | undefined, inputPlugins?: string | string[]) => string[];
declare const isNullOrUndefined: (value: any) => value is null | undefined;
declare const isDisabledOptionSupported: (editor: TinyMCEEditor) => boolean;
export { bindHandlers, bindModelHandlers, initEditor, isValidKey, uuid, isTextarea, mergePlugins, isNullOrUndefined, isDisabledOptionSupported };
