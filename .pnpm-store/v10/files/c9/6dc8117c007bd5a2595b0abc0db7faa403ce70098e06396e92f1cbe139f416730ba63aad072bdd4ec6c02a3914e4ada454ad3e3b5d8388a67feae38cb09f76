import { ComputedRef, CSSProperties, Ref } from 'vue';
import { IndicatorConfig } from '../interface';
import { TabOffset } from './useOffsets';
interface UseIndicatorOptions {
    activeTabOffset: ComputedRef<TabOffset> | Ref<TabOffset>;
    horizontal: ComputedRef<boolean> | Ref<boolean>;
    rtl: ComputedRef<boolean> | Ref<boolean>;
    indicator?: ComputedRef<IndicatorConfig | undefined> | Ref<IndicatorConfig | undefined>;
}
declare function useIndicator(options: UseIndicatorOptions): Ref<CSSProperties | undefined, CSSProperties | undefined>;
export default useIndicator;
