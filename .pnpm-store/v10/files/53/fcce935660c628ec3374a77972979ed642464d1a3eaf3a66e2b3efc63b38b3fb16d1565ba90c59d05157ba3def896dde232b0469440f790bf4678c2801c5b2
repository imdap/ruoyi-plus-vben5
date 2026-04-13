import { ComputedRef, Ref } from 'vue';
import { GenerateConfig } from '../generate';
import { SharedTimeProps } from '../interface';
export type Unit<ValueType = number | string> = {
    label: string | number;
    value: ValueType;
    disabled?: boolean;
};
/**
 * Parse time props to get util info
 */
export default function useTimeInfo<DateType extends object = any>(generateConfig: Ref<GenerateConfig<DateType>>, props?: Ref<SharedTimeProps<DateType> | undefined> | ComputedRef<SharedTimeProps<DateType> | undefined>, date?: Ref<DateType>): readonly [(nextTime: DateType, certainDate?: DateType) => DateType, ComputedRef<Unit<number>[]>, (nextHour: number) => Unit<number>[], (nextHour: number, nextMinute: number) => Unit<number>[], (nextHour: number, nextMinute: number, nextSecond: number) => Unit<number>[]];
