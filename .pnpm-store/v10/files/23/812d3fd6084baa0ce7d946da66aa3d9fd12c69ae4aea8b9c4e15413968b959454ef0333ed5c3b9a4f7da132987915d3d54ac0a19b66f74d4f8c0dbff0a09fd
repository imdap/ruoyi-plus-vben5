import { Ref } from 'vue';
type Updater<T> = T | ((origin: T) => T);
type UpdateCallbackFunc = () => void;
type NotifyEffectUpdate = (callback: UpdateCallbackFunc) => void;
/**
 * Batcher for record any useEffectState need update.
 */
export declare function useBatcher(): NotifyEffectUpdate;
/**
 * Trigger state update by ref to save perf.
 */
export default function useEffectState<T>(notifyEffectUpdate: NotifyEffectUpdate, defaultValue?: T | null | undefined): [Ref<T | null | undefined>, (nextValue: Updater<T>) => void];
export {};
