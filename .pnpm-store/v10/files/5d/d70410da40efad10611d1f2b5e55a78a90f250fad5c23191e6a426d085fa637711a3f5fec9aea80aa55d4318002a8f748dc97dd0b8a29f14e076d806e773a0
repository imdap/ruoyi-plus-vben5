import { useOrientation } from "../_util/hooks/useOrientation.js";
import { useConfig } from "../config-provider/context.js";
import { useSize } from "../config-provider/hooks/useSize.js";
import compact_default from "./style/compact.js";
import { computed, createVNode, defineComponent, inject, isVNode, mergeProps, provide, ref, toRefs } from "vue";
import { classNames } from "@v-c/util";
import { filterEmpty } from "@v-c/util/dist/props-util";

//#region src/space/Compact.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
const SpaceCompactItemContext = Symbol("SpaceCompactItemContext");
function useSpaceCompactItemContext() {
	return inject(SpaceCompactItemContext, ref(null));
}
function useCompactItemContext(prefixCls, direction) {
	const compactItemContext = useSpaceCompactItemContext();
	const compactItemClassnames = computed(() => {
		if (!compactItemContext.value) return "";
		const { compactDirection, isFirstItem, isLastItem } = compactItemContext.value;
		const separator = compactDirection === "vertical" ? "-vertical-" : "-";
		return classNames(`${prefixCls.value}-compact${separator}item`, {
			[`${prefixCls.value}-compact${separator}first-item`]: isFirstItem,
			[`${prefixCls.value}-compact${separator}last-item`]: isLastItem,
			[`${prefixCls.value}-compact${separator}item-rtl`]: direction.value === "rtl"
		});
	});
	return {
		compactSize: computed(() => compactItemContext.value?.compactSize),
		compactDirection: computed(() => compactItemContext.value?.compactDirection),
		compactItemClassnames
	};
}
const NoCompactStyle = /* @__PURE__ */ defineComponent((_, { slots }) => {
	provide(SpaceCompactItemContext, ref(null));
	return () => {
		return slots?.default?.();
	};
}, {
	name: "ASpaceNoCompactStyle",
	inheritAttrs: false
});
const CompactItem = /* @__PURE__ */ defineComponent((props, { slots }) => {
	provide(SpaceCompactItemContext, computed(() => props));
	return () => {
		return slots?.default?.();
	};
}, { props: {
	compactSize: {
		type: [String, null],
		required: false
	},
	compactDirection: {
		type: String,
		required: false
	},
	isFirstItem: {
		type: Boolean,
		required: false,
		default: void 0
	},
	isLastItem: {
		type: Boolean,
		required: false,
		default: void 0
	}
} });
const Compact = /* @__PURE__ */ defineComponent((props, { slots, attrs }) => {
	const mergedSize = useSize((ctx) => props?.size ?? ctx);
	const configContext = useConfig();
	const prefixCls = computed(() => configContext.value?.getPrefixCls?.("space-compact", props.prefixCls));
	const [hashId, cssVarCls] = compact_default(prefixCls);
	const compactItemContext = useSpaceCompactItemContext();
	const { direction, vertical, orientation } = toRefs(props);
	const [mergedOrientation, mergedVertical] = useOrientation(orientation, vertical, direction);
	return () => {
		const { rootClass, block } = props;
		const directionConfig = configContext.value?.direction;
		const clx = classNames(prefixCls.value, hashId.value, cssVarCls.value, {
			[`${prefixCls.value}-rtl`]: directionConfig === "rtl",
			[`${prefixCls.value}-block`]: block,
			[`${prefixCls.value}-vertical`]: mergedVertical.value
		}, rootClass);
		const childNodes = filterEmpty(slots?.default?.());
		const nodes = childNodes.map((child, i) => {
			const key = child?.key || `${prefixCls.value}-item-${i}`;
			return createVNode(CompactItem, {
				"compactSize": mergedSize.value,
				"compactDirection": mergedOrientation.value,
				"isFirstItem": i === 0 && (!compactItemContext.value || compactItemContext.value?.isFirstItem),
				"key": key,
				"isLastItem": i === childNodes.length - 1 && (!compactItemContext.value || compactItemContext.value?.isLastItem)
			}, _isSlot(child) ? child : { default: () => [child] });
		});
		if (childNodes.length === 0) return null;
		return createVNode("div", mergeProps({ "class": clx }, attrs), [nodes]);
	};
}, {
	props: {
		size: {
			type: [String, null],
			required: false
		},
		direction: {
			type: String,
			required: false
		},
		block: {
			type: Boolean,
			required: false,
			default: void 0
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
		rootClass: {
			type: String,
			required: false
		},
		prefixCls: {
			type: String,
			required: false
		}
	},
	name: "ASpaceCompact",
	inheritAttrs: false
});
var Compact_default = Compact;

//#endregion
export { NoCompactStyle, Compact_default as default, useCompactItemContext, useSpaceCompactItemContext };