import { KeyType } from "../Cache.js";
import { Ref } from "vue";

//#region src/hooks/useGlobalCache.d.ts
type ExtractStyle<CacheValue> = (cache: CacheValue, effectStyles: Record<string, boolean>, options?: {
  plain?: boolean;
  autoPrefix?: boolean;
}) => [order: number, styleId: string, style: string] | null;
/**
 * Global cache for CSS-in-JS styles
 *
 * This hook manages a reference-counted cache to ensure styles are properly
 * created, shared, and cleaned up across component instances.
 *
 * Key differences from React version:
 * - No useInsertionEffect needed - Vue's watchEffect handles timing naturally
 * - No StrictMode double-mounting issues - Vue doesn't double-mount
 * - HMR handling is simpler - can rely on Vue's reactivity system
 * - Uses onBeforeUnmount for cleanup instead of watch's onCleanup to have
 *   better control over cleanup timing (important for Transition animations)
 */
declare function useGlobalCache<CacheType>(prefix: Ref<string>, keyPath: Ref<KeyType[]>, cacheFn: () => CacheType, onCacheRemove?: (cache: CacheType, fromHMR: boolean) => void, onCacheEffect?: (cachedValue: CacheType) => void): Ref<CacheType>;
//#endregion
export { ExtractStyle, useGlobalCache };