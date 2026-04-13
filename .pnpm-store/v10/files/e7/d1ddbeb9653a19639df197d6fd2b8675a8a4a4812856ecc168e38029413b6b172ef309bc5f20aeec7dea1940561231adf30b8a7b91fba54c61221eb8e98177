Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
const require_DropdownMenu = require("./DropdownMenu.cjs");
let vue = require("vue");
let _v_c_trigger = require("@v-c/trigger");
_v_c_trigger = require_rolldown_runtime.__toESM(_v_c_trigger);
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
var KeywordTrigger = /* @__PURE__ */ (0, vue.defineComponent)((props, { slots }) => {
	const opened = (0, vue.shallowRef)(false);
	const dropdownPlacement = (0, vue.computed)(() => {
		if (props.direction === "rtl") return props.placement === "top" ? "topLeft" : "bottomLeft";
		return props.placement === "top" ? "topRight" : "bottomRight";
	});
	return () => {
		const { prefixCls, options, visible, transitionName, getPopupContainer, popupClassName, popupStyle } = props;
		const dropdownPrefix = `${prefixCls}-dropdown`;
		const dropdownElement = (0, vue.createVNode)(require_DropdownMenu.default, {
			"prefixCls": dropdownPrefix,
			"options": options,
			"opened": opened.value
		}, null);
		return (0, vue.createVNode)(_v_c_trigger.default, {
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
var KeywordTrigger_default = KeywordTrigger;
exports.default = KeywordTrigger_default;
