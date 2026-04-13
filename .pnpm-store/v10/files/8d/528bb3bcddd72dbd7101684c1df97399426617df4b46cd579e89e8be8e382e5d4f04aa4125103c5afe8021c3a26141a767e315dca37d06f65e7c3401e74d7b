import { AnyObject } from "../../_util/type.js";
import { SemanticClassNamesType, SemanticStylesType } from "../../_util/hooks/useMergeSemantic.js";
import "../../_util/hooks/index.js";
import { SizeType } from "../../config-provider/SizeContext.js";
import { InputStatus } from "../../_util/statusUtils.js";
import { TimePickerLocale } from "../../time-picker/index.js";
import { Variant } from "../../config-provider/context.js";
import { CSSProperties, Ref } from "vue";
import { Locale, PickerProps as PickerProps$1, PickerRef, RangePickerProps as RangePickerProps$1 } from "@v-c/picker";

//#region src/date-picker/generatePicker/interface.d.ts
declare const _DataPickerPlacements: readonly ["bottomLeft", "bottomRight", "topLeft", "topRight"];
type DataPickerPlacement = (typeof _DataPickerPlacements)[number];
type DatePickerSemanticName = keyof DatePickerSemanticClassNames & keyof DatePickerSemanticStyles;
type DatePickerPanelSemanticName = keyof DatePickerPanelSemanticClassNames & keyof DatePickerPanelSemanticStyles;
interface DatePickerSemanticClassNames {
  root?: string;
  prefix?: string;
  input?: string;
  suffix?: string;
}
interface DatePickerSemanticStyles {
  root?: CSSProperties;
  prefix?: CSSProperties;
  input?: CSSProperties;
  suffix?: CSSProperties;
}
interface DatePickerPanelSemanticClassNames {
  root?: string;
  header?: string;
  body?: string;
  content?: string;
  item?: string;
  footer?: string;
  container?: string;
}
interface DatePickerPanelSemanticStyles {
  root?: CSSProperties;
  header?: CSSProperties;
  body?: CSSProperties;
  content?: CSSProperties;
  item?: CSSProperties;
  footer?: CSSProperties;
  container?: CSSProperties;
}
type DatePickerClassNamesType<P> = SemanticClassNamesType<InjectDefaultProps<P>, DatePickerSemanticClassNames, {
  popup?: string | DatePickerPanelSemanticClassNames;
}>;
type DatePickerStylesType<P> = SemanticStylesType<InjectDefaultProps<P>, DatePickerSemanticStyles, {
  popup?: DatePickerPanelSemanticStyles;
}>;
type PickerLocale = {
  lang: Locale & AdditionalPickerLocaleLangProps;
  timePickerLocale: TimePickerLocale;
} & AdditionalPickerLocaleProps;
/** @deprecated **Useless**. */
interface AdditionalPickerLocaleProps {
  /**
   * @deprecated **Invalid**, Please use `lang.fieldDateFormat` instead.
   * @see [Migration Guide](https://github.com/ant-design/ant-design/discussions/53011)
   */
  dateFormat?: string;
  /**
   * @deprecated **Invalid**, Please use `lang.fieldDateTimeFormat` instead,
   * @see [Migration Guide](https://github.com/ant-design/ant-design/discussions/53011)
   */
  dateTimeFormat?: string;
  /**
   * @deprecated **Invalid**, Please use `lang.fieldWeekFormat` instead,
   * @see [Migration Guide](https://github.com/ant-design/ant-design/discussions/53011)
   */
  weekFormat?: string;
  /**
   * @deprecated **Invalid**, Please use `lang.fieldWeekFormat` instead,
   * @see [Migration Guide](https://github.com/ant-design/ant-design/discussions/53011)
   */
  monthFormat?: string;
}
interface AdditionalPickerLocaleLangProps {
  placeholder: string;
  yearPlaceholder?: string;
  quarterPlaceholder?: string;
  monthPlaceholder?: string;
  weekPlaceholder?: string;
  rangeYearPlaceholder?: [string, string];
  rangeQuarterPlaceholder?: [string, string];
  rangeMonthPlaceholder?: [string, string];
  rangeWeekPlaceholder?: [string, string];
  rangePlaceholder?: [string, string];
}
type RequiredSemanticPicker = Readonly<[classes: Ref<DatePickerSemanticClassNames & {
  popup: DatePickerPanelSemanticClassNames;
}>, styles: Ref<DatePickerSemanticStyles & {
  popup: DatePickerPanelSemanticStyles;
}>]>;
type RcEventKeys = 'onChange' | 'onCalendarChange' | 'onPanelChange' | 'onOpenChange' | 'onOk' | 'onSelect' | 'onFocus' | 'onBlur' | 'onKeyDown' | 'onClick' | 'onMouseDown' | 'onMouseEnter' | 'onMouseLeave';
type InjectDefaultProps<Props> = Omit<Props, 'locale' | 'generateConfig' | 'hideHeader' | 'classNames' | 'styles' | RcEventKeys | 'className' | 'style' | 'rootClassName'> & {
  locale?: PickerLocale;
  size?: SizeType;
  placement?: DataPickerPlacement; /** @deprecated Use `variant` instead */
  bordered?: boolean;
  status?: InputStatus;
  /**
   * @since 5.13.0
   * @default "outlined"
   */
  variant?: Variant;
  /**
   * @deprecated `dropdownClassName` is deprecated which will be removed in next major
   *   version.Please use `classes.popup.root` instead.
   */
  dropdownClassName?: string;
  /**
   * @deprecated please use `classes.popup.root` instead
   */
  popupClassName?: string;
  rootClass?: string;
  /**
   * @deprecated please use `styles.popup.root` instead
   */
  popupStyle?: CSSProperties;
  classes?: DatePickerClassNamesType<Props>;
  styles?: DatePickerStylesType<Props>;
};
interface BaseDefaultProps<Props> {
  locale?: PickerLocale;
  size?: SizeType;
  placement?: DataPickerPlacement;
  /** @deprecated Use `variant` instead */
  bordered?: boolean;
  status?: InputStatus;
  /**
   * @since 5.13.0
   * @default "outlined"
   */
  variant?: Variant;
  /**
   * @deprecated `dropdownClassName` is deprecated which will be removed in next major
   *   version.Please use `classes.popup.root` instead.
   */
  dropdownClassName?: string;
  /**
   * @deprecated please use `classes.popup.root` instead
   */
  popupClassName?: string;
  rootClass?: string;
  /**
   * @deprecated please use `styles.popup.root` instead
   */
  popupStyle?: CSSProperties;
  classes?: DatePickerClassNamesType<Props>;
  styles?: DatePickerStylesType<Props>;
}
/** Base Single Picker props */
interface PickerProps<DateType extends AnyObject = any> extends BaseDefaultProps<DateType>, Omit<PickerProps$1, 'placement' | 'locale' | 'generateConfig' | 'hideHeader' | 'classNames' | 'styles' | RcEventKeys | 'className' | 'style' | 'rootClassName'> {}
/** Base Range Picker props */
interface RangePickerProps<DateType extends AnyObject = any> extends BaseDefaultProps<DateType>, Omit<RangePickerProps$1<DateType>, 'placement' | 'locale' | 'generateConfig' | 'hideHeader' | 'classNames' | 'styles' | RcEventKeys | 'className' | 'style' | 'rootClassName'> {}
type GenericTimePickerProps<DateType extends AnyObject = any> = Omit<PickerProps<DateType>, 'picker' | 'showTime'>;
type MultiValueType<ValueType, IsMultiple extends boolean = false> = IsMultiple extends true ? ValueType[] : ValueType;
/**
 * Single Picker has the `multiple` prop,
 * which will make the `value` be `DateType[]` type.
 * Here to be a generic which accept the `ValueType` for developer usage.
 */
type PickerPropsWithMultiple<DateType extends AnyObject = any, InnerPickerProps extends PickerProps<DateType> = PickerProps<DateType>, ValueType = DateType, IsMultiple extends boolean = false> = Omit<InnerPickerProps, 'defaultValue' | 'value' | 'onChange' | 'onOk'> & {
  multiple?: IsMultiple;
  defaultValue?: MultiValueType<ValueType, IsMultiple> | null;
  value?: MultiValueType<ValueType, IsMultiple> | null;
};
//#endregion
export { AdditionalPickerLocaleLangProps, AdditionalPickerLocaleProps, BaseDefaultProps, DatePickerClassNamesType, DatePickerPanelSemanticClassNames, DatePickerPanelSemanticName, DatePickerPanelSemanticStyles, DatePickerSemanticClassNames, DatePickerSemanticName, DatePickerSemanticStyles, DatePickerStylesType, GenericTimePickerProps, InjectDefaultProps, PickerLocale, PickerProps, PickerPropsWithMultiple, type PickerRef, RangePickerProps, RequiredSemanticPicker };