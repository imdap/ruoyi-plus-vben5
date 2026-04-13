import { CalendarDateTime, DateValue, DateValue as DateValue$1, Time, ZonedDateTime } from "@internationalized/date";
import * as vue0 from "vue";
import { ComponentPublicInstance, DefineComponent, MaybeRef, MaybeRefOrGetter, Ref, UnwrapNestedRefs, VNode, VNodeProps } from "vue";
import { MaybeElementRef } from "@vueuse/core";
import * as _vueuse_shared11 from "@vueuse/shared";
import { ComponentProps } from "vue-component-type-helpers";

//#region src/shared/arrays.d.ts

/**
 * The function `areEqual` compares two arrays and returns true if they are equal in length and have
 * the same elements at corresponding indexes.
 * @param {any[]} arrayA - An array of any type of elements.
 * @param {any[]} arrayB - It looks like you haven't provided the value for `arrayB`. Could you please
 * provide the arrayB value so that I can assist you further?
 * @returns The function `areEqual` is returning a boolean value, either `true` if the two input arrays
 * `arrayA` and `arrayB` are equal, or `false` if they are not equal.
 */
declare function areEqual(arrayA: any[], arrayB: any[]): boolean;
/**
 * Splits an array into chunks of a given size.
 * @param arr The array to split.
 * @param size The size of each chunk.
 * @returns An array of arrays, where each sub-array has `size` elements from the original array.
 * @example ```ts
 * const arr = [1, 2, 3, 4, 5, 6, 7, 8];
 * const chunks = chunk(arr, 3);
 * // chunks = [[1, 2, 3], [4, 5, 6], [7, 8]]
 * ```
 */
declare function chunk<T>(arr: T[], size: number): T[][];
/**
 * The function `findValuesBetween` takes an array and two values, then returns a subarray containing
 * elements between the first occurrence of the start value and the first occurrence of the end value
 * in the array.
 * @param {T[]} array - The `array` parameter is an array of values of type `T`.
 * @param {T} start - The `start` parameter is the value that marks the beginning of the range you want
 * to find in the array.
 * @param {T} end - The `end` parameter in the `findValuesBetween` function represents the end value
 * that you want to find in the array. This function will return a subarray of values that are between
 * the `start` and `end` values in the original array.
 * @returns The `findValuesBetween` function returns an array of values from the input array that are
 * between the `start` and `end` values (inclusive). If either the `start` or `end` values are not
 * found in the input array, an empty array is returned.
 */
declare function findValuesBetween<T>(array: T[], start: T, end: T): T[];
//# sourceMappingURL=arrays.d.ts.map
//#endregion
//#region src/shared/browser.d.ts
declare const isBrowser: boolean;
//# sourceMappingURL=browser.d.ts.map

//#endregion
//#region src/shared/clamp.d.ts
/**
 * The `clamp` function restricts a number within a specified range by returning the value itself if it
 * falls within the range, or the closest boundary value if it exceeds the range.
 * @param {number} value - The `value` parameter represents the number that you want to clamp within
 * the specified range defined by `min` and `max` values.
 * @param {number} min - If the `value` parameter is less than the `min` value, the
 * function will return the `min` value.
 * @param {number} max - If the `value` parameter is greater than the `max` value,
 * the function will return `max`.
 * @returns The `clamp` function returns the value of `value` constrained within the range defined by
 * `min` and `max`.
 */
declare function clamp(value: number, min?: number, max?: number): number;
/**
 * The function `roundToStepPrecision` rounds a number to a specified precision step.
 * @param {number} value - The `value` parameter is the number that you want to round to a specific
 * precision based on the `step` parameter.
 * @param {number} step - The `step` parameter in the `roundToStepPrecision` function represents the
 * interval at which you want to round the `value`. For example, if `step` is 0.5, the `value` will be
 * rounded to the nearest half.
 * @returns the `roundedValue` after rounding it to the precision specified by the `step`.
 */
