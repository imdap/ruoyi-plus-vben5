import DropdownMenu_default from "./DropdownMenu.js";
import { computed, createVNode, defineComponent, shallowRef } from "vue";
import Trigger from "@v-c/trigger";
var BUILT_IN_PLACEMENTS = {
	bottomRight: {
		points: ["tl", "br"],
		offset: [0, 4],
		overflow: {
			adjustX: 1,
			adjustY: 1
		}
	},
	bottomLeft: {
		points: ["tr", "bl"],
		offset: [0, 4],
		overflow: {
			adjustX: 1,
			adjustY: 1
		}
	},
	topRight: {
		points: ["bl", "tr"],
		offset: [0, -4],
		overflow: {
			adjustX: 1,
			adjustY: 1
		}
	},
	topLeft: {
		points: ["br", "tl"],
		offset: [0, -4],
		overflow: {
			adjustX: 1,
			adjustY: 1
		}
	}
};
var KeywordTrigger_default = /* @__PURE__ */ defineComponent((props, { slots }) => {
	const opened = shallowRef(false);
	const dropdownPlacement = computed(() => {
		if (props.direction === "rtl") return props.placement === "top" ? "topLeft" : "bottomLeft";
		return props.placement === "top" ? "topRight" : "bottomRight";
	});
	return () => {
		const { prefixCls, options, visible, transitionName, getPopupContainer, popupClassName, popupStyle } = props;
		const dropdownPrefix = `${prefixCls}-dropdown`;
		const dropdownElement = createVNode(DropdownMenu_default, {
			"prefixCls": dropdownPrefix,
			"options": options,
			"opened": opened.value
		}, null);
		return createVNode(Trigger, {
			"prefixCls": dropdownPrefix,
			"popupVisible": visible,
			"popup": dropdownElement,
			"popupPlacement": dropdownPlacement.value,
			"popupMotion": { name: transitionName },
			"builtinPlacements": BUILT_IN_PLACEMENTS,
			"getPopupContainer": getPopupContainer,
			"popupClassName": popupClassName,
			"popupStyle": popupStyle,
			"afterOpenChange": (nextOpen) => {
				opened.value = nextOpen;
			}
		}, { default: () => [slots?.default?.()] });
	};
}, {
	props: {
		loading: {
			type: Boolean,
			required: false,
			default: void 0
		},
		options: {
			type: Array,
			required: true,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		placement: {
			type: String,
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
		popupClassName: {
			type: String,
			required: false,
			default: void 0
		},
		popupStyle: {
			type: Object,
			required: false,
			default: void 0
		}
	},
	name: "KeywordTrigger",
	inheritAttrs: false
});
export { KeywordTrigger_default as default };
