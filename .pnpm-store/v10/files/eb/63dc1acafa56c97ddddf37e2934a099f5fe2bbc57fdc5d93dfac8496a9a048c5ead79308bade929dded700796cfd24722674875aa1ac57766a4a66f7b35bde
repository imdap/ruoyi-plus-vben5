import { inject, provide, shallowRef } from "vue";
var RefContext = Symbol("RefContext");
function useRefProvide(props) {
	const panel = shallowRef();
	const setPanelRef = (el) => {
		if (typeof props.panelRef === "function") props.panelRef(el);
		panel.value = el;
	};
	provide(RefContext, {
		panel,
		setPanel(panel$1) {
			setPanelRef(panel$1);
		}
	});
	return {
		panel,
		setPanelRef
	};
}
function useGetRefContext() {
	return inject(RefContext, {});
}
export { useGetRefContext, useRefProvide };