declare function roundToStepPrecision(value: number, step: number): number;
/**
 * The function `snapValueToStep` snaps a given value to the nearest step within a specified range.
 * @param {number} value - The `value` parameter represents the number that you want to snap to the
 * nearest step value.
 * @param {number | undefined} min - The `min` parameter represents the minimum value that the `value`
 * should be snapped to. If `value` is less than `min`, it will be snapped to `min`. If `min` is not
 * provided (undefined), then the snapping will not consider a minimum value.
 * @param {number | undefined} max - The `max` parameter represents the maximum value that the `value`
 * should be snapped to. It ensures that the snapped value does not exceed this maximum value.
 * @param {number} step - The `step` parameter in the `snapValueToStep` function represents the
 * interval at which the `value` should be snapped to. It determines the granularity of the snapping
 * operation. For example, if `step` is 5, the `value` will be snapped to the nearest multiple of
 * @returns a number that has been snapped to the nearest step value within the specified range of minimum and maximum values.
 */
declare function snapValueToStep(value: number, min: number | undefined, max: number | undefined, step: number): number;
//# sourceMappingURL=clamp.d.ts.map
//#endregion
//#region src/shared/createContext.d.ts
/**
 * @param providerComponentName - The name(s) of the component(s) providing the context.
 *
 * There are situations where context can come from multiple components. In such cases, you might need to give an array of component names to provide your context, instead of just a single string.
 *
 * @param contextName The description for injection key symbol.
 */
declare function createContext<ContextValue>(providerComponentName: string | string[], contextName?: string): readonly [<T extends ContextValue | null | undefined = ContextValue>(fallback?: T) => T extends null ? ContextValue | null : ContextValue, (contextValue: ContextValue) => ContextValue];
//# sourceMappingURL=createContext.d.ts.map
//#endregion
//#region src/shared/date/comparators.d.ts
type TimeValue = Time | CalendarDateTime | ZonedDateTime;
type Granularity = 'day' | 'hour' | 'minute' | 'second';
//#endregion
//#region src/shared/date/types.d.ts
type DateStep = {
  year?: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
};
type DateRange = {
  start: DateValue$1 | undefined;
  end: DateValue$1 | undefined;
};
type TimeRange = {
  start: TimeValue | undefined;
  end: TimeValue | undefined;
};
type HourCycle = 12 | 24 | undefined;
type DateSegmentPart = (typeof DATE_SEGMENT_PARTS)[number];
type TimeSegmentPart = (typeof TIME_SEGMENT_PARTS)[number];
type EditableSegmentPart = (typeof EDITABLE_SEGMENT_PARTS)[number];
type NonEditableSegmentPart = (typeof NON_EDITABLE_SEGMENT_PARTS)[number];
type SegmentPart = EditableSegmentPart | NonEditableSegmentPart;
type DayPeriod = 'AM' | 'PM' | null;
type DateSegmentObj = { [K in DateSegmentPart]: number | null };
type TimeSegmentObj = { [K in TimeSegmentPart]: K extends 'dayPeriod' ? DayPeriod : number | null };
type DateAndTimeSegmentObj = DateSegmentObj & TimeSegmentObj;
type SegmentValueObj = DateSegmentObj | DateAndTimeSegmentObj;
//#endregion
//#region src/shared/date/parts.d.ts
declare const DATE_SEGMENT_PARTS: readonly ["day", "month", "year"];
declare const TIME_SEGMENT_PARTS: readonly ["hour", "minute", "second", "dayPeriod"];
declare const NON_EDITABLE_SEGMENT_PARTS: readonly ["literal", "timeZoneName"];
declare const EDITABLE_SEGMENT_PARTS: readonly ["day", "month", "year", "hour", "minute", "second", "dayPeriod"];
//#endregion
//#region src/shared/getActiveElement.d.ts
declare function getActiveElement(): Element | null;
//# sourceMappingURL=getActiveElement.d.ts.map
//#endregion
//#region src/shared/handleAndDispatchCustomEvent.d.ts
declare function handleAndDispatchCustomEvent<E extends CustomEvent, OriginalEvent extends Event>(name: string, handler: ((event: E) => void) | undefined, detail: {
  originalEvent: OriginalEvent;
} & (E extends CustomEvent<infer D> ? D : never)): void;
//# sourceMappingURL=handleAndDispatchCustomEvent.d.ts.map
//#endregion
//#region src/shared/isValidVNodeElement.d.ts
/**
 * Checks whether a given VNode is a render-vialble element.
 */
declare function isValidVNodeElement(input: any): boolean;
//# sourceMappingURL=isValidVNodeElement.d.ts.map

