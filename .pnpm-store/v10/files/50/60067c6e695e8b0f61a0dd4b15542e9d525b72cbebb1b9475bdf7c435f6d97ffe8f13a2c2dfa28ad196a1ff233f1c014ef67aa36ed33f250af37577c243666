import { Atom, ReadonlyAtom } from '@tanstack/store';
import { Ref } from 'vue-demi';
export * from '@tanstack/store';
type EqualityFn<T> = (objA: T, objB: T) => boolean;
interface UseStoreOptions<T> {
    equal?: EqualityFn<T>;
}
export declare function useStore<TState, TSelected = NoInfer<TState>>(store: Atom<TState> | ReadonlyAtom<TState>, selector?: (state: NoInfer<TState>) => TSelected, options?: UseStoreOptions<TSelected>): Readonly<Ref<TSelected>>;
export declare function shallow<T>(objA: T, objB: T): boolean;
