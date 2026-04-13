import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig, useComponentConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { getAttrStyleAndClass as getAttrStyleAndClass$1, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import Indicator_default from "./Indicator/index.js";
import style_default from "./style/index.js";
import usePercent from "./usePercent.js";
import { Fragment, computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef, watch } from "vue";
import { classNames } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { debounce } from "throttle-debounce";

//#region src/spin/index.tsx
let defaultIndicator;
function shouldDelay(spinning, delay) {
	return !!spinning && !!delay && !Number.isNaN(Number(delay));
}
const Spin = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const componentCtx = useComponentConfig("spin");
	const { direction, prefixCls, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("spin", props, ["indicator"]);
	const [hashId, cssVarCls] = style_default(prefixCls);
	const { classes, styles } = toPropsRefs$1(props, "classes", "styles");
	const spinning = shallowRef(shouldDelay(props.spinning, props.delay) ? false : !!props.spinning);
	const mergedPercent = usePercent(spinning, computed(() => props.percent));
	watch([() => props.delay, () => props.spinning], (_, _p, onCleanup) => {
		if (props.spinning) {
			const showSpinning = debounce(props?.delay ?? 0, () => {
				spinning.value = true;
			});
			showSpinning();
			onCleanup(() => {
				showSpinning?.cancel?.();
			});
			return;
		}
		spinning.value = false;
	}, { immediate: true });
	const warning = devUseWarning("Spin");
	const mergedSize = useSize((ctx) => props.size ?? ctx);
	const mergedProps = computed(() => {
		return {
			...props,
			size: mergedSize.value,
			spinning: spinning.value,
			fullscreen: props.fullscreen,
			percent: mergedPercent.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	return () => {
		const { fullscreen, size, rootClass, wrapperClassName } = props;
		const children = filterEmpty(slots?.default?.() || []);
		const indicator = getSlotPropsFnRun(slots, props, "indicator");
		const contextIndicator = getSlotPropsFnRun({}, componentCtx.value, "indicator");
		const hasChildren = children.length > 0;
		const isNested = hasChildren || fullscreen;
		const description = getSlotPropsFnRun(slots, props, "description");
		const tip = getSlotPropsFnRun(slots, props, "tip");
		const mergedDescription = description ?? tip;
		const { style, className, restAttrs } = getAttrStyleAndClass$1(attrs);
		if (isDev) {
			warning.deprecated(size !== "default", "size=\"default\"", "size=\"medium\"");
			warning.deprecated(!props.tip && !slots.tip, "tip", "description");
			warning.deprecated(!wrapperClassName, "wrapperClassName", "classes.root");
			warning.deprecated(!(mergedClassNames.value?.tip || mergedStyles.value?.tip), "classes.tip and styles.tip", "classes.description and styles.description");
			warning.deprecated(!(mergedClassNames.value?.mask || mergedStyles.value?.mask), "classes.mask and styles.mask", "classes.root and styles.root");
		}
		const mergedIndicator = indicator ?? contextIndicator ?? defaultIndicator;
		const indicatorNode = createVNode(Fragment, null, [createVNode(Indicator_default, {
			"class": classNames(mergedClassNames.value.indicator),
			"style": mergedStyles.value.indicator,
			"prefixCls": prefixCls.value,
			"indicator": mergedIndicator,
			"percent": mergedPercent.value
		}, null), mergedDescription && createVNode("div", {
			"class": classNames(`${prefixCls.value}-description`, mergedClassNames.value.tip, mergedClassNames.value.description),
			"style": {
				...mergedStyles.value.tip,
				...mergedStyles.value.description
			}
		}, [mergedDescription])]);
		return createVNode("div", mergeProps(restAttrs, {
			"class": classNames(prefixCls.value, {
				[`${prefixCls.value}-sm`]: mergedSize.value === "small",
				[`${prefixCls.value}-lg`]: mergedSize.value === "large",
				[`${prefixCls.value}-spinning`]: spinning.value,
				[`${prefixCls.value}-rtl`]: direction.value === "rtl",
				[`${prefixCls.value}-fullscreen`]: fullscreen
			}, rootClass, mergedClassNames.value.root, fullscreen && mergedClassNames.value.mask, isNested ? wrapperClassName : [`${prefixCls.value}-section`, mergedClassNames.value.section], contextClassName.value, className, hashId.value, cssVarCls.value),
			"style": {
				...mergedStyles.value.root,
				...!isNested ? mergedStyles.value.section : {},
				...fullscreen ? mergedStyles.value.mask : {},
				...contextStyle.value,
				...style
			},
			"aria-live": "polite",
			"aria-busy": spinning.value
		}), [spinning.value && (isNested ? createVNode("div", {
			"class": classNames(`${prefixCls.value}-section`, mergedClassNames.value.section),
			"style": mergedStyles.value.section
		}, [indicatorNode]) : indicatorNode), hasChildren && createVNode("div", {
			"class": classNames(`${prefixCls.value}-container`, mergedClassNames.value.container),
			"style": mergedStyles.value.container
		}, [children])]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		spinning: {
			type: Boolean,
			required: false,
			default: void 0
		},
		size: {
			type: [String, null],
			required: false
		},
		tip: {
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
		delay: {
			type: Number,
			required: false
		},
		wrapperClassName: {
			type: String,
			required: false
		},
		indicator: {
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
		fullscreen: {
			type: Boolean,
			required: false,
			default: void 0
		},
		percent: {
			type: [Number, String],
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
		spinning: true,
		delay: 0,
		fullscreen: false
	}),
	name: "ASpin",
	inheritAttrs: false
});
Spin.setDefaultIndicator = (indicator) => {
	defaultIndicator = indicator;
};
Spin.install = (app) => {
	app.component(Spin.name, Spin);
};
var spin_default = Spin;

//#endregion
export { spin_default as default };