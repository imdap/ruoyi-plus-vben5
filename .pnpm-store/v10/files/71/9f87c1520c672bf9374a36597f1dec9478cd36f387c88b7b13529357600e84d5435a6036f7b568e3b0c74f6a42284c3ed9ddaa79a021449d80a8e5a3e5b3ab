import { ComputedRef, Ref } from 'vue';
import { Locale, SharedTimeProps } from '../interface';
export declare function fillTimeFormat(showHour: boolean | undefined, showMinute: boolean | undefined, showSecond: boolean | undefined, showMillisecond: boolean | undefined, showMeridiem: boolean | undefined): string;
/**
 * Fill locale format as start up
 */
type ShowProps<DateType extends object> = Pick<SharedTimeProps<DateType>, 'showHour' | 'showMinute' | 'showSecond' | 'showMillisecond' | 'use12Hours'>;
export default function useLocale<DateType extends object>(locale: ComputedRef<Locale | undefined>, showProps: ComputedRef<ShowProps<DateType>> | Ref<ShowProps<DateType>>): ComputedRef<Locale>;
export {};
