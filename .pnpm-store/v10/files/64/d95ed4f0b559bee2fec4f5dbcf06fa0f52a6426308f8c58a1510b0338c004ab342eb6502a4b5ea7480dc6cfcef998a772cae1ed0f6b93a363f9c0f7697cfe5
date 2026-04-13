import { computed } from "vue";
function useInputReadOnly(formatList, inputReadOnly, multiple) {
	return computed(() => {
		if (typeof formatList.value[0] === "function" || multiple.value) return true;
		return inputReadOnly.value;
	});
}
export { useInputReadOnly as default };
