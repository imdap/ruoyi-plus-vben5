import { usePickerContext } from "../PickerInput/context.js";
import { getRealPlacement } from "../utils/uiUtil.js";
import { computed, createVNode, defineComponent } from "vue";
import { clsx } from "@v-c/util";
import Trigger from "@v-c/trigger";
var BUILT_IN_PLACEMENTS = {
	bottomLeft: {
		points: ["tl", "bl"],
		offset: [0, 4],
		overflow: {
			adjustX: 1,
			adjustY: 1
		}
	},
	bottomRight: {
		points: ["tr", "br"],
		offset: [0, 4],
		overflow: {
			adjustX: 1,
			adjustY: 1
		}
	},
	topLeft: {
		points: ["bl", "tl"],
		offset: [0, -4],
		overflow: {
			adjustX: 0,
			adjustY: 1
		}
	},
	topRight: {
		points: ["br", "tr"],
		offset: [0, -4],
		overflow: {
			adjustX: 0,
			adjustY: 1
		}
	}
};
var PickerTrigger_default = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const ctx = usePickerContext();
	const dropdownPrefixCls = computed(() => `${ctx.value.prefixCls}-dropdown`);
	const realPlacement = computed(() => getRealPlacement(props.placement, props.direction === "rtl"));
	return () => {
		return createVNode(Trigger, {
			"showAction": [],
			"hideAction": ["click"],
			"popupPlacement": realPlacement.value,
			"builtinPlacements": props.builtinPlacements || BUILT_IN_PLACEMENTS,
			"prefixCls": dropdownPrefixCls.value,
			"popupMotion": props.transitionName ? { motionName: props.transitionName } : void 0,
			"popup": props.popupElement,
			"popupAlign": props.popupAlign,
			"popupVisible": props.visible,
			"popupClassName": clsx(props.popupClassName, {
				[`${dropdownPrefixCls.value}-range`]: props.range,
				[`${dropdownPrefixCls.value}-rtl`]: props.direction === "rtl"
			}),
			"popupStyle": props.popupStyle,
			"stretch": "minWidth",
			"getPopupContainer": props.getPopupContainer,
			"onPopupVisibleChange": (nextVisible) => {
				if (!nextVisible) props.onClose?.();
			}
		}, { default: () => [slots.default?.()] });
	};
}, {
	props: {
		popupElement: {
			required: false,
			default: void 0
		},
		popupStyle: {
			type: Object,
			required: false,
			default: void 0
		},
		transitionName: {
			type: String,
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
		range: {
			type: Boolean,
			required: false,
			default: void 0
		},
		popupClassName: {
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
		direction: {
			type: String,
			required: false,
			default: void 0
		},
		visible: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onClose: {
			type: Function,
			required: false,
			default: void 0
		}
	},
	name: "PickerTrigger",
	inheritAttrs: false
});
export { PickerTrigger_default as default };
