import { useOrientation } from "../_util/hooks/useOrientation.js";
import { useComponentBaseConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import { pureAttrs, useMergeSemantic, useToArr, useToProps } from "../_util/hooks/useMergeSemantic.js";
import { getSlotPropsFnRun, toPropsRefs as toPropsRefs$1 } from "../_util/tools.js";
import tooltip_default from "../tooltip/index.js";
import style_default from "./style/index.js";
import { Fragment, computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, useId } from "vue";
import { clsx } from "@v-c/util";
import { filterEmpty, removeUndefined } from "@v-c/util/dist/props-util";
import VcSegmented from "@v-c/segmented";

//#region src/segmented/index.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
function isSegmentedLabeledOptionWithIcon(option, iconFromSlot) {
	return typeof option === "object" && !!(option?.icon || iconFromSlot?.length);
}
const Segmented = /* @__PURE__ */ defineComponent((props, { attrs, emit, slots }) => {
	const defaultName = useId();
	const { prefixCls, direction, class: contextClassName, style: contextStyle, classes: contextClassNames, styles: contextStyles } = useComponentBaseConfig("segmented");
	const { classes, styles, size: customSize, orientation, vertical } = toPropsRefs$1(props, "classes", "styles", "size", "orientation", "vertical");
	const name = computed(() => props?.name ?? defaultName);
	const mergedProps = computed(() => {
		return props;
	});
	const [mergedClassNames, mergedStyles] = useMergeSemantic(useToArr(contextClassNames, classes), useToArr(contextStyles, styles), useToProps(mergedProps));
	const [hashId, cssVarCls] = style_default(prefixCls);
	const mergedSize = useSize(customSize);
	const [, mergedVertical] = useOrientation(orientation, vertical);
	const extendedOptions = computed(() => {
		return props?.options?.map((option) => {
			const iconRender = slots.iconRender || props.iconRender;
			const _option = typeof option === "object" ? option : { value: option };
			let iconFromSlot = iconRender ? iconRender(_option) : null;
			iconFromSlot = filterEmpty(Array.isArray(iconFromSlot) ? iconFromSlot : [iconFromSlot]);
			const labelRender = slots.labelRender || props.labelRender;
			let labelFromSlot = labelRender ? labelRender(_option) : null;
			labelFromSlot = filterEmpty(Array.isArray(labelFromSlot) ? labelFromSlot : [labelFromSlot]).filter(Boolean);
			if (isSegmentedLabeledOptionWithIcon(option, iconFromSlot)) {
				const { label, ...restOption } = option;
				labelFromSlot = labelFromSlot.length > 0 ? labelFromSlot : label;
				const showLabel = !!(labelFromSlot && labelFromSlot.length > 0) || !!label;
				const icon = getSlotPropsFnRun({}, option, "icon") ?? iconFromSlot;
				return {
					...restOption,
					label: createVNode(Fragment, null, [createVNode("span", {
						"class": clsx(`${prefixCls.value}-item-icon`, mergedClassNames.value?.icon),
						"style": mergedStyles.value?.icon
					}, [icon]), showLabel && createVNode("span", null, [labelFromSlot])])
				};
			} else return option;
		});
	});
	return () => {
		const { rootClass, block, shape, ...restProps } = props;
		const cls = clsx(attrs.class, rootClass, contextClassName.value, mergedClassNames.value?.root, {
			[`${prefixCls.value}-block`]: block,
			[`${prefixCls.value}-sm`]: mergedSize.value === "small",
			[`${prefixCls.value}-lg`]: mergedSize.value === "large",
			[`${prefixCls.value}-vertical`]: mergedVertical.value,
			[`${prefixCls.value}-shape-${shape}`]: shape === "round"
		}, hashId.value, cssVarCls.value);
		const mergedStyle = {
			...mergedStyles?.value?.root,
			...contextStyle.value
		};
		const itemRender = (node, { item }) => {
			if (!item.tooltip) return node;
			return createVNode(tooltip_default, typeof item.tooltip === "object" ? item.tooltip : { title: item.tooltip }, _isSlot(node) ? node : { default: () => [node] });
		};
		return createVNode(VcSegmented, mergeProps(pureAttrs(attrs), removeUndefined(restProps), {
			"name": name.value,
			"class": [cls],
			"style": [mergedStyle, attrs.style],
			"classNames": mergedClassNames.value,
			"styles": mergedStyles.value,
			"itemRender": itemRender,
			"options": extendedOptions.value,
			"prefixCls": prefixCls.value,
			"direction": direction.value,
			"vertical": mergedVertical.value,
			"onChange": (value) => {
				emit("change", value);
				emit("update:value", value);
			}
		}), null);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		options: {
			type: Array,
			required: true
		},
		rootClass: {
			type: String,
			required: false
		},
		block: {
			type: Boolean,
			required: false,
			default: void 0
		},
		size: {
			type: [String, null],
			required: false
		},
		vertical: {
			type: Boolean,
			required: false,
			default: void 0
		},
		orientation: {
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
		shape: {
			type: String,
			required: false
		},
		iconRender: {
			type: Function,
			required: false
		},
		labelRender: {
			type: Function,
			required: false
		},
		defaultValue: {
			type: [String, Number],
			required: false
		},
		value: {
			type: [String, Number],
			required: false
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false
		},
		direction: {
			type: String,
			required: false
		},
		motionName: {
			type: String,
			required: false
		},
		name: {
			type: String,
			required: false
		}
	}, {
		size: "middle",
		shape: "default"
	}),
	emits: ["change", "update:value"],
	name: "ASegmented",
	inheritAttrs: false
});
Segmented.install = (app) => {
	app.component(Segmented.name, Segmented);
};
var segmented_default = Segmented;

//#endregion
export { segmented_default as default };