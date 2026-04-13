import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { useCompactItemContext } from "../space/Compact.js";
import { getAttrStyleAndClass, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs } from "../_util/tools.js";
import button_default from "../button/index.js";
import { SpaceCompact } from "../space/index.js";
import Input_default from "./Input.js";
import search_default from "./style/search.js";
import { cloneVNode, computed, createVNode, defineComponent, isVNode, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import { SearchOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";
import pickAttrs from "@v-c/util/dist/pickAttrs";

//#region src/input/Search.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const schema = { button: { _default: "root" } };
const omitInputKeys = [
	"enterButton",
	"loading",
	"classes",
	"styles",
	"rootClass",
	"prefixCls",
	"inputPrefixCls"
];
const InternalSearch = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit, expose }) => {
	const composedRef = shallowRef(false);
	const inputRef = shallowRef();
	const { prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, getPrefixCls } = useComponentBaseConfig("inputSearch", props, void 0, "input-search");
	const inputPrefixCls = computed(() => getPrefixCls("input", props.inputPrefixCls));
	const { classes, styles, size: customizeSize, disabled: customDisabled, variant } = toPropsRefs(props, "classes", "styles", "size", "disabled", "variant");
	const [hashId, cssVarCls] = search_default(prefixCls);
	const { compactSize } = useCompactItemContext(prefixCls, direction);
	const mergedSize = useSize((ctx) => customizeSize.value ?? compactSize.value ?? ctx);
	const mergedProps = computed(() => ({
		...props,
		enterButton: props.enterButton
	}));
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps), computed(() => schema));
	const handleSearch = (event, info, value) => {
		emit("search", value ?? inputRef.value?.input?.value ?? "", event, info ?? { source: "input" });
	};
	const handleChange = (e) => {
		if (e?.type === "click" && e?.target?.value !== void 0) handleSearch(e, { source: "clear" }, e.target.value);
		emit("change", e);
	};
	const handleCompositionStart = (e) => {
		composedRef.value = true;
		emit("compositionstart", e);
	};
	const handleCompositionEnd = (e) => {
		composedRef.value = false;
		emit("compositionend", e);
	};
	const handlePressEnter = (e) => {
		if (composedRef.value || props.loading) return;
		emit("pressEnter", e);
		handleSearch(e);
	};
	const onMouseDown = (e) => {
		if (document.activeElement === inputRef.value?.input) e.preventDefault();
	};
	const onSearchClick = (e) => {
		handleSearch(e);
	};
	expose({
		focus: (...args) => inputRef.value?.focus?.(...args),
		blur: () => inputRef.value?.blur?.(),
		input: computed(() => inputRef.value?.input ?? null)
	});
	return () => {
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const rootAttrs = pickAttrs(restAttrs, { data: true });
		const inputAttrs = { ...restAttrs };
		Object.keys(rootAttrs).forEach((key) => {
			delete inputAttrs[key];
		});
		const restInputProps = omit(props, omitInputKeys);
		const mergedClassName = clsx(prefixCls.value, cssVarCls.value, {
			[`${prefixCls.value}-rtl`]: direction.value === "rtl",
			[`${prefixCls.value}-${mergedSize.value}`]: mergedSize.value,
			[`${prefixCls.value}-with-button`]: !!props.enterButton
		}, className, props.rootClass, contextClassName.value, mergedClassNames.value.root, hashId.value);
		const mergedRootStyle = {
			...mergedStyles.value.root,
			...contextStyle.value,
			...style
		};
		const btnPrefixCls = `${prefixCls.value}-btn`;
		const btnClassName = clsx(btnPrefixCls, { [`${btnPrefixCls}-${variant.value}`]: variant.value });
		const enterButtonValue = props.enterButton ?? false;
		const isBooleanEnterButton = typeof enterButtonValue === "boolean";
		const searchIcon = isBooleanEnterButton ? createVNode(SearchOutlined, null, null) : null;
		const buttonChildren = isBooleanEnterButton ? void 0 : enterButtonValue;
		let buttonNode;
		const enterButtonNode = buttonChildren;
		const isButtonVNode = isVNode(enterButtonNode);
		const isAntdButton = isButtonVNode && Boolean(enterButtonNode.type?.__ANT_BUTTON);
		const isNativeButton = isButtonVNode && enterButtonNode.type === "button";
		if (isAntdButton || isNativeButton) buttonNode = cloneVNode(enterButtonNode, {
			onMousedown: onMouseDown,
			onClick: (e) => {
				enterButtonNode?.props?.onClick?.(e);
				onSearchClick(e);
			},
			class: clsx(enterButtonNode?.props?.class, btnClassName),
			...isAntdButton ? {
				loading: props.loading,
				size: mergedSize.value
			} : {}
		});
		else buttonNode = createVNode(button_default, {
			"classes": mergedClassNames.value.button,
			"styles": mergedStyles.value.button,
			"class": btnClassName,
			"color": props.enterButton ? "primary" : "default",
			"size": mergedSize.value,
			"disabled": customDisabled.value,
			"loading": props.loading,
			"icon": searchIcon,
			"variant": variant.value === "borderless" || variant.value === "filled" || variant.value === "underlined" ? "text" : props.enterButton ? "solid" : void 0,
			"onMousedown": onMouseDown,
			"onClick": onSearchClick
		}, _isSlot(buttonChildren) ? buttonChildren : { default: () => [buttonChildren] });
		const inputClassNames = omit(mergedClassNames.value, ["root", "button"]);
		const inputStyles = omit(mergedStyles.value, ["root", "button"]);
		return createVNode(SpaceCompact, mergeProps({
			"class": mergedClassName,
			"style": mergedRootStyle
		}, { hidden: props.hidden }, rootAttrs, { "size": mergedSize.value }), { default: () => [createVNode(Input_default, mergeProps(inputAttrs, restInputProps, {
			"ref": inputRef,
			"prefixCls": inputPrefixCls.value,
			"size": mergedSize.value,
			"disabled": customDisabled.value,
			"classes": inputClassNames,
			"styles": inputStyles,
			"variant": variant.value,
			"onChange": handleChange,
			"onFocus": (e) => emit("focus", e),
			"onBlur": (e) => emit("blur", e),
			"onKeydown": (e) => emit("keydown", e),
			"onKeyup": (e) => emit("keyup", e),
			"onClear": () => {
				emit("clear");
			},
			"onCompositionstart": handleCompositionStart,
			"onCompositionend": handleCompositionEnd,
			"onPressEnter": handlePressEnter
		}, { "onUpdate:value": (value) => emit("update:value", value) }), slots), buttonNode] });
	};
}, {
	props: {
		inputPrefixCls: {
			type: String,
			required: false
		},
		on: { required: false },
		enterButton: {
			type: [
				Boolean,
				Function,
				String,
				Number,
				null,
				Object
			],
			required: false,
			default: void 0
		},
		loading: {
			type: Boolean,
			required: false,
			default: void 0
		},
		size: {
			type: [String, null],
			required: false
		},
		hidden: {
			type: Boolean,
			required: false,
			default: void 0
		},
		classes: {
			type: [Object, Function],
			required: false
		},
		styles: {
			type: [Object, Function],
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
		},
		rootClass: {
			type: String,
			required: false
		}
	},
	emits: [
		"search",
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
	name: "AInputSearch",
	inheritAttrs: false
});
var Search_default = InternalSearch;

//#endregion
export { Search_default as default };