import { ref, watch } from "vue";

//#region src/typography/hooks/usePrevious.ts
function usePrevious(value) {
	const previous = ref();
	watch(value, (_val, oldVal) => {
		previous.value = oldVal;
	});
	return previous;
}
var usePrevious_default = usePrevious;

//#endregion
export { usePrevious_default as default };