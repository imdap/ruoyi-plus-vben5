import useBaseProps from "../../hooks/useBaseProps.js";
import { useSelectInputContext } from "../context.js";
import MultipleContent_default from "./MultipleContent.js";
import SingleContent_default from "./SingleContent.js";
import { computed, createVNode, defineComponent, shallowRef } from "vue";
import pickAttrs from "@v-c/util/dist/pickAttrs";
var Content_default = /* @__PURE__ */ defineComponent((_, { expose }) => {
	const selectInputContext = useSelectInputContext();
	const baseProps = useBaseProps();
	const inputRef = shallowRef();
	expose({ input: computed(() => inputRef.value?.input) });
	const multiple = computed(() => selectInputContext.value?.multiple);
	const onInputKeyDown = computed(() => selectInputContext.value?.onInputKeyDown);
	const showSearch = computed(() => baseProps.value?.showSearch);
	const ariaProps = computed(() => pickAttrs(baseProps.value ?? {}, { aria: true }));
	const sharedInputProps = computed(() => ({
		...ariaProps.value,
		onKeyDown: onInputKeyDown.value,
		readonly: !showSearch.value,
		tabindex: baseProps.value?.tabIndex
	}));
	return () => {
		if (multiple.value) return createVNode(MultipleContent_default, {
			"ref": inputRef,
			"inputProps": sharedInputProps.value
		}, null);
		return createVNode(SingleContent_default, {
			"ref": inputRef,
			"inputProps": sharedInputProps.value
		}, null);
	};
}, {
	name: "SelectContent",
	inheritAttrs: false
});
export { Content_default as default };
