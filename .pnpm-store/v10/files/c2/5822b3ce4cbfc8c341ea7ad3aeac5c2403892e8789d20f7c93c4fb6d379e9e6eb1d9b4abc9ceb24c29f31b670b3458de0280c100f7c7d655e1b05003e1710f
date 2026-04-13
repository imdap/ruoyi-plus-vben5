import { Ref } from 'vue';
import { ColorFormatType, ColorGenInput, ColorValueType, HsbaColorType, TransformOffset } from './interface';
import { Color } from './color';
export declare const ColorPickerPrefixCls = "vc-color-picker";
export declare function generateColor(color: ColorGenInput): Color;
export declare const defaultColor: Color;
export declare function formatColorValue(color: Color, valueFormat?: ColorFormatType | ((value: Color) => string)): ColorValueType;
export declare function calculateColor(props: {
    offset: TransformOffset;
    containerRef: Ref<HTMLDivElement>;
    targetRef: Ref<{
        transformDomRef: HTMLDivElement;
    }>;
    color?: Color;
    type?: HsbaColorType;
}): Color;
export declare function calcOffset(color: Color, type?: HsbaColorType): {
    x: number;
    y: number;
};
