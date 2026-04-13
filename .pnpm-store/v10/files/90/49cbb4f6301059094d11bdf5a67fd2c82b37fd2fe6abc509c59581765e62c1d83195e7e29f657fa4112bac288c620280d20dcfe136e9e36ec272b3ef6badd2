import { createVNode, defineComponent } from "vue";
function executeValue(value) {
	return typeof value === "function" ? value() : value;
}
var PresetPanel_default = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { prefixCls, presets, onClick, onHover } = props;
		if (!presets.length) return null;
		return createVNode("div", { "class": `${prefixCls}-presets` }, [createVNode("ul", null, [presets.map(({ label, value }, index) => createVNode("li", {
			"key": index,
			"onClick": () => {
				onClick(executeValue(value));
			},
			"onMouseenter": () => {
				onHover(executeValue(value));
			},
			"onMouseleave": () => {
				onHover(null);
			}
		}, [label]))])]);
	};
}, {
	props: {
		prefixCls: {
			type: [String, null],
			required: true,
			default: void 0
		},
		presets: {
			type: Array,
			required: true,
			default: void 0
		},
		onClick: {
			type: Function,
			required: true,
			default: void 0
		},
		onHover: {
			type: Function,
			required: true,
			default: void 0
		}
	},
	name: "PresetPanel",
	inheritAttrs: false
});
export { PresetPanel_default as default };