//#endregion
//#region src/shared/isValueEqualOrExist.d.ts
/**
 * The function `isValueEqualOrExist` checks if a value is equal to or exists in another value or
 * array.
 * @param {T | T[] | undefined} base - It represents the base value that you want to compare with the `current` value.
 * @param {T | T[] | undefined} current - The `current` parameter represents the current value that you want to compare with the `base` value or values.
 * @returns The `isValueEqualOrExist` function returns a boolean value. It checks if the `base` value
 * is equal to the `current` value or if the `current` value exists within the `base` value. The
 * function handles cases where `base` can be a single value, an array of values, or undefined.
 */
declare function isValueEqualOrExist<T>(base: T | T[] | undefined, current: T | T[] | undefined): boolean;
//# sourceMappingURL=isValueEqualOrExist.d.ts.map
//#endregion
//#region src/shared/nullish.d.ts
declare function isNullish(value: any): value is null | undefined;
//# sourceMappingURL=nullish.d.ts.map
//#endregion
//#region src/shared/object.d.ts
declare function pick<T, K extends keyof T>(object: T, keys: K[]): Pick<T, K>;
declare function omit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K>;
//# sourceMappingURL=object.d.ts.map
//#endregion
//#region src/shared/onFocusOutside.d.ts
declare function onFocusOutside(element: MaybeElementRef, handler: (event: FocusEvent) => void): void;
//# sourceMappingURL=onFocusOutside.d.ts.map
//#endregion
//#region src/shared/renderSlotFragments.d.ts
declare function renderSlotFragments(children?: VNode[]): VNode[];
//# sourceMappingURL=renderSlotFragments.d.ts.map
//#endregion
//#region src/shared/trap-focus.d.ts
declare function trapFocus(element: HTMLElement): HTMLElement | undefined;
//# sourceMappingURL=trap-focus.d.ts.map
//#endregion
//#region src/shared/types.d.ts
type DataOrientation = 'vertical' | 'horizontal';
type Direction = 'ltr' | 'rtl';
type SingleOrMultipleType = 'single' | 'multiple';
interface SingleOrMultipleProps<T = AcceptableValue | AcceptableValue[]> {
  /**
   * Determines whether a "single" or "multiple" items can be selected at a time.
   *
   * This prop will overwrite the inferred type from `modelValue` and `defaultValue`.
   */
  type?: SingleOrMultipleType;
  /**
   * The controlled value of the active item(s).
   *
   * Use this when you need to control the state of the items. Can be binded with `v-model`
   */
  modelValue?: T;
  /**
   * The default active value of the item(s).
   *
   * Use when you do not need to control the state of the item(s).
   */
  defaultValue?: T;
}
/**
 * if padding or margin is number, it will be in px
 * if padding or margin is true, it will be var(--scrollbar-width)
 * otherwise, it will be passed string
 */
type ScrollBodyOption = {
  padding?: boolean | number | string;
  margin?: boolean | number | string;
};
type AcceptableValue = string | number | bigint | Record<string, any> | null;
type StringOrNumber = string | number;
type GenericComponentInstance<T> = T extends (new (...args: any[]) => infer R) ? R : T extends ((...args: any[]) => infer R) ? R extends {
  __ctx?: infer K;
} ? Exclude<K, void> extends {
  expose: (...args: infer Y) => void;
} ? Y[0] & InstanceType<DefineComponent> : any : any : any;
interface FormFieldProps {
  /** The name of the field. Submitted with its owning form as part of a name/value pair. */
  name?: string;
  /** When `true`, indicates that the user must set the value before the owning form can be submitted. */
  required?: boolean;
}
//#endregion
//#region src/shared/useArrowNavigation.d.ts
type ArrowKeyOptions = 'horizontal' | 'vertical' | 'both';
interface ArrowNavigationOptions {
  /**
   * The arrow key options to allow navigation
   *
   * @defaultValue "both"
   */
  arrowKeyOptions?: ArrowKeyOptions;
  /**
   * The attribute name to find the collection items in the parent element.
   *
   * @defaultValue "data-reka-collection-item"
   */
  attributeName?: string;
  /**
   * The parent element where contains all the collection items, this will collect every item to be used when nav
   * It will be ignored if attributeName is provided
   *
   * @defaultValue []
   */
  itemsArray?: HTMLElement[];
  /**
   * Allow loop navigation. If false, it will stop at the first and last element
   *
   * @defaultValue true
   */
  loop?: boolean;
  /**
   * The orientation of the collection
   *
   * @defaultValue "ltr"
   */
  dir?: Direction;
  /**
   * Prevent the scroll when navigating. This happens when the direction of the
   * key matches the scroll direction of any ancestor scrollable elements.
   *
   * @defaultValue true
   */
  preventScroll?: boolean;
  /**
   * By default all currentElement would trigger navigation. If `true`, currentElement nodeName in the ignore list will return null
   *
   * @defaultValue false
   */
  enableIgnoredElement?: boolean;
  /**
   * Focus the element after navigation
   *
   * @defaultValue false
   */
  focus?: boolean;
}
/**
 * Allow arrow navigation for every html element with data-reka-collection-item tag
 *
 * @param e               Keyboard event
 * @param currentElement  Event initiator element or any element that wants to handle the navigation
 * @param parentElement   Parent element where contains all the collection items, this will collect every item to be used when nav
 * @param options         further options
 * @returns               the navigated html element or null if none
 */
