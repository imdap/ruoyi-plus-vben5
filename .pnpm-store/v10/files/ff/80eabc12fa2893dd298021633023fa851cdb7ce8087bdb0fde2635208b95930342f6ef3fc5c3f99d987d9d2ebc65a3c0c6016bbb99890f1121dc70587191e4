import useLockEffect from "./useLockEffect.js";
import { computed, ref, watch } from "vue";
function useRangeActive(disabled, empty = ref([]), mergedOpen = ref(false)) {
	const activeIndex = ref(0);
	const focused = ref(false);
	const activeListRef = ref([]);
	const submitIndexRef = ref(null);
	const lastOperationRef = ref(null);
	const updateSubmitIndex = (index) => {
		submitIndexRef.value = index;
	};
	const hasActiveSubmitValue = (index) => {
		return submitIndexRef.value === index;
	};
	const triggerFocus = (nextFocus) => {
		focused.value = nextFocus;
	};
	const lastOperation = (type) => {
		if (type) lastOperationRef.value = type;
		return lastOperationRef.value;
	};
	const nextActiveIndex = (nextValue) => {
		const list = activeListRef.value;
		const filledActiveSet = new Set(list.filter((index) => nextValue?.[index] || empty.value[index]));
		const nextIndex = list[list.length - 1] === 0 ? 1 : 0;
		if (filledActiveSet.size >= 2 || disabled.value[nextIndex]) return null;
		return nextIndex;
	};
	useLockEffect(computed(() => focused.value || mergedOpen.value), () => {
		if (!focused.value) {
			activeListRef.value = [];
			updateSubmitIndex(null);
		}
	});
	watch([focused, activeIndex], () => {
		if (focused.value) activeListRef.value.push(activeIndex.value);
	});
	return [
		focused,
		triggerFocus,
		lastOperation,
		activeIndex,
		(index) => {
			activeIndex.value = index;
		},
		nextActiveIndex,
		activeListRef,
		updateSubmitIndex,
		hasActiveSubmitValue
	];
}
export { useRangeActive as default };
