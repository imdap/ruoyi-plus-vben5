import List_default from "./List.js";
import { createVNode, defineComponent, mergeProps, shallowRef } from "vue";
import { useBaseProps } from "@v-c/select";
var OptionList_default = /* @__PURE__ */ defineComponent((_, { expose }) => {
	const baseProps = useBaseProps();
	const listRef = shallowRef(null);
	expose({
		onKeyDown: (event) => listRef.value?.onKeyDown(event),
		onKeyUp: (event) => listRef.value?.onKeyUp(event)
	});
	return () => createVNode(List_default, mergeProps(baseProps.value || {}, {
		"lockOptions": baseProps.value?.lockOptions,
		"ref": (el) => {
			listRef.value = el;
		}
	}), null);
}, {
	name: "OptionList",
	inheritAttrs: false
});
export { OptionList_default as default };
