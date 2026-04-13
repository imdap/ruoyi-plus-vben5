const WEEK_DAY_COUNT = 7;
function nullableCompare(value1, value2, oriCompareFn) {
	if (!value1 && !value2 || value1 === value2) return true;
	if (!value1 || !value2) return false;
	return oriCompareFn();
}
function isSameDecade(generateConfig, decade1, decade2) {
	return nullableCompare(decade1, decade2, () => {
		return Math.floor(generateConfig.getYear(decade1) / 10) === Math.floor(generateConfig.getYear(decade2) / 10);
	});
}
function isSameYear(generateConfig, year1, year2) {
	return nullableCompare(year1, year2, () => generateConfig.getYear(year1) === generateConfig.getYear(year2));
}
function getQuarter(generateConfig, date) {
	return Math.floor(generateConfig.getMonth(date) / 3) + 1;
}
function isSameQuarter(generateConfig, quarter1, quarter2) {
	return nullableCompare(quarter1, quarter2, () => isSameYear(generateConfig, quarter1, quarter2) && getQuarter(generateConfig, quarter1) === getQuarter(generateConfig, quarter2));
}
function isSameMonth(generateConfig, month1, month2) {
	return nullableCompare(month1, month2, () => isSameYear(generateConfig, month1, month2) && generateConfig.getMonth(month1) === generateConfig.getMonth(month2));
}
function isSameDate(generateConfig, date1, date2) {
	return nullableCompare(date1, date2, () => isSameYear(generateConfig, date1, date2) && isSameMonth(generateConfig, date1, date2) && generateConfig.getDate(date1) === generateConfig.getDate(date2));
}
function isSameTime(generateConfig, time1, time2) {
	return nullableCompare(time1, time2, () => generateConfig.getHour(time1) === generateConfig.getHour(time2) && generateConfig.getMinute(time1) === generateConfig.getMinute(time2) && generateConfig.getSecond(time1) === generateConfig.getSecond(time2));
}
function isSameTimestamp(generateConfig, time1, time2) {
	return nullableCompare(time1, time2, () => isSameDate(generateConfig, time1, time2) && isSameTime(generateConfig, time1, time2) && generateConfig.getMillisecond(time1) === generateConfig.getMillisecond(time2));
}
function isSameWeek(generateConfig, locale, date1, date2) {
	return nullableCompare(date1, date2, () => {
		return isSameYear(generateConfig, generateConfig.locale.getWeekFirstDate(locale, date1), generateConfig.locale.getWeekFirstDate(locale, date2)) && generateConfig.locale.getWeek(locale, date1) === generateConfig.locale.getWeek(locale, date2);
	});
}
function isSame(generateConfig, locale, source, target, type) {
	switch (type) {
		case "date": return isSameDate(generateConfig, source, target);
		case "week": return isSameWeek(generateConfig, locale.locale, source, target);
		case "month": return isSameMonth(generateConfig, source, target);
		case "quarter": return isSameQuarter(generateConfig, source, target);
		case "year": return isSameYear(generateConfig, source, target);
		case "decade": return isSameDecade(generateConfig, source, target);
		case "time": return isSameTime(generateConfig, source, target);
		default: return isSameTimestamp(generateConfig, source, target);
	}
}
function isInRange(generateConfig, startDate, endDate, current) {
	if (!startDate || !endDate || !current) return false;
	return generateConfig.isAfter(current, startDate) && generateConfig.isAfter(endDate, current);
}
function isSameOrAfter(generateConfig, locale, date1, date2, type) {
	if (isSame(generateConfig, locale, date1, date2, type)) return true;
	return generateConfig.isAfter(date1, date2);
}
function getWeekStartDate(locale, generateConfig, value) {
	const weekFirstDay = generateConfig.locale.getWeekFirstDay(locale);
	const monthStartDate = generateConfig.setDate(value, 1);
	const startDateWeekDay = generateConfig.getWeekDay(monthStartDate);
	let alignStartDate = generateConfig.addDate(monthStartDate, weekFirstDay - startDateWeekDay);
	if (generateConfig.getMonth(alignStartDate) === generateConfig.getMonth(value) && generateConfig.getDate(alignStartDate) > 1) alignStartDate = generateConfig.addDate(alignStartDate, -7);
	return alignStartDate;
}
function formatValue(value, { generateConfig, locale, format }) {
	if (!value) return "";
	return typeof format === "function" ? format(value) : generateConfig.locale.format(locale.locale, value, format);
}
function fillTime(generateConfig, date, time) {
	let tmpDate = date;
	const getFn = [
		"getHour",
		"getMinute",
		"getSecond",
		"getMillisecond"
	];
	[
		"setHour",
		"setMinute",
		"setSecond",
		"setMillisecond"
	].forEach((fn, index) => {
		if (time) tmpDate = generateConfig[fn](tmpDate, generateConfig[getFn[index]](time));
		else tmpDate = generateConfig[fn](tmpDate, 0);
	});
	return tmpDate;
}
export { WEEK_DAY_COUNT, fillTime, formatValue, getQuarter, getWeekStartDate, isInRange, isSame, isSameDate, isSameDecade, isSameMonth, isSameOrAfter, isSameQuarter, isSameTime, isSameTimestamp, isSameWeek, isSameYear };
