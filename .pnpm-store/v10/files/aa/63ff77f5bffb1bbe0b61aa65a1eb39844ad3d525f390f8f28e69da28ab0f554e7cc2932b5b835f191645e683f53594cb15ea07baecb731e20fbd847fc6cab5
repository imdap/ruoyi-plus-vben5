import { BaseInfo, PanelMode, SharedPickerProps, SharedTimeProps, ValueDate } from '../interface';
export interface BasePickerProps<DateType extends object = any> extends SharedPickerProps<DateType> {
    id?: string;
    /** Not support `time` or `datetime` picker */
    multiple?: boolean;
    removeIcon?: any;
    /** Only work when `multiple` is in used */
    maxTagCount?: number | 'responsive';
    value?: DateType | DateType[] | string | string[] | null;
    defaultValue?: DateType | DateType[] | string | string[];
    onChange?: (date: DateType | DateType[] | string | string[] | null, dateString: string | string[]) => void;
    onCalendarChange?: (date: DateType | DateType[] | string | string[], dateString: string | string[], info: BaseInfo) => void;
    /**  */
    onOk?: (value?: DateType | DateType[] | string | string[]) => void;
    placeholder?: string;
    /**
     * Config the popup panel date.
     * Every time active the input to open popup will reset with `defaultPickerValue`.
     *
     * Note: `defaultPickerValue` priority is higher than `value` for the first open.
     */
    defaultPickerValue?: DateType | string | null;
    /**
     * Config each start & end field popup panel date.
     * When config `pickerValue`, you must also provide `onPickerValueChange` to handle changes.
     */
    pickerValue?: DateType | string | null;
    /**
     * Each popup panel `pickerValue` change will trigger the callback.
     * @param date The changed picker value
     * @param info.source `panel` from the panel click. `reset` from popup open or field typing.
     */
    onPickerValueChange?: (date: DateType, info: {
        source: 'reset' | 'panel';
        mode: PanelMode;
    }) => void;
    presets?: ValueDate<DateType>[];
    disabled?: boolean;
    mode?: PanelMode;
    onPanelChange?: (values: DateType, modes: PanelMode) => void;
}
export interface PickerProps<DateType extends object = any> extends BasePickerProps<DateType>, Omit<SharedTimeProps<DateType>, 'format' | 'defaultValue'> {
    use12Hours?: boolean;
}
declare const SinglePicker: import('vue').DefineSetupFnComponent<PickerProps<any>, {}, {}, PickerProps<any> & {}, import('vue').PublicProps>;
export default SinglePicker;
