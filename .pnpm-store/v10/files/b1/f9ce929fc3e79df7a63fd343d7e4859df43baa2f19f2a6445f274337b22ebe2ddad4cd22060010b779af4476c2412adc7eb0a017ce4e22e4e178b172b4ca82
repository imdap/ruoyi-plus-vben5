import useAccessibility from "./hooks/useAccessibility.js";
import Overlay_default from "./Overlay.js";
import placements_default from "./placements.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults, mergeProps, shallowRef } from "vue";
import { Trigger } from "@v-c/trigger";
import { clsx } from "@v-c/util";
import { filterEmpty, removeUndefined, toPropsRefs } from "@v-c/util/dist/props-util";
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !isVNode(s);
}
var defaults = {
	prefixCls: "vc-dropdown",
	arrow: false,
	placement: "bottomLeft",
	placements: placements_default,
	trigger: ["hover"]
};
var Dropdown_default = /* @__PURE__ */ defineComponent((props, { expose, slots }) => {
	const { autoFocus } = toPropsRefs(props, "autoFocus");
	const triggerVisible = shallowRef();
	const mergedVisible = computed(() => {
		return props?.visible ?? triggerVisible.value;
	});
	const mergedMotionName = computed(() => {
		const { prefixCls, transitionName, animation } = props;
		return animation ? `${prefixCls}-${animation}` : transitionName;
	});
	const triggerRef = shallowRef();
	const overlayRef = shallowRef();
	const childRef = shallowRef();
	expose({ triggerRef });
	const handleVisibleChange = (visible) => {
		triggerVisible.value = visible;
		props.onVisibleChange?.(visible);
	};
	useAccessibility({
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
		const getMenuElement = () => createVNode(Overlay_default, {
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
		const children = filterEmpty(slots?.default?.() ?? [])?.[0];
		const childrenNode = createVNode(children, {
			class: clsx(mergedVisible.value && getOpenClassName()),
			ref: childRef
		});
		let triggerHideAction = hideAction;
		if (!triggerHideAction && trigger?.includes("contextMenu")) triggerHideAction = ["click"];
		return createVNode(Trigger, mergeProps({ "builtinPlacements": placements }, removeUndefined(otherProps), {
			"prefixCls": prefixCls,
			"ref": triggerRef,
			"popupClassName": clsx(overlayClassName, { [`${prefixCls}-show-arrow`]: arrow }),
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
}, { props: /* @__PURE__ */ mergeDefaults({
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
export { Dropdown_default as default };
