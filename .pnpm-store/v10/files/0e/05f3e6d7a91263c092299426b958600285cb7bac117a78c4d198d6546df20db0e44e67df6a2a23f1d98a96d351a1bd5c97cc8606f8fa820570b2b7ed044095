import { useCascaderContext } from "../context.js";
import { createVNode, defineComponent, mergeDefaults } from "vue";
import { clsx } from "@v-c/util";
var Checkbox_default = /* @__PURE__ */ defineComponent((props) => {
	const context = useCascaderContext();
	return () => {
		const checkable = context.value?.checkable;
		const customCheckbox = typeof checkable !== "boolean" ? checkable : null;
		return createVNode("span", {
			"class": clsx(`${props.prefixCls}`, {
				[`${props.prefixCls}-checked`]: props.checked,
				[`${props.prefixCls}-indeterminate`]: !props.checked && props.halfChecked,
				[`${props.prefixCls}-disabled`]: props.disabled || props.disableCheckbox
			}),
			"onClick": props.onClick
		}, [customCheckbox]);
	};
}, { props: /* @__PURE__ */ mergeDefaults({
	prefixCls: {
		type: String,
		required: true,
		default: void 0
	},
	checked: {
		type: Boolean,
		required: false,
		default: void 0
	},
	halfChecked: {
		type: Boolean,
		required: false,
		default: void 0
	},
	disabled: {
		type: Boolean,
		required: false,
		default: void 0
	},
	onClick: {
		type: Function,
		required: false,
		default: void 0
	},
	disableCheckbox: {
		type: Boolean,
		required: false,
		default: void 0
	},
	children: {
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
}, {
	prefixCls: "",
	checked: false,
	halfChecked: false,
	disabled: false,
	disableCheckbox: false
}) });
export { Checkbox_default as default };
