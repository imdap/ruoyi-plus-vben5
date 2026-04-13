Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
let vue = require("vue");
let _v_c_portal = require("@v-c/portal");
_v_c_portal = require_rolldown_runtime.__toESM(_v_c_portal);
let _v_c_util = require("@v-c/util");
var COVER_PROPS = {
	"fill": "transparent",
	"pointer-events": "auto"
};
var Mask = /* @__PURE__ */ (0, vue.defineComponent)((props, { attrs }) => {
	const id = (0, vue.useId)();
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
		return (0, vue.createVNode)(_v_c_portal.default, {
			"open": open,
			"autoLock": !inlineMode,
			"getContainer": getPopupContainer
		}, { default: () => [(0, vue.createVNode)("div", {
			"class": (0, _v_c_util.clsx)(`${prefixCls}-mask`, rootClassName, tourClassNames?.mask),
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
		}, [showMask ? (0, vue.createVNode)("svg", { "style": {
			width: "100%",
			height: "100%"
		} }, [
			(0, vue.createVNode)("defs", null, [(0, vue.createVNode)("mask", { "id": maskId }, [(0, vue.createVNode)("rect", (0, vue.mergeProps)({
				"x": "0",
				"y": "0"
			}, maskRectSize, { "fill": "white" }), null), pos && (0, vue.createVNode)("rect", {
				"x": pos.left,
				"y": pos.top,
				"rx": pos.radius,
				"width": pos.width,
				"height": pos.height,
				"fill": "black",
				"class": mergedAnimated ? `${prefixCls}-placeholder-animated` : ""
			}, null)])]),
			(0, vue.createVNode)("rect", {
				"x": "0",
				"y": "0",
				"width": "100%",
				"height": "100%",
				"fill": fill,
				"mask": `url(#${maskId})`
			}, null),
			pos && (0, vue.createVNode)(vue.Fragment, null, [
				(0, vue.createVNode)("rect", (0, vue.mergeProps)(COVER_PROPS, {
					"x": "0",
					"y": "0",
					"width": "100%",
					"height": Math.max(pos.top, 0)
				}), null),
				(0, vue.createVNode)("rect", (0, vue.mergeProps)(COVER_PROPS, {
					"x": "0",
					"y": "0",
					"width": Math.max(pos.left, 0),
					"height": "100%"
				}), null),
				(0, vue.createVNode)("rect", (0, vue.mergeProps)(COVER_PROPS, {
					"x": "0",
					"y": pos.top + pos.height,
					"width": "100%",
					"height": `calc(100% - ${pos.top + pos.height}px)`
				}), null),
				(0, vue.createVNode)("rect", (0, vue.mergeProps)(COVER_PROPS, {
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
			type: [Function, Boolean],
			required: false,
			default: void 0
		}
	},
	name: "TourMask",
	inheritAttrs: false
});
var Mask_default = Mask;
exports.default = Mask_default;
