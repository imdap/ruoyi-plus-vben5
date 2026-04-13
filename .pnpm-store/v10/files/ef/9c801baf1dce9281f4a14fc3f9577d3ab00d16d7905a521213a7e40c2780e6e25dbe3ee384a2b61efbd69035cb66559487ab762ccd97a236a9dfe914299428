import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { getAttrStyleAndClass as getAttrStyleAndClass$1, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import PurePanel_default from "../_util/PurePanel.js";
import { getMergedStatus, getStatusClassNames } from "../_util/statusUtils.js";
import { DefaultRenderEmpty } from "../config-provider/defaultRenderEmpty.js";
import { useFormItemInputContext } from "../form/context.js";
import useVariant from "../form/hooks/useVariant.js";
import getAllowClear_default from "../_util/getAllowClear.js";
import toList_default from "../_util/toList.js";
import spin_default from "../spin/index.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, isVNode, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { omit } from "es-toolkit";
import VcMentions, { Option } from "@v-c/mentions";

//#region src/mentions/index.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function loadingFilterOption() {
	return true;
}
const omitKeys = [
	"prefixCls",
	"classes",
	"styles",
	"rootClass",
	"size",
	"status",
	"loading",
	"labelRender",
	"contentRender",
	"variant",
	"allowClear",
	"filterOption",
	"popupClassName",
	"options",
	"notFoundContent"
];
const Mentions = /* @__PURE__ */ defineComponent((props, { slots, emit, expose, attrs }) => {
	if (isDev) devUseWarning("Mentions").deprecated(!slots.default, "Mentions.Option", "options");
	const { prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, renderEmpty, getPopupContainer } = useComponentBaseConfig("mentions", props);
	const { classes, styles, rootClass, size: customSize, disabled: customDisabled, status: customStatus, variant: customVariant } = toPropsRefs$1(props, "classes", "styles", "rootClass", "size", "disabled", "status", "variant");
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const mergedSize = useSize(customSize);
	const disabledContext = useDisabledContext();
	const mergedDisabled = computed(() => customDisabled.value ?? disabledContext.value);
	const formItemInputContext = useFormItemInputContext();
	const hasFeedback = computed(() => formItemInputContext.value.hasFeedback);
	const feedbackIcon = computed(() => formItemInputContext.value.feedbackIcon);
	const mergedStatus = computed(() => getMergedStatus(formItemInputContext.value.status, customStatus.value));
	const mergedProps = computed(() => {
		return {
			...props,
			disabled: mergedDisabled.value,
			status: mergedStatus.value,
			loading: props.loading,
			options: props.options,
			variant: customVariant.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const mergedAllowClear = computed(() => getAllowClear_default(props.allowClear));
	const [mergedVariant, enableVariantCls] = useVariant("mentions", customVariant);
	const focused = shallowRef(false);
	const setFocusState = (value) => {
		focused.value = value;
	};
	const handleFocus = (event) => {
		setFocusState(true);
		emit("focus", event);
	};
	const handleBlur = (event) => {
		setFocusState(false);
		emit("blur", event);
	};
	const handleChange = (value) => {
		emit("update:value", value);
		emit("change", value);
	};
	const handleSelect = (option, prefix) => {
		emit("select", option, prefix);
	};
	const handleSearch = (text, prefix) => {
		emit("search", text, prefix);
	};
	const handlePopupScroll = (event) => {
		emit("popupScroll", event);
	};
	const notFoundContent = computed(() => {
		if (props.notFoundContent !== void 0) return props.notFoundContent;
		return renderEmpty?.value?.("Select") || createVNode(DefaultRenderEmpty, { "componentName": "Select" }, null);
	});
	const mergedFilterOption = computed(() => props.loading ? loadingFilterOption : props.filterOption);
	const resolveRenderNode = (key, ctx) => {
		const node = getSlotPropsFnRun(slots, props, key, false, ctx);
		return node === void 0 ? void 0 : node;
	};
	const mergedOptions = computed(() => {
		if (props.loading) return [{
			value: "ANTD_SEARCHING",
			disabled: true,
			label: createVNode(spin_default, { "size": "small" }, null)
		}];
		if (!props.options) return;
		return props.options.map((option, index) => {
			const mergedLabel = resolveRenderNode("labelRender", {
				option,
				index
			}) ?? option.label ?? option.value;
			return {
				...option,
				label: mergedLabel
			};
		});
	});
	const mentionsRef = shallowRef();
	expose({
		focus: () => mentionsRef.value?.focus?.(),
		blur: () => mentionsRef.value?.blur?.(),
		textarea: computed(() => mentionsRef.value?.textarea || null),
		nativeElement: computed(() => mentionsRef.value?.nativeElement)
	});
	return () => {
		const { className, style, restAttrs } = getAttrStyleAndClass$1(attrs);
		const mergedClassName = clsx({
			[`${prefixCls.value}-sm`]: mergedSize.value === "small",
			[`${prefixCls.value}-lg`]: mergedSize.value === "large"
		}, contextClassName.value, mergedClassNames.value.root, rootClass.value, cssVarCls.value, rootCls.value, hashId.value, className);
		const rootStyle = {
			...mergedStyles.value.root,
			...contextStyle.value,
			...style
		};
		const suffixNodes = filterEmpty(slots.suffix?.() ?? []).filter((node) => node != null);
		if (hasFeedback.value && feedbackIcon.value) suffixNodes.push(feedbackIcon.value);
		const mergedSuffix = suffixNodes.length ? suffixNodes : void 0;
		const mentionOptions = props.loading ? createVNode(Option, {
			"value": "ANTD_SEARCHING",
			"disabled": true
		}, { default: () => [createVNode(spin_default, { "size": "small" }, null)] }) : props.options !== void 0 ? null : filterEmpty(slots.default?.() ?? []).filter(Boolean);
		const mergedPopupClassName = clsx(mergedClassNames.value.popup, rootClass.value, hashId.value, cssVarCls.value, rootCls.value);
		const classNames = {
			mentions: clsx({
				[`${prefixCls.value}-disabled`]: mergedDisabled.value,
				[`${prefixCls.value}-focused`]: focused.value,
				[`${prefixCls.value}-rtl`]: direction.value === "rtl"
			}, hashId.value),
			textarea: clsx(mergedClassNames.value.textarea),
			popup: mergedPopupClassName,
			suffix: mergedClassNames.value.suffix,
			variant: clsx({ [`${prefixCls.value}-${mergedVariant.value}`]: enableVariantCls.value }, getStatusClassNames(prefixCls.value, mergedStatus.value)),
			affixWrapper: hashId.value
		};
		const mergedStylesValue = {
			textarea: mergedStyles.value.textarea,
			popup: mergedStyles.value.popup,
			suffix: mergedStyles.value.suffix
		};
		const restProps = omit(props, omitKeys);
		return createVNode(VcMentions, mergeProps({ "ref": mentionsRef }, restAttrs, restProps, {
			"prefixCls": prefixCls.value,
			"className": mergedClassName,
			"style": rootStyle,
			"classNames": classNames,
			"styles": mergedStylesValue,
			"popupClassName": props.popupClassName,
			"notFoundContent": notFoundContent.value,
			"disabled": mergedDisabled.value,
			"allowClear": mergedAllowClear.value,
			"silent": props.loading,
			"filterOption": mergedFilterOption.value,
			"options": mergedOptions.value,
			"suffix": mergedSuffix,
			"direction": direction.value,
			"getPopupContainer": props.getPopupContainer || getPopupContainer,
			"onChange": handleChange,
			"onSelect": handleSelect,
			"onSearch": handleSearch,
			"onPopupScroll": handlePopupScroll,
			"onFocus": handleFocus,
			"onBlur": handleBlur
		}), _isSlot(mentionOptions) ? mentionOptions : { default: () => [mentionOptions] });
	};
}, {
	props: {
		loading: {
			type: Boolean,
			required: false,
			default: void 0
		},
		status: {
			type: String,
			required: false
		},
		options: {
			type: Array,
			required: false
		},
		popupClassName: {
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
		size: {
			type: [String, null],
			required: false
		},
		labelRender: {
			type: Function,
			required: false
		},
		allowClear: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		id: {
			type: String,
			required: false
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultValue: {
			type: String,
			required: false
		},
		notFoundContent: { required: false },
		split: {
			type: String,
			required: false
		},
		transitionName: {
			type: String,
			required: false
		},
		placement: {
			type: String,
			required: false
		},
		direction: {
			type: String,
			required: false
		},
		prefix: {
			type: [String, Array],
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		value: {
			type: String,
			required: false
		},
		silent: {
			type: Boolean,
			required: false,
			default: void 0
		},
		filterOption: {
			type: Boolean,
			required: false,
			skipCheck: true,
			default: void 0
		},
		validateSearch: { required: false },
		getPopupContainer: {
			type: Function,
			required: false
		},
		rows: { required: false },
		rootClass: {
			type: String,
			required: false
		}
	},
	emits: [
		"focus",
		"blur",
		"change",
		"select",
		"popupScroll",
		"search",
		"update:value"
	],
	name: "AMentions",
	inheritAttrs: false
});
Mentions.Option = Option;
Mentions.install = (app) => {
	app.component(Mentions.name, Mentions);
	app.component("AMentionsOption", Option);
};
Mentions.getMentions = (value = "", config = {}) => {
	const { prefix = "@", split = " " } = config;
	const prefixList = toList_default(prefix);
	return value.split(split).map((str = "") => {
		let hitPrefix = null;
		prefixList.some((prefixStr) => {
			if (str.slice(0, prefixStr.length) === prefixStr) {
				hitPrefix = prefixStr;
				return true;
			}
			return false;
		});
		if (hitPrefix !== null) return {
			prefix: hitPrefix,
			value: str.slice(hitPrefix.length)
		};
		return null;
	}).filter((entity) => !!entity && !!entity.value);
};
Mentions._InternalPanelDoNotUseOrYouWillBeFired = PurePanel_default(Mentions, void 0, void 0, "mentions");
var mentions_default = Mentions;

//#endregion
export { Option, mentions_default as default };