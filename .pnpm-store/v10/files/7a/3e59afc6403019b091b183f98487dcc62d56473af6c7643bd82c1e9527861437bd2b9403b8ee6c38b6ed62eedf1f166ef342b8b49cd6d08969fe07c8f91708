Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_useAccessibility = require("./hooks/useAccessibility.cjs");
const require_Overlay = require("./Overlay.cjs");
const require_placements = require("./placements.cjs");
let vue = require("vue");
let _v_c_trigger = require("@v-c/trigger");
let _v_c_util = require("@v-c/util");
let _v_c_util_dist_props_util = require("@v-c/util/dist/props-util");
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
}
var defaults = {
	prefixCls: "vc-dropdown",
	arrow: false,
	placement: "bottomLeft",
	placements: require_placements.default,
	trigger: ["hover"]
};
var Dropdown = /* @__PURE__ */ (0, vue.defineComponent)((props, { expose, slots }) => {
	const { autoFocus } = (0, _v_c_util_dist_props_util.toPropsRefs)(props, "autoFocus");
	const triggerVisible = (0, vue.shallowRef)();
	const mergedVisible = (0, vue.computed)(() => {
		return props?.visible ?? triggerVisible.value;
	});
	const mergedMotionName = (0, vue.computed)(() => {
		const { prefixCls, transitionName, animation } = props;
		return animation ? `${prefixCls}-${animation}` : transitionName;
	});
	const triggerRef = (0, vue.shallowRef)();
	const overlayRef = (0, vue.shallowRef)();
	const childRef = (0, vue.shallowRef)();
	expose({ triggerRef });
	const handleVisibleChange = (visible) => {
		triggerVisible.value = visible;
		props.onVisibleChange?.(visible);
	};
	require_useAccessibility.default({
		visible: mergedVisible,
		triggerRef: childRef,
		onVisibleChange: handleVisibleChange,
		autoFocus,
		overlayRef
	});
	const onClick = (e) => {
		const { onOverlayClick } = props;
		triggerVisible.value = false;
		if (onOverlayClick) onOverlayClick(e);
	};
	return () => {
		const { overlay, prefixCls, arrow, hideAction, trigger, placement, placements, overlayClassName, getPopupContainer, showAction, overlayStyle, align, ...otherProps } = props;
		const getMenuElement = () => (0, vue.createVNode)(require_Overlay.default, {
			"ref": overlayRef,
			"overlay": overlay,
			"prefixCls": prefixCls,
			"arrow": arrow
		}, null);
		const getMenuElementOrLambda = () => {
			if (typeof overlay === "function") return getMenuElement;
			return getMenuElement();
		};
		const getMinOverlayWidthMatchTrigger = () => {
			const { minOverlayWidthMatchTrigger, alignPoint } = props;
			if (minOverlayWidthMatchTrigger !== void 0) return minOverlayWidthMatchTrigger;
			return !alignPoint;
		};
		const getOpenClassName = () => {
			const { openClassName } = props;
			if (openClassName !== void 0) return openClassName;
			return `${prefixCls}-open`;
		};
		const children = (0, _v_c_util_dist_props_util.filterEmpty)(slots?.default?.() ?? [])?.[0];
		const childrenNode = (0, vue.createVNode)(children, {
			class: (0, _v_c_util.clsx)(mergedVisible.value && getOpenClassName()),
			ref: childRef
		});
		let triggerHideAction = hideAction;
		if (!triggerHideAction && trigger?.includes("contextMenu")) triggerHideAction = ["click"];
		return (0, vue.createVNode)(_v_c_trigger.Trigger, (0, vue.mergeProps)({ "builtinPlacements": placements }, (0, _v_c_util_dist_props_util.removeUndefined)(otherProps), {
			"prefixCls": prefixCls,
			"ref": triggerRef,
			"popupClassName": (0, _v_c_util.clsx)(overlayClassName, { [`${prefixCls}-show-arrow`]: arrow }),
			"popupStyle": overlayStyle,
			"action": trigger,
			"showAction": showAction,
			"hideAction": triggerHideAction,
			"popupPlacement": placement,
			"popupAlign": align,
			"popupMotion": { name: mergedMotionName.value },
			"popupVisible": mergedVisible.value,
			"stretch": getMinOverlayWidthMatchTrigger() ? "minWidth" : "",
			"popup": getMenuElementOrLambda(),
			"onOpenChange": handleVisibleChange,
			"onPopupClick": onClick,
			"getPopupContainer": getPopupContainer
		}), _isSlot(childrenNode) ? childrenNode : { default: () => [childrenNode] });
	};
}, { props: /* @__PURE__ */ (0, vue.mergeDefaults)({
	minOverlayWidthMatchTrigger: {
		type: Boolean,
		required: false,
		default: void 0
	},
	arrow: {
		type: Boolean,
		required: false,
		default: void 0
	},
	onVisibleChange: {
		type: Function,
		required: false,
		default: void 0
	},
	onOverlayClick: {
		type: Function,
		required: false,
		default: void 0
	},
	prefixCls: {
		type: String,
		required: false,
		default: void 0
	},
	transitionName: {
		type: String,
		required: false,
		default: void 0
	},
	overlayClassName: {
		type: String,
		required: false,
		default: void 0
	},
	openClassName: {
		type: String,
		required: false,
		default: void 0
	},
	animation: {
		type: String,
		required: false,
		default: void 0
	},
	align: {
		type: Object,
		required: false,
		default: void 0
	},
	overlayStyle: {
		type: Object,
		required: false,
		default: void 0
	},
	placement: {
		required: false,
		default: void 0
	},
	placements: {
		type: Object,
		required: false,
		default: void 0
	},
	overlay: {
		type: [
			Function,
			Object,
			String,
			Number,
			null,
			Boolean,
			Array
		],
		required: false,
		default: void 0
	},
	trigger: {
		type: [String, Array],
		required: false,
		default: void 0
	},
	alignPoint: {
		type: Boolean,
		required: false,
		default: void 0
	},
	showAction: {
		type: Array,
		required: false,
		default: void 0
	},
	hideAction: {
		type: Array,
		required: false,
		default: void 0
	},
	visible: {
		type: Boolean,
		required: false,
		default: void 0
	},
	autoFocus: {
		type: Boolean,
		required: false,
		default: void 0
	},
	getPopupContainer: {
		type: Function,
		required: false,
		default: void 0
	},
	mouseEnterDelay: {
		type: Number,
		required: false,
		default: void 0
	},
	mouseLeaveDelay: {
		type: Number,
		required: false,
		default: void 0
	},
	onPopupAlign: {
		type: Function,
		required: false,
		default: void 0
	},
	builtinPlacements: {
		type: Object,
		required: false,
		default: void 0
	},
	autoDestroy: {
		type: Boolean,
		required: false,
		default: void 0
	}
}, defaults) });
var Dropdown_default = Dropdown;
exports.default = Dropdown_default;
