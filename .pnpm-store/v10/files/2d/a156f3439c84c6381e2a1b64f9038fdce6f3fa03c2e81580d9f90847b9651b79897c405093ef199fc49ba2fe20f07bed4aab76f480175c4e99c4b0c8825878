Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
const require_rolldown_runtime = require("../_virtual/rolldown_runtime.cjs");
const require_context = require("../context.cjs");
const require_util = require("../util.cjs");
let vue = require("vue");
let _v_c_util = require("@v-c/util");
let _v_c_util_dist_KeyCode = require("@v-c/util/dist/KeyCode");
_v_c_util_dist_KeyCode = require_rolldown_runtime.__toESM(_v_c_util_dist_KeyCode);
var Handle_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "Handle",
	props: {
		prefixCls: {
			type: String,
			required: true
		},
		value: {
			type: Number,
			required: true
		},
		valueIndex: {
			type: [Number, Object],
			required: false
		},
		dragging: {
			type: Boolean,
			default: false
		},
		draggingDelete: {
			type: Boolean,
			default: false
		},
		onStartMove: {
			type: Function,
			required: true
		},
		onDelete: {
			type: Function,
			required: true
		},
		onOffsetChange: {
			type: Function,
			required: true
		},
		onFocus: {
			type: Function,
			required: true
		},
		onMouseenter: {
			type: Function,
			required: true
		},
		render: { type: Function },
		onChangeComplete: Function,
		mock: Boolean,
		classNames: Object,
		styles: Object
	},
	emits: [
		"focus",
		"mouseenter",
		"startMove",
		"delete",
		"offsetChange",
		"changeComplete"
	],
	setup(props, { attrs, emit, expose }) {
		const sliderContext = require_context.useInjectSlider();
		const divProps = (0, vue.ref)({});
		const handleClass = (0, vue.ref)({});
		const handleStyle = (0, vue.ref)({});
		const handleNodeRef = (0, vue.ref)();
		const onInternalStartMove = (e) => {
			if (!sliderContext.value.disabled) emit("startMove", e, props.valueIndex);
		};
		const onInternalFocus = (e) => {
			emit("focus", e, props.valueIndex);
		};
		const onInternalMouseEnter = (e) => {
			emit("mouseenter", e, props.valueIndex);
		};
		const onKeyDown = (e) => {
			const { keyboard, direction, disabled } = sliderContext.value;
			if (!disabled && keyboard) {
				let offset = null;
				switch (e.which || e.keyCode) {
					case _v_c_util_dist_KeyCode.default.LEFT:
						offset = direction === "ltr" || direction === "btt" ? -1 : 1;
						break;
					case _v_c_util_dist_KeyCode.default.RIGHT:
						offset = direction === "ltr" || direction === "btt" ? 1 : -1;
						break;
					case _v_c_util_dist_KeyCode.default.UP:
						offset = direction !== "ttb" ? 1 : -1;
						break;
					case _v_c_util_dist_KeyCode.default.DOWN:
						offset = direction !== "ttb" ? -1 : 1;
						break;
					case _v_c_util_dist_KeyCode.default.HOME:
						offset = "min";
						break;
					case _v_c_util_dist_KeyCode.default.END:
						offset = "max";
						break;
					case _v_c_util_dist_KeyCode.default.PAGE_UP:
						offset = 2;
						break;
					case _v_c_util_dist_KeyCode.default.PAGE_DOWN:
						offset = -2;
						break;
					case _v_c_util_dist_KeyCode.default.BACKSPACE:
					case _v_c_util_dist_KeyCode.default.DELETE:
						emit("delete", e, props.valueIndex);
						break;
				}
				if (offset !== null) {
					e.preventDefault();
					emit("offsetChange", offset, props.valueIndex);
				}
			}
		};
		const handleKeyUp = (e) => {
			switch (e.which || e.keyCode) {
				case _v_c_util_dist_KeyCode.default.LEFT:
				case _v_c_util_dist_KeyCode.default.RIGHT:
				case _v_c_util_dist_KeyCode.default.UP:
				case _v_c_util_dist_KeyCode.default.DOWN:
				case _v_c_util_dist_KeyCode.default.HOME:
				case _v_c_util_dist_KeyCode.default.END:
				case _v_c_util_dist_KeyCode.default.PAGE_UP:
				case _v_c_util_dist_KeyCode.default.PAGE_DOWN:
					emit("changeComplete");
					break;
			}
		};
		expose({ focus: () => {
			handleNodeRef.value?.focus();
		} });
		return () => {
			const { prefixCls, value, valueIndex, onStartMove, onDelete, render, dragging, draggingDelete, onOffsetChange, onChangeComplete, onFocus, onMouseenter, ...restProps } = props;
			const { min, max, direction, disabled, range, tabIndex, ariaLabelForHandle, ariaLabelledByForHandle, ariaRequired, ariaValueTextFormatterForHandle, classNames, styles } = sliderContext.value;
			const positionStyle = require_util.getDirectionStyle(direction, value, min, max);
			if (valueIndex !== null) divProps.value = {
				"tabindex": disabled ? null : require_util.getIndex(tabIndex, valueIndex),
				"role": "slider",
				"aria-valuemin": min,
				"aria-valuemax": max,
				"aria-valuenow": value,
				"aria-disabled": disabled,
				"aria-label": require_util.getIndex(ariaLabelForHandle, valueIndex),
				"aria-labelledby": require_util.getIndex(ariaLabelledByForHandle, valueIndex),
				"aria-required": require_util.getIndex(ariaRequired, valueIndex),
				"aria-valuetext": require_util.getIndex(ariaValueTextFormatterForHandle, valueIndex)?.(value),
				"aria-orientation": direction === "ltr" || direction === "rtl" ? "horizontal" : "vertical",
				"onMousedown": onInternalStartMove,
				"onTouchstart": onInternalStartMove,
				"onFocus": onInternalFocus,
				"onMouseenter": onInternalMouseEnter,
				"onKeydown": onKeyDown,
				"onKeyup": handleKeyUp,
				...restProps
			};
			else divProps.value = { ...restProps };
			const handlePrefixCls = `${prefixCls}-handle`;
			handleClass.value = (0, _v_c_util.classNames)(handlePrefixCls, {
				[`${handlePrefixCls}-${valueIndex + 1}`]: valueIndex !== null && range,
				[`${handlePrefixCls}-dragging`]: dragging,
				[`${handlePrefixCls}-dragging-delete`]: draggingDelete
			}, classNames?.handle);
			handleStyle.value = {
				...positionStyle,
				...attrs.style,
				...styles?.handle
			};
			const handleNode = (0, vue.createVNode)("div", (0, vue.mergeProps)({
				"ref": handleNodeRef,
				"class": handleClass.value,
				"style": handleStyle.value
			}, divProps.value), null);
			if (render) return render({
				index: valueIndex,
				prefixCls,
				value,
				dragging,
				draggingDelete,
				node: handleNode
			});
			return handleNode;
		};
	}
});
exports.default = Handle_default;
