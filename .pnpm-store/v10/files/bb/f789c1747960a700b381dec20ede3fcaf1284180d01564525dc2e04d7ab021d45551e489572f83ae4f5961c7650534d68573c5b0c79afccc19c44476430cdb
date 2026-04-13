import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, shallowRef } from "vue";
import { clsx } from "@v-c/util";
import Trigger from "@v-c/trigger";
function getBuiltInPlacements(popupMatchSelectWidth) {
	const adjustX = popupMatchSelectWidth === true ? 0 : 1;
	return {
		bottomLeft: {
			points: ["tl", "bl"],
			offset: [0, 4],
			overflow: {
				adjustX,
				adjustY: 1
			},
			htmlRegion: "scroll"
		},
		bottomRight: {
			points: ["tr", "br"],
			offset: [0, 4],
			overflow: {
				adjustX,
				adjustY: 1
			},
			htmlRegion: "scroll"
		},
		topLeft: {
			points: ["bl", "tl"],
			offset: [0, -4],
			overflow: {
				adjustX,
				adjustY: 1
			},
			htmlRegion: "scroll"
		},
		topRight: {
			points: ["br", "tr"],
			offset: [0, -4],
			overflow: {
				adjustX,
				adjustY: 1
			},
			htmlRegion: "scroll"
		}
	};
}
var SelectTrigger_default = /* @__PURE__ */ defineComponent((props, { slots, attrs, expose }) => {
	const mergedBuiltinPlacements = computed(() => {
		return props?.builtinPlacements || getBuiltInPlacements(props.popupMatchSelectWidth);
	});
	const isNumberPopupWidth = computed(() => typeof props.popupMatchSelectWidth === "number");
	const stretch = computed(() => {
		if (isNumberPopupWidth.value) return null;
		return props.popupMatchSelectWidth === false ? "minWidth" : "width";
	});
	const triggerPopupRef = shallowRef();
	expose({ getPopupElement: () => triggerPopupRef.value?.popupElement });
	return () => {
		const { prefixCls, popupElement, popupRender, animation, transitionName, popupStyle, popupMatchSelectWidth, onPopupVisibleChange, placement, direction = "ltr", builtinPlacements, onPopupMouseEnter, onPopupMouseDown, onPopupBlur, popupAlign, visible, getPopupContainer, popupClassName, empty, ...restProps } = props;
		let popupNode = popupElement;
		if (popupRender) popupNode = popupRender(popupElement);
		const popupPrefixCls = `${prefixCls}-dropdown`;
		const mergedTransitionName = animation ? `${popupPrefixCls}-${animation}` : transitionName;
		const mergedPopupStyle = popupStyle ?? {};
		if (isNumberPopupWidth.value) mergedPopupStyle.width = `${popupMatchSelectWidth}px`;
		return createVNode(Trigger, mergeProps(attrs, restProps, {
			"showAction": onPopupVisibleChange ? ["click"] : [],
			"hideAction": onPopupVisibleChange ? ["click"] : [],
			"popupPlacement": placement || (direction === "rtl" ? "bottomRight" : "bottomLeft"),
			"builtinPlacements": mergedBuiltinPlacements.value,
			"prefixCls": popupPrefixCls,
			"popup": createVNode("div", {
				"onMouseenter": onPopupMouseEnter,
				"onMousedown": onPopupMouseDown,
				"onBlur": onPopupBlur
			}, [popupNode]),
			"ref": triggerPopupRef,
			"stretch": stretch.value,
			"popupMotion": { name: mergedTransitionName },
			"popupAlign": popupAlign,
			"popupVisible": visible,
			"getPopupContainer": getPopupContainer,
			"popupClassName": clsx(popupClassName, { [`${popupPrefixCls}-empty`]: empty }),
			"popupStyle": mergedPopupStyle,
			"onPopupVisibleChange": onPopupVisibleChange ?? void 0
		}), { default: () => [slots?.default?.()] });
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		prefixCls: {
			type: String,
			required: true,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: true,
			default: void 0
		},
		visible: {
			type: Boolean,
			required: true,
			default: void 0
		},
		popupElement: {
			required: true,
			default: void 0
		},
		animation: {
			type: String,
			required: false,
			default: void 0
		},
		transitionName: {
			type: String,
			required: false,
			default: void 0
		},
		placement: {
			type: String,
			required: false,
			default: void 0
		},
		builtinPlacements: {
			type: Object,
			required: false,
			default: void 0
		},
		popupStyle: {
			type: Object,
			required: false,
			default: void 0
		},
		popupClassName: {
			type: String,
			required: false,
			default: void 0
		},
		direction: {
			type: String,
			required: false,
			default: void 0
		},
		popupMatchSelectWidth: {
			type: [Boolean, Number],
			required: false,
			default: void 0
		},
		popupRender: {
			type: Function,
			required: false,
			default: void 0
		},
		getPopupContainer: {
			type: Function,
			required: false,
			default: void 0
		},
		popupAlign: {
			type: Object,
			required: false,
			default: void 0
		},
		empty: {
			type: Boolean,
			required: true,
			default: void 0
		},
		onPopupVisibleChange: {
			type: [Function, null],
			required: false,
			default: void 0
		},
		onPopupMouseEnter: {
			type: Function,
			required: true,
			default: void 0
		},
		onPopupMouseDown: {
			type: Function,
			required: true,
			default: void 0
		},
		onPopupBlur: {
			type: Function,
			required: false,
			default: void 0
		}
	}, { direction: "ltr" }),
	name: "SelectTrigger",
	inheritAttrs: false
});
export { SelectTrigger_default as default };
