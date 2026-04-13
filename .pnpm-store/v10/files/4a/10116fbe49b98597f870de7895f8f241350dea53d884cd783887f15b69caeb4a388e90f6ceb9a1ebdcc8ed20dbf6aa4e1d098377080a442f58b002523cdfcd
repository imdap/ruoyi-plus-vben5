import { Fragment, createVNode, defineComponent, shallowRef } from "vue";
var Overlay_default = /* @__PURE__ */ defineComponent((props) => {
	const overlayRef = shallowRef();
	const setRef = (el) => {
		overlayRef.value = el;
	};
	return () => {
		const { overlay, arrow, prefixCls } = props;
		const overlayNode = typeof overlay === "function" ? overlay?.() : overlay;
		return createVNode(Fragment, null, [arrow && createVNode("div", { "class": `${prefixCls}-arrow` }, null), createVNode(overlayNode, { ref: setRef })]);
	};
}, { props: {
	overlay: {
		type: [
			Function,
			Object,
			String,
			Number,
			null,
			Boolean,
			Array
		],
		required: false,
		default: void 0
	},
	arrow: {
		type: Boolean,
		required: false,
		default: void 0
	},
	prefixCls: {
		type: String,
		required: false,
		default: void 0
	}
} });
export { Overlay_default as default };
