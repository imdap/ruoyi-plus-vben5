import { useComponentBaseConfig } from "../config-provider/context.js";
import { getAttrStyleAndClass } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import { useDisabledContext } from "../config-provider/DisabledContext.js";
import { DefaultRenderEmpty } from "../config-provider/defaultRenderEmpty.js";
import useBase from "./hooks/useBase.js";
import useCheckable from "./hooks/useCheckable.js";
import useIcons from "./hooks/useIcons.js";
import style_default from "./style/index.js";
import panel_default from "./style/panel.js";
import { computed, createVNode, defineComponent, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { Panel } from "@v-c/cascader";

//#region src/cascader/Panel.tsx
const CascaderPanel = /* @__PURE__ */ defineComponent((props, { attrs, emit, slots }) => {
	const { prefixCls: customizePrefixCls, direction: propDirection } = toPropsRefs(props, "prefixCls", "direction");
	const { cascaderPrefixCls, direction: mergedDirection, renderEmpty } = useBase(customizePrefixCls, propDirection);
	const { expandIcon: contextExpandIcon, loadingIcon: contextLoadingIcon } = useComponentBaseConfig("cascader", props, ["expandIcon", "loadingIcon"]);
	const isRtl = computed(() => mergedDirection.value === "rtl");
	const rootCls = useCSSVarCls_default(cascaderPrefixCls);
	const [hashId, cssVarCls] = style_default(cascaderPrefixCls, rootCls);
	panel_default(cascaderPrefixCls);
	const disabled = useDisabledContext();
	const mergedDisabled = computed(() => props.disabled ?? disabled.value);
	const onChange = (value, selectedOptions) => {
		emit("change", value, selectedOptions);
		emit("update:value", value);
	};
	return () => {
		const { rootClass, multiple, optionRender, expandIcon, prefixCls: _prefixCls, direction: _direction, loadingIcon, ...rest } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const customExpandIcon = getSlotPropsFnRun(slots, props, "expandIcon", false) ?? expandIcon;
		const { expandIcon: mergedExpandIcon, loadingIcon: mergedLoadingIcon } = useIcons({
			contextExpandIcon: contextExpandIcon.value,
			contextLoadingIcon: contextLoadingIcon.value,
			expandIcon: customExpandIcon,
			loadingIcon,
			isRtl: isRtl.value
		});
		const checkable = useCheckable(cascaderPrefixCls.value, multiple);
		const slotNotFound = getSlotPropsFnRun(slots, props, "notFoundContent", false);
		let mergedNotFoundContent = slotNotFound;
		if (slotNotFound === void 0) mergedNotFoundContent = renderEmpty.value?.("Cascader") || createVNode(DefaultRenderEmpty, { "componentName": "Cascader" }, null);
		const mergedOptionRender = slots.optionRender ? (option) => slots.optionRender?.(option) : optionRender;
		return createVNode(Panel, mergeProps(restAttrs, rest, {
			"checkable": checkable,
			"prefixCls": cascaderPrefixCls.value,
			"className": clsx(rootClass, cssVarCls.value, rootCls.value, hashId.value, className),
			"style": style,
			"notFoundContent": mergedNotFoundContent,
			"direction": mergedDirection.value,
			"expandIcon": mergedExpandIcon,
			"loadingIcon": mergedLoadingIcon,
			"disabled": mergedDisabled.value,
			"optionRender": mergedOptionRender,
			"onChange": onChange
		}), null);
	};
}, {
	props: {
		value: { required: false },
		defaultValue: { required: false },
		changeOnSelect: {
			type: Boolean,
			required: false,
			default: void 0
		},
		options: {
			type: Array,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		},
		fieldNames: {
			type: Object,
			required: false
		},
		showCheckedStrategy: { required: false },
		loadData: {
			type: Function,
			required: false
		},
		expandTrigger: {
			type: String,
			required: false
		},
		expandIcon: { required: false },
		loadingIcon: { required: false },
		direction: {
			type: String,
			required: false
		},
		notFoundContent: {
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
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		optionRender: {
			type: Function,
			required: false
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		rootClass: {
			type: String,
			required: false
		}
	},
	emits: ["change", "update:value"],
	name: "ACascaderPanel",
	inheritAttrs: false
});
var Panel_default = CascaderPanel;

//#endregion
export { Panel_default as default };