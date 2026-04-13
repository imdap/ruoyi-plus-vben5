import { computed, defineComponent, inject, provide, ref } from "vue";

//#region src/menu/MenuContext.tsx
const MenuContextKey = Symbol("MenuContext");
function useMenuContextProvider(props) {
	provide(MenuContextKey, props);
}
function useMenuContext() {
	return inject(MenuContextKey, ref({
		prefixCls: "",
		firstLevel: true,
		inlineCollapsed: false,
		styles: null,
		classes: null
	}));
}
const MenuContextProvider = /* @__PURE__ */ defineComponent((props, { slots }) => {
	useMenuContextProvider(computed(() => props.value));
	return () => {
		return slots?.default?.();
	};
}, { props: { value: { required: true } } });

//#endregion
export { MenuContextProvider, useMenuContext, useMenuContextProvider };