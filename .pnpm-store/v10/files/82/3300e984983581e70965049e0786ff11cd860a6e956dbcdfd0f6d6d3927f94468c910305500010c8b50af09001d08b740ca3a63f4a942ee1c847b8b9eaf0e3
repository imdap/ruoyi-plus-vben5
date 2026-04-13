import { computed } from "vue";
function useSemantic(classNames, styles) {
	return computed(() => {
		return [{
			...classNames?.value || {},
			popup: classNames?.value?.popup || {}
		}, {
			...styles?.value || {},
			popup: styles?.value?.popup || {}
		}];
	});
}
export { useSemantic as default };
