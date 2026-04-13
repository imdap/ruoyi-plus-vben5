import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { useCompactItemContext } from "../space/Compact.js";
import { ContextIsolator } from "../_util/ContextIsolator.js";
import { getAttrStyleAndClass, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import { getMergedStatus, getStatusClassNames } from "../_util/statusUtils.js";
import { useFormItemInputContext } from "../form/context.js";
import useVariant from "../form/hooks/useVariant.js";
import { SpaceAddon, SpaceCompact } from "../space/index.js";
import style_default from "./style/index.js";
import { Fragment, computed, createVNode, defineComponent, isVNode, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import { DownOutlined, MinusOutlined, PlusOutlined, UpOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";
import VcInputNumber from "@v-c/input-number";

//#region src/input-number/index.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const omitKeys = [
	"classes",
	"styles",
	"rootClass",
	"size",
	"status",
	"disabled",
	"addonBefore",
	"addonAfter",
	"bordered",
	"variant",
	"prefixCls",
	"prefix",
	"suffix",
	"controls",
	"onInput",
	"onPressEnter",
	"onStep",
	"onBeforeinput",
	"keyboard",
	"onClick",
	"onFocus",
	"onMousedown",
	"onMouseup",
	"onMouseleave",
	"onMousemove",
	"onMouseenter",
	"onMouseout",
	"value",
	"defaultValue",
	"onChange"
];
const InputNumber = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit, expose }) => {
	if (isDev) {
		const warning = devUseWarning("InputNumber");
		[
			["bordered", "variant"],
			["addonAfter", "Space.Compact"],
			["addonBefore", "Space.Compact"]
		].forEach(([prop, replacement]) => {
			warning.deprecated(!props[prop], prop, replacement);
		});
		warning(!(props.type === "number" && props.changeOnWheel), "usage", "When `type=\"number\"` is used with `changeOnWheel`, the wheel interaction may not work as expected. Remove `type=\"number\"` if not required.");
	}
	const { prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("inputNumber", props, [], "input-number");
	const { classes, styles, rootClass, size: customSize, disabled: customDisabled, status: customStatus, bordered, variant: customVariant } = toPropsRefs(props, "classes", "styles", "rootClass", "size", "disabled", "status", "bordered", "variant");
	const inputNumberRef = shallowRef();
	expose({
		focus: (...args) => inputNumberRef.value?.focus?.(...args),
		blur: () => inputNumberRef.value?.blur?.(),
		input: computed(() => inputNumberRef.value?.input ?? null),
		nativeElement: computed(() => inputNumberRef.value?.nativeElement ?? null)
	});
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	const mergedSize = useSize((ctx) => customSize.value ?? compactSize.value ?? ctx);
	const disabledContext = useDisabledContext();
	const mergedDisabled = computed(() => customDisabled.value ?? disabledContext.value);
	const mergedControls = computed(() => {
		const raw = props.controls ?? true;
		if (!raw || mergedDisabled.value || props.readOnly) return false;
		return raw;
	});
	const controlsProp = computed(() => typeof mergedControls.value === "boolean" ? mergedControls.value : void 0);
	const formItemInputContext = useFormItemInputContext();
	const mergedStatus = computed(() => {
		return getMergedStatus(formItemInputContext.value.status, customStatus.value);
	});
	const hasFeedback = computed(() => formItemInputContext.value.hasFeedback);
	const feedbackIcon = computed(() => formItemInputContext.value.feedbackIcon);
	const [mergedVariant, enableVariantCls] = useVariant("inputNumber", customVariant, bordered);
	const mergedProps = computed(() => {
		return {
			...props,
			size: mergedSize.value,
			disabled: mergedDisabled.value,
			controls: mergedControls.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const hasLegacyAddon = computed(() => !!(props.addonBefore || props.addonAfter));
	const upIcon = computed(() => {
		let icon = props.mode === "spinner" ? createVNode(PlusOutlined, null, null) : createVNode(UpOutlined, null, null);
		if (typeof mergedControls.value === "object" && mergedControls.value?.upIcon) icon = mergedControls.value.upIcon;
		return icon;
	});
	const downIcon = computed(() => {
		let icon = props.mode === "spinner" ? createVNode(MinusOutlined, null, null) : createVNode(DownOutlined, null, null);
		if (typeof mergedControls.value === "object" && mergedControls.value?.downIcon) icon = mergedControls.value.downIcon;
		return icon;
	});
	const appliedRootClass = computed(() => hasLegacyAddon.value ? void 0 : rootClass.value);
	const classesValue = computed(() => {
		const { className } = getAttrStyleAndClass(attrs);
		return clsx(contextClassName.value, className, appliedRootClass.value, cssVarCls.value, rootCls.value, hashId.value, compactItemClassnames.value, mergedClassNames.value.root, getStatusClassNames(prefixCls.value, mergedStatus.value, hasFeedback.value), {
			[`${prefixCls.value}-${mergedVariant.value}`]: enableVariantCls.value,
			[`${prefixCls.value}-lg`]: mergedSize.value === "large",
			[`${prefixCls.value}-sm`]: mergedSize.value === "small",
			[`${prefixCls.value}-rtl`]: direction.value === "rtl",
			[`${prefixCls.value}-without-controls`]: !mergedControls.value,
			[`${prefixCls.value}-in-form-item`]: formItemInputContext.value.isFormItemInput
		});
	});
	const mergedStyle = computed(() => {
		const { style } = getAttrStyleAndClass(attrs);
		return {
			...mergedStyles.value.root,
			...contextStyle.value,
			...style
		};
	});
	const renderAddon = (node) => {
		if (!node) return null;
		return createVNode(SpaceAddon, {
			"class": clsx(`${prefixCls.value}-addon`, cssVarCls.value, hashId.value),
			"variant": mergedVariant.value,
			"disabled": mergedDisabled.value,
			"status": mergedStatus.value
		}, { default: () => [createVNode(ContextIsolator, {
			"form": true,
			"space": true
		}, _isSlot(node) ? node : { default: () => [node] })] });
	};
	const handleChange = (value) => {
		emit("change", value);
	};
	const handleUpdateValue = (value) => {
		emit("update:value", value);
	};
	const handleInput = (text) => {
		emit("input", text);
	};
	const handlePressEnter = (e) => emit("pressEnter", e);
	const handleStep = (value, info) => emit("step", value, info);
	const handleMouseEvent = (eventName) => (e) => emit(eventName, e);
	const handleKeyboardEvent = (eventName) => (e) => emit(eventName, e);
	const handleFocusEvent = (eventName) => (e) => emit(eventName, e);
	const handleCompositionEvent = (eventName) => (e) => emit(eventName, e);
	const handleBeforeInput = (e) => emit("beforeinput", e);
	return () => {
		const { restAttrs } = getAttrStyleAndClass(attrs);
		const restProps = omit(props, omitKeys);
		const { min, max, step } = props;
		const prefixNode = getSlotPropsFnRun(slots, props, "prefix");
		const suffixSlot = getSlotPropsFnRun(slots, props, "suffix");
		const mergedSuffixFn = () => {
			if (hasFeedback.value) return createVNode(Fragment, null, [suffixSlot, feedbackIcon.value]);
			return suffixSlot;
		};
		const mergedSuffix = mergedSuffixFn();
		const renderInputNode = () => createVNode(VcInputNumber, mergeProps(restAttrs, restProps, {
			"keyboard": props.keyboard,
			"value": props.value,
			"ref": inputNumberRef,
			"prefixCls": prefixCls.value,
			"className": classesValue.value,
			"style": mergedStyle.value,
			"classNames": mergedClassNames.value,
			"styles": mergedStyles.value,
			"disabled": mergedDisabled.value,
			"controls": controlsProp.value,
			"upHandler": upIcon.value,
			"downHandler": downIcon.value,
			"prefix": prefixNode,
			"suffix": mergedSuffix,
			"min": min,
			"max": max,
			"step": step,
			"onChange": handleChange
		}, { "onUpdate:value": handleUpdateValue }, {
			"onInput": handleInput,
			"onPressEnter": handlePressEnter,
			"onStep": handleStep,
			"onMouseDown": handleMouseEvent("mousedown"),
			"onClick": handleMouseEvent("click"),
			"onMouseUp": handleMouseEvent("mouseup"),
			"onMouseLeave": handleMouseEvent("mouseleave"),
			"onMouseMove": handleMouseEvent("mousemove"),
			"onMouseEnter": handleMouseEvent("mouseenter"),
			"onMouseOut": handleMouseEvent("mouseout"),
			"onFocus": handleFocusEvent("focus"),
			"onBlur": handleFocusEvent("blur"),
			"onKeyDown": handleKeyboardEvent("keydown"),
			"onKeyUp": handleKeyboardEvent("keyup"),
			"onCompositionStart": handleCompositionEvent("compositionstart"),
			"onCompositionEnd": handleCompositionEvent("compositionend"),
			"onBeforeInput": handleBeforeInput
		}), null);
		const inputNode = renderInputNode();
		if (hasLegacyAddon.value) return createVNode(SpaceCompact, { "rootClass": rootClass.value }, { default: () => [
			renderAddon(getSlotPropsFnRun(slots, props, "addonBefore")),
			inputNode,
			renderAddon(getSlotPropsFnRun(slots, props, "addonAfter"))
		] });
		return inputNode;
	};
}, {
	props: {
		size: {
			type: [String, null],
			required: false
		},
		status: {
			type: String,
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		addonBefore: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		addonAfter: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		prefix: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		suffix: {
			type: [
				Function,
				String,
				Number,
				null,
				Object,
				Boolean
			],
			required: false,
			default: void 0
		},
		bordered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		variant: {
			type: String,
			required: false
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
			required: false
		},
		controls: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		type: {
			type: String,
			required: false
		},
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		mode: {
			type: String,
			required: false
		},
		min: { required: false },
		max: { required: false },
		step: { required: false },
		defaultValue: { required: false },
		value: { required: false },
		readOnly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		upHandler: { required: false },
		downHandler: { required: false },
		keyboard: {
			type: Boolean,
			required: false,
			default: void 0
		},
		changeOnWheel: {
			type: Boolean,
			required: false,
			default: void 0
		},
		parser: {
			type: Function,
			required: false
		},
		formatter: {
			type: Function,
			required: false
		},
		precision: {
			type: Number,
			required: false
		},
		decimalSeparator: {
			type: String,
			required: false
		},
		onStep: {
			type: Function,
			required: false
		},
		changeOnBlur: {
			type: Boolean,
			required: false,
			default: void 0
		},
		tabIndex: {
			type: Number,
			required: false
		},
		onMouseLeave: {
			type: Function,
			required: false
		},
		onMouseOut: {
			type: Function,
			required: false
		},
		stringMode: {
			type: Boolean,
			required: false,
			default: void 0
		},
		placeholder: {
			type: String,
			required: false
		}
	},
	emits: [
		"change",
		"update:value",
		"input",
		"pressEnter",
		"step",
		"mousedown",
		"click",
		"mouseup",
		"mouseleave",
		"mousemove",
		"mouseenter",
		"mouseout",
		"focus",
		"blur",
		"keydown",
		"keyup",
		"compositionstart",
		"compositionend",
		"beforeinput"
	],
	name: "AInputNumber",
	inheritAttrs: false
});
InputNumber.install = (app) => {
	app.component(InputNumber.name, InputNumber);
	return app;
};
var input_number_default = InputNumber;

//#endregion
export { input_number_default as default };