declare function useArrowNavigation(e: KeyboardEvent, currentElement: HTMLElement, parentElement: HTMLElement | undefined, options?: ArrowNavigationOptions): HTMLElement | null;
//#endregion
//#region src/shared/useBodyScrollLock.d.ts
declare function useBodyScrollLock(initialState?: boolean | undefined): vue0.WritableComputedRef<boolean, boolean>;
//# sourceMappingURL=useBodyScrollLock.d.ts.map
//#endregion
//#region src/shared/useDateFormatter.d.ts
interface DateFormatterOptions extends Intl.DateTimeFormatOptions {
  calendar?: string;
}
type Formatter = {
  getLocale: () => string;
  setLocale: (newLocale: string) => void;
  custom: (date: Date, options: DateFormatterOptions) => string;
  selectedDate: (date: DateValue, includeTime?: boolean) => string;
  dayOfWeek: (date: Date, length?: DateFormatterOptions['weekday']) => string;
  fullMonthAndYear: (date: Date, options?: DateFormatterOptions) => string;
  fullMonth: (date: Date, options?: DateFormatterOptions) => string;
  fullYear: (date: Date, options?: DateFormatterOptions) => string;
  dayPeriod: (date: Date) => string;
  part: (dateObj: DateValue, type: Intl.DateTimeFormatPartTypes, options?: DateFormatterOptions) => string;
  toParts: (date: DateValue, options?: DateFormatterOptions) => Intl.DateTimeFormatPart[];
  getMonths: () => {
    label: string;
    value: number;
  }[];
};
/**
 * Creates a wrapper around the `DateFormatter`, which is
 * an improved version of the {@link Intl.DateTimeFormat} API,
 * that is used internally by the various date builders to
 * easily format dates in a consistent way.
 *
 * @see [DateFormatter](https://react-spectrum.adobe.com/internationalized/date/DateFormatter.html)
 */
declare function useDateFormatter(initialLocale: string, opts?: DateFormatterOptions): Formatter;
//# sourceMappingURL=useDateFormatter.d.ts.map
//#endregion
//#region src/shared/useDirection.d.ts
/**
 * The `useDirection` function provides a way to access the current direction in your application.
 * @param {Ref<Direction | undefined>} [dir] - An optional ref containing the direction (ltr or rtl).
 * @returns  computed value that combines with the resolved direction.
 */
declare function useDirection(dir?: Ref<Direction | undefined>): vue0.ComputedRef<Direction>;
//# sourceMappingURL=useDirection.d.ts.map
//#endregion
//#region src/shared/useEmitAsProps.d.ts
/**
 * The `useEmitAsProps` function is a TypeScript utility that converts emitted events into props for a
 * Vue component.
 * @param emit - The `emit` parameter is a function that is used to emit events from a component. It
 * takes two parameters: `name` which is the name of the event to be emitted, and `...args` which are
 * the arguments to be passed along with the event.
 * @returns The function `useEmitAsProps` returns an object that maps event names to functions that
 * call the `emit` function with the corresponding event name and arguments.
 */
declare function useEmitAsProps<Name extends string>(emit: (name: Name, ...args: any[]) => void): Record<string, any>;
//# sourceMappingURL=useEmitAsProps.d.ts.map

