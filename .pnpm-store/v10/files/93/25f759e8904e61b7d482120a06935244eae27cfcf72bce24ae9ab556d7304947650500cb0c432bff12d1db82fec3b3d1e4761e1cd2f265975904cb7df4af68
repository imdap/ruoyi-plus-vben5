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
import style_default, { useSharedStyle } from "./style/index.js";
import getAllowClear_default from "../_util/getAllowClear.js";
import useRemovePasswordTimeout from "./hooks/useRemovePasswordTimeout.js";
import { Fragment, computed, createVNode, defineComponent, isVNode, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import { omit } from "es-toolkit";
import VcInput from "@v-c/input";

//#region src/input/Input.tsx
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
	"allowClear",
	"autoComplete",
	"prefix",
	"suffix",
	"maxlength",
	"readonly"
];
const InternalInput = /* @__PURE__ */ defineComponent((props, { slots, expose, emit, attrs }) => {
	if (isDev) {
		const warning = devUseWarning("Input");
		[
			["bordered", "variant"],
			["addonAfter", "Space.Compact"],
			["addonBefore", "Space.Compact"]
		].forEach(([prop, replacement]) => {
			warning.deprecated(!props[prop], prop, replacement);
		});
	}
	const { prefixCls, direction, allowClear: contextAllowClear, autoComplete: contextAutoComplete, changeOnComposing: contextChangeOnComposing, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("input", props, [
		"allowClear",
		"autoComplete",
		"changeOnComposing"
	]);
	const { classes, styles, rootClass, size: customSize, disabled: customDisabled, status: customStatus, bordered, variant: customVariant } = toPropsRefs(props, "classes", "styles", "rootClass", "size", "disabled", "status", "bordered", "variant");
	const inputRef = shallowRef();
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = useSharedStyle(prefixCls, rootClass);
	style_default(prefixCls, rootCls);
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	const mergedSize = useSize((ctx) => customSize.value ?? compactSize.value ?? ctx);
	const disabledContext = useDisabledContext();
	const mergedDisabled = computed(() => customDisabled.value ?? disabledContext.value);
	const mergedProps = computed(() => {
		return {
			...props,
			size: mergedSize.value,
			disabled: mergedDisabled.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const formItemInputContext = useFormItemInputContext();
	const contextStatus = computed(() => formItemInputContext.value.status);
	const hasFeedback = computed(() => formItemInputContext.value.hasFeedback);
	const feedbackIcon = computed(() => formItemInputContext.value.feedbackIcon);
	const mergedStatus = computed(() => getMergedStatus(contextStatus.value, customStatus.value));
	const [mergedVariant, enableVariantCls] = useVariant("input", customVariant, bordered);
	const removePasswordTimeout = useRemovePasswordTimeout(inputRef, true);
	const mergedAllowClear = computed(() => {
		return getAllowClear_default(props.allowClear ?? contextAllowClear.value);
	});
	const mergedAutoComplete = computed(() => props.autoComplete ?? contextAutoComplete.value);
	const mergedChangeOnComposing = computed(() => props.changeOnComposing ?? contextChangeOnComposing.value);
	expose({
		focus: (options) => inputRef.value?.focus?.(options),
		blur: () => inputRef.value?.blur?.(),
		setSelectionRange: (...args) => inputRef.value?.setSelectionRange?.(...args),
		select: () => inputRef.value?.select?.(),
		input: computed(() => inputRef.value?.input ?? null),
		nativeElement: computed(() => inputRef.value?.nativeElement ?? null)
	});
	const handlePressEnter = (e) => {
		emit("pressEnter", e);
	};
	const triggerChange = (e) => {
		const target = e?.target;
		emit("update:value", target?.value);
		emit("change", e);
	};
	const handleClear = () => {
		emit("clear");
	};
	const handleFocus = (e) => {
		removePasswordTimeout();
		emit("focus", e);
	};
	const handleBlur = (e) => {
		removePasswordTimeout();
		emit("blur", e);
	};
	const handleKeyDown = (e) => {
		emit("keydown", e);
	};
	const handleKeyUp = (e) => {
		emit("keyup", e);
	};
	const handleCompositionStart = (e) => {
		emit("compositionstart", e);
	};
	const handleCompositionEnd = (e) => {
		emit("compositionend", e);
	};
	return () => {
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs, { omit: ["onCompositionStart", "onCompositionEnd"] });
		const prefixNode = getSlotPropsFnRun(slots, props, "prefix");
		const suffixSlotNode = getSlotPropsFnRun(slots, props, "suffix");
		const addonBeforeNode = getSlotPropsFnRun(slots, props, "addonBefore");
		const addonAfterNode = getSlotPropsFnRun(slots, props, "addonAfter");
		const mergedSuffix = hasFeedback.value || suffixSlotNode ? createVNode(Fragment, null, [suffixSlotNode, hasFeedback.value ? feedbackIcon.value : null]) : void 0;
		const wrapAddon = (node) => {
			if (!node) return;
			return createVNode(ContextIsolator, {
				"form": true,
				"space": true
			}, _isSlot(node) ? node : { default: () => [node] });
		};
		const restProps = omit(props, omitKeys);
		const classesValue = clsx(contextClassName.value, className, rootClass.value, compactItemClassnames.value, cssVarCls.value, rootCls.value, mergedClassNames.value.root, hashId.value);
		const mergedStyle = {
			...mergedStyles.value.root,
			...contextStyle.value,
			...style
		};
		const variantClassName = clsx({ [`${prefixCls.value}-${mergedVariant.value}`]: enableVariantCls.value }, getStatusClassNames(prefixCls.value, mergedStatus.value));
		const classNames = {
			...mergedClassNames.value,
			input: clsx({
				[`${prefixCls.value}-sm`]: mergedSize.value === "small",
				[`${prefixCls.value}-lg`]: mergedSize.value === "large",
				[`${prefixCls.value}-rtl`]: direction.value === "rtl"
			}, mergedClassNames.value.input, hashId.value),
			affixWrapper: clsx({
				[`${prefixCls.value}-affix-wrapper-sm`]: mergedSize.value === "small",
				[`${prefixCls.value}-affix-wrapper-lg`]: mergedSize.value === "large",
				[`${prefixCls.value}-affix-wrapper-rtl`]: direction.value === "rtl"
			}, hashId.value),
			wrapper: clsx({ [`${prefixCls.value}-group-rtl`]: direction.value === "rtl" }, hashId.value),
			groupWrapper: clsx({
				[`${prefixCls.value}-group-wrapper-sm`]: mergedSize.value === "small",
				[`${prefixCls.value}-group-wrapper-lg`]: mergedSize.value === "large",
				[`${prefixCls.value}-group-wrapper-rtl`]: direction.value === "rtl",
				[`${prefixCls.value}-group-wrapper-${mergedVariant.value}`]: enableVariantCls.value
			}, getStatusClassNames(`${prefixCls.value}-group-wrapper`, mergedStatus.value, hasFeedback.value), hashId.value),
			variant: variantClassName
		};
		return createVNode(VcInput, mergeProps(restAttrs, restProps, {
			"maxLength": props.maxlength,
			"readOnly": props.readonly,
			"ref": inputRef,
			"prefixCls": prefixCls.value,
			"class": classesValue,
			"style": mergedStyle,
			"classNames": classNames,
			"styles": mergedStyles.value,
			"disabled": mergedDisabled.value,
			"allowClear": mergedAllowClear.value,
			"autoComplete": mergedAutoComplete.value,
			"changeOnComposing": mergedChangeOnComposing.value,
			"suffix": mergedSuffix,
			"prefix": prefixNode,
			"addonBefore": wrapAddon(addonBeforeNode),
			"addonAfter": wrapAddon(addonAfterNode),
			"onPressEnter": handlePressEnter,
			"onClear": handleClear,
			"onChange": (e) => {
				removePasswordTimeout();
				triggerChange(e);
			},
			"onFocus": handleFocus,
			"onBlur": handleBlur,
			"onKeyDown": handleKeyDown,
			"onKeyUp": handleKeyUp,
			"onCompositionStart": handleCompositionStart,
			"onCompositionEnd": handleCompositionEnd,
			"dataAttrs": props.dataAttrs,
			"components": props.components
		}), { clearIcon: slots.clearIcon });
	};
}, {
	props: {
		size: {
			type: [String, null],
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		status: {
			type: String,
			required: false
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
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		value: { required: false },
		defaultValue: { required: false },
		type: { required: false },
		showCount: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		autoComplete: {
			type: String,
			required: false
		},
		htmlSize: {
			type: Number,
			required: false
		},
		placeholder: {
			type: String,
			required: false
		},
		count: { required: false },
		maxlength: {
			type: Number,
			required: false
		},
		readonly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		hidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		dataAttrs: { required: false },
		components: { required: false },
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
		allowClear: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		changeOnComposing: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		inputMode: {
			type: String,
			required: false
		}
	},
	emits: [
		"pressEnter",
		"clear",
		"change",
		"blur",
		"focus",
		"keydown",
		"keyup",
		"compositionstart",
		"compositionend",
		"update:value"
	],
	name: "AInput",
	inheritAttrs: false
});
var Input_default = InternalInput;

//#endregion
export { Input_default as default };