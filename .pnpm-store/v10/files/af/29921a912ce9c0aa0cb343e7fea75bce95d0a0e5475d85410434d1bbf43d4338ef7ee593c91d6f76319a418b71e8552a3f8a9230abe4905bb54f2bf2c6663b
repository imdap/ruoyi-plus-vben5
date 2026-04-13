import { Color } from './color';
export interface HSB {
    h: number | string;
    s: number | string;
    b: number | string;
}
export interface RGB {
    r: number | string;
    g: number | string;
    b: number | string;
}
export interface HSBA extends HSB {
    a: number;
}
export interface RGBA extends RGB {
    a: number;
}
export type ColorGenInput<T = Color> = string | number | RGB | RGBA | HSB | HSBA | T;
export type ColorValueType<T = Color> = T | string;
export type ColorFormatType = 'hex' | 'rgb' | 'hsb';
export type HsbaColorType = 'hue' | 'alpha';
export interface TransformOffset {
    x: number;
    y: number;
}
export interface BaseColorPickerProps {
    color: Color;
    prefixCls?: string;
    disabled?: boolean;
    onChange?: (color: ColorValueType, info?: {
        type?: HsbaColorType;
        value?: number;
    }) => void;
    onChangeComplete?: (value: ColorValueType, info?: {
        type?: HsbaColorType;
        value?: number;
    }) => void;
}
