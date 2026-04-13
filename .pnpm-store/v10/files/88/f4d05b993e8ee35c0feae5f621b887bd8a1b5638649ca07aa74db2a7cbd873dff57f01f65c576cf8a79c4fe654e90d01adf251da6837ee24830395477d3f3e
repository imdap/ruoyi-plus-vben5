import { ValueType } from '../../mini-decimal/src';
import { InputFocusOptions } from '../../util/src/Dom/focus';
export type { ValueType };
type SemanticName = 'root' | 'actions' | 'input' | 'action' | 'prefix' | 'suffix';
export interface InputNumberProps<T extends ValueType = ValueType> {
    mode?: 'input' | 'spinner';
    prefixCls?: string;
    class?: any;
    className?: string;
    style?: any;
    classNames?: Partial<Record<SemanticName, string>>;
    styles?: Partial<Record<SemanticName, any>>;
    min?: T;
    max?: T;
    step?: ValueType;
    defaultValue?: T;
    value?: T | null;
    disabled?: boolean;
    readOnly?: boolean;
    prefix?: any;
    suffix?: any;
    upHandler?: any;
    downHandler?: any;
    keyboard?: boolean;
    changeOnWheel?: boolean;
    controls?: boolean;
    parser?: (displayValue: string | undefined) => T;
    formatter?: (value: T | undefined, info: {
        userTyping: boolean;
        input: string;
    }) => string;
    precision?: number;
    decimalSeparator?: string;
    onInput?: (text: string) => void;
    onChange?: (value: T | null) => void;
    onPressEnter?: (e: KeyboardEvent) => void;
    onStep?: (value: T, info: {
        offset: ValueType;
        type: 'up' | 'down';
        emitter: 'handler' | 'keyboard' | 'wheel';
    }) => void;
    changeOnBlur?: boolean;
    tabIndex?: number;
    onMouseDown?: (event: MouseEvent) => void;
    onClick?: (event: MouseEvent) => void;
    onMouseUp?: (event: MouseEvent) => void;
    onMouseLeave?: (event: MouseEvent) => void;
    onMouseMove?: (event: MouseEvent) => void;
    onMouseEnter?: (event: MouseEvent) => void;
    onMouseOut?: (event: MouseEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
    onKeyDown?: (event: KeyboardEvent) => void;
    onKeyUp?: (event: KeyboardEvent) => void;
    onCompositionStart?: (event: CompositionEvent) => void;
    onCompositionEnd?: (event: CompositionEvent) => void;
    onBeforeInput?: (event: InputEvent) => void;
    stringMode?: boolean;
    placeholder?: string;
}
export interface InputNumberRef extends HTMLInputElement {
    focus: (options?: InputFocusOptions) => void;
    blur: () => void;
    nativeElement: HTMLElement | null;
    input: HTMLInputElement | null;
}
declare const InputNumber: import('vue').DefineSetupFnComponent<InputNumberProps<ValueType>, {}, {}, InputNumberProps<ValueType> & {}, import('vue').PublicProps>;
export default InputNumber;
