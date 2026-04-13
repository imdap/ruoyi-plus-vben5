import Mark_default from "./Mark.js";
import { createVNode, defineComponent } from "vue";
var Marks_default = /* @__PURE__ */ defineComponent((props, { emit, slots }) => {
	return () => {
		const { prefixCls, marks = [] } = props;
		const markPrefixCls = `${prefixCls}-mark`;
		if (!marks.length) return null;
		return createVNode("div", { "class": markPrefixCls }, [marks.map(({ value, style, label }) => createVNode(Mark_default, {
			"key": value,
			"prefixCls": markPrefixCls,
			"style": style,
			"value": value,
			"onClick": () => emit("click", value)
		}, { default: () => [slots.mark?.({
			point: value,
			label
		}) || label] }))]);
	};
}, { props: {
	prefixCls: {
		type: String,
		required: true,
		default: void 0
	},
	marks: {
		type: Array,
		required: false,
		default: void 0
	},
	onClick: {
		type: Function,
		required: false,
		default: void 0
	}
} });
export { Marks_default as default };
