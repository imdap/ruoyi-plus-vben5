import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { genCssVar } from "../theme/util/genStyleUtils.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import tooltip_default from "../tooltip/index.js";
import { TARGET_CLS } from "../_util/wave/interface.js";
import wave_default from "../_util/wave/index.js";
import useBreakpoint_default from "../grid/hooks/useBreakpoint.js";
import { useInternalContext } from "./context.js";
import PanelArrow_default from "./PanelArrow.js";
import ProgressIcon_default from "./ProgressIcon.js";
import style_default from "./style/index.js";
import { Fragment, computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";
import { CheckOutlined } from "@antdv-next/icons";
import VcSteps from "@v-c/steps";

//#region src/steps/index.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const waveEffectClassNames = { itemIcon: TARGET_CLS };
const Steps = /* @__PURE__ */ defineComponent((props, { slots, attrs, emit }) => {
	const internalContent = useInternalContext();
	const { direction: rtlDirection, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, prefixCls, rootPrefixCls } = useComponentBaseConfig("steps", props);
	const { size, items, responsive, type, classes, styles } = toPropsRefs$1(props, "size", "items", "responsive", "type", "classes", "styles");
	const components = computed(() => {
		return {
			root: internalContent.value?.rootComponent,
			item: internalContent.value?.itemComponent
		};
	});
	const itemIconCls = computed(() => `${prefixCls.value}-item-icon`);
	const [hashId, cssVarCls] = style_default(prefixCls);
	const [varName] = genCssVar(rootPrefixCls.value, "cmp-steps");
	const mergedSize = useSize(size);
	const mergedItems = computed(() => (items.value || []).filter(Boolean));
	const breakpoint = useBreakpoint_default(responsive);
	const xs = computed(() => breakpoint.value?.xs);
	const mergedType = computed(() => {
		if (type.value && type.value !== "default") return type.value;
		if (props.progressDot) return "dot";
		return type.value;
	});
	const isInline = computed(() => mergedType.value === "inline");
	const isDot = computed(() => mergedType.value === "dot" || mergedType.value === "inline");
	const mergedOrientation = computed(() => {
		const nextOrientation = props.orientation || props.direction;
		if (mergedType.value === "panel") return "horizontal";
		return responsive.value && xs.value || nextOrientation === "vertical" ? "vertical" : "horizontal";
	});
	const mergedTitlePlacement = computed(() => {
		if (isDot.value || mergedOrientation.value === "vertical") return mergedOrientation.value === "vertical" ? "horizontal" : "vertical";
		if (type.value === "navigation") return "horizontal";
		return props.titlePlacement || props.labelPlacement || "horizontal";
	});
	const mergedPercent = computed(() => isInline.value ? void 0 : props?.percent);
	const mergedProps = computed(() => {
		return {
			...props,
			size: mergedSize.value,
			type: mergedType.value,
			orientation: mergedOrientation.value,
			titlePlacement: mergedTitlePlacement.value,
			percent: mergedPercent.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(computed(() => waveEffectClassNames), contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	if (isDev) {
		const { labelPlacement, progressDot, direction } = props;
		const warning = devUseWarning("Steps");
		warning.deprecated(props.size !== "default", "size=\"default\"", "size=\"medium\"");
		warning.deprecated(!labelPlacement, "labelPlacement", "titlePlacement");
		warning.deprecated(!progressDot, "progressDot", "type=\"dot\"");
		warning.deprecated(!direction, "direction", "orientation");
		warning.deprecated(mergedItems.value.every((item) => !item.description), "items.description", "items.content");
	}
	return () => {
		const { variant, onChange, offset, ellipsis, rootClass, current, ...restProps } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const iconRender = slots?.iconRender || props?.iconRender;
		const legacyProgressDotRenderFn = () => {
			return mergedType.value === "dot" && typeof props.progressDot === "function" ? props.progressDot : void 0;
		};
		const legacyProgressDotRender = legacyProgressDotRenderFn();
		const internalIconRender = (_, info) => {
			const { index, item, active, components: { Icon: StepIcon } } = info;
			const { status, icon } = item;
			let iconContent;
			if (isDot.value || icon) iconContent = icon;
			else switch (status) {
				case "finish":
					iconContent = createVNode(CheckOutlined, { "class": `${itemIconCls.value}-finish` }, null);
					break;
				case "error":
					iconContent = createVNode(CheckOutlined, { "class": `${itemIconCls.value}-error` }, null);
					break;
				default: {
					let numNode = createVNode("span", { "class": `${itemIconCls.value}-number` }, [info.index + 1]);
					if (status === "process" && mergedPercent.value !== void 0) {
						const _numNode = function() {
							return numNode;
						}();
						numNode = createVNode(ProgressIcon_default, {
							"prefixCls": prefixCls.value,
							"rootPrefixCls": rootPrefixCls.value,
							"percent": mergedPercent.value
						}, _isSlot(numNode) ? numNode : { default: () => [_numNode] });
					}
					iconContent = numNode;
				}
			}
			let iconNode = createVNode(StepIcon, null, _isSlot(iconContent) ? iconContent : { default: () => [iconContent] });
			if (iconRender) iconNode = iconRender({
				oriNode: iconNode,
				info: {
					index,
					active,
					item,
					components: { Icon: StepIcon }
				}
			});
			else if (typeof legacyProgressDotRender === "function") iconNode = legacyProgressDotRender({
				iconDot: iconNode,
				info: {
					index,
					...item
				}
			});
			return iconNode;
		};
		const itemRender = (itemNode, itemInfo) => {
			let content = itemNode;
			const itemContent = getSlotPropsFnRun({}, itemInfo.item, "content");
			if (isInline.value && itemContent) content = createVNode(tooltip_default, {
				"destroyOnHidden": true,
				"title": itemContent
			}, _isSlot(itemNode) ? itemNode : { default: () => [itemNode] });
			return createVNode(wave_default, {
				"component": "Steps",
				"disabled": itemInfo.item.disabled || !onChange,
				"colorSource": variant === "filled" ? "color" : null
			}, _isSlot(content) ? content : { default: () => [content] });
		};
		const itemWrapperRender = mergedType.value === "panel" ? (itemNode) => {
			return createVNode(Fragment, null, [itemNode, createVNode(PanelArrow_default, { "prefixCls": prefixCls.value }, null)]);
		} : void 0;
		const mergedStyle = {
			[varName("items-offset")]: `${offset}`,
			...contextStyle.value,
			...style
		};
		const stepsClassName = clsx(contextClassName.value, `${prefixCls.value}-${variant}`, {
			[`${prefixCls.value}-${mergedType.value}`]: mergedType.value !== "dot" ? mergedType.value : false,
			[`${prefixCls.value}-rtl`]: rtlDirection.value === "rtl",
			[`${prefixCls.value}-dot`]: isDot.value,
			[`${prefixCls.value}-ellipsis`]: ellipsis,
			[`${prefixCls.value}-with-progress`]: mergedPercent.value !== void 0,
			[`${prefixCls.value}-small`]: mergedSize.value === "small"
		}, className, rootClass, hashId.value, cssVarCls.value);
		return createVNode(VcSteps, mergeProps(restProps, restAttrs, {
			"prefixCls": prefixCls.value,
			"className": stepsClassName,
			"style": mergedStyle,
			"classNames": mergedClassNames.value,
			"styles": mergedStyles.value,
			"orientation": mergedOrientation.value,
			"titlePlacement": mergedTitlePlacement.value,
			"components": components.value,
			"current": current,
			"items": mergedItems.value,
			"onChange": (current) => {
				onChange?.(current);
				emit("update:current", current);
			},
			"iconRender": internalIconRender,
			"itemRender": itemRender,
			"itemWrapperRender": itemWrapperRender
		}), null);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		prefixCls: {
			type: String,
			required: false
		},
		rootClass: {
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
		variant: {
			type: String,
			required: false
		},
		size: {
			type: [String, null],
			required: false
		},
		type: {
			type: String,
			required: false
		},
		direction: {
			type: String,
			required: false
		},
		orientation: {
			type: String,
			required: false
		},
		labelPlacement: {
			type: String,
			required: false
		},
		titlePlacement: {
			type: String,
			required: false
		},
		progressDot: {
			type: [Boolean, Function],
			required: false,
			default: void 0
		},
		responsive: {
			type: Boolean,
			required: false,
			default: void 0
		},
		ellipsis: {
			type: Boolean,
			required: false,
			default: void 0
		},
		offset: {
			type: Number,
			required: false
		},
		current: {
			type: Number,
			required: false
		},
		initial: {
			type: Number,
			required: false
		},
		items: {
			type: Array,
			required: false
		},
		percent: {
			type: Number,
			required: false
		},
		status: {
			type: String,
			required: false
		},
		iconRender: {
			type: Function,
			required: false
		},
		onChange: {
			type: Function,
			required: false
		}
	}, {
		variant: "filled",
		responsive: true,
		offset: 0,
		current: 0
	}),
	emits: ["update:current"],
	name: "ASteps",
	inheritAttrs: false
});
Steps.install = (app) => {
	app.component(Steps.name, Steps);
};
var steps_default = Steps;

//#endregion
export { steps_default as default };