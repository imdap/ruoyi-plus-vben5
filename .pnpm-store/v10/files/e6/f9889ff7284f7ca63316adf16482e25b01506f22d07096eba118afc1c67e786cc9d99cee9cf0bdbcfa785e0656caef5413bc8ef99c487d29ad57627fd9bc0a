import { ComputedRef, Ref } from 'vue';
import { default as useInvalidate } from './useInvalidate';
/**
 * Used to control each fields invalidate status
 */
export default function useFieldsInvalidate<DateType extends object, ValueType extends DateType[]>(calendarValue: Ref<ValueType>, isInvalidateDate: ReturnType<typeof useInvalidate<DateType>>, allowEmpty?: Ref<boolean[] | undefined> | ComputedRef<boolean[] | undefined>): readonly [ComputedRef<[boolean, boolean]>, (invalid: boolean, index: number) => void];
