import { ref, watch } from "vue";
function useSyncState(defaultValue, controlledValue) {
	const valueRef = ref(defaultValue);
	const getControlledValue = () => {
		if (typeof controlledValue === "function") return controlledValue();
		return controlledValue?.value;
	};
	const getter = (useControlledValueFirst) => {
		const controlled = getControlledValue();
		return useControlledValueFirst && controlled !== void 0 ? controlled : valueRef.value;
	};
	const setter = (nextValue) => {
		valueRef.value = nextValue;
	};
	watch(() => getControlledValue(), (val) => {
		if (val !== void 0) valueRef.value = val;
	});
	return [
		getter,
		setter,
		valueRef
	];
}
export { useSyncState as default };
