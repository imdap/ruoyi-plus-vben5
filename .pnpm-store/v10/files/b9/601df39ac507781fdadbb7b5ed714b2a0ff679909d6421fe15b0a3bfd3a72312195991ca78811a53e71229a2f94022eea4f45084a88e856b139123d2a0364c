import { ComputedRef, MaybeRef, ToRefs } from 'vue';
import { StackConfig } from '../interface';
type StackParams = Exclude<StackConfig, boolean>;
type UseStack = (config?: MaybeRef<StackConfig | undefined>) => [ComputedRef<boolean>, ToRefs<StackParams>];
declare const useStack: UseStack;
export default useStack;
