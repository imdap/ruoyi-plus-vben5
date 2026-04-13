import { CSSProperties, PropType, SlotsType } from 'vue';
import { OnStartMove } from '../interface';
export interface RenderProps {
    index: number | null;
    prefixCls: string;
    value: number;
    dragging: boolean;
    draggingDelete: boolean;
    node: any;
}
export interface HandlesRef {
    focus: (index: number) => void;
    hideHelp: VoidFunction;
}
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    prefixCls: {
        type: StringConstructor;
        required: true;
    };
    values: {
        type: ArrayConstructor;
        required: true;
    };
    handleStyle: {
        type: PropType<CSSProperties | CSSProperties[]>;
    };
    onStartMove: {
        type: PropType<OnStartMove>;
        required: true;
    };
    onOffsetChange: {
        type: PropType<(value: number | "min" | "max", valueIndex: number) => void>;
        required: true;
    };
    onFocus: {
        type: PropType<(e: FocusEvent) => void>;
    };
    onBlur: {
        type: PropType<(e: FocusEvent) => void>;
    };
    onDelete: {
        type: PropType<(index: number) => void>;
        required: true;
    };
    handleRender: {
        type: PropType<(props: RenderProps) => any>;
    };
    activeHandleRender: {
        type: PropType<(props: RenderProps) => any>;
    };
    draggingIndex: {
        type: NumberConstructor;
        default: number;
    };
    draggingDelete: {
        type: BooleanConstructor;
        default: boolean;
    };
    onChangeComplete: PropType<() => void>;
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "focus"[], "focus", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    prefixCls: {
        type: StringConstructor;
        required: true;
    };
    values: {
        type: ArrayConstructor;
        required: true;
    };
    handleStyle: {
        type: PropType<CSSProperties | CSSProperties[]>;
    };
    onStartMove: {
        type: PropType<OnStartMove>;
        required: true;
    };
    onOffsetChange: {
        type: PropType<(value: number | "min" | "max", valueIndex: number) => void>;
        required: true;
    };
    onFocus: {
        type: PropType<(e: FocusEvent) => void>;
    };
    onBlur: {
        type: PropType<(e: FocusEvent) => void>;
    };
    onDelete: {
        type: PropType<(index: number) => void>;
        required: true;
    };
    handleRender: {
        type: PropType<(props: RenderProps) => any>;
    };
    activeHandleRender: {
        type: PropType<(props: RenderProps) => any>;
    };
    draggingIndex: {
        type: NumberConstructor;
        default: number;
    };
    draggingDelete: {
        type: BooleanConstructor;
        default: boolean;
    };
    onChangeComplete: PropType<() => void>;
}>> & Readonly<{
    onFocus?: ((...args: any[]) => any) | undefined;
}>, {
    draggingDelete: boolean;
    draggingIndex: number;
}, SlotsType<{
    activeHandleRender: any;
    handleRender: any;
}>, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
