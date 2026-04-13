function leftPad(str, length, fill = "0") {
	let current = String(str);
	while (current.length < length) current = `${fill}${current}`;
	return current;
}
function toArray(val) {
	if (val === null || val === void 0) return [];
	return Array.isArray(val) ? val : [val];
}
function fillIndex(ori, index, value) {
	const clone = [...ori];
	clone[index] = value;
	return clone;
}
function pickProps(props, keys) {
	const clone = {};
	const mergedKeys = keys || Object.keys(props);
	if (Array.isArray(mergedKeys)) mergedKeys.forEach((key) => {
		if (props[key] !== void 0) clone[key] = props[key];
	});
	return clone;
}
function getRowFormat(picker, locale, format) {
	if (format) return format;
	switch (picker) {
		case "time": return locale.fieldTimeFormat;
		case "datetime": return locale.fieldDateTimeFormat;
		case "month": return locale.fieldMonthFormat;
		case "year": return locale.fieldYearFormat;
		case "quarter": return locale.fieldQuarterFormat;
		case "week": return locale.fieldWeekFormat;
		default: return locale.fieldDateFormat;
	}
}
function getFromDate(calendarValues, activeIndexList, activeIndex) {
	const mergedActiveIndex = activeIndex !== void 0 ? activeIndex : activeIndexList[activeIndexList.length - 1];
	const firstValuedIndex = activeIndexList.find((index) => calendarValues[index]);
	return mergedActiveIndex !== firstValuedIndex ? calendarValues[firstValuedIndex] : void 0;
}
export { fillIndex, getFromDate, getRowFormat, leftPad, pickProps, toArray };
