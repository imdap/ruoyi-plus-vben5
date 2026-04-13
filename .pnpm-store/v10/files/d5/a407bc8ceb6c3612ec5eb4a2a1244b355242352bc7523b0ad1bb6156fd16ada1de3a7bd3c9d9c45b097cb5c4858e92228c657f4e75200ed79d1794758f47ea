import { useInjectSlider } from "../context.js";
import { getDirectionStyle, getIndex } from "../util.js";
import { createVNode, defineComponent, mergeProps, ref } from "vue";
import { classNames } from "@v-c/util";
import KeyCode from "@v-c/util/dist/KeyCode";
var Handle_default = /* @__PURE__ */ defineComponent({
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
		const sliderContext = useInjectSlider();
		const divProps = ref({});
		const handleClass = ref({});
		const handleStyle = ref({});
		const handleNodeRef = ref();
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
					case KeyCode.LEFT:
						offset = direction === "ltr" || direction === "btt" ? -1 : 1;
						break;
					case KeyCode.RIGHT:
						offset = direction === "ltr" || direction === "btt" ? 1 : -1;
						break;
					case KeyCode.UP:
						offset = direction !== "ttb" ? 1 : -1;
						break;
					case KeyCode.DOWN:
						offset = direction !== "ttb" ? -1 : 1;
						break;
					case KeyCode.HOME:
						offset = "min";
						break;
					case KeyCode.END:
						offset = "max";
						break;
					case KeyCode.PAGE_UP:
						offset = 2;
						break;
					case KeyCode.PAGE_DOWN:
						offset = -2;
						break;
					case KeyCode.BACKSPACE:
					case KeyCode.DELETE:
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
				case KeyCode.LEFT:
				case KeyCode.RIGHT:
				case KeyCode.UP:
				case KeyCode.DOWN:
				case KeyCode.HOME:
				case KeyCode.END:
				case KeyCode.PAGE_UP:
				case KeyCode.PAGE_DOWN:
					emit("changeComplete");
					break;
			}
		};
		expose({ focus: () => {
			handleNodeRef.value?.focus();
		} });
		return () => {
			const { prefixCls, value, valueIndex, onStartMove, onDelete, render, dragging, draggingDelete, onOffsetChange, onChangeComplete, onFocus, onMouseenter, ...restProps } = props;
			const { min, max, direction, disabled, range, tabIndex, ariaLabelForHandle, ariaLabelledByForHandle, ariaRequired, ariaValueTextFormatterForHandle, classNames: classNames$1, styles } = sliderContext.value;
			const positionStyle = getDirectionStyle(direction, value, min, max);
			if (valueIndex !== null) divProps.value = {
				"tabindex": disabled ? null : getIndex(tabIndex, valueIndex),
				"role": "slider",
				"aria-valuemin": min,
				"aria-valuemax": max,
				"aria-valuenow": value,
				"aria-disabled": disabled,
				"aria-label": getIndex(ariaLabelForHandle, valueIndex),
				"aria-labelledby": getIndex(ariaLabelledByForHandle, valueIndex),
				"aria-required": getIndex(ariaRequired, valueIndex),
				"aria-valuetext": getIndex(ariaValueTextFormatterForHandle, valueIndex)?.(value),
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
			handleClass.value = classNames(handlePrefixCls, {
				[`${handlePrefixCls}-${valueIndex + 1}`]: valueIndex !== null && range,
				[`${handlePrefixCls}-dragging`]: dragging,
				[`${handlePrefixCls}-dragging-delete`]: draggingDelete
			}, classNames$1?.handle);
			handleStyle.value = {
				...positionStyle,
				...attrs.style,
				...styles?.handle
			};
			const handleNode = createVNode("div", mergeProps({
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
export { Handle_default as default };
