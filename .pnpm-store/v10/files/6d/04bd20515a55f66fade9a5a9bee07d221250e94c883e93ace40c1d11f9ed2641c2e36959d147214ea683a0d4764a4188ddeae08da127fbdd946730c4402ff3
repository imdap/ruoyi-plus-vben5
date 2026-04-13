import Input_default from "../input/Input.js";
import { createVNode, defineComponent } from "vue";
import { SearchOutlined } from "@antdv-next/icons";

//#region src/transfer/search.tsx
const Search = /* @__PURE__ */ defineComponent((props, { emit, slots }) => {
	const handleChange = (e) => {
		emit("change", e);
		if (!(e?.target)?.value) emit("clear");
	};
	return () => createVNode(Input_default, {
		"placeholder": props.placeholder || "",
		"class": props.prefixCls,
		"value": props.value,
		"onChange": handleChange,
		"disabled": props.disabled,
		"allowClear": true,
		"prefix": slots?.prefix?.() ?? createVNode(SearchOutlined, null, null)
	}, null);
}, {
	props: {
		prefixCls: {
			type: String,
			required: false
		},
		placeholder: {
			type: String,
			required: false
		},
		value: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	emits: ["change", "clear"],
	name: "ATransferSearch",
	inheritAttrs: false
});
var search_default = Search;

//#endregion
export { search_default as default };