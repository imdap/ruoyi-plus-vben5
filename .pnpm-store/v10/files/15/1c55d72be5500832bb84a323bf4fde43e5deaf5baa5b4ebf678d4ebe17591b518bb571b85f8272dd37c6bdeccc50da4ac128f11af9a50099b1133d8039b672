import { computed, defineComponent, inject, provide, ref } from "vue";

//#region src/config-provider/DisabledContext.tsx
const DisabledContextKey = Symbol("DisabledContextKey");
function useDisabledContextProvider(props) {
	provide(DisabledContextKey, props);
}
function useDisabledContext() {
	return inject(DisabledContextKey, ref(false));
}
const DisabledContextProvider = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const disabledContext = useDisabledContext();
	useDisabledContextProvider(computed(() => {
		return props?.disabled ?? disabledContext.value;
	}));
	return () => {
		return slots?.default?.();
	};
}, { props: { disabled: {
	type: Boolean,
	required: false,
	default: void 0
} } });

//#endregion
export { DisabledContextProvider, useDisabledContext, useDisabledContextProvider };