import { computed } from "vue";
function useCache(labeledValues, valueOptions) {
	const cache = {
		values: /* @__PURE__ */ new Map(),
		options: /* @__PURE__ */ new Map()
	};
	const filledLabeledValues = computed(() => {
		const { values: prevValueCache, options: prevOptionCache } = cache;
		const patchedValues = labeledValues.value.map((item) => {
			if (item.label === void 0) return {
				...item,
				label: prevValueCache.get(item.value)?.label
			};
			return item;
		});
		const valueCache = /* @__PURE__ */ new Map();
		const optionCache = /* @__PURE__ */ new Map();
		patchedValues.forEach((item) => {
			valueCache.set(item.value, item);
			const option = valueOptions.value.get(item.value) || prevOptionCache.get(item.value);
			if (option) optionCache.set(item.value, option);
		});
		cache.values = valueCache;
		cache.options = optionCache;
		return patchedValues;
	});
	const getOption = (val) => {
		return valueOptions.value.get(val) || cache.options.get(val);
	};
	return [filledLabeledValues, getOption];
}
export { useCache as default };
