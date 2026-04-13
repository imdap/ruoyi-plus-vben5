import { VueNode } from "../_util/type.js";
import { SemanticClassNamesType, SemanticStylesType } from "../_util/hooks/useMergeSemantic.js";
import "../_util/hooks/index.js";
import { SizeType } from "../config-provider/SizeContext.js";
import { TooltipPlacement } from "../tooltip/index.js";
import { PopoverProps } from "../popover/index.js";
import { AggregationColor } from "./color.js";
import { CSSProperties } from "vue";
import { ColorGenInput, ColorPickerProps as ColorPickerProps$1 } from "@v-c/color-picker";
import { Key } from "@v-c/util/dist/type";

//#region src/color-picker/interface.d.ts
type Colors<T> = {
  color: ColorGenInput<T>;
  percent: number;
}[];
declare const FORMAT_HEX = "hex";
declare const FORMAT_RGB = "rgb";
declare const FORMAT_HSB = "hsb";
type ColorFormatType = typeof FORMAT_HEX | typeof FORMAT_RGB | typeof FORMAT_HSB;
type ColorValueFormatType = ColorFormatType | ((value: AggregationColor) => string);
interface PresetsItem {
  label: VueNode;
  colors: (string | AggregationColor)[];
  /**
   * Whether the initial state is collapsed
   * @since 5.11.0
   * @default true
   */
  defaultOpen?: boolean;
  /**
   * The key of the panel
   * @since 5.23.0
   */
  key?: Key;
}
type TriggerType = 'click' | 'hover';
type TriggerPlacement = TooltipPlacement;
type SingleValueType = AggregationColor | string;
type LineGradientType = {
  color: SingleValueType;
  percent: number;
}[];
type ColorValueType = SingleValueType | null | LineGradientType;
type ModeType = 'single' | 'gradient';
type ColorPickerSemanticName = keyof ColorPickerSemanticClassNames & keyof ColorPickerSemanticStyles;
interface ColorPickerSemanticClassNames {
  root?: string;
  body?: string;
  content?: string;
  description?: string;
}
interface ColorPickerSemanticStyles {
  root?: CSSProperties;
  body?: CSSProperties;
  content?: CSSProperties;
  description?: CSSProperties;
}
type ColorPickerClassNamesType = SemanticClassNamesType<ColorPickerProps, ColorPickerSemanticClassNames, {
  popup?: {
    root?: string;
  };
}>;
type ColorPickerStylesType = SemanticStylesType<ColorPickerProps, ColorPickerSemanticStyles, {
  popup?: {
    root?: CSSProperties;
  };
  popupOverlayInner?: CSSProperties;
}>;
type ColorPickerProps = Omit<ColorPickerProps$1, 'onChange' | 'onChangeComplete' | 'value' | 'defaultValue' | 'valueFormat' | 'panelRender' | 'disabledAlpha' | 'components'> & {
  mode?: ModeType | ModeType[];
  value?: ColorValueType;
  defaultValue?: ColorValueType;
  open?: boolean;
  disabled?: boolean;
  placement?: TriggerPlacement;
  trigger?: TriggerType;
  format?: ColorFormatType;
  defaultFormat?: ColorFormatType;
  valueFormat?: ColorValueFormatType;
  allowClear?: boolean;
  presets?: PresetsItem[];
  arrow?: boolean | {
    pointAtCenter?: boolean;
  };
  panelRender?: (params: {
    panel: any;
    extra: {
      components: {
        Picker: any;
        Presets: any;
      };
    };
  }) => any;
  showText?: boolean | ((params: {
    color: AggregationColor;
  }) => any);
  size?: SizeType;
  classes?: ColorPickerClassNamesType;
  styles?: ColorPickerStylesType;
  rootClass?: string;
  disabledAlpha?: boolean;
  disabledFormat?: boolean;
  [key: `data-${string}`]: string;
} & Pick<PopoverProps, 'getPopupContainer' | 'autoAdjustOverflow' | 'destroyOnHidden'>;
interface ColorPickerEmits {
  'change': (value: AggregationColor, css: string) => void;
  'clear': () => void;
  'changeComplete': (value: AggregationColor) => void;
  'openChange': (open: boolean) => void;
  'update:open': (open: boolean) => void;
  'formatChange': (format?: ColorFormatType) => void;
  'update:value': (value: ColorValueType) => void;
  'update:format': (format: ColorFormatType) => void;
}
interface ColorPickerSlots {
  panelRender: (params: {
    panel: any;
    extra: {
      components: {
        Picker: any;
        Presets: any;
      };
    };
  }) => any;
  showText: (params: {
    color: AggregationColor;
  }) => any;
  default: () => any;
}
//#endregion
export { ColorFormatType, type ColorGenInput, ColorPickerClassNamesType, ColorPickerEmits, ColorPickerProps, ColorPickerSemanticClassNames, ColorPickerSemanticName, ColorPickerSemanticStyles, ColorPickerSlots, ColorPickerStylesType, ColorValueFormatType, ColorValueType, Colors, FORMAT_HEX, FORMAT_HSB, FORMAT_RGB, LineGradientType, ModeType, PresetsItem, SingleValueType, TriggerPlacement, TriggerType };