import { Ref, UnwrapRef } from 'vue';
export type Updater<State> = (prev: State) => State;
export declare function useLayoutState<State>(defaultState: State): [Ref<State>, (updater: Updater<State>) => void];
export declare function useTimeoutLock<State>(defaultState?: State): [(state: UnwrapRef<State>) => void, () => UnwrapRef<State> | null];
