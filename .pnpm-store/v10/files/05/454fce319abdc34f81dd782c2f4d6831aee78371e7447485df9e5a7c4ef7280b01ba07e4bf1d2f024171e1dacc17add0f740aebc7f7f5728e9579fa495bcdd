import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { getAttrStyleAndClass } from "../_util/hooks/useMergeSemantic.js";
import tooltip_default from "../tooltip/index.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import style_default from "./style/index.js";
import { createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import { StarFilled } from "@antdv-next/icons";
import { omit } from "es-toolkit";
import VcRate from "@v-c/rate";

//#region src/rate/index.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function isTooltipProps(item) {
	return typeof item === "object" && item !== null;
}
const defaults = { character: createVNode(StarFilled, null, null) };
const Rate = /* @__PURE__ */ defineComponent((props, { attrs, emit, expose }) => {
	const rateRef = shallowRef();
	const characterRender = (node, { index }) => {
		const { tooltips } = props;
		if (!tooltips) return node;
		const tooltipsItem = tooltips[index];
		if (isTooltipProps(tooltipsItem)) return createVNode(tooltip_default, tooltipsItem, _isSlot(node) ? node : { default: () => [node] });
		return createVNode(tooltip_default, { "title": tooltipsItem }, _isSlot(node) ? node : { default: () => [node] });
	};
	const { prefixCls: ratePrefixCls, direction, class: contextClassName, style: contextStyle } = useComponentBaseConfig("rate", props);
	const [hashId, cssVarCls] = style_default(ratePrefixCls);
	const disabled = useDisabledContext();
	const mergedSize = useSize((ctx) => props.size ?? ctx);
	expose({
		focus: () => {
			rateRef.value?.focus?.();
		},
		blur: () => {
			rateRef.value?.blur?.();
		}
	});
	return () => {
		const { character, disabled: customDisabled, rootClass, ...restProps } = props;
		const mergedDisabled = customDisabled ?? disabled.value;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		return createVNode(VcRate, mergeProps({
			"ref": rateRef,
			"character": character,
			"disabled": mergedDisabled,
			"characterRender": characterRender
		}, restAttrs, omit(restProps, ["characterRender"]), {
			"class": clsx({
				[`${ratePrefixCls.value}-large`]: mergedSize.value === "large",
				[`${ratePrefixCls.value}-small`]: mergedSize.value === "small"
			}, className, rootClass, hashId.value, cssVarCls.value, contextClassName.value),
			"style": {
				...contextStyle.value,
				...style
			},
			"prefixCls": ratePrefixCls.value,
			"direction": direction.value,
			"onFocus": () => {
				emit("focus");
			},
			"onBlur": () => {
				emit("blur");
			},
			"onChange": (...args) => {
				emit("change", ...args);
				emit("update:value", ...args);
			},
			"onKeyDown": (e) => {
				emit("keydown", e);
			},
			"onMouseLeave": (e) => {
				emit("mouseleave", e);
			},
			"onHoverChange": (...args) => {
				emit("hoverChange", ...args);
			}
		}), null);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		rootClass: {
			type: String,
			required: false
		},
		size: {
			type: [String, null],
			required: false
		},
		tooltips: {
			type: Array,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		defaultValue: {
			type: Number,
			required: false
		},
		value: {
			type: Number,
			required: false
		},
		allowClear: {
			type: Boolean,
			required: false,
			default: void 0
		},
		keyboard: {
			type: Boolean,
			required: false,
			default: void 0
		},
		direction: {
			type: String,
			required: false
		},
		tabIndex: {
			type: [Number, String],
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		id: {
			type: String,
			required: false
		},
		count: {
			type: Number,
			required: false
		},
		character: {
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
		characterRender: {
			type: Function,
			required: false
		},
		allowHalf: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		}
	}, defaults),
	emits: [
		"update:value",
		"change",
		"hoverChange",
		"focus",
		"blur",
		"keydown",
		"mouseleave"
	],
	name: "ARate",
	inheritAttrs: false
});
Rate.install = (app) => {
	app.component(Rate.name, Rate);
};
var rate_default = Rate;

//#endregion
export { rate_default as default };