import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import raf from "@v-c/util/dist/raf";
function useDelayState(value, defaultValue, onChange) {
	const internalValue = ref(defaultValue);
	const state = computed(() => value.value !== void 0 ? value.value : internalValue.value);
	const nextValueRef = ref(state.value);
	const rafRef = ref();
	const cancelRaf = () => {
		if (rafRef.value) raf.cancel(rafRef.value);
	};
	const doUpdate = () => {
		if (value.value === void 0) nextTick(() => {
			internalValue.value = nextValueRef.value;
		});
		if (onChange && state.value !== nextValueRef.value) onChange(nextValueRef.value);
	};
	const updateValue = (next, immediately) => {
		cancelRaf();
		nextValueRef.value = next;
		if (next || immediately) doUpdate();
		else rafRef.value = raf(doUpdate);
	};
	watch(value, () => {
		if (value.value !== void 0) nextValueRef.value = value.value;
	});
	onBeforeUnmount(() => {
		cancelRaf();
	});
	return [state, updateValue];
}
export { useDelayState as default };
