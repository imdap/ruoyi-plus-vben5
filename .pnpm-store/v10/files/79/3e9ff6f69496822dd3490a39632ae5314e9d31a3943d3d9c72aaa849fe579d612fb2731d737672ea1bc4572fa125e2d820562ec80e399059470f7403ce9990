import { createVNode, defineComponent, mergeProps } from "vue";
import ResizeObserver from "@v-c/resize-observer";
var Filler_default = /* @__PURE__ */ defineComponent({
	name: "Filler",
	props: {
		prefixCls: String,
		height: Number,
		offsetY: Number,
		offsetX: Number,
		scrollWidth: Number,
		onInnerResize: Function,
		innerProps: Object,
		rtl: Boolean,
		extra: Object
	},
	setup(props, { slots }) {
		return () => {
			let outerStyle = {};
			let innerStyle = {
				display: "flex",
				flexDirection: "column"
			};
			if (props.offsetY !== void 0) {
				outerStyle = {
					height: `${props.height}px`,
					position: "relative",
					overflow: "hidden"
				};
				innerStyle = {
					...innerStyle,
					transform: `translateY(${props.offsetY}px)`,
					[props.rtl ? "marginRight" : "marginLeft"]: `-${props.offsetX || 0}px`,
					position: "absolute",
					left: 0,
					right: 0,
					top: 0
				};
			}
			return createVNode("div", { "style": outerStyle }, [createVNode(ResizeObserver, { "onResize": ({ offsetHeight }) => {
				if (offsetHeight && props.onInnerResize) props.onInnerResize();
			} }, { default: () => [createVNode("div", mergeProps({
				"style": innerStyle,
				"class": props.prefixCls ? `${props.prefixCls}-holder-inner` : void 0
			}, props.innerProps), [slots.default?.(), props.extra])] })]);
		};
	}
});
export { Filler_default as default };
