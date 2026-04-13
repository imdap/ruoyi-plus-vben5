import { InputFocusOptions } from '@v-c/util/dist/Dom/focus';
import { ChangeEventHandler, CompositionEventHandler, FocusEventHandler, KeyboardEventHandler, MouseEventHandler } from '@v-c/util/dist/EventInterface';
import { VueNode } from '@v-c/util/dist/type';
import { CSSProperties, InputHTMLAttributes } from 'vue';
import { LiteralUnion } from './utils/types';
export interface CommonInputProps {
    prefix?: VueNode;
    suffix?: VueNode;
    addonBefore?: VueNode;
    addonAfter?: VueNode;
    /** @deprecated Use `classNames` instead */
    classes?: {
        affixWrapper?: string;
        group?: string;
        wrapper?: string;
    };
    classNames?: {
        affixWrapper?: string;
        prefix?: string;
        suffix?: string;
        groupWrapper?: string;
        wrapper?: string;
        variant?: string;
    };
    styles?: {
        affixWrapper?: CSSProperties;
        prefix?: CSSProperties;
        suffix?: CSSProperties;
    };
    allowClear?: boolean | {
        clearIcon?: VueNode;
    };
}
type DataAttr = Record<`data-${string}`, string>;
export type ValueType = InputHTMLAttributes['value'] | bigint;
export interface BaseInputProps extends CommonInputProps {
    value?: ValueType;
    prefixCls?: string;
    disabled?: boolean;
    focused?: boolean;
    triggerFocus?: () => void;
    readOnly?: boolean;
    handleReset?: MouseEventHandler;
    onClear?: () => void;
    hidden?: boolean;
    dataAttrs?: {
        affixWrapper?: DataAttr;
    };
    components?: {
        affixWrapper?: 'span' | 'div';
        groupWrapper?: 'span' | 'div';
        wrapper?: 'span' | 'div';
        groupAddon?: 'span' | 'div';
    };
}
export type ShowCountFormatter = (args: {
    value: string;
    count: number;
    maxLength?: number;
}) => any;
export type ExceedFormatter = (value: string, config: {
    max: number;
}) => string;
export interface CountConfig {
    max?: number;
    strategy?: (value: string) => number;
    show?: boolean | ShowCountFormatter;
    /** Trigger when content larger than the `max` limitation */
    exceedFormatter?: ExceedFormatter;
}
export interface InputProps extends Omit<CommonInputProps, 'classNames' | 'styles'> {
    value?: ValueType;
    defaultValue?: any;
    disabled?: boolean;
    prefixCls?: string;
    type?: LiteralUnion<'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week', string>;
    /** It's better to use `count.show` instead */
    showCount?: boolean | {
        formatter: ShowCountFormatter;
    };
    onPressEnter?: KeyboardEventHandler;
    autoComplete?: string;
    htmlSize?: number;
    placeholder?: string;
    classNames?: CommonInputProps['classNames'] & {
        input?: string;
        count?: string;
    };
    styles?: CommonInputProps['styles'] & {
        input?: CSSProperties;
        count?: CSSProperties;
    };
    count?: CountConfig;
    onClear?: () => void;
    maxLength?: number;
    readOnly?: boolean;
    hidden?: boolean;
    onChange?: ChangeEventHandler;
    onFocus?: FocusEventHandler;
    onBlur?: FocusEventHandler;
    onKeyDown?: KeyboardEventHandler;
    onKeyUp?: KeyboardEventHandler;
    onCompositionStart?: CompositionEventHandler;
    onCompositionEnd?: CompositionEventHandler;
    /**
     * Whether to trigger onChange during IME composition.
     * When false (default), onChange only fires after compositionEnd with the final value.
     * When true, onChange fires on every keystroke including intermediate IME values.
     */
    changeOnComposing?: boolean;
    components?: BaseInputProps['components'];
    dataAttrs?: BaseInputProps['dataAttrs'];
}
export interface InputRef {
    focus: (options?: InputFocusOptions) => void;
    blur: () => void;
    setSelectionRange: (start: number, end: number, direction?: 'forward' | 'backward' | 'none') => void;
    select: () => void;
    input: HTMLInputElement | null;
    nativeElement: HTMLElement | null;
}
export {};
