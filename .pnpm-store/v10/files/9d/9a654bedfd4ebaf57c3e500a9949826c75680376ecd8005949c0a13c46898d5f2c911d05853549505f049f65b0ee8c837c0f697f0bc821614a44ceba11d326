import { ContextIsolator } from "../_util/ContextIsolator.js";
import { computed, createVNode, defineComponent, inject, provide } from "vue";

//#region src/menu/OverrideContext.tsx
const OverrideContextKey = Symbol("OverrideContext");
function useOverrideContext() {
	return inject(OverrideContextKey, null);
}
/** @internal Only used for Dropdown component. Do not use this in your production. */
const OverrideProvider = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const override = useOverrideContext();
	provide(OverrideContextKey, computed(() => {
		return {
			...override?.value ?? {},
			...props?.value ?? {}
		};
	}));
	return () => {
		return createVNode(ContextIsolator, { "space": true }, { default: () => [slots?.default?.()] });
	};
}, { props: { value: { required: false } } });

//#endregion
export { OverrideProvider, useOverrideContext };