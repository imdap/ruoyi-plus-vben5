import { isReactive, isRef, ref, watch } from "vue";
function useMemo(getValue, condition, shouldUpdate) {
	const cacheRef = ref(getValue());
	watch(condition.map((item) => {
		if (typeof item === "function" || isRef(item) || isReactive(item)) return item;
		return () => item;
	}), (next, pre) => {
		if (shouldUpdate) {
			if (shouldUpdate(next, pre)) cacheRef.value = getValue();
		} else cacheRef.value = getValue();
	});
	return cacheRef;
}
export { useMemo as default };
