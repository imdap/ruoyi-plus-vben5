import Star_default from "./Star.js";
import useRefs_default from "./useRefs.js";
import { getOffsetLeft } from "./util.js";
import { computed, createVNode, defineComponent, mergeDefaults, mergeProps, onMounted, ref } from "vue";
import { clsx } from "@v-c/util";
import useMergedState from "@v-c/util/dist/hooks/useMergedState";
import KeyCode from "@v-c/util/dist/KeyCode";
import pickAttrs from "@v-c/util/dist/pickAttrs";
import { getAttrStyleAndClass } from "@v-c/util/dist/props-util";
var defaults = {
	prefixCls: "vc-rate",
	count: 5,
	allowHalf: false,
	allowClear: true,
	keyboard: true,
	character: "★",
	direction: "ltr",
	tabIndex: 0
};
var Rate_default = /* @__PURE__ */ defineComponent((props, { attrs, expose }) => {
	const [setStarRef, starRefs] = useRefs_default();
	const rateRef = ref(null);
	const triggerFocus = () => {
		if (!props.disabled) rateRef.value.focus();
	};
	const triggerBlur = () => {
		if (!props.disabled) rateRef.value.blur();
	};
	expose({
		focus: triggerFocus,
		blur: triggerBlur
	});
	const [state, setStateValue] = useMergedState(props.defaultValue || 0, { value: computed(() => props.value) });
	const [cleanedValue, setCleanedValue] = useMergedState(null);
	const getStarValue = (index, x) => {
		const { direction, allowHalf } = props;
		const reverse = direction === "rtl";
		let starValue = index + 1;
		if (allowHalf) {
			const starEle = starRefs.value.get(index);
			const leftDis = getOffsetLeft(starEle);
			const width = starEle.clientWidth;
			if (reverse && x - leftDis > width / 2) starValue -= .5;
			else if (!reverse && x - leftDis < width / 2) starValue -= .5;
		}
		return starValue;
	};
	const changeValue = (nextValue) => {
		setStateValue(nextValue);
		props?.onChange?.(nextValue);
	};
	const focused = ref(false);
	const onInternalFocus = () => {
		focused.value = true;
		props?.onFocus?.();
	};
	const onInternalBlur = () => {
		focused.value = false;
		props?.onBlur?.();
	};
	const hoverValue = ref(null);
	const onHover = (event, index) => {
		const nextHoverValue = getStarValue(index, event.pageX);
		if (nextHoverValue !== cleanedValue.value) {
			hoverValue.value = nextHoverValue;
			setCleanedValue(null);
		}
		props?.onHoverChange?.(nextHoverValue);
	};
	const onMouseLeaveCallback = (event) => {
		const { disabled } = props;
		if (!disabled) {
			hoverValue.value = null;
			setCleanedValue(null);
			props?.onHoverChange?.(void 0);
		}
		if (event) props?.onMouseLeave?.(event);
	};
	const onClick = (event, index) => {
		const { allowClear } = props;
		const newValue = getStarValue(index, event.pageX);
		let isReset = false;
		if (allowClear) isReset = newValue === state.value;
		onMouseLeaveCallback();
		changeValue(isReset ? 0 : newValue);
		setCleanedValue(isReset ? newValue : null);
	};
	const onInternalKeyDown = (event) => {
		const { keyCode } = event;
		const value = state.value;
		const { keyboard, count, direction, allowHalf } = props;
		const reverse = direction === "rtl";
		const step = allowHalf ? .5 : 1;
		if (keyboard) {
			if (keyCode === KeyCode.RIGHT && value < count && !reverse) {
				changeValue(value + step);
				event.preventDefault();
			} else if (keyCode === KeyCode.LEFT && value > 0 && !reverse) {
				changeValue(value - step);
				event.preventDefault();
			} else if (keyCode === KeyCode.RIGHT && value > 0 && reverse) {
				changeValue(value - step);
				event.preventDefault();
			} else if (keyCode === KeyCode.LEFT && value < count && reverse) {
				changeValue(value + step);
				event.preventDefault();
			}
		}
		props?.onKeyDown?.(event);
	};
	onMounted(() => {
		const { autoFocus, disabled } = props;
		if (autoFocus && !disabled) triggerFocus();
	});
	return () => {
		const { count, allowHalf, disabled, prefixCls, direction, character, characterRender, tabIndex, ...restProps } = props;
		const { className, style, restAttrs } = getAttrStyleAndClass(attrs);
		const classString = clsx(prefixCls, className, {
			[`${prefixCls}-disabled`]: disabled,
			[`${prefixCls}-rtl`]: direction === "rtl"
		});
		const starNodes = Array.from({ length: count }).fill(0).map((_, index) => createVNode(Star_default, {
			"ref": setStarRef(index),
			"index": index,
			"count": count,
			"disabled": disabled,
			"prefixCls": `${prefixCls}-star`,
			"allowHalf": allowHalf,
			"value": hoverValue.value === null ? state.value : hoverValue.value,
			"onClick": onClick,
			"onHover": onHover,
			"key": index,
			"character": character,
			"characterRender": characterRender,
			"focused": focused.value
		}, null));
		return createVNode("ul", mergeProps({
			"id": restProps.id,
			"class": classString,
			"style": style,
			"onMouseleave": onMouseLeaveCallback,
			"tabindex": disabled ? -1 : tabIndex,
			"onFocus": disabled ? null : onInternalFocus,
			"onBlur": disabled ? null : onInternalBlur,
			"onKeydown": disabled ? null : onInternalKeyDown,
			"ref": rateRef
		}, pickAttrs(restAttrs, {
			aria: true,
			data: true,
			attr: true
		})), [starNodes]);
	};
}, {
	props: /* @__PURE__ */ mergeDefaults({
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		defaultValue: {
			type: Number,
			required: false,
			default: void 0
		},
		value: {
			type: Number,
			required: false,
			default: void 0
		},
		allowClear: {
			type: Boolean,
			required: false,
			default: void 0
		},
		keyboard: {
			type: Boolean,
			required: false,
			default: void 0
		},
		direction: {
			type: String,
			required: false,
			default: void 0
		},
		tabIndex: {
			type: [Number, String],
			required: false,
			default: void 0
		},
		autoFocus: {
			type: Boolean,
			required: false,
			default: void 0
		},
		onHoverChange: {
			type: Function,
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
			required: false,
			default: void 0
		},
		onFocus: {
			type: Function,
			required: false,
			default: void 0
		},
		onBlur: {
			type: Function,
			required: false,
			default: void 0
		},
		onKeyDown: {
			type: Function,
			required: false,
			default: void 0
		},
		onMouseLeave: {
			type: Function,
			required: false,
			default: void 0
		},
		"onUpdate:value": {
			type: Function,
			required: false,
			default: void 0
		},
		id: {
			type: String,
			required: false,
			default: void 0
		},
		count: {
			type: Number,
			required: false,
			default: void 0
		},
		character: {
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
		characterRender: {
			type: Function,
			required: false,
			default: void 0
		},
		allowHalf: {
			type: Boolean,
			required: false,
			default: void 0
		},
		disabled: {
			type: Boolean,
			required: false,
			default: void 0
		}
	}, defaults),
	inheritAttrs: false,
	name: "Rate"
});
export { Rate_default as default };
