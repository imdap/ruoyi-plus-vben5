import { Ref } from 'vue';
import { CountConfig, InputProps, ShowCountFormatter } from '../interface';
type ForcedCountConfig = Omit<CountConfig, 'show'> & Pick<Required<CountConfig>, 'strategy'> & {
    show: boolean;
    showFormatter?: ShowCountFormatter;
};
/**
 * Cut `value` by the `count.max` prop.
 */
export declare function inCountRange(value: string, countConfig: ForcedCountConfig): boolean;
export default function useCount(count?: Ref<CountConfig>, showCount?: Ref<InputProps['showCount']>): import('vue').ComputedRef<{
    readonly show: boolean;
    readonly showFormatter: ShowCountFormatter | undefined;
    readonly strategy: (value: string) => number;
    readonly max?: number;
    readonly exceedFormatter?: import('../interface').ExceedFormatter;
}>;
export {};
