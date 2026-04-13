import { devUseWarning, isDev } from "../_util/warning.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { clsx as clsx$1, getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import { isPresetColor } from "../_util/colors.js";
import { formatUnit } from "../_util/styleUtils.js";
import style_default from "./style/index.js";
import Ribbon_default from "./Ribbon.js";
import ScrollNumber_default from "./ScrollNumber.js";
import { Transition, cloneVNode, computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, shallowRef, watchEffect } from "vue";
import { classNames } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";
import { getTransitionProps } from "@v-c/util/dist/utils/transition";

//#region src/badge/index.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const InternalBadge = /* @__PURE__ */ defineComponent((props, { slots, attrs, expose }) => {
	const { class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles, prefixCls, direction, getPrefixCls } = useComponentBaseConfig("badge", props);
	const { classes, styles } = toPropsRefs$1(props, "classes", "styles");
	const mergedProps = computed(() => props);
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const badgeRef = shallowRef();
	expose({ badgeRef });
	const [hashId, cssVarCls] = style_default(prefixCls);
	if (isDev) devUseWarning("Badge").deprecated(props.size !== "default", "size=\"default\"", "size=\"medium\"");
	const numberedDisplayCount = computed(() => {
		const { count, overflowCount } = props;
		return count > overflowCount ? `${overflowCount}+` : count;
	});
	const isZero = computed(() => numberedDisplayCount.value === "0" || numberedDisplayCount.value === 0 || props.text === "0" || props.text === 0);
	const countNodes = computed(() => {
		const result = getSlotPropsFnRun(slots, props, "count");
		if (!result) return [];
		return Array.isArray(result) ? result : [result];
	});
	const textNodes = computed(() => {
		const result = getSlotPropsFnRun(slots, props, "text");
		if (!result) return [];
		return Array.isArray(result) ? result : [result];
	});
	const ignoreCount = computed(() => props.count === null || isZero.value && !props.showZero);
	const hasStatus = computed(() => {
		const { status, color } = props;
		return (status !== null && status !== void 0 || color !== null && color !== void 0) && ignoreCount.value;
	});
	const hasStatusValue = computed(() => props.status !== null && props.status !== void 0 || !isZero.value);
	const showAsDot = computed(() => props.dot && !isZero.value);
	const mergedCount = computed(() => showAsDot.value ? "" : numberedDisplayCount.value);
	const isHidden = computed(() => {
		const textEmpty = textNodes.value.length === 0 && (props.text === void 0 || props.text === null || props.text === "");
		return ((mergedCount.value === null || mergedCount.value === void 0 || mergedCount.value === "") && countNodes.value.length === 0 || isZero.value && !props.showZero) && !showAsDot.value && textEmpty;
	});
	const displayCountRef = shallowRef(mergedCount.value);
	const countCacheRef = shallowRef(props.count ?? null);
	const isDotRef = shallowRef(showAsDot.value);
	watchEffect(() => {
		if (!isHidden.value) displayCountRef.value = mergedCount.value;
	});
	watchEffect(() => {
		if (!isHidden.value) countCacheRef.value = countNodes.value[0] ?? null;
	});
	watchEffect(() => {
		if (!isHidden.value) isDotRef.value = showAsDot.value;
	});
	const mergedStyle = computed(() => {
		if (!props.offset) return {
			...contextStyle.value,
			...attrs.style
		};
		const horizontalOffset = Number.parseInt(props.offset[0], 10);
		const insetInlineEndUnit = formatUnit(direction.value === "rtl" ? horizontalOffset : -horizontalOffset);
		const offsetStyle = {
			marginTop: formatUnit(props.offset[1]),
			insetInlineEnd: insetInlineEndUnit
		};
		return {
			...contextStyle.value,
			...offsetStyle,
			...attrs.style
		};
	});
	const displayCount = computed(() => displayCountRef.value);
	const isInternalColor = computed(() => isPresetColor(props.color, false));
	return () => {
		const { class: attrClass, style: attrStyle, ...restAttrs } = attrs;
		const children = filterEmpty(slots.default?.() ?? []);
		let livingCount = countCacheRef.value;
		if (typeof livingCount === "function") livingCount = livingCount();
		const titleNode = props.title ?? (typeof livingCount === "string" || typeof livingCount === "number" ? livingCount : void 0);
		const hasTextSlot = textNodes.value.length > 0;
		const showStatusTextNode = !isHidden.value && (hasTextSlot ? true : props.text === 0 ? props.showZero : !!props.text && props.text !== true);
		const statusCls = clsx$1(mergedClassNames.value.indicator, {
			[`${prefixCls.value}-status-dot`]: hasStatus.value,
			[`${prefixCls.value}-status-${props.status}`]: !!props.status,
			[`${prefixCls.value}-color-${props.color}`]: isInternalColor.value
		});
		const badgeClassName = classNames(prefixCls.value, {
			[`${prefixCls.value}-status`]: hasStatus.value,
			[`${prefixCls.value}-not-a-wrapper`]: children.length === 0,
			[`${prefixCls.value}-rtl`]: direction.value === "rtl"
		}, attrs.class, props.rootClass, contextClassName.value, mergedClassNames.value?.root, hashId.value, cssVarCls.value);
		const statusStyle = {};
		if (props.color && !isInternalColor.value) {
			statusStyle.background = props.color;
			statusStyle.color = props.color;
		}
		const renderStatusText = (style) => {
			if (!showStatusTextNode) return null;
			return createVNode("span", {
				"class": `${prefixCls.value}-status-text`,
				"style": style
			}, [hasTextSlot ? textNodes.value : props.text]);
		};
		if (!children.length && hasStatus.value && (showStatusTextNode || hasStatusValue.value || !ignoreCount.value)) {
			const statusTextColor = mergedStyle.value?.color;
			return createVNode("span", mergeProps(restAttrs, {
				"ref": badgeRef,
				"class": badgeClassName,
				"style": [mergedStyles.value.root, mergedStyle.value]
			}), [createVNode("span", {
				"class": statusCls,
				"style": [mergedStyles.value.indicator, statusStyle]
			}, null), renderStatusText({ color: statusTextColor })]);
		}
		const scrollNumberCls = classNames(mergedClassNames.value.indicator, {
			[`${prefixCls.value}-dot`]: isDotRef.value,
			[`${prefixCls.value}-count`]: !isDotRef.value,
			[`${prefixCls.value}-count-sm`]: props.size === "small",
			[`${prefixCls.value}-multiple-words`]: !isDotRef.value && displayCount.value && displayCount.value.toString().length > 1,
			[`${prefixCls.value}-status-${props.status}`]: !!props.status,
			[`${prefixCls.value}-color-${props.color}`]: isInternalColor.value
		});
		const scrollNumberPrefixCls = getPrefixCls("scroll-number", props.scrollNumberPrefixCls);
		const livingVNode = livingCount && typeof livingCount === "object" ? livingCount : null;
		const clonedNode = livingVNode ? cloneVNode(livingVNode, { style: mergedStyle.value }) : void 0;
		const scrollNumberStyle = {};
		if (props.color && !isInternalColor.value) scrollNumberStyle.background = props.color;
		return createVNode("span", mergeProps(restAttrs, {
			"ref": badgeRef,
			"class": badgeClassName,
			"style": mergedStyles.value.root
		}), [
			children,
			createVNode(Transition, getTransitionProps(`${prefixCls.value}-zoom`, { appear: false }), { default: () => !isHidden.value ? createVNode(ScrollNumber_default, {
				"key": "scrollNumber",
				"prefixCls": scrollNumberPrefixCls,
				"show": !isHidden.value,
				"class": scrollNumberCls,
				"count": displayCount.value,
				"title": titleNode,
				"style": [
					mergedStyles.value?.indicator,
					mergedStyle.value,
					scrollNumberStyle
				]
			}, _isSlot(clonedNode) ? clonedNode : { default: () => [clonedNode] }) : null }),
			renderStatusText()
		]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		count: {
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
		showZero: {
			type: Boolean,
			required: false,
			default: void 0
		},
		overflowCount: {
			type: Number,
			required: false
		},
		dot: {
			type: Boolean,
			required: false,
			default: void 0
		},
		scrollNumberPrefixCls: {
			type: String,
			required: false
		},
		status: {
			type: String,
			required: false
		},
		color: { required: false },
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
		size: {
			type: [String, null],
			required: false
		},
		offset: {
			type: Array,
			required: false
		},
		title: {
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
	}, {
		count: null,
		overflowCount: 99,
		size: "medium"
	}),
	name: "ABadge",
	inheritAttrs: false
});
const Badge = InternalBadge;
Badge.Ribbon = Ribbon_default;
const BadgeRibbon = Ribbon_default;
Badge.install = (app) => {
	app.component(InternalBadge.name, Badge);
	app.component(Ribbon_default.name, Ribbon_default);
};
var badge_default = Badge;

//#endregion
export { BadgeRibbon, badge_default as default };