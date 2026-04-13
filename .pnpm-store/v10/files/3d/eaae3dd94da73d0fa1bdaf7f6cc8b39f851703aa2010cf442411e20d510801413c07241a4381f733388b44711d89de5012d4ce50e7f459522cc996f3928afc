import { Transition, createVNode, defineComponent, mergeProps } from "vue";
import { classNames } from "@v-c/util";
import { getTransitionProps } from "@v-c/util/dist/utils/transition";
var Mask_default = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { maskProps, prefixCls, className, style, visible, motionName } = props;
		return createVNode(Transition, mergeProps(getTransitionProps(motionName), { "key": "mask" }), { default: () => [visible && createVNode("div", mergeProps({
			"style": [style],
			"class": classNames(`${prefixCls}-mask`, className)
		}, maskProps), null)] });
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true,
			default: void 0
		},
		visible: {
			type: Boolean,
			required: true,
			default: void 0
		},
		motionName: {
			type: String,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		maskProps: {
			type: Object,
			required: false,
			default: void 0
		},
		className: {
			type: String,
			required: false,
			default: void 0
		}
	},
	name: "Mask"
});
export { Mask_default as default };
