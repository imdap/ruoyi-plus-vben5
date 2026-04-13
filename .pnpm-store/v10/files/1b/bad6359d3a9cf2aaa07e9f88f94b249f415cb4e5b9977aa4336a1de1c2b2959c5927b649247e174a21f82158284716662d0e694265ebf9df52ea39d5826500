import { createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
var Rail_default = /* @__PURE__ */ defineComponent((props) => {
	return () => {
		const { prefixCls, className, status, style } = props;
		const railCls = `${prefixCls}-rail`;
		return createVNode("div", {
			"class": clsx(railCls, `${railCls}-${status}`, className),
			"style": style
		}, null);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: true,
			default: void 0
		},
		className: {
			type: String,
			required: true,
			default: void 0
		},
		status: {
			type: String,
			required: true,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		}
	},
	name: "StepsRail",
	inheritAttrs: false
});
export { Rail_default as default };
