Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("./_virtual/rolldown_runtime.cjs");
let vue = require("vue");
let _v_c_util_dist_hooks_useMergedState = require("@v-c/util/dist/hooks/useMergedState");
_v_c_util_dist_hooks_useMergedState = require_rolldown_runtime.__toESM(_v_c_util_dist_hooks_useMergedState);
let _v_c_util_dist_KeyCode = require("@v-c/util/dist/KeyCode");
_v_c_util_dist_KeyCode = require_rolldown_runtime.__toESM(_v_c_util_dist_KeyCode);
var defaults = {
	prefixCls: "vc-switch",
	defaultChecked: void 0,
	checked: void 0
};
var Switch = /* @__PURE__ */ (0, vue.defineComponent)((props, { attrs, expose }) => {
	const btnRef = (0, vue.shallowRef)();
	const [innerChecked, setInnerChecked] = (0, _v_c_util_dist_hooks_useMergedState.default)(false, {
		value: (0, vue.computed)(() => props.checked),
		defaultValue: props.defaultChecked
	});
	function triggerChange(newChecked, event) {
		let mergedChecked = innerChecked.value;
		if (!props.disabled) {
			mergedChecked = newChecked;
			setInnerChecked(mergedChecked);
			props?.onChange?.(mergedChecked, event);
		}
		props?.["onUpdate:checked"]?.(mergedChecked);
		return mergedChecked;
	}
	function onInternalKeyDown(e) {
		if (e.which === _v_c_util_dist_KeyCode.default.LEFT) triggerChange(false, e);
		else if (e.which === _v_c_util_dist_KeyCode.default.RIGHT) triggerChange(true, e);
		props?.onKeyDown?.(e);
	}
	function onInternalClick(e) {
		const ret = triggerChange(!innerChecked.value, e);
		props?.onClick?.(ret, e);
	}
	expose({ btnRef });
	return () => {
		const { prefixCls, className, disabled, loadingIcon, checkedChildren, unCheckedChildren, classNames, styles, ...restProps } = props;
		const switchClassName = [
			prefixCls,
			className,
			{
				[`${prefixCls}-checked`]: innerChecked.value,
				[`${prefixCls}-disabled`]: disabled
			}
		];
		return (0, vue.createVNode)("button", (0, vue.mergeProps)(restProps, attrs, {
			"type": "button",
			"role": "switch",
			"aria-checked": innerChecked.value,
			"disabled": disabled,
			"class": switchClassName,
			"ref": btnRef,
			"onKeydown": onInternalKeyDown,
			"onClick": onInternalClick
		}), [typeof loadingIcon === "function" ? loadingIcon() : loadingIcon, (0, vue.createVNode)("span", { "class": `${prefixCls}-inner` }, [(0, vue.createVNode)("span", {
			"class": [`${prefixCls}-inner-checked`, classNames?.content],
			"style": styles?.content
		}, [checkedChildren]), (0, vue.createVNode)("span", {
			"class": [`${prefixCls}-inner-unchecked`, classNames?.content],
			"style": styles?.content
		}, [unCheckedChildren])])]);
	};
}, {
	props: /* @__PURE__ */ (0, vue.mergeDefaults)({
		className: {
			type: String,
			required: false,
			default: void 0
		},
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		},
		checkedChildren: {
			type: [
				Object,
				String,
				Number,
				Boolean,
				null,
				Array,
				Function
			],
			required: false,
			default: void 0
		},
		unCheckedChildren: {
			type: [
				Object,
				String,
				Number,
				Boolean,
				null,
				Array,
				Function
			],
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		"onUpdate:checked": {
			type: Function,
			required: false,
			default: void 0
		},
		onKeyDown: {
			type: Function,
			required: false,
			default: void 0
		},
		onClick: {
			type: Function,
			required: false,
			default: void 0
		},
		tabIndex: {
			type: Number,
			required: false,
			default: void 0
		},
		checked: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultChecked: {
			type: Boolean,
			required: false,
			default: void 0
		},
		loadingIcon: {
			type: [
				Object,
				String,
				Number,
				Boolean,
				null,
				Array,
				Function
			],
			required: false,
			default: void 0
		},
		title: {
			type: String,
			required: false,
			default: void 0
		},
		styles: {
			type: Object,
			required: false,
			default: void 0
		},
		classNames: {
			type: Object,
			required: false,
			default: void 0
		}
	}, defaults),
	name: "Switch",
	inheritAttrs: false
});
var src_default = Switch;
exports.default = src_default;
