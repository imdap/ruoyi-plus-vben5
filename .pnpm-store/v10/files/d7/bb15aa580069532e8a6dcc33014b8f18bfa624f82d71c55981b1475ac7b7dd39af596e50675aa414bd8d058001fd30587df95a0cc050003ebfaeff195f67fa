import { ComputedRef, Ref, UnwrapRef } from 'vue';
export default function useMergedState<T, R = Ref<T>>(defaultStateValue: T | (() => T), option?: {
    defaultValue?: T | (() => T);
    value?: Ref<T> | Ref<UnwrapRef<T>> | ComputedRef<T>;
    onChange?: (val: T, prevValue: T) => void;
    postState?: (val: T) => T;
}): [R, (val: T) => void];
