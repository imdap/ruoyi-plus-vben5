import { computed } from "vue";
function useOptions(options, childrenOptions, fieldNames, optionFilterProp, optionLabelProp) {
	return computed(() => {
		let mergedOptions = [];
		if (options.value && options.value.length > 0) mergedOptions = options.value;
		else if (childrenOptions.value && childrenOptions.value.length > 0) mergedOptions = childrenOptions.value;
		const valueOptions = /* @__PURE__ */ new Map();
		const labelOptions = /* @__PURE__ */ new Map();
		const setLabelOptions = (labelOptionsMap, option, key) => {
			if (key && typeof key === "string") labelOptionsMap.set(option[key], option);
		};
		const dig = (optionList, isChildren = false) => {
			if (!Array.isArray(optionList)) return;
			for (let i = 0; i < optionList.length; i += 1) {
				const option = optionList[i];
				if (!option) continue;
				const optionsKey = fieldNames.value?.options || "options";
				const valueKey = fieldNames.value?.value || "value";
				const labelKey = fieldNames.value?.label || "label";
				if (!option[optionsKey] || isChildren) {
					valueOptions.set(option[valueKey], option);
					setLabelOptions(labelOptions, option, labelKey);
					setLabelOptions(labelOptions, option, optionFilterProp.value);
					setLabelOptions(labelOptions, option, optionLabelProp.value);
				} else dig(option[optionsKey], true);
			}
		};
		dig(mergedOptions);
		return {
			options: mergedOptions,
			valueOptions,
			labelOptions
		};
	});
}
export { useOptions as default };
