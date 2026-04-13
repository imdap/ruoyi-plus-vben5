import { computed, defineComponent, inject, provide } from "vue";

//#region src/config-provider/SizeContext.tsx
/**
* Note: `middle` is deprecated and will be removed in v7, please use `medium` instead.
*/
const SizeContextKey = Symbol("SizeContext");
const useSizeContext = () => inject(SizeContextKey, computed(() => void 0));
const SizeProvider = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const parentSize = useSizeContext();
	provide(SizeContextKey, computed(() => props?.size || parentSize.value));
	return () => {
		return slots?.default?.();
	};
}, { props: { size: {
	type: [String, null],
	required: false
} } });
function useSizeProvider(value) {
	provide(SizeContextKey, value);
}

//#endregion
export { SizeProvider, useSizeContext, useSizeProvider };