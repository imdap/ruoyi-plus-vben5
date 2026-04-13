import { usePickerContext } from "../context.js";
import { createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
var Icon = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const ctx = usePickerContext();
	return () => {
		const { icon, type } = props;
		if (!icon) return null;
		const { prefixCls, classNames, styles } = ctx.value;
		const { class: attrClass, style: attrStyle, ...restAttrs } = attrs;
		const mergedAttrStyle = attrStyle && typeof attrStyle === "object" ? attrStyle : {};
		return createVNode("span", mergeProps(restAttrs, {
			"class": clsx(`${prefixCls}-${type}`, classNames.suffix, attrClass),
			"style": {
				...styles.suffix || {},
				...mergedAttrStyle
			}
		}), [icon]);
	};
}, {
	props: {
		icon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		type: {
			type: String,
			required: true,
			default: void 0
		}
	},
	name: "Icon",
	inheritAttrs: false
});
var Icon_default = Icon;
const ClearIcon = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	return () => {
		return createVNode(Icon, mergeProps(attrs, {
			"icon": props.icon,
			"type": "clear",
			"role": "button",
			"onMousedown": (e) => {
				e.preventDefault();
			},
			"onClick": (e) => {
				e.stopPropagation();
				props.onClear();
			}
		}), null);
	};
}, {
	props: {
		onClear: {
			required: true,
			default: void 0
		},
		icon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		}
	},
	name: "ClearIcon",
	inheritAttrs: false
});
export { ClearIcon, Icon_default as default };
