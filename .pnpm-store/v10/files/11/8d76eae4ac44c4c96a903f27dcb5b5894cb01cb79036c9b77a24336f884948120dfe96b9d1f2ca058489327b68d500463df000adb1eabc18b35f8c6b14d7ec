import { useOrientation } from "../_util/hooks/useOrientation.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { pureAttrs, useMergeSemantic, useToArr } from "../_util/hooks/useMergeSemantic.js";
import { toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import style_default from "./style/index.js";
import { Fragment, computed, createVNode, defineComponent, mergeDefaults, mergeProps } from "vue";
import { classNames } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/divider/index.tsx
const titlePlacementList = [
	"left",
	"right",
	"center",
	"start",
	"end"
];
const Divider = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const { class: contextClassName, classes: contextClassNames, styles: contextStyles, direction, prefixCls } = useComponentBaseConfig("divider", props);
	const { type, vertical, orientation, classes, styles, size } = toPropsRefs$1(props, "orientation", "vertical", "type", "classes", "styles", "size");
	const [hashId, cssVarCls] = style_default(prefixCls);
	const sizeFullName = useSize(size);
	const validTitlePlacement = computed(() => titlePlacementList.includes(orientation.value || ""));
	const mergedTitlePlacement = computed(() => {
		const placement = props?.titlePlacement ?? (validTitlePlacement.value ? orientation.value : "center");
		if (placement === "left") return direction.value === "rtl" ? "end" : "start";
		if (placement === "right") return direction.value === "rtl" ? "start" : "end";
		return placement;
	});
	const hasMarginStart = computed(() => mergedTitlePlacement.value === "start" && props.orientationMargin != null);
	const hasMarginEnd = computed(() => mergedTitlePlacement.value === "end" && props.orientationMargin != null);
	const [mergedOrientation, mergedVertical] = useOrientation(orientation, vertical, type);
	const mergedProps = computed(() => {
		return {
			...props,
			orientation: mergedOrientation.value,
			titlePlacement: mergedTitlePlacement.value,
			size: sizeFullName.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), computed(() => {
		return { props: mergedProps.value };
	}));
	const memoizedOrientationMargin = computed(() => {
		const orientationMargin = props.orientationMargin;
		if (typeof orientationMargin === "number") return `${orientationMargin}px`;
		if (/^\d+$/.test(orientationMargin)) return `${Number(orientationMargin)}px`;
		return orientationMargin;
	});
	return () => {
		const { variant, dashed, plain, rootClass } = props;
		const children = filterEmpty(slots?.default?.());
		const hasChildren = children.length > 0;
		const railCls = `${prefixCls.value}-rail`;
		const classString = classNames(prefixCls.value, contextClassName?.value, hashId.value, cssVarCls.value, `${prefixCls.value}-${mergedOrientation.value}`, {
			[`${prefixCls.value}-with-text`]: hasChildren,
			[`${prefixCls.value}-with-text-${mergedTitlePlacement.value}`]: hasChildren,
			[`${prefixCls.value}-dashed`]: !!dashed,
			[`${prefixCls.value}-${variant}`]: variant !== "solid",
			[`${prefixCls.value}-plain`]: !!plain,
			[`${prefixCls.value}-rtl`]: direction.value === "rtl",
			[`${prefixCls.value}-no-default-orientation-margin-start`]: hasMarginStart.value,
			[`${prefixCls.value}-no-default-orientation-margin-end`]: hasMarginEnd.value,
			[`${prefixCls.value}-md`]: sizeFullName.value === "medium" || sizeFullName.value === "middle",
			[`${prefixCls.value}-sm`]: sizeFullName.value === "small",
			[railCls]: !hasChildren,
			[mergedClassNames.value.rail]: mergedClassNames.value.rail && !hasChildren
		}, rootClass, attrs.class, mergedClassNames.value.root);
		const innerStyle = {
			marginInlineStart: hasMarginStart.value ? memoizedOrientationMargin.value : void 0,
			marginInlineEnd: hasMarginEnd.value ? memoizedOrientationMargin.value : void 0
		};
		return createVNode("div", mergeProps({
			"class": classString,
			"style": [
				contextStyles.value,
				mergedStyles.value.root,
				hasChildren ? {} : mergedStyles.value.rail,
				attrs.style
			]
		}, pureAttrs(attrs), { "role": "separator" }), [hasChildren && !mergedVertical.value && createVNode(Fragment, null, [
			createVNode("div", {
				"class": classNames(railCls, `${railCls}-start`, mergedClassNames.value.rail),
				"style": mergedStyles.value.rail
			}, null),
			createVNode("span", {
				"class": classNames(`${prefixCls.value}-inner-text`, mergedClassNames.value.content),
				"style": [innerStyle, mergedStyles.value.content]
			}, [children]),
			createVNode("div", {
				"class": classNames(railCls, `${railCls}-end`, mergedClassNames.value.rail),
				"style": mergedStyles.value.rail
			}, null)
		])]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		type: {
			type: String,
			required: false
		},
		orientation: {
			type: String,
			required: false
		},
		vertical: {
			type: Boolean,
			required: false,
			default: void 0
		},
		titlePlacement: {
			type: String,
			required: false
		},
		orientationMargin: {
			type: [String, Number],
			required: false
		},
		dashed: {
			type: Boolean,
			required: false,
			default: void 0
		},
		variant: {
			type: String,
			required: false
		},
		size: {
			type: [String, null],
			required: false
		},
		plain: {
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
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	}, {
		orientation: "center",
		variant: "solid",
		type: "horizontal",
		orientationMargin: void 0
	}),
	name: "ADivider",
	inheritAttrs: false
});
Divider.install = (app) => {
	app.component(Divider.name, Divider);
};
var divider_default = Divider;

//#endregion
export { divider_default as default };