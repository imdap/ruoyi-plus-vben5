import { computed } from "vue";
function useAllowClear(_prefixCls, displayValues, allowClear, clearIcon, disabled, mergedSearchValue, mode) {
	const allowClearConfig = computed(() => {
		if (typeof allowClear?.value === "boolean") return { allowClear: allowClear.value };
		if (allowClear?.value && typeof allowClear.value === "object") return allowClear.value;
		return { allowClear: false };
	});
	return computed(() => {
		const mergedAllowClear = !disabled?.value && allowClearConfig.value?.allowClear !== false && (displayValues.value.length || mergedSearchValue?.value) && !(mode?.value === "combobox" && mergedSearchValue?.value === "");
		return {
			allowClear: !!mergedAllowClear,
			clearIcon: mergedAllowClear ? allowClearConfig.value.clearIcon || clearIcon?.value || "×" : null
		};
	});
}
export { useAllowClear };
