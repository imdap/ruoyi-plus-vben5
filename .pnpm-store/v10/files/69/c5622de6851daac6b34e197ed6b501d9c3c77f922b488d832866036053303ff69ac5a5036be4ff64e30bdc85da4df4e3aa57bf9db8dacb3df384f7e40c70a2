import { createVNode, defineComponent } from "vue";
import KeyCode from "@v-c/util/dist/KeyCode";

//#region src/table/hooks/useFilter/FilterWrapper.tsx
const FilterDropdownMenuWrapper = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const onKeydown = (event) => {
		if (event.keyCode === KeyCode.ENTER) event.stopPropagation();
	};
	return () => createVNode("div", {
		"class": props.className || props.class,
		"onClick": (e) => e.stopPropagation(),
		"onKeydown": onKeydown
	}, [slots.default?.()]);
}, {
	props: {
		class: {
			type: String,
			required: false
		},
		className: {
			type: String,
			required: false
		}
	},
	name: "FilterDropdownMenuWrapper"
});
var FilterWrapper_default = FilterDropdownMenuWrapper;

//#endregion
export { FilterWrapper_default as default };