//#endregion
//#region src/shared/useFilter.d.ts
/**
 * Provides locale-aware string filtering functions.
 * Uses `Intl.Collator` for comparison to ensure proper Unicode handling.
 *
 * @param options - Optional collator options to customize comparison behavior.
 *   See [Intl.CollatorOptions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator#options) for details.
 * @returns An object with methods to check if a string starts with, ends with, or contains a substring.
 *
 * @example
 * const { startsWith, endsWith, contains } = useFilter();
 *
 * startsWith('hello', 'he'); // true
 * endsWith('hello', 'lo'); // true
 * contains('hello', 'ell'); // true
 */
declare function useFilter(options?: MaybeRef<Intl.CollatorOptions>): {
  startsWith: (string: string, substring: string) => boolean;
  endsWith: (string: string, substring: string) => boolean;
  contains: (string: string, substring: string) => boolean;
};
//# sourceMappingURL=useFilter.d.ts.map
//#endregion
//#region src/shared/useFocusGuards.d.ts
/**
 * Injects a pair of focus guards at the edges of the whole DOM tree
 * to ensure `focusin` & `focusout` events can be caught consistently.
 */
declare function useFocusGuards(): void;
//# sourceMappingURL=useFocusGuards.d.ts.map
//#endregion
//#region src/shared/useFormControl.d.ts
declare function useFormControl(el: MaybeElementRef): vue0.ComputedRef<boolean>;
//# sourceMappingURL=useFormControl.d.ts.map
//#endregion
//#region src/shared/useForwardExpose.d.ts
declare function useForwardExpose<T extends ComponentPublicInstance>(): {
  forwardRef: (ref: Element | T | null) => void;
  currentRef: vue0.Ref<Element | T | null | undefined, Element | T | null | undefined>;
  currentElement: vue0.ComputedRef<HTMLElement>;
};
//# sourceMappingURL=useForwardExpose.d.ts.map
//#endregion
//#region src/shared/useForwardProps.d.ts
/**
 * Vue coerces optional boolean props (e.g. `foo?: boolean`) to non-optional (`foo: boolean`)
 * in the `defineProps` return type. Since `useForwardProps` only returns props that were
 * explicitly assigned, boolean-typed props should remain optional in the return type.
 */
type WithOptionalBooleans<T> = { [K in keyof T as [T[K]] extends [boolean] ? K : never]?: T[K] } & { [K in keyof T as [T[K]] extends [boolean] ? never : K]: T[K] };
/**
 * The `useForwardProps` function in TypeScript takes in a set of props and returns a computed value
 * that combines default props with assigned props from the current instance.
 * @param {T} props - The `props` parameter is an object that represents the props passed to a
 * component.
 * @returns computed value that combines the default props, preserved props, and assigned props.
 */
declare function useForwardProps<T extends Record<string, any>>(props: MaybeRefOrGetter<T>): vue0.ComputedRef<WithOptionalBooleans<T>>;
//#endregion
//#region src/shared/useForwardPropsEmits.d.ts
/**
 * The function `useForwardPropsEmits` takes in props and an optional emit function, and returns a
 * computed object that combines the parsed props and emits as props.
 * @param {T} props - The `props` parameter is of type `T`, which is a generic type that extends the
 * parameters of the `useForwardProps` function. It represents the props object that is passed to the
 * `useForwardProps` function.
 * @param [emit] - The `emit` parameter is a function that can be used to emit events. It takes two
 * arguments: `name`, which is the name of the event to be emitted, and `args`, which are the arguments
 * to be passed along with the event.
 * @returns a computed property that combines the parsed
 * props and emits as props.
 */
declare function useForwardPropsEmits<T extends Record<string, any>, Name extends string>(props: MaybeRefOrGetter<T>, emit?: (name: Name, ...args: any[]) => void): vue0.ComputedRef<{ [K in keyof T as [T[K]] extends [boolean] ? K : never]?: T[K] | undefined } & { [K_1 in keyof T as [T[K_1]] extends [boolean] ? never : K_1]: T[K_1] } & Record<string, any>>;
//# sourceMappingURL=useForwardPropsEmits.d.ts.map
//#endregion
//#region src/shared/useForwardRef.d.ts
declare function useForwardRef(): (ref: Element | ComponentPublicInstance | null) => void;
//# sourceMappingURL=useForwardRef.d.ts.map
//#endregion
//#region src/shared/useGraceArea.d.ts
declare function useGraceArea(triggerElement: Ref<HTMLElement | undefined>, containerElement: Ref<HTMLElement | undefined>): {
  isPointerInTransit: _vueuse_shared11.RefAutoResetReturn<boolean>;
  onPointerExit: _vueuse_shared11.EventHookOn<void>;
};
//# sourceMappingURL=useGraceArea.d.ts.map

