import { inject, provide, ref, shallowRef } from "vue";
//#region src/context.ts
var RefContext = Symbol("RefContext");
function useRefProvide(customSet) {
	const panel = shallowRef();
	const setPanel = (el) => {
		panel.value = el;
		customSet?.(el);
	};
	provide(RefContext, {
		panel,
		setPanel
	});
	return {
		panel,
		setPanel
	};
}
function useRefContext() {
	return inject(RefContext, {
		panel: shallowRef(),
		setPanel: () => {}
	});
}
var DrawerContext = Symbol("DrawerContext");
function useDrawerContext() {
	return inject(DrawerContext, ref());
}
function useDrawerProvide(props) {
	provide(DrawerContext, props);
	return props;
}
//#endregion
export { useDrawerContext, useDrawerProvide, useRefContext, useRefProvide };
