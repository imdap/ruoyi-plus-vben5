import { createVNode, defineComponent, ref } from "vue";
var Transform_default = /* @__PURE__ */ defineComponent({
	name: "Transform",
	inheritAttrs: false,
	props: {
		x: {
			type: Number,
			required: true
		},
		y: {
			type: Number,
			required: true
		}
	},
	setup(props, { slots, expose }) {
		const transformDomRef = ref();
		expose({ transformDomRef });
		return () => {
			const { x, y } = props;
			return createVNode("div", {
				"style": {
					position: "absolute",
					left: `${x}%`,
					top: `${y}%`,
					zIndex: 1,
					transform: "translate(-50%, -50%)"
				},
				"ref": transformDomRef
			}, [slots.default?.()]);
		};
	}
});
export { Transform_default as default };
