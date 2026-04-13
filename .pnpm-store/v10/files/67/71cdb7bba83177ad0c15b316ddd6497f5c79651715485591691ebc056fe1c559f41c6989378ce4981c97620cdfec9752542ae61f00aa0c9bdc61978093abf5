import { useProviderSliderContext } from "./context.js";
import Handles_default from "./Handles/index.js";
import useDrag_default from "./hooks/useDrag.js";
import useOffset from "./hooks/useOffset.js";
import useRange from "./hooks/useRange.js";
import Marks_default from "./Marks/index.js";
import Steps_default from "./Steps/index.js";
import Tracks_default from "./Tracks/index.js";
import { computed, createVNode, defineComponent, isVNode, mergeDefaults, ref, shallowRef, watch } from "vue";
import { classNames } from "@v-c/util";
import isEqual from "@v-c/util/dist/isEqual";
import warning from "@v-c/util/dist/warning";
var sliderDefaults = {
	prefixCls: "vc-slider",
	keyboard: true,
	disabled: false,
	min: 0,
	max: 100,
	step: 1,
	allowCross: true,
	pushable: false,
	included: true,
	tabIndex: 0,
	track: true
};
var Slider_default = /* @__PURE__ */ defineComponent((props, { attrs, slots, emit, expose }) => {
	const prefixCls = computed(() => props.prefixCls ?? sliderDefaults.prefixCls);
	const disabled = computed(() => props.disabled ?? sliderDefaults.disabled);
	const keyboard = computed(() => props.keyboard ?? sliderDefaults.keyboard);
	const included = computed(() => props.included ?? sliderDefaults.included);
	const tabIndex = computed(() => props.tabIndex ?? sliderDefaults.tabIndex);
	const allowCross = computed(() => props.allowCross ?? sliderDefaults.allowCross);
	const direction = computed(() => {
		if (props.vertical) return props.reverse ? "ttb" : "btt";
		return props.reverse ? "rtl" : "ltr";
	});
	const rangeConfig = computed(() => {
		const [rangeEnabled$1, rangeEditable$1, rangeDraggableTrack$1, minCount$1, maxCount$1] = useRange(props.range);
		return {
			rangeEnabled: rangeEnabled$1,
			rangeEditable: rangeEditable$1,
			rangeDraggableTrack: rangeDraggableTrack$1,
			minCount: minCount$1,
			maxCount: maxCount$1
		};
	});
	const rangeEnabled = computed(() => rangeConfig.value.rangeEnabled);
	const rangeEditable = computed(() => rangeConfig.value.rangeEditable);
	const rangeDraggableTrack = computed(() => rangeConfig.value.rangeDraggableTrack);
	const minCount = computed(() => rangeConfig.value.minCount ?? 0);
	const maxCount = computed(() => rangeConfig.value.maxCount);
	const mergedMin = computed(() => Number.isFinite(props.min ?? 0) ? props.min ?? 0 : 0);
	const mergedMax = computed(() => Number.isFinite(props.max ?? 100) ? props.max ?? 100 : 100);
	const mergedStep = computed(() => {
		const step = props.step ?? sliderDefaults.step;
		if (step !== null && step <= 0) return 1;
		return step;
	});
	const mergedPush = computed(() => {
		const pushable = props.pushable ?? sliderDefaults.pushable;
		if (typeof pushable === "boolean") return pushable ? mergedStep.value : false;
		return pushable >= 0 ? pushable : false;
	});
	const markList = computed(() => {
		return Object.keys(props.marks || {}).map((key) => {
			const mark = props.marks?.[key];
			const markObj = { value: Number(key) };
			if (mark && typeof mark === "object" && !isVNode(mark) && ("label" in mark || "style" in mark)) {
				markObj.style = mark.style;
				markObj.label = mark.label;
			} else markObj.label = mark;
			return markObj;
		}).filter(({ label }) => label || typeof label === "number").sort((a, b) => a.value - b.value);
	});
	const [formatValue, offsetValues] = useOffset(mergedMin, mergedMax, mergedStep, markList, allowCross, mergedPush);
	const formatValueRef = computed(() => formatValue);
	const offsetValuesRef = computed(() => offsetValues);
	const mergedValue = shallowRef(props.value !== void 0 ? props.value : props.defaultValue);
	watch(() => props.value, (val) => {
		if (val !== void 0) mergedValue.value = val;
	});
	const rawValues = computed(() => {
		const valueList = mergedValue.value === null || mergedValue.value === void 0 ? [] : Array.isArray(mergedValue.value) ? mergedValue.value : [mergedValue.value];
		const [val0 = mergedMin.value] = valueList;
		let returnValues = mergedValue.value === null ? [] : [val0];
		if (rangeEnabled.value) {
			returnValues = [...valueList];
			if (typeof props.count === "number" || mergedValue.value === void 0) {
				const pointCount = typeof props.count === "number" && props.count >= 0 ? props.count + 1 : 2;
				returnValues = returnValues.slice(0, pointCount);
				while (returnValues.length < pointCount) returnValues.push(returnValues[returnValues.length - 1] ?? mergedMin.value);
			}
			returnValues.sort((a, b) => a - b);
		}
		returnValues.forEach((val, index) => {
			returnValues[index] = formatValue(val);
		});
		return returnValues;
	});
	const handlesRef = ref();
	const containerRef = ref();
	const getTriggerValue = (triggerValues) => rangeEnabled.value ? triggerValues : triggerValues[0];
	const triggerChange = (nextValues) => {
		const cloneNextValues = [...nextValues].sort((a, b) => a - b);
		if (!isEqual(cloneNextValues, rawValues.value, true)) {
			const triggerValue = getTriggerValue(cloneNextValues);
			emit("change", triggerValue);
			props.onChange?.(triggerValue);
		}
		mergedValue.value = cloneNextValues;
	};
	const finishChange = (draggingDelete$1) => {
		if (draggingDelete$1) handlesRef.value?.hideHelp();
		const finishValue = getTriggerValue(rawValues.value);
		emit("afterChange", finishValue);
		props.onAfterChange?.(finishValue);
		warning(!props.onAfterChange, "[vc-slider] `onAfterChange` is deprecated. Please use `onChangeComplete` instead.");
		emit("changeComplete", finishValue);
		props.onChangeComplete?.(finishValue);
	};
	const onDelete = (index) => {
		if (disabled.value || !rangeEditable.value || rawValues.value.length <= minCount.value) return;
		const cloneNextValues = [...rawValues.value];
		cloneNextValues.splice(index, 1);
		const triggerValue = getTriggerValue(cloneNextValues);
		emit("beforeChange", triggerValue);
		props.onBeforeChange?.(triggerValue);
		triggerChange(cloneNextValues);
		const nextFocusIndex = Math.max(0, index - 1);
		handlesRef.value?.hideHelp();
		handlesRef.value?.focus(nextFocusIndex);
	};
	const [draggingIndex, draggingValue, draggingDelete, cacheValues, onStartDrag] = useDrag_default(containerRef, direction, rawValues, mergedMin, mergedMax, formatValueRef, triggerChange, finishChange, offsetValuesRef, rangeEditable, minCount);
	const changeToCloseValue = (newValue, e) => {
		if (!disabled.value) {
			const cloneNextValues = [...rawValues.value];
			let valueIndex = 0;
			let valueBeforeIndex = 0;
			let valueDist = mergedMax.value - mergedMin.value;
			rawValues.value.forEach((val, index) => {
				const dist = Math.abs(newValue - val);
				if (dist <= valueDist) {
					valueDist = dist;
					valueIndex = index;
				}
				if (val < newValue) valueBeforeIndex = index;
			});
			let focusIndex = valueIndex;
			if (rangeEditable.value && valueDist !== 0 && (!maxCount.value || rawValues.value.length < maxCount.value)) {
				cloneNextValues.splice(valueBeforeIndex + 1, 0, newValue);
				focusIndex = valueBeforeIndex + 1;
			} else cloneNextValues[valueIndex] = newValue;
			if (rangeEnabled.value && !rawValues.value.length && props.count === void 0) cloneNextValues.push(newValue);
			const nextValue = getTriggerValue(cloneNextValues);
			props.onBeforeChange?.(nextValue);
			triggerChange(cloneNextValues);
			if (e) {
				document.activeElement?.blur?.();
				handlesRef.value?.focus(focusIndex);
				onStartDrag(e, focusIndex, cloneNextValues);
			} else {
				props.onAfterChange?.(nextValue);
				warning(!props.onAfterChange, "[vc-slider] `onAfterChange` is deprecated. Please use `onChangeComplete` instead.");
				emit("changeComplete", nextValue);
				props.onChangeComplete?.(nextValue);
			}
		}
	};
	const onSliderMouseDown = (e) => {
		e.preventDefault();
		const rect = containerRef.value?.getBoundingClientRect();
		if (!rect) return;
		const { width, height, left, top, bottom, right } = rect;
		const { clientX, clientY } = e;
		let percent;
		switch (direction.value) {
			case "btt":
				percent = (bottom - clientY) / height;
				break;
			case "ttb":
				percent = (clientY - top) / height;
				break;
			case "rtl":
				percent = (right - clientX) / width;
				break;
			default: percent = (clientX - left) / width;
		}
		changeToCloseValue(formatValue(mergedMin.value + percent * (mergedMax.value - mergedMin.value)), e);
	};
	const keyboardValue = shallowRef(null);
	const onHandleOffsetChange = (offset, valueIndex) => {
		if (!disabled.value) {
			const next = offsetValues(rawValues.value, offset, valueIndex);
			const currentValue = getTriggerValue(rawValues.value);
			emit("beforeChange", currentValue);
			props.onBeforeChange?.(currentValue);
			triggerChange(next.values);
			keyboardValue.value = next.value;
		}
	};
	watch(keyboardValue, (val) => {
		if (val !== null) {
			const valueIndex = rawValues.value.indexOf(val);
			if (valueIndex >= 0) handlesRef.value?.focus(valueIndex);
		}
		keyboardValue.value = null;
	});
	const mergedDraggableTrack = computed(() => {
		if (rangeDraggableTrack.value && mergedStep.value === null) {
			if (process.env.NODE_ENV !== "production") warning(false, "`draggableTrack` is not supported when `step` is `null`.");
			return false;
		}
		return rangeDraggableTrack.value;
	});
	const onStartMove = (e, valueIndex) => {
		onStartDrag(e, valueIndex);
		const triggerValue = getTriggerValue(rawValues.value);
		emit("beforeChange", triggerValue);
		props.onBeforeChange?.(triggerValue);
	};
	watch(computed(() => draggingIndex.value !== -1), (isDragging) => {
		if (!isDragging && draggingValue.value !== null && draggingValue.value !== void 0) {
			const valueIndex = rawValues.value.lastIndexOf(draggingValue.value);
			if (valueIndex >= 0) handlesRef.value?.focus(valueIndex);
		}
	});
	const sortedCacheValues = computed(() => [...cacheValues.value].sort((a, b) => a - b));
	const includedRange = computed(() => {
		if (!rangeEnabled.value) return [mergedMin.value, sortedCacheValues.value[0] ?? mergedMin.value];
		if (!sortedCacheValues.value.length) return [mergedMin.value, mergedMin.value];
		return [sortedCacheValues.value[0], sortedCacheValues.value[sortedCacheValues.value.length - 1]];
	});
	const includedStart = computed(() => includedRange.value[0]);
	const includedEnd = computed(() => includedRange.value[1]);
	expose({
		focus: () => {
			handlesRef.value?.focus(0);
		},
		blur: () => {
			const { activeElement } = document;
			if (containerRef.value?.contains(activeElement)) activeElement?.blur();
		}
	});
	watch(() => props.autoFocus, (autoFocus) => {
		if (autoFocus) handlesRef.value?.focus(0);
	}, { immediate: true });
	useProviderSliderContext(computed(() => ({
		min: mergedMin.value,
		max: mergedMax.value,
		direction: direction.value,
		disabled: disabled.value,
		keyboard: keyboard.value,
		step: mergedStep.value,
		included: included.value,
		includedStart: includedStart.value,
		includedEnd: includedEnd.value,
		range: rangeEnabled.value,
		tabIndex: tabIndex.value,
		ariaLabelForHandle: props.ariaLabelForHandle,
		ariaLabelledByForHandle: props.ariaLabelledByForHandle,
		ariaRequired: props.ariaRequired,
		ariaValueTextFormatterForHandle: props.ariaValueTextFormatterForHandle,
		styles: props.styles || {},
		classNames: props.classNames || {}
	})));
	return () => {
		const { id, startPoint, trackStyle, handleStyle, railStyle, dotStyle, activeDotStyle, dots, handleRender, activeHandleRender, classNames: classNames$1, styles } = props;
		const mergedClassName = classNames(prefixCls.value, props.className, attrs.class, {
			[`${prefixCls.value}-disabled`]: disabled.value,
			[`${prefixCls.value}-vertical`]: props.vertical,
			[`${prefixCls.value}-horizontal`]: !props.vertical,
			[`${prefixCls.value}-with-marks`]: markList.value.length
		});
		const mergedStyle = {
			...props.style,
			...attrs.style
		};
		return createVNode("div", {
			"ref": containerRef,
			"class": mergedClassName,
			"style": mergedStyle,
			"onMousedown": onSliderMouseDown,
			"id": id
		}, [
			createVNode("div", {
				"class": classNames(`${prefixCls.value}-rail`, classNames$1?.rail),
				"style": {
					...railStyle,
					...styles?.rail
				}
			}, null),
			props.track !== false && createVNode(Tracks_default, {
				"prefixCls": prefixCls.value,
				"trackStyle": trackStyle,
				"values": rawValues.value,
				"startPoint": startPoint,
				"onStartMove": mergedDraggableTrack.value ? onStartMove : void 0
			}, null),
			createVNode(Steps_default, {
				"prefixCls": prefixCls.value,
				"marks": markList.value,
				"dots": dots,
				"style": dotStyle,
				"activeStyle": activeDotStyle
			}, null),
			createVNode(Handles_default, {
				"ref": handlesRef,
				"prefixCls": prefixCls.value,
				"handleStyle": handleStyle,
				"values": cacheValues.value,
				"draggingIndex": draggingIndex.value,
				"draggingDelete": draggingDelete.value,
				"onStartMove": onStartMove,
				"onOffsetChange": onHandleOffsetChange,
				"onFocus": (e) => {
					props.onFocus?.(e);
				},
				"onBlur": (e) => {
					props.onBlur?.(e);
				},
				"handleRender": handleRender,
				"activeHandleRender": activeHandleRender,
				"onChangeComplete": finishChange,
				"onDelete": rangeEditable.value ? onDelete : () => {}
			}, null),
			createVNode(Marks_default, {
				"prefixCls": prefixCls.value,
				"marks": markList.value,
				"onClick": changeToCloseValue
			}, slots)
		]);
	};
}, { props: /* @__PURE__ */ mergeDefaults({
	prefixCls: {
		type: String,
		required: false,
		default: void 0
	},
	className: {
		type: String,
		required: false,
		default: void 0
	},
	style: {
		type: Object,
		required: false,
		default: void 0
	},
	classNames: {
		type: Object,
		required: false,
		default: void 0
	},
	styles: {
		type: Object,
		required: false,
		default: void 0
	},
	id: {
		type: String,
		required: false,
		default: void 0
	},
	disabled: {
		type: Boolean,
		required: false,
		default: void 0
	},
	keyboard: {
		type: Boolean,
		required: false,
		default: void 0
	},
	autoFocus: {
		type: Boolean,
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
	range: {
		type: [Boolean, Object],
		required: false,
		default: void 0
	},
	count: {
		type: Number,
		required: false,
		default: void 0
	},
	min: {
		type: Number,
		required: false,
		default: void 0
	},
	max: {
		type: Number,
		required: false,
		default: void 0
	},
	step: {
		type: [Number, null],
		required: false,
		default: void 0
	},
	value: {
		required: false,
		default: void 0
	},
	defaultValue: {
		required: false,
		default: void 0
	},
	onChange: {
		type: Function,
		required: false,
		default: void 0
	},
	onBeforeChange: {
		type: Function,
		required: false,
		default: void 0
	},
	onAfterChange: {
		type: Function,
		required: false,
		default: void 0
	},
	onChangeComplete: {
		type: Function,
		required: false,
		default: void 0
	},
	allowCross: {
		type: Boolean,
		required: false,
		default: void 0
	},
	pushable: {
		type: [Boolean, Number],
		required: false,
		default: void 0
	},
	reverse: {
		type: Boolean,
		required: false,
		default: void 0
	},
	vertical: {
		type: Boolean,
		required: false,
		default: void 0
	},
	included: {
		type: Boolean,
		required: false,
		default: void 0
	},
	startPoint: {
		type: Number,
		required: false,
		default: void 0
	},
	trackStyle: {
		type: [Object, Array],
		required: false,
		default: void 0
	},
	handleStyle: {
		type: [Object, Array],
		required: false,
		default: void 0
	},
	railStyle: {
		type: Object,
		required: false,
		default: void 0
	},
	dotStyle: {
		type: [Object, Function],
		required: false,
		default: void 0
	},
	activeDotStyle: {
		type: [Object, Function],
		required: false,
		default: void 0
	},
	marks: {
		type: Object,
		required: false,
		default: void 0
	},
	dots: {
		type: Boolean,
		required: false,
		default: void 0
	},
	handleRender: {
		type: Function,
		required: false,
		default: void 0
	},
	activeHandleRender: {
		type: Function,
		required: false,
		default: void 0
	},
	track: {
		type: Boolean,
		required: false,
		default: void 0
	},
	tabIndex: {
		type: [Number, Array],
		required: false,
		default: void 0
	},
	ariaLabelForHandle: {
		type: [String, Array],
		required: false,
		default: void 0
	},
	ariaLabelledByForHandle: {
		type: [String, Array],
		required: false,
		default: void 0
	},
	ariaRequired: {
		type: Boolean,
		required: false,
		default: void 0
	},
	ariaValueTextFormatterForHandle: {
		type: [Function, Array],
		required: false,
		default: void 0
	}
}, sliderDefaults) });
export { Slider_default as default };
