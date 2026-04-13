import { useOrientation } from "../_util/hooks/useOrientation.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { getAttrStyleAndClass as getAttrStyleAndClass$1 } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { checkRenderNode } from "../_util/vueNode.js";
import { useFormItemContext, useFormItemInputContext } from "../form/context.js";
import { toNamePathStr } from "../form/hooks/useForm.js";
import { useRadioGroupContextProvider } from "./context.js";
import style_default from "./style/index.js";
import radio_default from "./radio.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, ref, useId, watch } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import pickAttrs from "@v-c/util/dist/pickAttrs";

//#region src/radio/group.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const defaults = {
	buttonStyle: "outline",
	block: false
};
const RadioGroup = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit }) => {
	const { prefixCls, direction } = useComponentBaseConfig("radio", props);
	const formItemInputContext = useFormItemInputContext();
	const defaultName = computed(() => toNamePathStr(formItemInputContext.value?.name ?? "") || useId());
	const name = computed(() => props?.name ?? defaultName.value);
	const { size: customizeSize, orientation, vertical } = toPropsRefs$1(props, "size", "orientation", "vertical");
	const formItemContext = useFormItemContext(true);
	const value = ref(props?.value ?? props?.defaultValue);
	const onRadioChange = (e) => {
		const lastValue = value.value;
		const val = e.target.value;
		props?.["onUpdate:value"]?.(val);
		if (val !== lastValue) emit("change", e);
		if (props.value === void 0) value.value = val;
	};
	watch(() => props.value, () => {
		value.value = props.value;
	});
	const groupPrefixCls = computed(() => `${prefixCls.value}-group`);
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const mergedSize = useSize(customizeSize);
	const [, mergedVertical] = useOrientation(orientation, vertical);
	useRadioGroupContextProvider(computed(() => {
		return {
			onChange: onRadioChange,
			value: value.value,
			disabled: props?.disabled,
			name: name.value,
			optionType: props?.optionType,
			block: props?.block
		};
	}));
	return () => {
		const { buttonStyle, block, rootClass, id, options, disabled } = props;
		const children = checkRenderNode(filterEmpty(slots?.default?.() ?? []));
		const { className, restAttrs, style } = getAttrStyleAndClass$1(attrs);
		const classString = clsx(groupPrefixCls.value, `${groupPrefixCls.value}-${buttonStyle}`, {
			[`${groupPrefixCls.value}-large`]: mergedSize.value === "large",
			[`${groupPrefixCls.value}-small`]: mergedSize.value === "small",
			[`${groupPrefixCls.value}-rtl`]: direction.value === "rtl",
			[`${groupPrefixCls.value}-block`]: block
		}, className, rootClass, hashId.value, cssVarCls.value, rootCls.value);
		let childrenToRender = children;
		const labelRender = slots?.labelRender ?? props?.labelRender;
		if (options && options.length) childrenToRender = options.map((option, index) => {
			if (typeof option === "string" || typeof option === "number") {
				const _label = labelRender ? labelRender({
					item: {
						label: option,
						value: option
					},
					index
				}) : option;
				return createVNode(radio_default, {
					"key": option.toString(),
					"prefixCls": prefixCls.value,
					"disabled": disabled,
					"value": option,
					"checked": value.value === option
				}, _isSlot(_label) ? _label : { default: () => [_label] });
			}
			const _label = labelRender ? labelRender({
				item: option,
				index
			}) : option.label;
			return createVNode(radio_default, {
				"key": `radio-group-value-options-${option.value}`,
				"prefixCls": prefixCls.value,
				"disabled": option.disabled || disabled,
				"value": option.value,
				"checked": value.value === option.value,
				"title": option.title,
				"style": option.style,
				"class": option.class,
				"id": option.id,
				"required": option.required
			}, _isSlot(_label) ? _label : { default: () => [_label] });
		});
		return createVNode("div", mergeProps(pickAttrs(restAttrs, {
			aria: true,
			data: true
		}), {
			"class": clsx(classString, { [`${prefixCls.value}-group-vertical`]: mergedVertical.value }),
			"style": style,
			"onMouseenter": (e) => {
				emit("mouseenter", e);
			},
			"onMouseleave": (e) => {
				emit("mouseleave", e);
			},
			"onFocus": (e) => {
				emit("focus", e);
			},
			"onBlur": (e) => {
				emit("blur", e);
				formItemContext?.triggerBlur?.();
			},
			"id": id
		}), [childrenToRender]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		defaultValue: { required: false },
		value: { required: false },
		size: {
			type: [String, null],
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		name: {
			type: String,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		optionType: {
			type: String,
			required: false
		},
		orientation: {
			type: String,
			required: false
		},
		buttonStyle: {
			type: String,
			required: false
		},
		block: {
			type: Boolean,
			required: false,
			default: void 0
		},
		vertical: {
			type: Boolean,
			required: false,
			default: void 0
		},
		labelRender: {
			type: Function,
			required: false
		},
		"onUpdate:value": {
			type: Function,
			required: false
		},
		options: {
			type: Array,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	}, defaults),
	emits: [
		"change",
		"mouseenter",
		"mouseleave",
		"focus",
		"blur"
	],
	name: "ARadioGroup",
	inheritAttrs: false
});
var group_default = RadioGroup;

//#endregion
export { group_default as default };