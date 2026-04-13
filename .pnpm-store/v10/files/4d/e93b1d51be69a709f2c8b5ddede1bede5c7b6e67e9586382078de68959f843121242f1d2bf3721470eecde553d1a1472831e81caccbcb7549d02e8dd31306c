import { VueNode } from '../../../util/src/type';
import { BaseInfo, PanelMode, RangeTimeProps, SharedPickerProps, ValueDate } from '../interface';
import { SelectorIdType } from './Selector/RangeSelector';
export interface BaseRangePickerProps<DateType extends object> extends Omit<SharedPickerProps<DateType>, 'showTime' | 'id'> {
    id?: SelectorIdType;
    separator?: VueNode;
    value?: RangeValueType<DateType | string> | null;
    defaultValue?: RangeValueType<DateType | string>;
    onChange?: (dates: NoUndefinedRangeValueType<DateType | string> | null, dateStrings: [string, string]) => void;
    onCalendarChange?: (dates: NoUndefinedRangeValueType<DateType | string>, dateStrings: [string, string], info: BaseInfo) => void;
    onOk?: (values: NoUndefinedRangeValueType<DateType | string>) => void;
    placeholder?: [string, string];
    /**
     * Config the popup panel date.
     * Every time active the input to open popup will reset with `defaultPickerValue`.
     *
     * Note: `defaultPickerValue` priority is higher than `value` for the first open.
     */
    defaultPickerValue?: [DateType | string, DateType | string] | DateType | string | null;
    /**
     * Config each start & end field popup panel date.
     * When config `pickerValue`, you must also provide `onPickerValueChange` to handle changes.
     */
    pickerValue?: [DateType | string, DateType | string] | DateType | string | null;
    /**
     * Each popup panel `pickerValue` includes `mode` change will trigger the callback.
     * @param date The changed picker value
     * @param info.source `panel` from the panel click. `reset` from popup open or field typing
     * @param info.mode Next `mode` panel
     */
    onPickerValueChange?: (date: [DateType, DateType], info: BaseInfo & {
        source: 'reset' | 'panel';
        mode: [PanelMode, PanelMode];
    }) => void;
    presets?: ValueDate<Exclude<RangeValueType<DateType>, null>>[];
    /** @deprecated Please use `presets` instead */
    ranges?: Record<string, Exclude<RangeValueType<DateType>, null> | (() => Exclude<RangeValueType<DateType>, null>)>;
    disabled?: boolean | [boolean, boolean];
    allowEmpty?: boolean | [boolean, boolean];
    showTime?: boolean | RangeTimeProps<DateType>;
    mode?: [startMode: PanelMode, endMode: PanelMode];
    /** Trigger on each `mode` or `pickerValue` changed. */
    onPanelChange?: (values: NoUndefinedRangeValueType<DateType>, modes: [startMode: PanelMode, endMode: PanelMode]) => void;
}
export interface RangePickerProps<DateType extends object = any> extends BaseRangePickerProps<DateType>, Omit<RangeTimeProps<DateType>, 'format' | 'defaultValue' | 'defaultOpenValue'> {
}
export type RangeValueType<DateType> = [
    start: DateType | null | undefined,
    end: DateType | null | undefined
];
export type NoUndefinedRangeValueType<DateType> = [start: DateType | null, end: DateType | null];
declare const RangePicker: import('vue').DefineSetupFnComponent<RangePickerProps<any>, import('vue').EmitsOptions, {}, RangePickerProps<any> & ({
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
} | {
    [x: `on${Capitalize<string>}`]: ((...args: never) => any) | undefined;
}), import('vue').PublicProps>;
export default RangePicker;
