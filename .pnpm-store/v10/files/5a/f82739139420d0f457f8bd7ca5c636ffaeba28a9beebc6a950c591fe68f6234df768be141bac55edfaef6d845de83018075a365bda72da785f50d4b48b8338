import { useComponentBaseConfig } from "../config-provider/context.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import { isPresetColor } from "../_util/colors.js";
import ribbon_default from "./style/ribbon.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { clsx } from "@v-c/util";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";

//#region src/badge/Ribbon.tsx
const defaults = { placement: "end" };
var Ribbon_default = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const { styles, classes: ribbonClassNames } = toPropsRefs$1(props, "classes", "styles");
	const { prefixCls, class: contextClassName, style: contextStyle, direction, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("ribbon", props);
	const wrapperCls = computed(() => `${prefixCls.value}-wrapper`);
	const [hashId, cssVarCls] = ribbon_default(prefixCls, wrapperCls);
	const mergedProps = computed(() => {
		return props;
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, ribbonClassNames), useToArr(contextStyles, styles), useToProps(mergedProps));
	return () => {
		const { placement = "end", color } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const colorInPreset = isPresetColor(props.color, false);
		const ribbonCls = clsx(prefixCls.value, `${prefixCls.value}-placement-${placement}`, {
			[`${prefixCls.value}-rtl`]: direction.value === "rtl",
			[`${prefixCls.value}-color-${color}`]: colorInPreset
		}, className, contextClassName.value, mergedClassNames.value.indicator);
		const colorStyle = {};
		const cornerColorStyle = {};
		if (props.color && !colorInPreset) {
			colorStyle.background = props.color;
			cornerColorStyle.color = props.color;
		}
		const textNodes = getSlotPropsFnRun(slots, props, "text");
		const children = slots.default?.();
		return createVNode("div", {
			"class": clsx(wrapperCls.value, props.rootClass, hashId.value, cssVarCls.value, mergedClassNames.value?.root),
			"style": mergedStyles.value?.root
		}, [children, createVNode("div", mergeProps(restAttrs, {
			"class": clsx(ribbonCls, hashId.value),
			"style": [
				colorStyle,
				mergedStyles.value?.indicator,
				contextStyle.value,
				style
			]
		}), [createVNode("span", {
			"class": clsx(`${prefixCls.value}-content`, mergedClassNames.value.content),
			"style": mergedStyles.value?.content
		}, [Array.isArray(textNodes) ? textNodes : textNodes ?? props.text]), createVNode("div", {
			"class": `${prefixCls.value}-corner`,
			"style": cornerColorStyle
		}, null)])]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		text: {
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
		color: { required: false },
		placement: {
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
		}
	}, defaults),
	name: "ABadgeRibbon",
	inheritAttrs: false
});

//#endregion
export { Ribbon_default as default };