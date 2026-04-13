import { CSSProperties } from 'vue';
import { AriaValueFormat, SliderClassNames, SliderStyles } from './interface';
import { MarkObj } from './Marks';
export interface RangeConfig {
    editable?: boolean;
    draggableTrack?: boolean;
    /** Set min count when `editable` */
    minCount?: number;
    /** Set max count when `editable` */
    maxCount?: number;
}
export interface RenderProps {
    index: number | null;
    prefixCls: string;
    value: number;
    dragging: boolean;
    draggingDelete: boolean;
    node: any;
}
type ValueType = number | number[];
export interface SliderProps<Value extends ValueType = ValueType> {
    prefixCls?: string;
    className?: string;
    style?: CSSProperties;
    classNames?: SliderClassNames;
    styles?: SliderStyles;
    id?: string;
    disabled?: boolean;
    keyboard?: boolean;
    autoFocus?: boolean;
    onFocus?: (e: FocusEvent) => void;
    onBlur?: (e: FocusEvent) => void;
    range?: boolean | RangeConfig;
    /** @deprecated Use `range.minCount` or `range.maxCount` to handle this */
    count?: number;
    min?: number;
    max?: number;
    step?: number | null;
    value?: Value | null;
    defaultValue?: Value | null;
    onChange?: (value: Value) => void;
    /** @deprecated It's always better to use `onChange` instead */
    onBeforeChange?: (value: Value) => void;
    /** @deprecated Use `onChangeComplete` instead */
    onAfterChange?: (value: Value) => void;
    onChangeComplete?: (value: Value) => void;
    allowCross?: boolean;
    pushable?: boolean | number;
    reverse?: boolean;
    vertical?: boolean;
    included?: boolean;
    startPoint?: number;
    /** @deprecated Please use `styles.track` instead */
    trackStyle?: CSSProperties | CSSProperties[];
    /** @deprecated Please use `styles.handle` instead */
    handleStyle?: CSSProperties | CSSProperties[];
    /** @deprecated Please use `styles.rail` instead */
    railStyle?: CSSProperties;
    dotStyle?: CSSProperties | ((dotValue: number) => CSSProperties);
    activeDotStyle?: CSSProperties | ((dotValue: number) => CSSProperties);
    marks?: Record<string | number, any | MarkObj>;
    dots?: boolean;
    handleRender?: (props: RenderProps) => any;
    activeHandleRender?: (props: RenderProps) => any;
    track?: boolean;
    tabIndex?: number | number[];
    ariaLabelForHandle?: string | string[];
    ariaLabelledByForHandle?: string | string[];
    ariaRequired?: boolean;
    ariaValueTextFormatterForHandle?: AriaValueFormat | AriaValueFormat[];
}
export interface SliderRef {
    focus: () => void;
    blur: () => void;
}
declare const Slider: import('vue').DefineSetupFnComponent<SliderProps<ValueType>, {}, {}, SliderProps<ValueType> & {}, import('vue').PublicProps>;
export default Slider;
