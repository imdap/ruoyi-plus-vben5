import { createVNode, defineComponent, isVNode } from "vue";
var Polite_default = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { visible, values } = props;
		if (!visible) return null;
		const MAX_COUNT = 50;
		return createVNode("span", {
			"aria-live": "polite",
			"style": {
				width: 0,
				height: 0,
				position: "absolute",
				overflow: "hidden",
				opacity: 0
			}
		}, [`${values.slice(0, MAX_COUNT).map(({ label, value }) => ["number", "string"].includes(typeof label) ? label : isVNode(label) || Array.isArray(label) ? label : value).join(", ")}`, values.length > MAX_COUNT ? ", ..." : null]);
	};
}, {
	props: {
		visible: {
			type: Boolean,
			required: true,
			default: void 0
		},
		values: {
			type: Array,
			required: true,
			default: void 0
		}
	},
	name: "Polite",
	inheritAttrs: false
});
export { Polite_default as default };
