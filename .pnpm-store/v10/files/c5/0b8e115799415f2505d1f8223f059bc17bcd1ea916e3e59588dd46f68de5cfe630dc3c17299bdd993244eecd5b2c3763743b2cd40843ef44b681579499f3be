import { computed } from "vue";
function useComponents(components, getInputElement, getRawInputElement) {
	return computed(() => {
		let { root, input } = components.value || {};
		if (getRawInputElement?.value) root = getRawInputElement.value?.();
		if (getInputElement?.value) input = getInputElement.value?.();
		return {
			root,
			input
		};
	});
}
export { useComponents as default };
