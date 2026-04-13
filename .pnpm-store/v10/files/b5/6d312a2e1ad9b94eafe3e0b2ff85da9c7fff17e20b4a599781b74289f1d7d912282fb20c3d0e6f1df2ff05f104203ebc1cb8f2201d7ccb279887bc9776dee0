import { defineComponent, inject, provide, ref } from "vue";

//#region src/watermark/context.ts
function voidFunc() {}
const WatermarkContextKey = Symbol("WatermarkContext");
function useWatermarkProvider(props) {
	provide(WatermarkContextKey, props);
}
function useWatermarkContext() {
	return inject(WatermarkContextKey, {
		add: voidFunc,
		remove: voidFunc
	});
}
const WatermarkContextProvider = defineComponent((props, { slots }) => {
	useWatermarkProvider(props);
	return () => {
		return slots?.default?.();
	};
}, { props: ["add", "remove"] });
function usePanelRef(panelSelector) {
	const watermark = useWatermarkContext();
	const panelEleRef = ref(null);
	return (_ele) => {
		if (_ele) {
			const ele = _ele;
			const innerContentEle = panelSelector?.value ? ele.querySelector(panelSelector.value) : ele;
			if (innerContentEle) {
				watermark.add(innerContentEle);
				panelEleRef.value = innerContentEle;
			}
		} else watermark.remove(panelEleRef.value);
	};
}

//#endregion
export { WatermarkContextProvider, usePanelRef, useWatermarkContext, useWatermarkProvider };