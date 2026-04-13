import { Ref } from 'vue';
import { GenerateConfig } from '../../generate';
import { DisabledDate, Locale } from '../../interface';
import { RangeValueType } from '../RangePicker';
/**
 * RangePicker need additional logic to handle the `disabled` case. e.g.
 * [disabled, enabled] should end date not before start date
 */
export default function useRangeDisabledDate<DateType extends object = any>(values: Ref<RangeValueType<DateType>>, disabled: Ref<[boolean, boolean]>, activeIndexList: Ref<number[]>, generateConfig: Ref<GenerateConfig<DateType>>, locale: Ref<Locale>, disabledDate: Ref<DisabledDate<DateType> | undefined>): DisabledDate<DateType>;
