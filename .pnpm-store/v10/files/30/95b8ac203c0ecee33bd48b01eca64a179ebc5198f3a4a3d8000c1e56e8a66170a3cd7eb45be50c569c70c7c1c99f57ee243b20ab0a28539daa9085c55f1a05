import { Transition, createVNode, defineComponent } from "vue";
import { getTransitionProps } from "@v-c/util/dist/utils/transition";
var Mask_default = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	return () => {
		const { prefixCls, open, zIndex, mask, motion, mobile } = props;
		if (!mask) return null;
		return createVNode(Transition, getTransitionProps(motion?.name, motion), { default: () => [open ? createVNode("div", {
			"style": { zIndex },
			"class": [
				`${prefixCls}-mask`,
				mobile && `${prefixCls}-mask-mobile`,
				attrs.class
			]
		}, null) : null] });
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true,
			default: void 0
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		zIndex: {
			type: Number,
			required: false,
			default: void 0
		},
		mask: {
			type: Boolean,
			required: false,
			default: void 0
		},
		motion: {
			type: Object,
			required: false,
			default: void 0
		},
		mobile: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	inheritAttrs: false,
	name: "PopupMask"
});
export { Mask_default as default };
