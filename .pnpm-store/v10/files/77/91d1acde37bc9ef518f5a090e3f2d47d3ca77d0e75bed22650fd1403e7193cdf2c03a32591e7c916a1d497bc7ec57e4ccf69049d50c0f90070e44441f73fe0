import { computed, shallowRef } from "vue";
function useCache(values) {
	const cacheRef = shallowRef({ valueLabels: /* @__PURE__ */ new Map() });
	return [computed(() => {
		const { valueLabels } = cacheRef.value;
		const valueLabelsCache = /* @__PURE__ */ new Map();
		const merged = values.value.map((item) => {
			const { value, label } = item;
			const mergedLabel = label ?? valueLabels.get(value);
			valueLabelsCache.set(value, mergedLabel);
			return {
				...item,
				label: mergedLabel
			};
		});
		cacheRef.value.valueLabels = valueLabelsCache;
		return merged;
	})];
}
export { useCache as default };