//#endregion
//#region src/shared/useHideOthers.d.ts
/**
 * The `useHideOthers` function is a TypeScript function that takes a target element reference and
 * hides all other elements in ARIA when the target element is present, and restores the visibility of the
 * hidden elements when the target element is removed.
 * @param {MaybeElementRef} target - The `target` parameter is a reference to the element that you want
 * to hide other elements when it is clicked or focused.
 */
declare function useHideOthers(target: MaybeElementRef): void;
//# sourceMappingURL=useHideOthers.d.ts.map
//#endregion
//#region src/shared/useId.d.ts
/**
 * The `useId` function generates a unique identifier using a provided deterministic ID or a default
 * one prefixed with "reka-", or the provided one via `useId` props from `<ConfigProvider>`.
 * @param {string | null | undefined} [deterministicId] - The `useId` function you provided takes an
 * optional parameter `deterministicId`, which can be a string, null, or undefined. If
 * `deterministicId` is provided, the function will return it. Otherwise, it will generate an id using
 * the `useId` function obtained
 */
declare function useId(deterministicId?: string | null | undefined, prefix?: string): string;
//# sourceMappingURL=useId.d.ts.map
//#endregion
//#region src/shared/useKbd.d.ts
declare function useKbd(): {
  ALT: string;
  ARROW_DOWN: string;
  ARROW_LEFT: string;
  ARROW_RIGHT: string;
  ARROW_UP: string;
  BACKSPACE: string;
  CAPS_LOCK: string;
  CONTROL: string;
  DELETE: string;
  END: string;
  ENTER: string;
  ESCAPE: string;
  F1: string;
  F10: string;
  F11: string;
  F12: string;
  F2: string;
  F3: string;
  F4: string;
  F5: string;
  F6: string;
  F7: string;
  F8: string;
  F9: string;
  HOME: string;
  META: string;
  PAGE_DOWN: string;
  PAGE_UP: string;
  SHIFT: string;
  SPACE: string;
  TAB: string;
  CTRL: string;
  ASTERISK: string;
  SPACE_CODE: string;
};
/**
 * A wrapper around the internal kbd object to make it easier to use in tests
 * which require the key names to be wrapped in curly braces.
 */

declare function useTestKbd(): {
  SHIFT_TAB: string;
  F1: string;
  F10: string;
  F11: string;
  F12: string;
  F2: string;
  F3: string;
  F4: string;
  F5: string;
  F6: string;
  F7: string;
  F8: string;
  F9: string;
  ALT: string;
  ARROW_DOWN: string;
  ARROW_LEFT: string;
  ARROW_RIGHT: string;
  ARROW_UP: string;
  BACKSPACE: string;
  CAPS_LOCK: string;
  CONTROL: string;
  DELETE: string;
  END: string;
  ENTER: string;
  ESCAPE: string;
  HOME: string;
  META: string;
  PAGE_DOWN: string;
  PAGE_UP: string;
  SHIFT: string;
  SPACE: string;
  TAB: string;
  CTRL: string;
  ASTERISK: string;
  SPACE_CODE: string;
};
//# sourceMappingURL=useKbd.d.ts.map
//#endregion
//#region src/shared/useLocale.d.ts
/**
 * The `useLocale` function provides a way to access the current locale in your application.
 * @param {Ref<string | undefined>} [locale] - An optional ref containing the locale.
 * @returns A computed ref holding the resolved locale.
 */
