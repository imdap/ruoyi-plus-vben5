import { useBaseConfig, useComponentBaseConfig } from "../config-provider/context.js";
import { genCssVar } from "../theme/util/genStyleUtils.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs } from "../_util/tools.js";
import useCSSVarCls_default from "../config-provider/hooks/useCSSVarCls.js";
import isNonNullable_default from "../_util/isNonNullable.js";
import { resolveSlotsNode } from "../_util/vnode/index.js";
import { provideInternalContext } from "../steps/context.js";
import steps_default from "../steps/index.js";
import style_default from "./style/index.js";
import { TIMELINE_ITEM_MARK, TimelineItem } from "./TimelineItem.js";
import useItems_default from "./useItems.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, ref, toRefs } from "vue";
import { classNames } from "@v-c/util";
import { omit } from "es-toolkit";
import { useUnstableProvider } from "@v-c/steps/dist/UnstableContext.js";

//#region src/timeline/Timeline.tsx
const Timeline = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	provideInternalContext(ref({
		rootComponent: "ol",
		itemComponent: "li"
	}));
	const { reverse } = toRefs(props);
	const orientation = computed(() => props.orientation || "vertical");
	useUnstableProvider({ railFollowPrevStatus: reverse });
	const { classes: contextClassNames, styles: contextStyles, style: contextStyle, class: contextClassName } = useComponentBaseConfig("timeline", props);
	const { prefixCls, timeline, direction, getPrefixCls } = useBaseConfig("timeline", props);
	const rootPrefixCls = computed(() => getPrefixCls());
	const { classes, styles } = toPropsRefs(props, "classes", "styles");
	const items = computed(() => props.items || resolveSlotsNode(slots, "default", void 0, TIMELINE_ITEM_MARK));
	const pending = computed(() => props.pending);
	const pendingDot = computed(() => props.pendingDot);
	const mergedMode = computed(() => {
		if (props.mode === "left") return "start";
		if (props.mode === "right") return "end";
		return [
			"alternate",
			"start",
			"end"
		].includes(props.mode) ? props.mode : "start";
	});
	const rootCls = useCSSVarCls_default(prefixCls);
	const [hashId, cssVarCls] = style_default(prefixCls);
	const [varName] = genCssVar(rootPrefixCls.value, "timeline");
	const stepsClassNames = computed(() => ({
		item: `${prefixCls.value}-item`,
		itemTitle: `${prefixCls.value}-item-title`,
		itemIcon: `${prefixCls.value}-item-icon`,
		itemContent: `${prefixCls.value}-item-content`,
		itemRail: `${prefixCls.value}-item-rail`,
		itemWrapper: `${prefixCls.value}-item-wrapper`,
		itemSection: `${prefixCls.value}-item-section`,
		itemHeader: `${prefixCls.value}-item-header`
	}));
	const rawItems = useItems_default(rootPrefixCls, prefixCls, mergedMode, items, pending, pendingDot);
	const mergedItems = computed(() => {
		return props.reverse ? [...rawItems.value].reverse() : rawItems.value;
	});
	const mergedProps = computed(() => {
		return {
			...props,
			variant: props.variant || "outlined",
			mode: mergedMode.value,
			orientation: orientation.value,
			items: mergedItems.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(stepsClassNames, contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const layoutAlternate = computed(() => {
		return mergedMode.value === "alternate" || orientation.value === "vertical" && mergedItems.value.some((item) => item.title);
	});
	return () => {
		const { variant = "outlined", titleSpan } = props;
		const stepStyle = {
			...contextStyle.value,
			...timeline?.value?.style || {},
			...attrs.style || {}
		};
		if (isNonNullable_default(titleSpan) && mergedMode.value !== "alternate") if (typeof titleSpan === "number" && !Number.isNaN(titleSpan)) stepStyle[varName("head-span")] = titleSpan;
		else stepStyle[varName("head-span-ptg")] = titleSpan;
		return createVNode(steps_default, mergeProps(omit(attrs, ["class", "style"]), omit(props, [
			"items",
			"prefixCls",
			"titleSpan"
		]), {
			"class": classNames(contextClassName.value, timeline.value?.class, attrs.class, rootCls.value, hashId.value, cssVarCls.value, prefixCls.value, {
				[`${prefixCls.value}-${orientation.value}`]: orientation.value === "horizontal",
				[`${prefixCls.value}-layout-alternate`]: layoutAlternate.value,
				[`${prefixCls.value}-rtl`]: direction.value === "rtl"
			}),
			"classes": mergedClassNames.value,
			"styles": mergedStyles.value,
			"style": stepStyle,
			"variant": variant,
			"orientation": orientation.value,
			"type": "dot",
			"items": mergedItems.value,
			"current": mergedItems.value.length - 1
		}), slots);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		pending: {
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
		pendingDot: {
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
		reverse: {
			type: Boolean,
			required: false,
			default: void 0
		},
		mode: {
			type: String,
			required: false
		},
		items: {
			type: Array,
			required: false
		},
		dotRender: {
			type: Function,
			required: false
		},
		labelRender: {
			type: Function,
			required: false
		},
		contentRender: {
			type: Function,
			required: false
		},
		orientation: {
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
		titleSpan: {
			type: [String, Number],
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
		variant: "outlined",
		orientation: "vertical"
	}),
	name: "ATimeline",
	inheritAttrs: false
});
Timeline.install = (app) => {
	app.component(Timeline.name, Timeline);
	app.component(TimelineItem.name, TimelineItem);
};
var Timeline_default = Timeline;

//#endregion
export { Timeline_default as default };