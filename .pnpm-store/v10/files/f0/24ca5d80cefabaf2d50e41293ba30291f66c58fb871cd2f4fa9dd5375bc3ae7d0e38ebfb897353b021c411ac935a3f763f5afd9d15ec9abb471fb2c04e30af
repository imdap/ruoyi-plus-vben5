import { createVNode, defineComponent } from "vue";
import { classNames } from "@v-c/util";
var Handler_default = /* @__PURE__ */ defineComponent({
	props: {
		size: String,
		color: String,
		prefixCls: String
	},
	inheritAttrs: false,
	setup(props) {
		return () => {
			const { size = "default", color, prefixCls } = props;
			return createVNode("div", {
				"class": classNames(`${prefixCls}-handler`, { [`${prefixCls}-handler-sm`]: size === "small" }),
				"style": { backgroundColor: color }
			}, null);
		};
	}
});
export { Handler_default as default };
