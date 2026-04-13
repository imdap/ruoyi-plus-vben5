import { useComponentBaseConfig } from "../config-provider/context.js";
import { pureAttrs, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { useZIndex } from "../_util/hooks/useZIndex.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import tooltip_default from "../tooltip/index.js";
import button_default from "../button/index.js";
import badge_default from "../badge/index.js";
import { useGroupContext } from "./context.js";
import convertToTooltipProps from "../_util/convertToTooltipProps.js";
import style_default from "./style/index.js";
import { Fragment, computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, shallowRef } from "vue";
import { classNames } from "@v-c/util";
import { filterEmpty, removeUndefined } from "@v-c/util/dist/props-util";
import { FileTextOutlined } from "@antdv-next/icons";
import { omit } from "es-toolkit";

//#region src/float-button/FloatButton.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const floatButtonPrefixCls = "float-btn";
const FloatButton = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit, expose }) => {
	const { prefixCls, class: contextClassName, style: contextStyle, classes: contextClasses, styles: contextStyles, direction } = useComponentBaseConfig("floatButton", props, [], floatButtonPrefixCls);
	const rootCls = useCSSVarCls_default(prefixCls);
	const groupContext = useGroupContext();
	const groupClassNames = computed(() => groupContext?.value?.classNames);
	const groupStyles = computed(() => groupContext?.value?.styles);
	const groupShape = computed(() => groupContext?.value?.shape);
	const groupIndividual = computed(() => groupContext?.value?.individual);
	const { classes, styles, badge, tooltip, style } = toPropsRefs$1(props, "classes", "styles", "badge", "tooltip", "style");
	const mergedShape = computed(() => groupShape.value ?? props.shape ?? "circle");
	const mergedType = computed(() => props.type ?? "default");
	const mergedIndividual = computed(() => groupIndividual.value ?? true);
	const mergedProps = computed(() => ({
		...props,
		type: mergedType.value,
		shape: mergedShape.value
	}));
	const floatButtonClassNames = computed(() => ({
		icon: `${prefixCls.value}-icon`,
		content: `${prefixCls.value}-content`
	}));
	const [hashId, cssVarCls] = style_default(prefixCls, rootCls);
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(floatButtonClassNames, groupClassNames, contextClasses, classes), useToArr(groupStyles, contextStyles, styles), useToProps(mergedProps));
	const buttonRef = shallowRef();
	expose({ nativeElement: computed(() => buttonRef.value) });
	const [zIndex] = useZIndex("FloatButton", computed(() => style.value?.zIndex));
	const zIndexStyle = computed(() => zIndex.value === void 0 ? void 0 : { zIndex: zIndex.value });
	return () => {
		const slotContent = filterEmpty(slots.default?.() ?? []);
		let contentNodes = null;
		if (slotContent.length) contentNodes = slotContent;
		else if (props.content !== void 0) contentNodes = props.content;
		else if (props.description !== void 0) contentNodes = props.description;
		const hasContent = Array.isArray(contentNodes) ? contentNodes.length > 0 : contentNodes !== null && contentNodes !== void 0 && contentNodes !== false;
		const mergedIcon = getSlotPropsFnRun(slots, props, "icon") ?? props.icon ?? (!hasContent ? createVNode(FileTextOutlined, null, null) : null);
		const tooltipSlotNodes = filterEmpty(slots.tooltip?.() ?? []);
		const tooltipNode = tooltipSlotNodes.length ? tooltipSlotNodes.length === 1 ? tooltipSlotNodes[0] : tooltipSlotNodes : void 0;
		const tooltipProps = convertToTooltipProps(tooltip.value ?? tooltipNode);
		const badgeProps = badge.value ? omit(badge.value, [
			"status",
			"text",
			"title"
		]) : null;
		const badgeNode = badge.value ? createVNode(badge_default, mergeProps(badgeProps, { "class": classNames(badgeProps?.class, `${prefixCls.value}-badge`, { [`${prefixCls.value}-badge-dot`]: badgeProps?.dot }) }), null) : null;
		const buttonClass = classNames(prefixCls.value, hashId.value, cssVarCls.value, rootCls.value, `${prefixCls.value}-${mergedType.value}`, `${prefixCls.value}-${mergedShape.value}`, {
			[`${prefixCls.value}-rtl`]: direction.value === "rtl",
			[`${prefixCls.value}-individual`]: mergedIndividual.value,
			[`${prefixCls.value}-icon-only`]: !hasContent
		}, contextClassName.value, props.rootClass, attrs.class, mergedClassNames.value.root);
		const buttonSlots = { default: () => createVNode(Fragment, null, [contentNodes, badgeNode]) };
		const buttonNode = createVNode(button_default, mergeProps(removeUndefined(pureAttrs(attrs)), {
			"ref": (node) => {
				buttonRef.value = node;
			},
			"class": buttonClass,
			"style": [
				mergedStyles.value.root,
				contextStyle.value,
				props.style,
				attrs.style,
				zIndexStyle.value
			],
			"classes": mergedClassNames.value,
			"styles": mergedStyles.value,
			"size": "large",
			"type": mergedType.value,
			"shape": mergedShape.value,
			"href": props.href,
			"target": props.target,
			"icon": mergedIcon ? () => mergedIcon : void 0,
			"htmlType": props.htmlType,
			"aria-label": props.ariaLabel,
			"_skipSemantic": true,
			"onClick": (e) => emit("click", e),
			"onMouseenter": (e) => emit("mouseenter", e),
			"onMouseleave": (e) => emit("mouseleave", e),
			"onFocus": (e) => emit("focus", e),
			"onBlur": (e) => emit("blur", e)
		}), buttonSlots);
		if (tooltipProps) return createVNode(tooltip_default, tooltipProps, _isSlot(buttonNode) ? buttonNode : { default: () => [buttonNode] });
		return buttonNode;
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		icon: {
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
		description: {
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
		content: {
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
		type: {
			type: String,
			required: false
		},
		shape: {
			type: String,
			required: false
		},
		tooltip: {
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
		href: {
			type: String,
			required: false
		},
		target: {
			type: String,
			required: false
		},
		badge: {
			type: Object,
			required: false
		},
		htmlType: {
			type: String,
			required: false
		},
		ariaLabel: {
			type: String,
			required: false
		},
		style: {
			type: Object,
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
		}
	}, {
		type: "default",
		shape: "circle"
	}),
	emits: [
		"click",
		"mouseenter",
		"mouseleave",
		"focus",
		"blur"
	],
	name: "AFloatButton",
	inheritAttrs: false
});
var FloatButton_default = FloatButton;

//#endregion
export { FloatButton_default as default, floatButtonPrefixCls };