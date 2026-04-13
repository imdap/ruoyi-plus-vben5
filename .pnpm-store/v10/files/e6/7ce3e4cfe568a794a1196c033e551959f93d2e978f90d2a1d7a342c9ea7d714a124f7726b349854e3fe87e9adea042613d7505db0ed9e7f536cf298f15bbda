import { createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
var Popup_default = /* @__PURE__ */ defineComponent((props, { slots }) => {
	return () => {
		const { prefixCls, id, classNames, styles, className, style } = props;
		const children = slots?.default?.();
		return createVNode("div", {
			"id": id,
			"class": clsx(`${prefixCls}-container`, classNames?.container, className),
			"style": {
				...styles?.container,
				...style
			},
			"role": "tooltip"
		}, [children]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		id: {
			type: String,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		},
		className: {
			type: String,
			required: false,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		}
	},
	name: "VCPopup"
});
export { Popup_default as default };
