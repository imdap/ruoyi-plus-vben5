import { fillIndex } from "../../utils/miscUtil.js";
import { formatValue, isSame, isSameTimestamp } from "../../utils/dateUtil.js";
import useLockEffect from "./useLockEffect.js";
import { computed, ref, shallowRef, watch } from "vue";
var EMPTY_VALUE = [];
function useUtil(generateConfig, locale, formatList) {
	const getDateTexts = (dates) => {
		return dates.map((date) => formatValue(date, {
			generateConfig: generateConfig.value,
			locale: locale.value,
			format: formatList.value[0]
		}));
	};
	const isSameDates = (source, target) => {
		const maxLen = Math.max(source.length, target.length);
		let diffIndex = -1;
		for (let i = 0; i < maxLen; i += 1) {
			const prev = source[i] || null;
			const next = target[i] || null;
			if (prev !== next && !isSameTimestamp(generateConfig.value, prev, next)) {
				diffIndex = i;
				break;
			}
		}
		return [diffIndex < 0, diffIndex !== 0];
	};
	return [getDateTexts, isSameDates];
}
function orderDates(dates, generateConfig) {
	return [...dates].sort((a, b) => generateConfig.isAfter(a, b) ? 1 : -1);
}
function useInnerValue(generateConfig, locale, formatList, rangeValue, order, defaultValue, value, onCalendarChange, onOk) {
	const mergedValue = shallowRef((value.value === void 0 ? defaultValue.value : value.value) || EMPTY_VALUE);
	watch(value, (value$1) => {
		mergedValue.value = value$1 || EMPTY_VALUE;
	});
	const setInnerValue = (val) => {
		if (value.value === void 0) mergedValue.value = val;
	};
	const calendarValue = ref(mergedValue.value);
	watch(mergedValue, (val) => {
		calendarValue.value = val;
	});
	const setCalendarValue = (val) => {
		calendarValue.value = val;
	};
	const [getDateTexts, isSameDates] = useUtil(generateConfig, locale, formatList);
	const triggerCalendarChange = (nextCalendarValues) => {
		let clone = [...nextCalendarValues];
		if (rangeValue.value) for (let i = 0; i < 2; i += 1) clone[i] = clone[i] || null;
		else if (order.value) clone = orderDates(clone.filter((date) => date), generateConfig.value);
		const [isSameMergedDates, isSameStart] = isSameDates(calendarValue.value, clone);
		if (!isSameMergedDates) {
			setCalendarValue(clone);
			if (onCalendarChange) {
				const cellTexts = getDateTexts(clone);
				onCalendarChange(clone, cellTexts, { range: isSameStart ? "end" : "start" });
			}
		}
	};
	const triggerOk = () => {
		if (onOk) onOk(calendarValue.value);
	};
	return [
		mergedValue,
		setInnerValue,
		calendarValue,
		triggerCalendarChange,
		triggerOk
	];
}
function useRangeValue(info, mergedValue, setInnerValue, getCalendarValue, triggerCalendarChange, disabled, formatList, focused, open, isInvalidateDate) {
	const orderOnChange = computed(() => disabled.value.some((d) => d) ? false : info.value.order);
	const [getDateTexts, isSameDates] = useUtil(computed(() => info.value.generateConfig), computed(() => info.value.locale), formatList);
	const submitValue = ref(mergedValue.value);
	watch(mergedValue, (val) => {
		submitValue.value = val;
	});
	const setSubmitValue = (val) => {
		submitValue.value = val;
	};
	const triggerSubmit = (nextValue) => {
		const { generateConfig, locale, picker, onChange, allowEmpty, order } = info.value;
		const isNullValue = nextValue === null;
		let clone = [...nextValue || submitValue.value];
		if (isNullValue) {
			const maxLen = Math.max(disabled.value.length, clone.length);
			for (let i = 0; i < maxLen; i += 1) if (!disabled.value[i]) clone[i] = null;
		}
		if (orderOnChange.value && clone[0] && clone[1]) clone = orderDates(clone, generateConfig);
		triggerCalendarChange(clone);
		const [start, end] = clone;
		const startEmpty = !start;
		const endEmpty = !end;
		const validateEmptyDateRange = allowEmpty ? (!startEmpty || allowEmpty[0]) && (!endEmpty || allowEmpty[1]) : true;
		const validateOrder = !order || startEmpty || endEmpty || isSame(generateConfig, locale, start, end, picker) || generateConfig.isAfter(end, start);
		const validateDates = (disabled.value[0] || !start || !isInvalidateDate(start, { activeIndex: 0 })) && (disabled.value[1] || !end || !isInvalidateDate(end, {
			from: start,
			activeIndex: 1
		}));
		const allPassed = isNullValue || validateEmptyDateRange && validateOrder && validateDates;
		if (allPassed) {
			const oldValue = mergedValue.value;
			setInnerValue(clone);
			submitValue.value = clone;
			const [isSameMergedDates] = isSameDates(clone, oldValue);
			if (onChange && !isSameMergedDates) {
				const everyEmpty = clone.every((val) => !val);
				onChange(isNullValue && everyEmpty ? null : clone, everyEmpty ? null : getDateTexts(clone));
			}
		}
		return allPassed;
	};
	const flushSubmit = (index, needTriggerChange) => {
		setSubmitValue(fillIndex(submitValue.value, index, getCalendarValue()[index]));
		if (needTriggerChange) triggerSubmit();
	};
	const interactiveFinished = computed(() => !focused.value && !open.value);
	useLockEffect(computed(() => !interactiveFinished.value), (next) => {
		if (next === false) {
			if (!next) {
				triggerSubmit();
				triggerCalendarChange(mergedValue.value);
				submitValue.value = mergedValue.value;
			}
		}
	});
	return [flushSubmit, triggerSubmit];
}
export { useRangeValue as default, useInnerValue };
