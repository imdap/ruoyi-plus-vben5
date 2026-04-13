import { CSSProperties, PropType, VNode } from 'vue';
import { Components } from './hooks/useComponent';
import { BaseColorPickerProps, ColorFormatType, ColorGenInput } from './interface';
import { Color } from './color';
export interface ColorPickerProps extends Omit<BaseColorPickerProps, 'color'> {
    value?: ColorGenInput;
    defaultValue?: ColorGenInput;
    valueFormat?: ColorFormatType | ((value: Color) => string);
    class?: string;
    style?: CSSProperties;
    /** Get panel element  */
    panelRender?: (panel: VNode) => VNode;
    /** Disabled alpha selection */
    disabledAlpha?: boolean;
    components?: Components;
}
declare const ColorPicker: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    value: {
        type: PropType<ColorGenInput>;
    };
    defaultValue: {
        type: PropType<ColorGenInput>;
    };
    valueFormat: {
        type: PropType<ColorPickerProps["valueFormat"]>;
    };
    prefixCls: {
        type: StringConstructor;
    };
    onChange: {
        type: FunctionConstructor;
    };
    onChangeComplete: {
        type: FunctionConstructor;
    };
    disabledAlpha: BooleanConstructor;
    disabled: BooleanConstructor;
    panelRender: PropType<(panel: VNode) => VNode>;
    components: ObjectConstructor;
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("change" | "changeComplete" | "update:value")[], "change" | "changeComplete" | "update:value", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    value: {
        type: PropType<ColorGenInput>;
    };
    defaultValue: {
        type: PropType<ColorGenInput>;
    };
    valueFormat: {
        type: PropType<ColorPickerProps["valueFormat"]>;
    };
    prefixCls: {
        type: StringConstructor;
    };
    onChange: {
        type: FunctionConstructor;
    };
    onChangeComplete: {
        type: FunctionConstructor;
    };
    disabledAlpha: BooleanConstructor;
    disabled: BooleanConstructor;
    panelRender: PropType<(panel: VNode) => VNode>;
    components: ObjectConstructor;
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    onChangeComplete?: ((...args: any[]) => any) | undefined;
    "onUpdate:value"?: ((...args: any[]) => any) | undefined;
}>, {
    disabled: boolean;
    disabledAlpha: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default ColorPicker;
