import { ref, toRaw, unref, watch, watchEffect } from "vue";
function useMergedState(defaultStateValue, option) {
	const { defaultValue, value = ref() } = option || {};
	let initValue = typeof defaultStateValue === "function" ? defaultStateValue() : defaultStateValue;
	if (value.value !== void 0) initValue = unref(value);
	if (defaultValue !== void 0) initValue = typeof defaultValue === "function" ? defaultValue() : defaultValue;
	const innerValue = ref(initValue);
	const mergedValue = ref(initValue);
	watchEffect(() => {
		let val = value.value !== void 0 ? value.value : innerValue.value;
		if (option?.postState) val = option.postState(val);
		mergedValue.value = val;
	});
	function triggerChange(newValue) {
		const preVal = mergedValue.value;
		innerValue.value = newValue;
		if (toRaw(mergedValue.value) !== newValue && option?.onChange) option.onChange(newValue, preVal);
	}
	watch(value, () => {
		innerValue.value = value.value;
	});
	return [mergedValue, triggerChange];
}
export { useMergedState as default };
