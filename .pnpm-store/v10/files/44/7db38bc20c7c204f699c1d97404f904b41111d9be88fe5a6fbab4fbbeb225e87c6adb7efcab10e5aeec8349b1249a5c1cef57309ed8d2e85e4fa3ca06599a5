import { useCascaderContext } from "../context.js";
import { ref, watch } from "vue";
function useActive(multiple, open) {
	const context = useCascaderContext();
	const activeValueCells = ref([]);
	watch([open, () => context.value?.values?.[0]], () => {
		if (!multiple.value) activeValueCells.value = context.value?.values?.[0] || [];
	}, { immediate: true });
	return [activeValueCells, (next) => {
		activeValueCells.value = next;
	}];
}
var useActive_default = useActive;
export { useActive_default as default };
