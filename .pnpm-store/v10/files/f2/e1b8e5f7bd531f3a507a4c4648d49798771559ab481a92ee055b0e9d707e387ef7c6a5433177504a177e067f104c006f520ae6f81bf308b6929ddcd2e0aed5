import { Fragment, createVNode, defineComponent, mergeProps, useId } from "vue";
import Portal from "@v-c/portal";
import { clsx } from "@v-c/util";
var COVER_PROPS = {
	"fill": "transparent",
	"pointer-events": "auto"
};
var Mask_default = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const id = useId();
	const isSafari = typeof navigator !== "undefined" && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	return () => {
		const { prefixCls, rootClassName, pos, showMask, fill = "rgba(0,0,0,0.5)", open, animated, zIndex, disabledInteraction, styles, classNames: tourClassNames, getPopupContainer } = props;
		const maskId = `${prefixCls}-mask-${id}`;
		const mergedAnimated = typeof animated === "object" ? animated?.placeholder : animated;
		const maskRectSize = isSafari ? {
			width: "100%",
			height: "100%"
		} : {
			width: "100vw",
			height: "100vh"
		};
		const inlineMode = getPopupContainer === false;
		return createVNode(Portal, {
			"open": open,
			"autoLock": !inlineMode,
			"getContainer": getPopupContainer
		}, { default: () => [createVNode("div", {
			"class": clsx(`${prefixCls}-mask`, rootClassName, tourClassNames?.mask),
			"style": {
				position: inlineMode ? "absolute" : "fixed",
				left: `0px`,
				right: `0px`,
				top: `0px`,
				bottom: `0px`,
				zIndex,
				pointerEvents: pos && !disabledInteraction ? "none" : "auto",
				...attrs.style,
				...styles?.mask
			}
		}, [showMask ? createVNode("svg", { "style": {
			width: "100%",
			height: "100%"
		} }, [
			createVNode("defs", null, [createVNode("mask", { "id": maskId }, [createVNode("rect", mergeProps({
				"x": "0",
				"y": "0"
			}, maskRectSize, { "fill": "white" }), null), pos && createVNode("rect", {
				"x": pos.left,
				"y": pos.top,
				"rx": pos.radius,
				"width": pos.width,
				"height": pos.height,
				"fill": "black",
				"class": mergedAnimated ? `${prefixCls}-placeholder-animated` : ""
			}, null)])]),
			createVNode("rect", {
				"x": "0",
				"y": "0",
				"width": "100%",
				"height": "100%",
				"fill": fill,
				"mask": `url(#${maskId})`
			}, null),
			pos && createVNode(Fragment, null, [
				createVNode("rect", mergeProps(COVER_PROPS, {
					"x": "0",
					"y": "0",
					"width": "100%",
					"height": Math.max(pos.top, 0)
				}), null),
				createVNode("rect", mergeProps(COVER_PROPS, {
					"x": "0",
					"y": "0",
					"width": Math.max(pos.left, 0),
					"height": "100%"
				}), null),
				createVNode("rect", mergeProps(COVER_PROPS, {
					"x": "0",
					"y": pos.top + pos.height,
					"width": "100%",
					"height": `calc(100% - ${pos.top + pos.height}px)`
				}), null),
				createVNode("rect", mergeProps(COVER_PROPS, {
					"x": pos.left + pos.width,
					"y": "0",
					"width": `calc(100% - ${pos.left + pos.width}px)`,
					"height": "100%"
				}), null)
			])
		]) : null])] });
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		pos: {
			type: [Object, null],
			required: false,
			default: void 0
		},
		rootClassName: {
			type: String,
			required: false,
			default: void 0
		},
		showMask: {
			type: Boolean,
			required: false,
			default: void 0
		},
		fill: {
			type: String,
			required: false,
			default: void 0
		},
		open: {
			type: Boolean,
			required: false,
			default: void 0
		},
		animated: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		zIndex: {
			type: Number,
			required: false,
			default: void 0
		},
		disabledInteraction: {
			type: Boolean,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		},
		getPopupContainer: {
			type: Boolean,
			required: false,
			skipCheck: true,
			default: void 0
		}
	},
	name: "TourMask",
	inheritAttrs: false
});
export { Mask_default as default };
