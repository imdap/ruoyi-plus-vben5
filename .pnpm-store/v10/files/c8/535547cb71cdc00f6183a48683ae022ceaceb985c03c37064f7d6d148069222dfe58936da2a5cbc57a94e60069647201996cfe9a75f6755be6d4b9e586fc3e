import { computed, defineComponent, inject, provide } from "vue";

//#region src/components/Context.tsx
const IconContextKey = Symbol("IconContext");
function useProvideIconContext(context) {
	provide(IconContextKey, context);
}
const IconContextProvider = /* @__PURE__ */ defineComponent((props, { slots }) => {
	useProvideIconContext(computed(() => props));
	return () => {
		return slots?.default?.();
	};
}, { props: {
	prefixCls: {
		type: String,
		required: false
	},
	rootClass: {
		type: String,
		required: false
	},
	csp: {
		type: Object,
		required: false
	},
	layer: {
		type: String,
		required: false
	}
} });
function useIconContext() {
	return inject(IconContextKey, computed(() => ({})));
}

//#endregion
export { IconContextProvider, useIconContext };