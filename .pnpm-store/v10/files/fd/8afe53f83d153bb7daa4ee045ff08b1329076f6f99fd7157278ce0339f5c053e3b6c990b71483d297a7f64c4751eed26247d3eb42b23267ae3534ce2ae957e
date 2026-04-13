import { fillTime, isSame } from "../../utils/dateUtil.js";
import useSyncState from "../../hooks/useSyncState.js";
import { computed, ref, watch } from "vue";
function offsetPanelDate(generateConfig, picker, date, offset) {
	switch (picker) {
		case "date":
		case "datetime":
		case "week": return generateConfig.addMonth(date, offset);
		case "month":
		case "quarter": return generateConfig.addYear(date, offset);
		case "year": return generateConfig.addYear(date, offset * 10);
		case "decade": return generateConfig.addYear(date, offset * 100);
		default: return date;
	}
}
var EMPTY_LIST = [];
function useRangePickerValue(generateConfig, locale, calendarValue, modes, open, activeIndex, pickerMode, multiplePanel, defaultPickerValue = ref(EMPTY_LIST), pickerValue = ref(EMPTY_LIST), timeDefaultValue = ref(EMPTY_LIST), onPickerValueChange, minDate, maxDate) {
	const isTimePicker = computed(() => pickerMode.value === "time");
	const mergedActiveIndex = computed(() => activeIndex.value || 0);
	const getDefaultPickerValue = (index) => {
		let now = generateConfig.value?.getNow?.();
		if (!now) return;
		if (isTimePicker.value) now = fillTime(generateConfig.value, now);
		return defaultPickerValue.value?.[index] || calendarValue.value?.[index] || now;
	};
	const [getStartPickerValue, setStartPickerValue] = useSyncState(getDefaultPickerValue(0), () => pickerValue.value?.[0]);
	const [getEndPickerValue, setEndPickerValue] = useSyncState(getDefaultPickerValue(1), () => pickerValue.value?.[1]);
	const currentPickerValue = computed(() => {
		const current = [getStartPickerValue(true), getEndPickerValue(true)][mergedActiveIndex.value];
		if (!current) return current;
		return isTimePicker.value ? current : fillTime(generateConfig.value, current, timeDefaultValue.value?.[mergedActiveIndex.value]);
	});
	const setCurrentPickerValue = (nextPickerValue, source = "panel") => {
		const prevStartPickerValue = getStartPickerValue(true);
		const prevEndPickerValue = getEndPickerValue(true);
		const updater = [setStartPickerValue, setEndPickerValue][mergedActiveIndex.value];
		updater(nextPickerValue);
		const clone = [prevStartPickerValue, prevEndPickerValue];
		clone[mergedActiveIndex.value] = nextPickerValue;
		const mergedCallback = typeof onPickerValueChange === "function" ? onPickerValueChange : onPickerValueChange?.value;
		if (mergedCallback && (!isSame(generateConfig.value, locale.value, prevStartPickerValue, clone[0], pickerMode.value) || !isSame(generateConfig.value, locale.value, prevEndPickerValue, clone[1], pickerMode.value))) mergedCallback(clone, {
			source,
			range: mergedActiveIndex.value === 1 ? "end" : "start",
			mode: modes.value
		});
	};
	const getEndDatePickerValue = (startDate, endDate) => {
		if (multiplePanel.value) {
			const mode = {
				date: "month",
				datetime: "month",
				week: "month",
				month: "year",
				quarter: "year"
			}[pickerMode.value];
			if (mode && !isSame(generateConfig.value, locale.value, startDate, endDate, mode)) return offsetPanelDate(generateConfig.value, pickerMode.value, endDate, -1);
			if (pickerMode.value === "year" && startDate && endDate) {
				if (Math.floor(generateConfig.value.getYear(startDate) / 10) !== Math.floor(generateConfig.value.getYear(endDate) / 10)) return offsetPanelDate(generateConfig.value, pickerMode.value, endDate, -1);
			}
		}
		return endDate;
	};
	const prevActiveIndexRef = ref(null);
	watch(() => [
		open.value,
		mergedActiveIndex.value,
		calendarValue.value?.[mergedActiveIndex.value]
	], () => {
		if (!open.value) return;
		if (defaultPickerValue.value?.[mergedActiveIndex.value]) return;
		let nextPickerValue = isTimePicker.value ? null : generateConfig.value.getNow();
		if (prevActiveIndexRef.value !== null && prevActiveIndexRef.value !== mergedActiveIndex.value) nextPickerValue = [getStartPickerValue(true), getEndPickerValue(true)][mergedActiveIndex.value ^ 1];
		else if (calendarValue.value?.[mergedActiveIndex.value]) nextPickerValue = mergedActiveIndex.value === 0 ? calendarValue.value[0] : getEndDatePickerValue(calendarValue.value[0], calendarValue.value[1]);
		else if (calendarValue.value?.[mergedActiveIndex.value ^ 1]) nextPickerValue = calendarValue.value[mergedActiveIndex.value ^ 1];
		if (!nextPickerValue) return;
		if (minDate?.value && generateConfig.value.isAfter(minDate.value, nextPickerValue)) nextPickerValue = minDate.value;
		const offsetPickerValue = multiplePanel.value ? offsetPanelDate(generateConfig.value, pickerMode.value, nextPickerValue, 1) : nextPickerValue;
		if (maxDate?.value && generateConfig.value.isAfter(offsetPickerValue, maxDate.value)) nextPickerValue = multiplePanel.value ? offsetPanelDate(generateConfig.value, pickerMode.value, maxDate.value, -1) : maxDate.value;
		setCurrentPickerValue(nextPickerValue, "reset");
	}, { flush: "post" });
	watch(() => [open.value, mergedActiveIndex.value], () => {
		if (open.value) prevActiveIndexRef.value = mergedActiveIndex.value;
		else prevActiveIndexRef.value = null;
	}, { flush: "post" });
	watch(() => [
		open.value,
		mergedActiveIndex.value,
		defaultPickerValue.value?.[mergedActiveIndex.value]
	], () => {
		if (open.value && defaultPickerValue.value?.[mergedActiveIndex.value]) setCurrentPickerValue(defaultPickerValue.value[mergedActiveIndex.value], "reset");
	}, { flush: "post" });
	return [currentPickerValue, setCurrentPickerValue];
}
export { useRangePickerValue as default, offsetPanelDate };
