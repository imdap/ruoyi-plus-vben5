import { usePickerContext } from "../PickerInput/context.js";
import { pickProps, toArray } from "../utils/miscUtil.js";
import useCellRender from "../PickerInput/hooks/useCellRender.js";
import en_US_default from "../locale/en_US.js";
import useLocale from "../hooks/useLocale.js";
import { fillShowTimeConfig, getTimeProps } from "../hooks/useTimeConfig.js";
import { isSame } from "../utils/dateUtil.js";
import useToggleDates from "../hooks/useToggleDates.js";
import { providePickerHackContext, provideSharedPanelContext, usePickerHackContext } from "./context.js";
import DatePanel_default from "./DatePanel/index.js";
import TimePanel_default from "./TimePanel/index.js";
import DateTimePanel_default from "./DateTimePanel/index.js";
import DecadePanel_default from "./DecadePanel/index.js";
import MonthPanel_default from "./MonthPanel/index.js";
import QuarterPanel_default from "./QuarterPanel/index.js";
import WeekPanel_default from "./WeekPanel/index.js";
import YearPanel_default from "./YearPanel/index.js";
import { computed, createVNode, defineComponent, mergeProps, ref, toRef, watch } from "vue";
import { clsx, warning } from "@v-c/util";
var DefaultComponents = {
	date: DatePanel_default,
	datetime: DateTimePanel_default,
	week: WeekPanel_default,
	month: MonthPanel_default,
	quarter: QuarterPanel_default,
	year: YearPanel_default,
	decade: DecadePanel_default,
	time: TimePanel_default
};
var PickerPanel_default = /* @__PURE__ */ defineComponent((props, { attrs }) => {
	const pickerContext = usePickerContext();
	const rootRef = ref();
	const mergedPrefixCls = computed(() => pickerContext.value.prefixCls || props.prefixCls || "vc-picker");
	const mergedGenerateConfig = computed(() => props.generateConfig || pickerContext.value.generateConfig);
	const mergedLocale = computed(() => props.locale || pickerContext.value.locale || en_US_default);
	const timePropsInfo = computed(() => getTimeProps({
		...props,
		locale: mergedLocale.value,
		format: void 0,
		picker: props.picker
	}));
	const localeTimeProps = computed(() => timePropsInfo.value[1]);
	const showTimeFormat = computed(() => timePropsInfo.value[2]);
	const propFormat = computed(() => timePropsInfo.value[3]);
	const timeProps = computed(() => timePropsInfo.value[0]);
	const filledLocale = useLocale(mergedLocale, localeTimeProps);
	const internalPicker = computed(() => {
		if (props.picker === "date" && props.showTime) return "datetime";
		return props.picker || "date";
	});
	const mergedShowTime = computed(() => fillShowTimeConfig(internalPicker.value, showTimeFormat.value, propFormat.value, timeProps.value, filledLocale.value));
	const now = computed(() => mergedGenerateConfig.value?.getNow?.());
	const internalModeState = ref(props.picker || "date");
	const mergedMode = computed(() => props.mode || internalModeState.value);
	const setMergedMode = (m) => {
		internalModeState.value = m;
	};
	const internalMode = computed(() => mergedMode.value === "date" && mergedShowTime.value ? "datetime" : mergedMode.value);
	const toggleDates = useToggleDates(mergedGenerateConfig, filledLocale, internalPicker);
	const internalValueState = ref(props.defaultValue);
	const innerValue = computed(() => props.value !== void 0 ? props.value : internalValueState.value);
	const setMergedValue = (val) => {
		internalValueState.value = val;
	};
	const mergedValue = computed(() => {
		const vals = toArray(innerValue.value).filter((val) => val);
		return props.multiple ? vals : vals.slice(0, 1);
	});
	const triggerChange = (nextValue) => {
		setMergedValue(nextValue);
		if (props.onChange && (nextValue === null || mergedValue.value.length !== nextValue.length || mergedValue.value.some((ori, index) => !isSame(mergedGenerateConfig.value, filledLocale.value, ori, nextValue[index], internalPicker.value)))) props.onChange(props.multiple ? nextValue : nextValue?.[0]);
	};
	const onInternalSelect = (newDate) => {
		props.onSelect?.(newDate);
		if (mergedMode.value === props.picker) triggerChange(props.multiple ? toggleDates(mergedValue.value, newDate) : [newDate]);
	};
	const internalPickerValueState = ref(props.defaultPickerValue || mergedValue.value[0] || now.value);
	const mergedPickerValue = computed(() => props.pickerValue !== void 0 ? props.pickerValue : internalPickerValueState.value);
	const setInternalPickerValue = (val) => {
		internalPickerValueState.value = val;
	};
	watch(() => mergedValue.value[0], (val) => {
		if (val && props.pickerValue === void 0) setInternalPickerValue(val);
	});
	const triggerPanelChange = (viewDate, nextMode) => {
		props.onPanelChange?.(viewDate || mergedPickerValue.value, nextMode || mergedMode.value);
	};
	const setPickerValue = (nextPickerValue, triggerPanelEvent = false) => {
		setInternalPickerValue(nextPickerValue);
		props.onPickerValueChange?.(nextPickerValue);
		if (triggerPanelEvent) triggerPanelChange(nextPickerValue);
	};
	const triggerModeChange = (nextMode, viewDate) => {
		setMergedMode(nextMode);
		if (viewDate) setPickerValue(viewDate);
		triggerPanelChange(viewDate, nextMode);
	};
	const onPanelValueSelect = (nextValue) => {
		onInternalSelect(nextValue);
		setPickerValue(nextValue);
		if (mergedMode.value !== props.picker) {
			const decadeYearQueue = ["decade", "year"];
			const decadeYearMonthQueue = [...decadeYearQueue, "month"];
			const queue = {
				quarter: [...decadeYearQueue, "quarter"],
				week: [...decadeYearMonthQueue, "week"],
				date: [...decadeYearMonthQueue, "date"]
			}[props.picker || "date"] || decadeYearMonthQueue;
			const nextMode = queue[queue.indexOf(mergedMode.value) + 1];
			if (nextMode) triggerModeChange(nextMode, nextValue);
		}
	};
	const hoverRangeDate = computed(() => {
		let start;
		let end;
		if (Array.isArray(props.hoverRangeValue)) [start, end] = props.hoverRangeValue;
		else start = props.hoverRangeValue;
		if (!start && !end) return null;
		start = start || end;
		end = end || start;
		return mergedGenerateConfig.value.isAfter(start, end) ? [end, start] : [start, end];
	});
	const onInternalCellRender = useCellRender(toRef(props, "cellRender"), toRef(props, "dateRender"), toRef(props, "monthCellRender"));
	provideSharedPanelContext(computed(() => ({
		classNames: pickerContext.value.classNames?.popup ?? props.classNames ?? {},
		styles: pickerContext.value.styles?.popup ?? props.styles ?? {}
	})));
	const parentHackContext = usePickerHackContext();
	providePickerHackContext(computed(() => ({
		...parentHackContext?.value || {},
		hideHeader: props.hideHeader
	})));
	if (process.env.NODE_ENV !== "production") warning(!mergedValue.value || mergedValue.value.every((val) => mergedGenerateConfig.value.isValidate(val)), "Invalidate date pass to `value` or `defaultValue`.");
	return () => {
		const PanelComponent = props.components?.[internalMode.value] || DefaultComponents[internalMode.value] || DatePanel_default;
		const panelCls = `${mergedPrefixCls.value}-panel`;
		const panelProps = pickProps(props, [
			"showWeek",
			"prevIcon",
			"nextIcon",
			"superPrevIcon",
			"superNextIcon",
			"disabledDate",
			"minDate",
			"maxDate",
			"onHover"
		]);
		return createVNode("div", mergeProps({
			"ref": rootRef,
			"tabindex": props.tabindex,
			"class": clsx(panelCls, { [`${panelCls}-rtl`]: props.direction === "rtl" })
		}, attrs), [createVNode(PanelComponent, mergeProps(panelProps, {
			"showTime": mergedShowTime.value,
			"prefixCls": mergedPrefixCls.value,
			"locale": filledLocale.value,
			"generateConfig": mergedGenerateConfig.value,
			"onModeChange": triggerModeChange,
			"pickerValue": mergedPickerValue.value,
			"onPickerValueChange": (nextPickerValue) => {
				setPickerValue(nextPickerValue, true);
			},
			"value": mergedValue.value[0],
			"onSelect": onPanelValueSelect,
			"values": mergedValue.value,
			"cellRender": onInternalCellRender,
			"hoverRangeValue": hoverRangeDate.value,
			"hoverValue": props.hoverValue
		}), null)]);
	};
}, {
	props: {
		prefixCls: {
			type: String,
			required: false,
			default: void 0
		},
		direction: {
			type: String,
			required: false,
			default: void 0
		},
		onSelect: {
			type: Function,
			required: false,
			default: void 0
		},
		defaultPickerValue: {
			required: false,
			default: void 0
		},
		pickerValue: {
			required: false,
			default: void 0
		},
		onPickerValueChange: {
			type: Function,
			required: false,
			default: void 0
		},
		mode: {
			type: String,
			required: false,
			default: void 0
		},
		onPanelChange: {
			type: Function,
			required: false,
			default: void 0
		},
		picker: {
			type: String,
			required: false,
			default: void 0
		},
		showTime: {
			type: [Boolean, Object],
			required: false,
			default: void 0
		},
		showWeek: {
			type: Boolean,
			required: false,
			default: void 0
		},
		cellRender: {
			type: Function,
			required: false,
			default: void 0
		},
		dateRender: {
			type: Function,
			required: false,
			default: void 0
		},
		monthCellRender: {
			type: Function,
			required: false,
			default: void 0
		},
		hoverValue: {
			type: Array,
			required: false,
			default: void 0
		},
		hoverRangeValue: {
			type: Array,
			required: false,
			default: void 0
		},
		onHover: {
			type: Function,
			required: false,
			default: void 0
		},
		components: {
			type: Object,
			required: false,
			default: void 0
		},
		hideHeader: {
			type: Boolean,
			required: false,
			default: void 0
		},
		locale: {
			type: Object,
			required: false,
			default: void 0
		},
		generateConfig: {
			type: Object,
			required: false,
			default: void 0
		},
		disabledDate: {
			type: Function,
			required: false,
			default: void 0
		},
		minDate: {
			required: false,
			default: void 0
		},
		maxDate: {
			required: false,
			default: void 0
		},
		prevIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		nextIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		superPrevIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		superNextIcon: {
			type: [
				Object,
				Function,
				String,
				Number,
				null,
				Boolean,
				Array
			],
			required: false,
			default: void 0
		},
		format: {
			type: String,
			required: false,
			default: void 0
		},
		showNow: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showHour: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showMinute: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showSecond: {
			type: Boolean,
			required: false,
			default: void 0
		},
		showMillisecond: {
			type: Boolean,
			required: false,
			default: void 0
		},
		use12Hours: {
			type: Boolean,
			required: false,
			default: void 0
		},
		hourStep: {
			required: false,
			default: void 0
		},
		minuteStep: {
			required: false,
			default: void 0
		},
		secondStep: {
			required: false,
			default: void 0
		},
		millisecondStep: {
			required: false,
			default: void 0
		},
		hideDisabledOptions: {
			type: Boolean,
			required: false,
			default: void 0
		},
		defaultValue: {
			type: [Array, null],
			required: false,
			default: void 0
		},
		defaultOpenValue: {
			required: false,
			default: void 0
		},
		disabledHours: {
			type: Function,
			required: false,
			default: void 0
		},
		disabledMinutes: {
			type: Function,
			required: false,
			default: void 0
		},
		disabledSeconds: {
			type: Function,
			required: false,
			default: void 0
		},
		disabledTime: {
			type: Function,
			required: false,
			default: void 0
		},
		changeOnScroll: {
			type: Boolean,
			required: false,
			default: void 0
		},
		tabindex: {
			type: [
				Number,
				String,
				null
			],
			required: false,
			default: void 0
		},
		multiple: {
			type: Boolean,
			required: false,
			default: void 0
		},
		value: {
			required: false,
			default: void 0
		},
		onChange: {
			type: Function,
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
	},
	name: "PickerPanel",
	inheritAttrs: false
});
export { PickerPanel_default as default };
