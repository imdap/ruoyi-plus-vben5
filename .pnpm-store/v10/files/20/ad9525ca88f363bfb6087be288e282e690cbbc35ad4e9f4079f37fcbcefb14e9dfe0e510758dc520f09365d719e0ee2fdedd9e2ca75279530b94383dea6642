import { ComputedRef, Ref } from 'vue';
import { OpenConfig } from '../../interface';
/**
 * Control the open state.
 * Will not close if activeElement is on the popup.
 */
export default function useOpen(open: Ref<boolean | undefined>, defaultOpen: Ref<boolean | undefined>, disabledList: Ref<Array<boolean | undefined>> | ComputedRef<Array<boolean | undefined>>, onOpenChange?: (open: boolean) => void): readonly [ComputedRef<any>, (next: boolean, config?: OpenConfig) => void];
