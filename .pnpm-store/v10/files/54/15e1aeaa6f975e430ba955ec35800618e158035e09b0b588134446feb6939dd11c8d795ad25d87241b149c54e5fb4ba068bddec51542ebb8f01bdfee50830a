import { computed, createVNode, defineComponent, isVNode, mergeProps, onUnmounted } from "vue";
import ResizeObserver from "@v-c/resize-observer";
import { classNames } from "@v-c/util";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var UNDEFINED = void 0;
var Item_default = /* @__PURE__ */ defineComponent({
	name: "OverflowItem",
	inheritAttrs: false,
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		item: Object,
		class: {
			type: [
				String,
				Object,
				Array
			],
			default: void 0
		},
		style: Object,
		renderItem: Function,
		responsive: Boolean,
		responsiveDisabled: Boolean,
		itemKey: [String, Number],
		registerSize: {
			type: Function,
			required: true
		},
		display: Boolean,
		order: {
			type: Number,
			required: true
		},
		component: {
			type: [
				String,
				Object,
				Function
			],
			default: "div"
		},
		invalidate: Boolean
	},
	setup(props, { slots, attrs }) {
		const mergedHidden = computed(() => props.responsive && !props.display);
		function internalRegisterSize(width) {
			const key = props.itemKey ?? props.order;
			props.registerSize(key, width);
		}
		onUnmounted(() => {
			internalRegisterSize(null);
		});
		return () => {
			const { prefixCls, invalidate, item, renderItem, responsive, responsiveDisabled, order, component: Component = "div", style } = props;
			const { class: classAttr, className, style: styleAttr, ...restAttrs } = attrs;
			const children = slots.default?.();
			const childNode = renderItem && item !== UNDEFINED ? renderItem(item, { index: order }) : children;
			let overflowStyle;
			if (!invalidate) overflowStyle = {
				opacity: mergedHidden.value ? 0 : 1,
				height: mergedHidden.value ? 0 : UNDEFINED,
				overflowY: mergedHidden.value ? "hidden" : UNDEFINED,
				order: responsive ? order : UNDEFINED,
				pointerEvents: mergedHidden.value ? "none" : UNDEFINED,
				position: mergedHidden.value ? "absolute" : UNDEFINED
			};
			const overflowProps = {};
			if (mergedHidden.value) overflowProps["aria-hidden"] = true;
			const itemNode = createVNode(Component, mergeProps({
				"class": classNames(!invalidate && prefixCls, props.class, classAttr, className),
				"style": {
					...overflowStyle,
					...style,
					...styleAttr
				}
			}, overflowProps, restAttrs), _isSlot(childNode) ? childNode : { default: () => [childNode] });
			if (!responsive) return itemNode;
			return createVNode(ResizeObserver, {
				"disabled": responsiveDisabled,
				"onResize": ({ offsetWidth }) => {
					internalRegisterSize(offsetWidth);
				}
			}, { default: () => itemNode });
		};
	}
});
export { Item_default as default };
