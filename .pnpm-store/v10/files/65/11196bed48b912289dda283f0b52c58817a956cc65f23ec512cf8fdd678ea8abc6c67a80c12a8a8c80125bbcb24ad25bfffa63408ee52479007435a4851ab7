import en_US_default from "../locale/en_US.js";
import { computed } from "vue";
function fillTimeFormat(showHour, showMinute, showSecond, showMillisecond, showMeridiem) {
	let timeFormat = "";
	const cells = [];
	if (showHour) cells.push(showMeridiem ? "hh" : "HH");
	if (showMinute) cells.push("mm");
	if (showSecond) cells.push("ss");
	timeFormat = cells.join(":");
	if (showMillisecond) timeFormat += ".SSS";
	if (showMeridiem) timeFormat += " A";
	return timeFormat;
}
function fillLocale(locale, showHour, showMinute, showSecond, showMillisecond, use12Hours) {
	const mergedLocale = locale || en_US_default || {};
	const { fieldDateTimeFormat, fieldDateFormat, fieldTimeFormat, fieldMonthFormat, fieldYearFormat, fieldWeekFormat, fieldQuarterFormat, yearFormat, cellYearFormat, cellQuarterFormat, dayFormat, cellDateFormat } = mergedLocale;
	const timeFormat = fillTimeFormat(showHour, showMinute, showSecond, showMillisecond, use12Hours);
	return {
		...mergedLocale,
		fieldDateTimeFormat: fieldDateTimeFormat || `YYYY-MM-DD ${timeFormat}`,
		fieldDateFormat: fieldDateFormat || "YYYY-MM-DD",
		fieldTimeFormat: fieldTimeFormat || timeFormat,
		fieldMonthFormat: fieldMonthFormat || "YYYY-MM",
		fieldYearFormat: fieldYearFormat || "YYYY",
		fieldWeekFormat: fieldWeekFormat || "gggg-wo",
		fieldQuarterFormat: fieldQuarterFormat || "YYYY-[Q]Q",
		yearFormat: yearFormat || "YYYY",
		cellYearFormat: cellYearFormat || "YYYY",
		cellQuarterFormat: cellQuarterFormat || "[Q]Q",
		cellDateFormat: cellDateFormat || dayFormat || "D"
	};
}
function useLocale(locale, showProps) {
	return computed(() => {
		const { showHour, showMinute, showSecond, showMillisecond, use12Hours } = showProps.value || {};
		return fillLocale(locale.value, showHour, showMinute, showSecond, showMillisecond, use12Hours);
	});
}
export { useLocale as default, fillTimeFormat };
