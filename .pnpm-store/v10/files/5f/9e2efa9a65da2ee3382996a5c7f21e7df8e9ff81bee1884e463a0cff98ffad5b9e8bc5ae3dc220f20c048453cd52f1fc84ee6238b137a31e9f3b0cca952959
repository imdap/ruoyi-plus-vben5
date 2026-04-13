import { createVNode } from "vue";

//#region src/cascader/hooks/useCheckable.tsx
function useCheckable(cascaderPrefixCls, multiple) {
	if (!multiple) return false;
	return createVNode("span", { "class": `${cascaderPrefixCls}-checkbox-inner` }, null);
}

//#endregion
export { useCheckable as default };