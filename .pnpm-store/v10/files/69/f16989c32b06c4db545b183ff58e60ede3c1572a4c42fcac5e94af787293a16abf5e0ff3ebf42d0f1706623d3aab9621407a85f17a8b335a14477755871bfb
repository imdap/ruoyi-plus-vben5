import { ref } from "vue";
import isEqual from "@v-c/util/dist/isEqual";

//#region src/watermark/useSingletonCache.ts
/**
* Singleton cache will only take latest `cacheParams` as key
* and return the result for callback matching.
*/
function useSingletonCache() {
	const cacheRef = ref([null, null]);
	const getCache = (cacheKeys, callback) => {
		const filteredKeys = cacheKeys.map((item) => {
			return item instanceof HTMLElement || Number.isNaN(item) ? "" : item;
		});
		if (!isEqual(cacheRef.value[0], filteredKeys)) cacheRef.value = [filteredKeys, callback()];
		return cacheRef.value[1];
	};
	return getCache;
}

//#endregion
export { useSingletonCache as default };