declare function useLocale(locale?: Ref<string | undefined>): vue0.ComputedRef<string>;
//# sourceMappingURL=useLocale.d.ts.map
//#endregion
//#region src/shared/useSelectionBehavior.d.ts
declare function useSelectionBehavior<T>(modelValue: Ref<T | T[]>, props: UnwrapNestedRefs<{
  multiple?: boolean;
  selectionBehavior?: 'toggle' | 'replace';
}>): {
  firstValue: Ref<any, any>;
  onSelectItem: (val: T, condition: (existingValue: T) => boolean) => T | T[];
  handleMultipleReplace: (intent: "first" | "last" | "prev" | "next", currentElement: HTMLElement | Element | null, getItems: () => {
    ref: HTMLElement;
    value?: any;
  }[], options: any[]) => void;
};
//# sourceMappingURL=useSelectionBehavior.d.ts.map
//#endregion
//#region src/shared/useSize.d.ts
declare function useSize(element: MaybeElementRef): {
  width: vue0.ComputedRef<number>;
  height: vue0.ComputedRef<number>;
};
//# sourceMappingURL=useSize.d.ts.map
//#endregion
//#region src/shared/useStateMachine.d.ts
interface Machine<S> {
  [k: string]: {
    [k: string]: S;
  };
}
type MachineState<T> = keyof T;
type MachineEvent<T> = keyof UnionToIntersection<T[keyof T]>;
type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends ((x: infer R) => any) ? R : never;
/**
 * The `useStateMachine` function is a TypeScript function that creates a state machine and returns the
 * current state and a dispatch function to update the state based on events.
 * @param initialState - The `initialState` parameter is the initial state of the state machine. It
 * represents the starting point of the state machine's state.
 * @param machine - The `machine` parameter is an object that represents a state machine. It should
 * have keys that correspond to the possible states of the machine, and the values should be objects
 * that represent the possible events and their corresponding next states.
 * @returns The `useStateMachine` function returns an object with two properties: `state` and
 * `dispatch`.
 */
declare function useStateMachine<M>(initialState: MachineState<M>, machine: M & Machine<MachineState<M>>): {
  state: Ref<keyof M, keyof M>;
  dispatch: (event: MachineEvent<M>) => void;
};
//#endregion
//#region src/shared/useTypeahead.d.ts
declare function useTypeahead(callback?: (search: string) => void): {
  search: _vueuse_shared11.RefAutoResetReturn<string>;
  handleTypeaheadSearch: (key: string, items: {
    ref: HTMLElement;
    value?: any;
  }[]) => HTMLElement | undefined;
  resetTypeahead: () => void;
};
/**
 * Wraps an array around itself at a given start index
 * Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
 */
//#endregion
//#region src/shared/withDefault.d.ts
type RawProps = VNodeProps & {
  __v_isVNode?: never;
  [Symbol.iterator]?: never;
} & Record<string, any>;
interface MountingOptions<Props> {
  /**
   * Default props for the component
   */
  props?: (RawProps & Props) | ({} extends Props ? null : never) | ((attrs: Record<string, any>) => (RawProps & Props));
  /**
   * Pass attributes into the component
   */
  attrs?: Record<string, unknown>;
}
declare function withDefault<T, C = (T extends ((...args: any) => any) | (new (...args: any) => any) ? T : T extends {
  props?: infer Props;
} ? DefineComponent<Props extends Readonly<(infer PropNames)[]> | (infer PropNames)[] ? { [key in PropNames extends string ? PropNames : string]?: any } : Props> : DefineComponent), P extends ComponentProps<C> = ComponentProps<C>>(originalComponent: T, options?: MountingOptions<P>): T;
//#endregion
export { AcceptableValue, DataOrientation, DateRange, DateStep, DateValue$1 as DateValue, Direction, FormFieldProps, Formatter, GenericComponentInstance, Granularity, HourCycle, ScrollBodyOption, SegmentPart, SegmentValueObj, SingleOrMultipleProps, SingleOrMultipleType, StringOrNumber, TimeRange, TimeValue, areEqual, chunk, clamp, createContext, findValuesBetween, getActiveElement, handleAndDispatchCustomEvent, isBrowser, isNullish, isValidVNodeElement, isValueEqualOrExist, omit, onFocusOutside, pick, renderSlotFragments, roundToStepPrecision, snapValueToStep, trapFocus, useArrowNavigation, useBodyScrollLock, useDateFormatter, useDirection, useEmitAsProps, useFilter, useFocusGuards, useFormControl, useForwardExpose, useForwardProps, useForwardPropsEmits, useForwardRef, useGraceArea, useHideOthers, useId, useKbd, useLocale, useSelectionBehavior, useSize, useStateMachine, useTestKbd, useTypeahead, withDefault };
//# sourceMappingURL=index3.d.cts.map