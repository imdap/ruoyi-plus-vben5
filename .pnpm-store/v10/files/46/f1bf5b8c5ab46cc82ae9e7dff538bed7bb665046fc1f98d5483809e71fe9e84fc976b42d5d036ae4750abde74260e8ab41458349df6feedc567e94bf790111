import { useOrientation } from "../_util/hooks/useOrientation.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import Compact_default from "./Compact.js";
import { pureAttrs, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropFn, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import { isPresetSize, isValidGapNumber } from "../_util/gapSize.js";
import Addon_default from "./Addon.js";
import { useSpaceContextProvider } from "./context.js";
import Item_default from "./Item.js";
import style_default from "./style/index.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef } from "vue";
import { classNames } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/space/index.tsx
const InternalSpace = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const { prefixCls, direction: directionConfig, size: contextSize, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("space", props, ["size"]);
	const { orientation, vertical, direction, size, align, classes, styles } = toPropsRefs$1(props, "orientation", "vertical", "direction", "size", "align", "classes", "styles");
	const [mergedOrientation, mergedVertical] = useOrientation(orientation, vertical, direction);
	const sizes = computed(() => {
		const _size = size.value ?? contextSize.value ?? "small";
		return Array.isArray(_size) ? _size : [_size, _size];
	});
	const isPresetVerticalSize = computed(() => isPresetSize(sizes.value?.[1]));
	const isPresetHorizontalSize = computed(() => isPresetSize(sizes.value?.[0]));
	const isValidVerticalSize = computed(() => isValidGapNumber(sizes.value?.[1]));
	const isValidHorizontalSize = computed(() => isValidGapNumber(sizes.value?.[0]));
	const mergedAlign = computed(() => align.value === void 0 && !mergedVertical.value ? "center" : align.value);
	const [hashId, cssVarCls] = style_default(prefixCls);
	const mergedProps = computed(() => {
		return {
			...props,
			orientation: mergedOrientation.value,
			align: mergedAlign.value
		};
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const latestIndex = shallowRef(0);
	useSpaceContextProvider(computed(() => {
		return { latestIndex: latestIndex.value };
	}));
	return () => {
		const verticalSize = sizes.value?.[1];
		const horizontalSize = sizes.value?.[0];
		const cls = classNames(prefixCls.value, contextClassName.value, hashId.value, `${prefixCls.value}-${mergedOrientation.value}`, {
			[`${prefixCls.value}-rtl`]: directionConfig.value === "rtl",
			[`${prefixCls.value}-align-${mergedAlign.value}`]: mergedAlign.value,
			[`${prefixCls.value}-gap-row-${verticalSize}`]: isPresetVerticalSize.value,
			[`${prefixCls.value}-gap-col-${horizontalSize}`]: isPresetHorizontalSize.value
		}, attrs.class, props.rootClass, cssVarCls.value, mergedClassNames.value.root);
		const childNodes = filterEmpty(slots?.default?.());
		const itemClassName = classNames(`${prefixCls.value}-item`, mergedClassNames.value.item);
		const nodes = childNodes.map((child, i) => {
			if (child !== null && child !== void 0) latestIndex.value = i;
			const key = child?.key || `${itemClassName}-${i}`;
			return createVNode(Item_default, {
				"className": itemClassName,
				"classes": mergedClassNames.value,
				"styles": mergedStyles.value,
				"key": key,
				"index": i,
				"style": mergedStyles.value.item
			}, {
				default: () => child,
				separator: getSlotPropFn(slots, props, "separator")
			});
		});
		if (childNodes.length === 0) return null;
		const gapStyle = {};
		if (props.wrap) gapStyle.flexWrap = "wrap";
		if (!isPresetHorizontalSize.value && isValidHorizontalSize.value) gapStyle.columnGap = typeof horizontalSize === "number" ? `${horizontalSize}px` : horizontalSize;
		if (!isPresetVerticalSize.value && isValidVerticalSize.value) gapStyle.rowGap = typeof verticalSize === "number" ? `${verticalSize}px` : verticalSize;
		return createVNode("div", mergeProps({
			"class": cls,
			"style": [
				gapStyle,
				mergedStyles.value.root,
				contextStyle.value,
				attrs.style
			]
		}, pureAttrs(attrs)), [nodes]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		size: {
			type: [
				String,
				null,
				Number,
				Array
			],
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
		vertical: {
			type: Boolean,
			required: false,
			default: void 0
		},
		align: {
			type: String,
			required: false
		},
		separator: {
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
		wrap: {
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
		size: void 0,
		direction: "horizontal"
	}),
	name: "ASpace",
	inheritAttrs: false
});
const Space = InternalSpace;
Space.install = (app) => {
	app.component(InternalSpace.name, Space);
	app.component(Compact_default.name, Compact_default);
	app.component(Addon_default.name, Addon_default);
};
var space_default = Space;
const SpaceCompact = Compact_default;
const SpaceAddon = Addon_default;

//#endregion
export { SpaceAddon, SpaceCompact, space_default as default };