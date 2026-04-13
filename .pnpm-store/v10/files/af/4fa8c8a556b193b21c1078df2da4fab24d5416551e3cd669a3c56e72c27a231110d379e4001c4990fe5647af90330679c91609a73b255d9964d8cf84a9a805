import { createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
var TransBtn_default = /* @__PURE__ */ defineComponent((props, { slots }) => {
	return () => {
		const { className, style, customizeIcon, customizeIconProps, onMouseDown, onClick } = props;
		const icon = typeof customizeIcon === "function" ? customizeIcon(customizeIconProps) : customizeIcon;
		return createVNode("span", {
			"class": className,
			"onMousedown": (event) => {
				event.preventDefault();
				onMouseDown?.(event);
			},
			"style": {
				userSelect: "none",
				WebkitUserSelect: "none",
				...style
			},
			"unselectable": "on",
			"onClick": onClick,
			"aria-hidden": true
		}, [icon !== void 0 ? icon : createVNode("span", { "class": clsx(className.split(/\s+/).map((cls) => `${cls}-icon`)) }, [slots?.default?.()])]);
	};
}, {
	props: {
		className: {
			type: String,
			required: true,
			default: void 0
		},
		style: {
			type: Object,
			required: false,
			default: void 0
		},
		customizeIcon: {
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
		customizeIconProps: {
			required: false,
			default: void 0
		},
		onMouseDown: {
			type: Function,
			required: false,
			default: void 0
		},
		onClick: {
			type: Function,
			required: false,
			default: void 0
		}
	},
	name: "TransBtn",
	inheritAttrs: false
});
export { TransBtn_default as default };
