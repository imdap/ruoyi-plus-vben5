import { pathKey } from "../Cache.js";
import { useStyleContext } from "../StyleContext.js";
import { isClientSide } from "../util/index.js";
import { computed, onBeforeMount, onBeforeUnmount, shallowRef, watch } from "vue";

//#region src/hooks/useGlobalCache.ts
const effectMap = /* @__PURE__ */ new Map();
/**
* 延迟移除样式的时间（毫秒）
* 用于解决 Vue Transition 动画期间样式被过早移除的问题
*/
const REMOVE_STYLE_DELAY = 500;
const delayedRemoveInfo = /* @__PURE__ */ new Map();
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
function useGlobalCache(prefix, keyPath, cacheFn, onCacheRemove, onCacheEffect) {
	const styleContext = useStyleContext();
	const fullPath = computed(() => [prefix.value, ...keyPath.value]);
	const fullPathStr = computed(() => pathKey(fullPath.value));
	const currentPathRef = shallowRef(fullPathStr.value);
	const isMountedRef = shallowRef(false);
	const globalCache = () => styleContext.value.cache;
	const isServerSide = () => styleContext.value.mock !== void 0 ? styleContext.value.mock === "server" : !isClientSide;
	const applyDecrement = (pathStr, decrementCount = 1) => {
		if (decrementCount <= 0) return;
		globalCache().opUpdate(pathStr, (prevCache) => {
			if (!prevCache) return null;
			const [times = 0, cache] = prevCache;
			const nextCount = times - decrementCount;
			if (nextCount <= 0) {
				onCacheRemove?.(cache, false);
				effectMap.delete(pathStr);
				return null;
			}
			return [nextCount, cache];
		});
	};
	const createDelayedRemoveTimer = (pathStr) => setTimeout(() => {
		const info = delayedRemoveInfo.get(pathStr);
		if (!info) return;
		delayedRemoveInfo.delete(pathStr);
		applyDecrement(pathStr, info.pendingDecrements);
	}, REMOVE_STYLE_DELAY);
	const clearCache = (pathStr, immediate = false) => {
		if (isServerSide()) return;
		if (immediate || !isClientSide) applyDecrement(pathStr);
		else {
			const existingInfo = delayedRemoveInfo.get(pathStr);
			const currentRefCount = globalCache().opGet(pathStr)?.[0] ?? 0;
			if (!existingInfo && currentRefCount > 1) {
				applyDecrement(pathStr);
				return;
			}
			if (existingInfo) {
				clearTimeout(existingInfo.timer);
				const newPendingDecrements = existingInfo.pendingDecrements + 1;
				const timer = createDelayedRemoveTimer(pathStr);
				delayedRemoveInfo.set(pathStr, {
					timer,
					pendingDecrements: newPendingDecrements
				});
			} else {
				const timer = createDelayedRemoveTimer(pathStr);
				delayedRemoveInfo.set(pathStr, {
					timer,
					pendingDecrements: 1
				});
			}
		}
	};
	const cacheContent = computed(() => {
		let entity = globalCache().opGet(fullPathStr.value);
		if (!entity) {
			globalCache().opUpdate(fullPathStr.value, (prevCache) => {
				const [times = 0, cache] = prevCache || [void 0, void 0];
				return [times, cache || cacheFn()];
			});
			entity = globalCache().opGet(fullPathStr.value);
		}
		return entity[1];
	});
	cacheContent.value;
	const triggerCacheEffect = (pathStr) => {
		if (!onCacheEffect || effectMap.has(pathStr)) return;
		const cachedValue = cacheContent.value;
		effectMap.set(pathStr, true);
		onCacheEffect(cachedValue);
		Promise.resolve().then(() => {
			effectMap.delete(pathStr);
		});
	};
	const activatePath = (newPath, oldPath) => {
		if (oldPath && oldPath !== newPath) clearCache(oldPath, true);
		currentPathRef.value = newPath;
		const existingInfo = delayedRemoveInfo.get(newPath);
		if (existingInfo) {
			const newPendingDecrements = existingInfo.pendingDecrements - 1;
			if (newPendingDecrements <= 0) {
				clearTimeout(existingInfo.timer);
				delayedRemoveInfo.delete(newPath);
			} else delayedRemoveInfo.set(newPath, {
				timer: existingInfo.timer,
				pendingDecrements: newPendingDecrements
			});
		} else globalCache().opUpdate(newPath, (prevCache) => {
			const [times = 0, cache] = prevCache || [void 0, void 0];
			const mergedCache = cache || cacheFn();
			return [times + 1, mergedCache];
		});
		triggerCacheEffect(newPath);
	};
	watch(fullPathStr, (newPath) => {
		if (!isMountedRef.value) currentPathRef.value = newPath;
	}, { flush: "sync" });
	watch(fullPathStr, (newPath, oldPath) => {
		if (!isMountedRef.value) return;
		activatePath(newPath, oldPath);
	}, { flush: "sync" });
	onBeforeMount(() => {
		isMountedRef.value = true;
		activatePath(currentPathRef.value);
	});
	onBeforeUnmount(() => {
		isMountedRef.value = false;
		clearCache(currentPathRef.value);
	});
	return cacheContent;
}

//#endregion
export { useGlobalCache };