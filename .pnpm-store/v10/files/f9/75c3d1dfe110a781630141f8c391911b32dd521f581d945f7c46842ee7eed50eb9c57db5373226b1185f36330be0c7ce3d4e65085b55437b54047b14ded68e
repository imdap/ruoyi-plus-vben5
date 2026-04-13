import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { useCompactItemContext } from "../space/Compact.js";
import { getAttrStyleAndClass, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import { getMergedStatus, getStatusClassNames } from "../_util/statusUtils.js";
import { useFormItemInputContext } from "../form/context.js";
import useVariant from "../form/hooks/useVariant.js";
import { useSharedStyle } from "./style/index.js";
import getAllowClear_default from "../_util/getAllowClear.js";
import textarea_default from "./style/textarea.js";
import { computed, createVNode, defineComponent, mergeProps, onBeforeUnmount, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import { omit } from "es-toolkit";
import VcTextArea from "@v-c/textarea";

//#region src/input/TextArea.tsx
const omitKeys = [
	"classes",
	"styles",
	"rootClass",
	"size",
	"status",
	"disabled",
	"bordered",
	"variant",
	"prefixCls",
	"allowClear",
	"onKeydown"
];
const InternalTextArea = /* @__PURE__ */ defineComponent((props, { attrs, emit, expose }) => {
	if (isDev) devUseWarning("TextArea").deprecated(props.bordered === void 0, "bordered", "variant");
	const { prefixCls, direction, allowClear: contextAllowClear, changeOnComposing: contextChangeOnComposing, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("textArea", props, ["allowClear", "changeOnComposing"], "input");
	const { classes, styles, rootClass, size: customizeSize, disabled: customDisabled, status: customStatus, bordered, variant: customVariant } = toPropsRefs(props, "classes", "styles", "rootClass", "size", "disabled", "status", "bordered", "variant");
	const textAreaRef = shallowRef();
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = useSharedStyle(prefixCls, rootClass);
	textarea_default(prefixCls, rootCls);
	const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
	const mergedSize = useSize((ctx) => customizeSize.value ?? compactSize.value ?? ctx);
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
	const mergedStatus = computed(() => getMergedStatus(formItemInputContext.value.status, customStatus.value));
	const hasFeedback = computed(() => formItemInputContext.value.hasFeedback);
	const feedbackIcon = computed(() => formItemInputContext.value.feedbackIcon);
	const [mergedVariant, enableVariantCls] = useVariant("textArea", customVariant, bordered);
	const mergedAllowClear = computed(() => getAllowClear_default(props.allowClear ?? contextAllowClear.value));
	const mergedChangeOnComposing = computed(() => props.changeOnComposing ?? contextChangeOnComposing.value);
	const isMouseDown = shallowRef(false);
	const resizeDirty = shallowRef(false);
	const handleMouseDown = (e) => {
		isMouseDown.value = true;
		emit("mousedown", e);
		const onMouseUp = () => {
			isMouseDown.value = false;
			document.removeEventListener("mouseup", onMouseUp);
		};
		document.addEventListener("mouseup", onMouseUp);
	};
	onBeforeUnmount(() => {
		isMouseDown.value = false;
	});
	const handleResize = (size) => {
		emit("resize", size);
		if (isMouseDown.value && typeof getComputedStyle === "function") {
			const ele = textAreaRef.value?.resizableTextArea?.textArea;
			if (ele && getComputedStyle(ele).resize === "both") resizeDirty.value = true;
		}
	};
	expose({
		resizableTextArea: computed(() => textAreaRef.value?.resizableTextArea),
		focus: () => textAreaRef.value?.focus?.(),
		blur: () => textAreaRef.value?.blur?.(),
		nativeElement: computed(() => textAreaRef.value?.nativeElement)
	});
	const handlePressEnter = (e) => {
		emit("pressEnter", e);
	};
	const handleChange = (e) => {
		const target = e?.target;
		emit("update:value", target?.value);
		emit("change", e);
	};
	const handleFocus = (e) => emit("focus", e);
	const handleBlur = (e) => emit("blur", e);
	const handleKeyDown = (e) => {
		emit("keydown", e);
	};
	const handleCompositionStart = (e) => emit("compositionstart", e);
	const handleCompositionEnd = (e) => emit("compositionend", e);
	return () => {
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const restProps = omit(props, omitKeys);
		const textareaAttrs = {
			...restAttrs,
			maxLength: props.maxlength,
			minLength: props.minlength,
			readOnly: props.readonly
		};
		const classesValue = clsx(cssVarCls.value, rootCls.value, className, rootClass.value, compactItemClassnames.value, contextClassName.value, mergedClassNames.value.root, hashId.value, { [`${prefixCls.value}-textarea-affix-wrapper-resize-dirty`]: resizeDirty.value });
		const mergedStyle = {
			...mergedStyles.value.root,
			...contextStyle.value,
			...style
		};
		const classNames = {
			...mergedClassNames.value,
			textarea: clsx({
				[`${prefixCls.value}-sm`]: mergedSize.value === "small",
				[`${prefixCls.value}-lg`]: mergedSize.value === "large"
			}, hashId.value, mergedClassNames.value.textarea, isMouseDown.value && `${prefixCls.value}-mouse-active`),
			variant: clsx({ [`${prefixCls.value}-${mergedVariant.value}`]: enableVariantCls.value }, getStatusClassNames(prefixCls.value, mergedStatus.value)),
			affixWrapper: clsx(`${prefixCls.value}-textarea-affix-wrapper`, {
				[`${prefixCls.value}-affix-wrapper-rtl`]: direction.value === "rtl",
				[`${prefixCls.value}-affix-wrapper-sm`]: mergedSize.value === "small",
				[`${prefixCls.value}-affix-wrapper-lg`]: mergedSize.value === "large",
				[`${prefixCls.value}-textarea-show-count`]: props.showCount || props.count?.show
			}, hashId.value)
		};
		return createVNode(VcTextArea, mergeProps(textareaAttrs, restProps, {
			"ref": textAreaRef,
			"prefixCls": prefixCls.value,
			"class": classesValue,
			"style": mergedStyle,
			"classNames": classNames,
			"styles": mergedStyles.value,
			"disabled": mergedDisabled.value,
			"allowClear": mergedAllowClear.value,
			"changeOnComposing": mergedChangeOnComposing.value,
			"onPressEnter": handlePressEnter,
			"onResize": handleResize
		}, {
			onMousedown: handleMouseDown,
			onKeydown: handleKeyDown,
			onFocus: handleFocus,
			onBlur: handleBlur,
			onCompositionstart: handleCompositionStart,
			onCompositionend: handleCompositionEnd
		}, {
			"onChange": handleChange,
			"suffix": hasFeedback.value ? createVNode("span", { "class": `${prefixCls.value}-textarea-suffix` }, [feedbackIcon.value]) : void 0,
			"showCount": props.showCount
		}), null);
	};
}, {
	props: {
		bordered: {
			type: Boolean,
			required: false,
			default: void 0
		},
		size: {
			type: [String, null],
			required: false
		},
		status: {
			type: String,
			required: false
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
		rows: {
			type: Number,
			required: false
		},
		maxlength: {
			type: Number,
			required: false
		},
		minlength: {
			type: Number,
			required: false
		},
		readonly: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showCount: {
			type: [Boolean, Object],
			required: false,
			default: void 0
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
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		autoSize: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		allowClear: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		suffix: { required: false },
		count: { required: false },
		onClear: {
			type: Function,
			required: false
		},
		hidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		placeholder: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onKeyup: {
			type: Function,
			required: false
		},
		changeOnComposing: {
			type: Boolean,
			required: false,
			default: void 0
		}
	},
	emits: [
		"pressEnter",
		"change",
		"focus",
		"blur",
		"resize",
		"keydown",
		"compositionstart",
		"compositionend",
		"mousedown",
		"update:value"
	],
	name: "ATextarea",
	inheritAttrs: false
});
var TextArea_default = InternalTextArea;

//#endregion
export { TextArea_default as default };