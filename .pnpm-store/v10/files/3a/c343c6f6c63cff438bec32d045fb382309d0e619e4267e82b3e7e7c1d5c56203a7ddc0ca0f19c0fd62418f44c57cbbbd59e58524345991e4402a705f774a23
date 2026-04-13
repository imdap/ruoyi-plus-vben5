import { SemanticClassNamesType, SemanticStylesType } from "../_util/hooks/useMergeSemantic.js";
import { Orientation } from "../_util/hooks/useOrientation.js";
import "../_util/hooks/index.js";
import { SizeType } from "../config-provider/SizeContext.js";
import { AbstractCheckboxProps, CheckboxEmits } from "../checkbox/Checkbox.js";
import { AbstractCheckboxGroupProps, CheckboxOptionType } from "../checkbox/Group.js";
import { CSSProperties } from "vue";

//#region src/radio/interface.d.ts
type RadioGroupButtonStyle = 'outline' | 'solid';
type RadioGroupOptionType = 'default' | 'button';
interface RadioGroupProps extends AbstractCheckboxGroupProps {
  defaultValue?: any;
  value?: any;
  size?: SizeType;
  disabled?: boolean;
  name?: string;
  id?: string;
  optionType?: RadioGroupOptionType;
  orientation?: Orientation;
  buttonStyle?: RadioGroupButtonStyle;
  block?: boolean;
  vertical?: boolean;
  labelRender?: (params: {
    item: CheckboxOptionType;
    index: number;
  }) => any;
  'onUpdate:value'?: (value: any) => void;
}
interface RadioGroupEmits {
  'change': (e: RadioChangeEvent) => void;
  'mouseenter': (e: MouseEvent) => void;
  'mouseleave': (e: MouseEvent) => void;
  'focus': (e: FocusEvent) => void;
  'blur': (e: FocusEvent) => void;
}
interface RadioGroupSlots {
  default: () => any;
  labelRender: (params: {
    item: CheckboxOptionType;
    index: number;
  }) => any;
}
interface RadioGroupContextProps {
  onChange: (e: RadioChangeEvent) => void;
  value: any;
  disabled?: boolean;
  name?: string;
  /**
   * Control the appearance for Radio to display as button or not
   *
   * @default 'default'
   * @internal
   */
  optionType?: RadioGroupOptionType;
  block?: boolean;
}
type RadioSemanticName = keyof RadioSemanticClassNames & keyof RadioSemanticStyles;
interface RadioSemanticClassNames {
  root?: string;
  icon?: string;
  label?: string;
}
interface RadioSemanticStyles {
  root?: CSSProperties;
  icon?: CSSProperties;
  label?: CSSProperties;
}
type RadioClassNamesType = SemanticClassNamesType<RadioProps, RadioSemanticClassNames>;
type RadioStylesType = SemanticStylesType<RadioProps, RadioSemanticStyles>;
interface RadioProps extends AbstractCheckboxProps {
  /**
   * Control the appearance for Radio to display as button or not
   *
   * @default 'default'
   * @internal
   */
  optionType?: RadioGroupOptionType;
  classes?: RadioClassNamesType;
  styles?: RadioStylesType;
}
interface RadioEmits extends CheckboxEmits {}
interface RadioSlots {
  default?: () => any;
}
interface RadioChangeEventTarget extends RadioProps {
  checked: boolean;
}
interface RadioChangeEvent {
  target: RadioChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}
type RadioOptionTypeContextProps = RadioGroupOptionType;
//#endregion
export { RadioChangeEvent, RadioChangeEventTarget, RadioClassNamesType, RadioEmits, RadioGroupButtonStyle, RadioGroupContextProps, RadioGroupEmits, RadioGroupOptionType, RadioGroupProps, RadioGroupSlots, RadioOptionTypeContextProps, RadioProps, RadioSemanticClassNames, RadioSemanticName, RadioSemanticStyles, RadioSlots, RadioStylesType };