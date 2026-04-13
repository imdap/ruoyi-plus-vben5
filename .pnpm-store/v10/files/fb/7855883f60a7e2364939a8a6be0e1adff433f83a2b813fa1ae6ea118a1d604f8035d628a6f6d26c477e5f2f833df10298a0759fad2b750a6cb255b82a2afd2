import { ComputedRef, Ref } from 'vue';
import { GenerateConfig } from '../../generate';
import { BaseInfo, FormatType, Locale } from '../../interface';
type TriggerCalendarChange<ValueType extends object[]> = (calendarValues: ValueType) => void;
/**
 * Control the internal `value` align with prop `value` and provide a temp `calendarValue` for ui.
 * `calendarValue` will be reset when blur & focus & open.
 */
export declare function useInnerValue<ValueType extends DateType[], DateType extends object = any>(generateConfig: Ref<GenerateConfig<DateType>>, locale: Ref<Locale>, formatList: Ref<FormatType[]>, rangeValue: Ref<boolean | undefined>, order: Ref<boolean | undefined>, defaultValue: Ref<ValueType | undefined>, value: Ref<ValueType | undefined>, onCalendarChange?: (dates: ValueType, dateStrings: [string, string], info: BaseInfo) => void, onOk?: (dates: ValueType) => void): any;
export default function useRangeValue<ValueType extends DateType[], DateType extends object = any>(info: ComputedRef<{
    generateConfig: GenerateConfig<DateType>;
    locale: Locale;
    picker: string;
    allowEmpty: boolean[];
    order: boolean;
    onChange?: (dates: ValueType | null, dateStrings: [string, string] | null) => void;
}>, mergedValue: Ref<ValueType> | ComputedRef<ValueType>, setInnerValue: (nextValue: ValueType) => void, getCalendarValue: () => ValueType, triggerCalendarChange: TriggerCalendarChange<ValueType>, disabled: Ref<boolean[]>, formatList: Ref<FormatType[]>, focused: Ref<boolean>, open: Ref<boolean>, isInvalidateDate: (date: DateType, info?: {
    from?: DateType;
    activeIndex: number;
}) => boolean): readonly [(index: number, needTriggerChange: boolean) => void, (nextValue?: ValueType) => boolean];
export {};
