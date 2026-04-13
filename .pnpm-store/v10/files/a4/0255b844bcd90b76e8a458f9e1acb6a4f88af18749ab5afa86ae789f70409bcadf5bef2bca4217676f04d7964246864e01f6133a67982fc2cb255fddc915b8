import { Ref } from 'vue';
import { GenerateConfig } from '../../generate';
import { DisabledDate, InternalMode, Locale } from '../../interface';
export type IsInvalidBoundary<DateType> = (currentDate: DateType, type: InternalMode, fromDate?: DateType) => boolean;
/**
 * Merge `disabledDate` with `minDate` & `maxDate`.
 */
export default function useDisabledBoundary<DateType extends object = any>(generateConfig: Ref<GenerateConfig<DateType>>, locale: Ref<Locale>, disabledDate: Ref<DisabledDate<DateType> | undefined>, minDate: Ref<DateType | undefined>, maxDate: Ref<DateType | undefined>): DisabledDate<DateType>;
